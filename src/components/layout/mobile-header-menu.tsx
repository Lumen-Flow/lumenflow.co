"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Technology", href: "/technology" },
  { label: "Marketing", href: "/marketing" },
  { label: "Creatives", href: "/creatives" },
  { label: "Case Studies", href: "/case-studies" },
] as const;

export function MobileHeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");

      if (hasOpenedRef.current) {
        toggleRef.current?.focus();
      }

      return;
    }

    hasOpenedRef.current = true;
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    <div className="relative ml-1 flex shrink-0 items-center md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="focus-ring relative z-[100] inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-cool-frost/20 bg-black/25 text-cool-frost transition-colors hover:bg-cool-frost/10"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Menu
          aria-hidden="true"
          className={`absolute size-5 transition-[opacity,transform] duration-300 ${
            isOpen ? "scale-75 rotate-45 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <X
          aria-hidden="true"
          className={`absolute size-5 transition-[opacity,transform] duration-300 ${
            isOpen ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-45 opacity-0"
          }`}
        />
      </button>

      {isMounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-40 transition-[visibility] duration-500 ${
                isOpen ? "visible" : "invisible delay-500"
              }`}
            >
        <button
          type="button"
          aria-label="Close navigation"
          tabIndex={isOpen ? 0 : -1}
          className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-modal="true"
          role="dialog"
          className={`absolute right-0 top-0 flex h-dvh w-[min(88vw,24rem)] flex-col overflow-y-auto rounded-l-[2rem] bg-abyss-navy px-6 pb-8 pt-24 text-cool-frost shadow-[-20px_0_60px_rgb(0_0_0/0.28)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <p className="border-b border-cool-frost/15 pb-4 text-xs font-medium uppercase tracking-[0.18em] text-cool-frost/45">
            Navigation
          </p>

          <nav className="mt-5" aria-label="Primary">
            <ul>
              {navigation.map((item, index) => (
                <li
                  key={item.href}
                  className="border-b border-cool-frost/15"
                >
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    tabIndex={isOpen ? 0 : -1}
                    className={`focus-ring flex items-center justify-between gap-4 py-5 font-heading text-[clamp(1.9rem,9vw,3rem)] leading-none tracking-[-0.035em] transition-[opacity,transform,color] duration-500 hover:text-volt-time ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isOpen
                        ? `${100 + index * 70}ms`
                        : "0ms",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>
                      <span className="mr-3 align-top font-body text-[0.65rem] tracking-normal text-cool-frost/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <Link
              href="/#contact"
              tabIndex={isOpen ? 0 : -1}
              className={`focus-ring inline-flex min-h-12 w-full items-center justify-between rounded-full bg-volt-time px-5 text-sm font-medium text-abyss-navy transition-[opacity,transform] duration-500 ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${140 + navigation.length * 70}ms`
                  : "0ms",
              }}
              onClick={() => setIsOpen(false)}
            >
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
