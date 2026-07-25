"use client";

import { useEffect, useReducer, useState, useSyncExternalStore } from "react";

import {
  persistConsentPreferences,
  readConsentPreferences,
  type ConsentPreferences,
  updateGoogleConsent,
} from "@/lib/cookie-consent";

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type PreferenceToggleProps = {
  checked: boolean;
  description: string;
  disabled?: boolean;
  id: string;
  label: string;
  onChange?: (checked: boolean) => void;
};

function PreferenceToggle({
  checked,
  description,
  disabled = false,
  id,
  label,
  onChange,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-abyss-navy/20 py-5 last:border-b-0">
      <div>
        <label
          className="font-heading text-xl font-medium text-abyss-navy"
          htmlFor={id}
        >
          {label}
        </label>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-abyss-navy/65">
          {description}
        </p>
      </div>

      <label className="relative mt-1 inline-flex shrink-0">
        <input
          checked={checked}
          className="peer sr-only"
          disabled={disabled}
          id={id}
          onChange={(event) => onChange?.(event.target.checked)}
          type="checkbox"
        />
        <span className="h-7 w-12 rounded-full border border-abyss-navy/30 bg-abyss-navy/10 transition-colors peer-checked:border-volt-time peer-checked:bg-volt-time peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-volt-time peer-disabled:cursor-not-allowed peer-disabled:opacity-60" />
        <span className="pointer-events-none absolute top-1 left-1 size-5 rounded-full bg-abyss-navy transition-transform peer-checked:translate-x-5" />
        <span className="sr-only">
          {disabled ? "This category is always active" : `Toggle ${label}`}
        </span>
      </label>
    </div>
  );
}

export function CookieConsent() {
  const hasMounted = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [, refreshConsent] = useReducer((revision: number) => revision + 1, 0);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const storedPreferences = hasMounted ? readConsentPreferences() : null;

  useEffect(() => {
    if (!isPreferencesOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreferencesOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreferencesOpen]);

  if (!hasMounted) {
    return null;
  }

  const savePreferences = (preferences: ConsentPreferences) => {
    persistConsentPreferences(preferences);
    updateGoogleConsent(preferences);
    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setIsPreferencesOpen(false);
    refreshConsent();
  };

  const openPreferences = () => {
    const currentPreferences = readConsentPreferences();

    setAnalytics(currentPreferences?.analytics ?? false);
    setMarketing(currentPreferences?.marketing ?? false);
    setIsPreferencesOpen(true);
  };

  return (
    <>
      {!storedPreferences && !isPreferencesOpen ? (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-5xl rounded-[1.75rem] border border-cool-frost/15 bg-abyss-navy/50 p-5 text-cool-frost shadow-[0_1.5rem_5rem_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
          role="dialog"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-volt-time uppercase">
                Your privacy
              </p>
              <h2
                className="mt-2 text-3xl leading-none"
                id="cookie-consent-title"
              >
                Cookies, with your say.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cool-frost/70">
                We use essential cookies to remember your choice. With your
                permission, analytics cookies help us understand site
                performance, while marketing cookies support campaign
                measurement.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:flex">
              <button
                className="focus-ring min-h-11 rounded-full border border-cool-frost/30 px-5 text-sm font-medium transition-colors hover:bg-cool-frost/10 hover:text-cool-frost"
                onClick={() =>
                  savePreferences({ analytics: false, marketing: false })
                }
                type="button"
              >
                Reject optional
              </button>
              <button
                className="focus-ring min-h-11 rounded-full border border-cool-frost/30 px-5 text-sm font-medium transition-colors hover:bg-cool-frost/10 hover:text-cool-frost"
                onClick={openPreferences}
                type="button"
              >
                Manage choices
              </button>
              <button
                className="focus-ring min-h-11 rounded-full bg-volt-time px-5 text-sm font-semibold text-abyss-navy transition-[transform,color] hover:-translate-y-0.5 hover:text-cool-frost"
                onClick={() =>
                  savePreferences({ analytics: true, marketing: true })
                }
                type="button"
              >
                Accept all
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {storedPreferences && !isPreferencesOpen ? (
        <button
          className="focus-ring fixed bottom-4 left-4 z-[190] min-h-10 rounded-full border border-cool-frost/20 bg-abyss-navy px-4 text-xs font-semibold text-cool-frost shadow-lg transition-transform hover:-translate-y-0.5"
          onClick={openPreferences}
          type="button"
        >
          Cookie settings
        </button>
      ) : null}

      {isPreferencesOpen ? (
        <div
          className="fixed inset-0 z-[210] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsPreferencesOpen(false);
            }
          }}
        >
          <section
            aria-describedby="cookie-preferences-description"
            aria-labelledby="cookie-preferences-title"
            aria-modal="true"
            className="my-auto w-full max-w-2xl rounded-[2rem] bg-cool-frost p-6 text-abyss-navy shadow-[0_1.5rem_6rem_rgba(0,0,0,0.45)] sm:p-8"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-abyss-navy/55 uppercase">
                  Privacy controls
                </p>
                <h2
                  className="mt-2 text-4xl leading-none"
                  id="cookie-preferences-title"
                >
                  Choose your cookies
                </h2>
              </div>
              <button
                aria-label="Close cookie preferences"
                autoFocus
                className="focus-ring inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-abyss-navy/20 text-xl transition-colors hover:bg-abyss-navy hover:text-cool-frost"
                onClick={() => setIsPreferencesOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <p
              className="mt-4 max-w-xl text-sm leading-relaxed text-abyss-navy/65"
              id="cookie-preferences-description"
            >
              Optional cookies stay off unless you enable them. You can return
              to these settings and change your choice at any time.
            </p>

            <div className="mt-5 border-y border-abyss-navy/15">
              <PreferenceToggle
                checked
                description="Stores this consent choice and supports core site security. These cookies cannot be switched off."
                disabled
                id="cookie-essential"
                label="Essential"
              />
              <PreferenceToggle
                checked={analytics}
                description="Allows Google Analytics to measure visits and site performance so we can understand what is working."
                id="cookie-analytics"
                label="Analytics"
                onChange={setAnalytics}
              />
              <PreferenceToggle
                checked={marketing}
                description="Allows advertising and conversion-measurement tags configured through Google Tag Manager."
                id="cookie-marketing"
                label="Marketing"
                onChange={setMarketing}
              />
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              <button
                className="group focus-ring min-h-11 rounded-full border border-abyss-navy/25 px-5 text-sm font-medium transition-colors hover:bg-abyss-navy"
                onClick={() =>
                  savePreferences({ analytics: false, marketing: false })
                }
                type="button"
              >
                <span className="transition-colors group-hover:text-cool-frost">
                  Reject optional
                </span>
              </button>
              <button
                className="group focus-ring min-h-11 rounded-full border border-abyss-navy/25 px-5 text-sm font-medium transition-colors hover:bg-abyss-navy"
                onClick={() => savePreferences({ analytics, marketing })}
                type="button"
              >
                <span className="transition-colors group-hover:text-cool-frost">
                  Save choices
                </span>
              </button>
              <button
                className="group focus-ring min-h-11 rounded-full bg-volt-time px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                onClick={() =>
                  savePreferences({ analytics: true, marketing: true })
                }
                type="button"
              >
                <span className="text-abyss-navy transition-colors group-hover:text-cool-frost">
                  Accept all
                </span>
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
