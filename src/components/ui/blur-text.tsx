"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimationSnapshot = {
  filter: string;
  opacity: number;
  y: number;
};

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  wrap?: boolean;
  trigger?: "in-view" | "hover";
  style?: CSSProperties;
};

function buildKeyframes(
  from: AnimationSnapshot,
  steps: AnimationSnapshot[],
) {
  return {
    filter: [from.filter, ...steps.map((step) => step.filter)],
    opacity: [from.opacity, ...steps.map((step) => step.opacity)],
    y: [from.y, ...steps.map((step) => step.y)],
  };
}

export function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  wrap = true,
  trigger = "in-view",
  style,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (trigger === "hover") {
      const hoverRoot = element.closest<HTMLElement>(
        "[data-blur-text-hover-root]",
      );

      if (!hoverRoot) {
        return;
      }

      const show = () => setInView(true);
      const hide = () => setInView(false);

      hoverRoot.addEventListener("mouseenter", show);
      hoverRoot.addEventListener("mouseleave", hide);
      hoverRoot.addEventListener("focusin", show);
      hoverRoot.addEventListener("focusout", hide);

      return () => {
        hoverRoot.removeEventListener("mouseenter", show);
        hoverRoot.removeEventListener("mouseleave", hide);
        hoverRoot.removeEventListener("focusin", show);
        hoverRoot.removeEventListener("focusout", hide);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, trigger]);

  const defaultFrom = useMemo<AnimationSnapshot>(
    () => ({
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? -50 : 50,
    }),
    [direction],
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const keyframes = buildKeyframes(fromSnapshot, toSnapshots);
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1)),
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={`${segment}-${index}`}
          initial={fromSnapshot}
          animate={inView ? keyframes : fromSnapshot}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}
