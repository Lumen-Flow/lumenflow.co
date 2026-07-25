export const COOKIE_CONSENT_NAME = "lumenflow_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type GoogleConsentState = {
  ad_personalization: "denied" | "granted";
  ad_storage: "denied" | "granted";
  ad_user_data: "denied" | "granted";
  analytics_storage: "denied" | "granted";
  functionality_storage: "denied";
  personalization_storage: "denied" | "granted";
  security_storage: "granted";
};

type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const CONSENT_COOKIE_VERSION = "v1";

const defaultGoogleConsent: GoogleConsentState & {
  wait_for_update: number;
} = {
  ad_personalization: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500,
};

export function parseConsentPreferences(
  value: string | undefined,
): ConsentPreferences | null {
  const match = value?.match(/^v1-([01])([01])$/);

  if (!match) {
    return null;
  }

  return {
    analytics: match[1] === "1",
    marketing: match[2] === "1",
  };
}

export function serializeConsentPreferences({
  analytics,
  marketing,
}: ConsentPreferences): string {
  return `${CONSENT_COOKIE_VERSION}-${analytics ? "1" : "0"}${marketing ? "1" : "0"}`;
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof document === "undefined") {
    return null;
  }

  const consentCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_CONSENT_NAME}=`));

  return parseConsentPreferences(consentCookie?.split("=")[1]);
}

export function persistConsentPreferences(
  preferences: ConsentPreferences,
): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie =
    [
      `${COOKIE_CONSENT_NAME}=${serializeConsentPreferences(preferences)}`,
      `Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}`,
      "Path=/",
      "SameSite=Lax",
    ].join("; ") + secure;
}

function toGoogleConsentState({
  analytics,
  marketing,
}: ConsentPreferences): GoogleConsentState {
  return {
    ad_personalization: marketing ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
    functionality_storage: "denied",
    personalization_storage: marketing ? "granted" : "denied",
    security_storage: "granted",
  };
}

export function updateGoogleConsent(preferences: ConsentPreferences): void {
  const consentWindow = window as ConsentWindow;

  consentWindow.dataLayer ??= [];

  const gtag =
    consentWindow.gtag ??
    (function gtag(...args: unknown[]) {
      consentWindow.dataLayer?.push(args);
    } as (...args: unknown[]) => void);

  consentWindow.gtag = gtag;
  gtag("consent", "update", toGoogleConsentState(preferences));
  consentWindow.dataLayer.push({
    event: "cookie_consent_update",
    consent_analytics: preferences.analytics ? "granted" : "denied",
    consent_marketing: preferences.marketing ? "granted" : "denied",
  });
}

export function getGoogleConsentBootstrapScript(): string {
  return `
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", ${JSON.stringify(defaultGoogleConsent)});

  var prefix = ${JSON.stringify(`${COOKIE_CONSENT_NAME}=`)};
  var storedConsent = document.cookie
    .split(";")
    .map(function (cookie) { return cookie.trim(); })
    .find(function (cookie) { return cookie.indexOf(prefix) === 0; });

  if (!storedConsent) {
    return;
  }

  var value = storedConsent.slice(prefix.length);
  var match = value.match(/^v1-([01])([01])$/);

  if (!match) {
    return;
  }

  var analyticsGranted = match[1] === "1";
  var marketingGranted = match[2] === "1";

  window.gtag("consent", "update", {
    ad_personalization: marketingGranted ? "granted" : "denied",
    ad_storage: marketingGranted ? "granted" : "denied",
    ad_user_data: marketingGranted ? "granted" : "denied",
    analytics_storage: analyticsGranted ? "granted" : "denied",
    functionality_storage: "denied",
    personalization_storage: marketingGranted ? "granted" : "denied",
    security_storage: "granted"
  });
})();
`;
}
