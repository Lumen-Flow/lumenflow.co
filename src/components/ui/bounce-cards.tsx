"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export type BounceCardImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type BounceCardsProps = {
  images: readonly BounceCardImage[];
  className?: string;
  animationDelay?: number;
  animationStagger?: number;
  transformStyles?: readonly string[];
};

const defaultTransforms = [
  "translate(-150px, 4px) rotate(5deg)",
  "translate(-78px, 13px) rotate(-5deg)",
  "translate(-6px, 8px) rotate(-7deg)",
  "translate(66px, 12px) rotate(7deg)",
  "translate(138px, 4px) rotate(-7deg)",
] as const;

export function BounceCards({
  images,
  className = "",
  animationDelay = 0.15,
  animationStagger = 0.08,
  transformStyles = defaultTransforms,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>(
      "[data-bounce-card]",
      container,
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(cards, { autoAlpha: 1 });
      return;
    }

    const entrance = gsap.fromTo(
      cards,
      {
        autoAlpha: 0,
        scale: 0.72,
        y: 70,
      },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.05,
        delay: animationDelay,
        stagger: animationStagger,
        ease: "elastic.out(1, 0.72)",
      },
    );

    return () => {
      entrance.kill();
      gsap.killTweensOf(cards);
    };
  }, [animationDelay, animationStagger, images]);

  const bounceCard = (card: HTMLElement, active: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(card, {
      y: active ? -18 : 0,
      scale: active ? 1.045 : 1,
      duration: active ? 0.42 : 0.65,
      ease: active ? "back.out(2)" : "elastic.out(1, 0.7)",
      overwrite: true,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-[10.5rem] w-[22rem] max-w-full ${className}`}
      aria-label="Selected work image trail"
    >
      {images.map((image, index) => (
        <div
          data-bounce-card
          className="absolute top-1/2 left-1/2 h-[8.25rem] w-[7rem] overflow-hidden rounded-xl border border-abyss-navy/10 bg-cool-frost shadow-[0_16px_35px_rgb(8_28_48_/_0.14)]"
          key={`${image.src}-${index}`}
          style={{
            transform:
              transformStyles[index] ??
              defaultTransforms[index % defaultTransforms.length],
            zIndex: index + 1,
          }}
          onMouseEnter={(event) => bounceCard(event.currentTarget, true)}
          onMouseLeave={(event) => bounceCard(event.currentTarget, false)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={
              image.fit === "contain"
                ? "object-contain p-5"
                : "object-cover"
            }
            sizes="7rem"
          />
        </div>
      ))}
    </div>
  );
}
