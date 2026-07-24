"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "hover" | "view" | "parent-hover";
};

const defaultCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?";

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = defaultCharacters,
  className = "",
  encryptedClassName = "",
  parentClassName = "",
  animateOn = "hover",
}: DecryptedTextProps) {
  const originalCharacters = useMemo(() => Array.from(text), [text]);
  const [displayText, setDisplayText] = useState(text);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    () => new Set(),
  );
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableCharacters = useMemo(() => {
    if (!useOriginalCharsOnly) {
      return Array.from(characters);
    }

    return Array.from(
      new Set(originalCharacters.filter((character) => character.trim())),
    );
  }, [characters, originalCharacters, useOriginalCharsOnly]);

  const revealOrder = useMemo(() => {
    const indices = originalCharacters
      .map((character, index) => (character.trim() ? index : -1))
      .filter((index) => index >= 0);

    if (revealDirection === "end") {
      return indices.reverse();
    }

    if (revealDirection === "center") {
      const center = (originalCharacters.length - 1) / 2;
      return indices.sort(
        (first, second) =>
          Math.abs(first - center) - Math.abs(second - center),
      );
    }

    return indices;
  }, [originalCharacters, revealDirection]);

  const randomCharacter = useCallback(() => {
    if (availableCharacters.length === 0) {
      return "";
    }

    return availableCharacters[
      Math.floor(Math.random() * availableCharacters.length)
    ];
  }, [availableCharacters]);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDisplayText(text);
    setRevealedIndices(new Set(revealOrder));
    setIsScrambling(false);
  }, [revealOrder, text]);

  const startAnimation = useCallback(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      revealOrder.length === 0
    ) {
      stopAnimation();
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let iteration = 0;
    const revealed = new Set<number>();

    setRevealedIndices(revealed);
    setIsScrambling(true);

    intervalRef.current = setInterval(() => {
      iteration += 1;

      if (sequential) {
        const nextIndex = revealOrder[revealed.size];

        if (nextIndex !== undefined) {
          revealed.add(nextIndex);
        }
      }

      setRevealedIndices(new Set(revealed));
      setDisplayText(
        originalCharacters
          .map((character, index) => {
            if (!character.trim() || revealed.has(index)) {
              return character;
            }

            return randomCharacter();
          })
          .join(""),
      );

      const complete = sequential
        ? revealed.size >= revealOrder.length
        : iteration >= maxIterations;

      if (complete) {
        stopAnimation();
      }
    }, speed);
  }, [
    maxIterations,
    originalCharacters,
    randomCharacter,
    revealOrder,
    sequential,
    speed,
    stopAnimation,
  ]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            startAnimation();
            observer.unobserve(element);
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(element);
      return () => observer.disconnect();
    }

    const hoverTarget =
      animateOn === "parent-hover"
        ? element.closest<HTMLElement>("[data-decrypted-text-hover-root]")
        : element;

    if (!hoverTarget) {
      return;
    }

    hoverTarget.addEventListener("mouseenter", startAnimation);
    hoverTarget.addEventListener("focusin", startAnimation);

    return () => {
      hoverTarget.removeEventListener("mouseenter", startAnimation);
      hoverTarget.removeEventListener("focusin", startAnimation);
    };
  }, [animateOn, startAnimation]);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    [],
  );

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      aria-label={text}
    >
      {Array.from(displayText).map((character, index) => (
        <span
          aria-hidden="true"
          className={
            !isScrambling || revealedIndices.has(index)
              ? className
              : encryptedClassName
          }
          key={`${index}-${character}`}
        >
          {character}
        </span>
      ))}
    </motion.span>
  );
}
