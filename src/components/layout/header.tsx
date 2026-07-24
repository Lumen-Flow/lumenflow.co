"use client";

import { ArrowUpRight, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Navigation } from "@/components/layout/navigation";
import { FluidGlassSurface } from "@/components/ui/fluid-glass-surface";
import { siteConfig } from "@/content/site";

import "./header.css";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <FluidGlassSurface
        className="site-header-surface pointer-events-auto mt-5 ml-3 w-[calc(100%-1.5rem)] rounded-full sm:mt-[clamp(1rem,3vw,3rem)] sm:ml-[clamp(1rem,3vw,3rem)] sm:w-[calc(100%-3rem)] lg:w-[60%]"
        data-scrolled={isScrolled}
      >
        <div className="flex h-14 items-center gap-4 px-4 sm:px-5">
          <Link
            className="focus-ring shrink-0 rounded-sm"
            href="/"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/brand/Logo-blackbg.png"
              alt={siteConfig.name}
              width={70}
              height={50}
              className=" w-auto object-contain"
              priority
            />
          </Link>

          <div className="ml-auto hidden md:block">
            <Navigation isScrolled={isScrolled} />
          </div>

          <Link
            className="contact-transition focus-ring relative ml-auto inline-flex h-10 shrink-0 overflow-hidden rounded-full bg-volt-time text-xs font-medium text-abyss-navy md:ml-2"
            data-scrolled={isScrolled}
            href="/#contact"
            aria-label="Contact us"
          >
            <span className="contact-transition__label">
              Contact Us
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </span>
            <Send
              aria-hidden="true"
              className="contact-transition__icon size-[1.125rem]"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </FluidGlassSurface>
    </header>
  );
}
