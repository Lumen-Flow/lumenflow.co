"use client";

import Image from "next/image";

import {
  ColorBends as BaseColorBends,
  type ColorBendsProps,
} from "@/components/ui/color-bends";

const footerColors = ["#C8FF00", "#081C30", "#000000"];

export function FooterColorBends(_: ColorBendsProps) {
  return (
    <div
      data-footer-end
      className="pointer-events-none relative z-0 isolate w-screen max-w-none flex-none overflow-hidden bg-black"
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "none",
        minHeight: "calc(50svh + clamp(3rem, 6vw, 5rem))",
        marginTop: "calc(-1 * clamp(3rem, 6vw, 5rem))",
      }}
    >
      <BaseColorBends
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        rotation={90}
        speed={0.2}
        colors={footerColors}
        transparent={false}
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={0}
        parallax={0}
        noise={0.15}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        blur={18}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="relative h-[clamp(5rem,18vw,12rem)] w-[min(78vw,34rem)]">
          <Image
            src="/brand/Logo-blackbg.png"
            alt="Lumen & Flow"
            fill
            sizes="(max-width: 768px) 78vw, 34rem"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export const ColorBends = FooterColorBends;

export default FooterColorBends;
