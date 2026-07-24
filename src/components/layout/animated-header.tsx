"use client";

import { MobileHeaderMenu } from "@/components/layout/mobile-header-menu";

import { gsap } from "gsap";
import { ArrowUpRight, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Navigation } from "@/components/layout/navigation";
import { FluidGlassSurface } from "@/components/ui/fluid-glass-surface";
import { siteConfig } from "@/content/site";

import "./animated-header.css";

const SCROLL_THRESHOLD = 24;

export function AnimatedHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const surface = header.querySelector<HTMLElement>(
      ".animated-site-header",
    );
    const contactButton =
      header.querySelector<HTMLElement>(".animated-contact");
    const contactLabel = header.querySelector<HTMLElement>(
      ".animated-contact__label",
    );
    const contactIcon = header.querySelector<HTMLElement>(
      ".animated-contact__icon",
    );
    const ripple = header.querySelector<HTMLElement>(
      ".animated-site-header__ripple",
    );
    const navigationItems = gsap.utils.toArray<HTMLElement>(
      ".site-nav-item",
      header,
    );

    if (
      !surface ||
      !contactButton ||
      !contactLabel ||
      !contactIcon ||
      !ripple
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isScrolled = window.scrollY > SCROLL_THRESHOLD;

    const getRestingWidth = () =>
      window.matchMedia("(min-width: 64rem)").matches
        ? "60%"
        : "calc(100% - 1.5rem)";

    const getRestingMargin = () =>
      window.matchMedia("(min-width: 40rem)").matches
        ? "clamp(1rem, 3vw, 3rem)"
        : "0.75rem";

    const setState = (scrolled: boolean) => {
      surface.dataset.scrolled = String(scrolled);
      contactButton.dataset.scrolled = String(scrolled);

      gsap.set(surface, {
        width: scrolled ? "75%" : getRestingWidth(),
        backgroundColor: scrolled
          ? "rgba(8, 8, 10, 0.72)"
          : "rgba(240, 242, 245, 0.06)",
        borderColor: scrolled
          ? "rgba(200, 255, 0, 0.18)"
          : "rgba(240, 242, 245, 0.18)",
      });
      gsap.set(surface, {
        scaleX: 1,
        scaleY: 1,
        marginLeft: scrolled ? "12.5%" : getRestingMargin(),
        transformOrigin: "center center",
      });
      gsap.set(contactButton, { width: scrolled ? 48 : 116 });
      gsap.set(contactButton, { x: 0 });
      gsap.set(contactLabel, {
        autoAlpha: scrolled ? 0 : 1,
        yPercent: scrolled ? 170 : 0,
        scale: scrolled ? 0.88 : 1,
      });
      gsap.set(contactIcon, {
        autoAlpha: scrolled ? 1 : 0,
        yPercent: scrolled ? 0 : -170,
        scale: scrolled ? 1 : 0.75,
      });
      gsap.set(navigationItems, { autoAlpha: 1, x: 0 });
      gsap.set(ripple, { autoAlpha: 0 });
    };

    const animateState = (scrolled: boolean) => {
      if (reduceMotion) {
        setState(scrolled);
        return;
      }

      surface.dataset.scrolled = String(scrolled);
      contactButton.dataset.scrolled = String(scrolled);

      gsap.killTweensOf([
        surface,
        contactButton,
        contactLabel,
        contactIcon,
        ripple,
        ...navigationItems,
      ]);

      const rippleStart = scrolled ? -170 : 500;
      const rippleMiddle = scrolled ? 170 : 160;
      const rippleEnd = scrolled ? 500 : -170;
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      /*
       * Apply the glass appearance immediately to prevent flashing, but let
       * GSAP smoothly animate the container width with the header content.
       */
      gsap.set(surface, {
        backgroundColor: scrolled
          ? "rgba(8, 8, 10, 0.72)"
          : "rgba(240, 242, 245, 0.06)",
        borderColor: scrolled
          ? "rgba(200, 255, 0, 0.18)"
          : "rgba(240, 242, 245, 0.18)",
        boxShadow: scrolled
          ? "inset 0 1px 0 rgba(240, 242, 245, 0.16), 0 18px 48px rgba(0, 0, 0, 0.34)"
          : "inset 0 1px 0 rgba(240, 242, 245, 0.18), 0 16px 40px rgba(0, 0, 0, 0.12)",
      });

      timeline
        .to(
          surface,
          {
            width: scrolled ? "75%" : getRestingWidth(),
            duration: 0.78,
            ease: "power4.inOut",
          },
          0,
        )
        .to(
          surface,
          {
            marginLeft: scrolled ? "12.5%" : getRestingMargin(),
            duration: 1.05,
            ease: "elastic.out(1, 0.48)",
          },
          0,
        )
        .to(
          surface,
          {
            scaleX: scrolled ? 1.022 : 0.982,
            scaleY: 0.965,
            transformOrigin: "center center",
            duration: 0.28,
            ease: "power2.in",
          },
          0,
        )
        .to(
          surface,
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.72,
            ease: "elastic.out(1, 0.38)",
          },
          0.27,
        )
        .to(
          contactButton,
          {
            width: scrolled ? 48 : 116,
            duration: 0.62,
            ease: "power4.inOut",
          },
          0.06,
        )
        .to(
          contactLabel,
          {
            autoAlpha: scrolled ? 0 : 1,
            yPercent: scrolled ? 170 : 0,
            scale: scrolled ? 0.88 : 1,
            duration: 0.5,
          },
          0,
        )
        .to(
          contactIcon,
          {
            autoAlpha: scrolled ? 1 : 0,
            yPercent: scrolled ? 0 : -170,
            scale: scrolled ? 1 : 0.75,
            duration: 0.5,
          },
          0.12,
        )
        .fromTo(
          ripple,
          {
            autoAlpha: 0,
            xPercent: rippleStart,
            scaleX: 0.52,
            scaleY: 0.72,
            rotation: scrolled ? -4 : 4,
          },
          {
            autoAlpha: 1,
            xPercent: rippleMiddle,
            scaleX: 1.08,
            scaleY: 1,
            rotation: 0,
            duration: 0.42,
            ease: "power2.out",
          },
          0,
        )
        .to(
          ripple,
          {
            autoAlpha: 0,
            xPercent: rippleEnd,
            scaleX: 1.55,
            scaleY: 1.28,
            rotation: scrolled ? 3 : -3,
            duration: 0.56,
            ease: "power3.in",
          },
          0.42,
        )
        .to(
          navigationItems,
          {
            autoAlpha: 0,
            x: -10,
            duration: 0.16,
            stagger: 0.035,
            ease: "power2.in",
          },
          0.04,
        )
        .to(
          navigationItems,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.46,
            stagger: 0.085,
            ease: "power3.out",
          },
          0.3,
        );
    };

    const handleScroll = () => {
      const nextState = window.scrollY > SCROLL_THRESHOLD;

      if (nextState === isScrolled) {
        return;
      }

      isScrolled = nextState;
      animateState(isScrolled);
    };

    const handleResize = () => setState(isScrolled);

    setState(isScrolled);
    if (!reduceMotion) {
      gsap.fromTo(
        navigationItems,
        { autoAlpha: 0, x: -10 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.48,
          stagger: 0.085,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf([
        surface,
        contactButton,
        contactLabel,
        contactIcon,
        ripple,
        ...navigationItems,
      ]);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <FluidGlassSurface
        className="animated-site-header pointer-events-auto mt-6 ml-3 w-[calc(100%-1.5rem)] rounded-full sm:ml-[clamp(1rem,3vw,3rem)] lg:w-[60%]"
        data-scrolled="false"
      >
        <span
          className="animated-site-header__ripple"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-[clamp(3.75rem,6vw,4.5rem)] items-center px-4 sm:px-6">
          <Link
            className="ml-4 focus-ring shrink-0 rounded-sm [&_img]:h-[clamp(2rem,5vw,3.75rem)] [&_img]:w-auto"
            href="/"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/brand/Logo-blackbg.png"
              alt={siteConfig.name}
              width={60}
              height={50}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <Navigation />
          </div>

          <Link
            className="animated-contact focus-ring relative ml-auto -mr-2 inline-flex h-12 w-[7.25rem] shrink-0 overflow-hidden rounded-full bg-volt-time text-xs font-medium text-abyss-navy"
            data-scrolled="false"
            href="/#contact"
            aria-label="Contact us"
          >
            <span className="animated-contact__label">
              Contact Us
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </span>
            <span
              className="animated-contact__icon flex items-center justify-center"
              aria-hidden="true"
            >
              <Send className="size-[1.15rem]" strokeWidth={2.2} />
            </span>
        </Link>
        {/* <MobileHeaderMenu /> */}
      </div>
      </FluidGlassSurface>
    </header>
  );
}
