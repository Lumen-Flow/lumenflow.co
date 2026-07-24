"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type ColorBendsProps = {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
};

function toRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return { red: 255, green: 255, blue: 255 };
  }

  return {
    red: Number.parseInt(expanded.slice(0, 2), 16),
    green: Number.parseInt(expanded.slice(2, 4), 16),
    blue: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

export default function ColorBends({
  className = "",
  style,
  rotation = 90,
  speed = 0.2,
  colors = ["#C8FF00", "#F0F2F5", "#081C30"],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) {
      return;
    }

    const selectedColors =
      colors.filter(Boolean).length > 0
        ? colors.filter(Boolean).slice(0, 8)
        : ["#C8FF00", "#F0F2F5", "#081C30"];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    let frame = 0;
    let visible = true;
    let startedAt = performance.now();
    let width = 1;
    let height = 1;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawRibbon = (
      color: string,
      colorIndex: number,
      pass: number,
      elapsed: number,
    ) => {
      const { red, green, blue } = toRgb(color);
      const colorPhase = colorIndex * 1.7 + pass * 0.42;
      const passOffset =
        (pass - (Math.max(1, iterations) - 1) / 2) *
        height *
        0.035;
      const amplitude =
        height *
        (0.17 + Math.min(Math.max(warpStrength, 0), 2) * 0.055);
      const lineWidth =
        Math.max(34, height * (0.075 + bandWidth * 0.008)) /
        Math.max(scale, 0.35);
      const opacity = Math.min(
        0.8,
        (0.24 + intensity * 0.12) / Math.max(1, iterations * 0.68),
      );

      context.beginPath();

      for (let step = 0; step <= 56; step += 1) {
        const progress = step / 56;
        const x = -width * 0.2 + progress * width * 1.4;
        const wave =
          Math.sin(
            progress * Math.PI * 2 * frequency +
              elapsed * speed * 2.2 +
              colorPhase,
          ) *
            amplitude +
          Math.cos(
            progress * Math.PI * 3.4 -
              elapsed * speed * 1.35 +
              colorPhase,
          ) *
            amplitude *
            0.38;
        const y =
          height * (0.46 + colorIndex * 0.08) +
          wave +
          passOffset +
          pointerCurrent.y * mouseInfluence * height * 0.07;
        const shiftedX =
          x + pointerCurrent.x * parallax * width * 0.055;

        if (step === 0) {
          context.moveTo(shiftedX, y);
        } else {
          context.lineTo(shiftedX, y);
        }
      }

      const gradient = context.createLinearGradient(
        -width * 0.1,
        0,
        width * 1.1,
        0,
      );
      gradient.addColorStop(
        0,
        `rgb(${red} ${green} ${blue} / 0)`,
      );
      gradient.addColorStop(
        0.2,
        `rgb(${red} ${green} ${blue} / ${opacity})`,
      );
      gradient.addColorStop(
        0.72,
        `rgb(${red} ${green} ${blue} / ${opacity})`,
      );
      gradient.addColorStop(
        1,
        `rgb(${red} ${green} ${blue} / 0)`,
      );

      context.strokeStyle = gradient;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    };

    const render = (timestamp: number) => {
      frame = 0;

      if (!visible) {
        return;
      }

      const elapsed = reducedMotion ? 0 : (timestamp - startedAt) / 1000;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.055;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.055;

      context.save();
      context.setTransform(
        canvas.width / width,
        0,
        0,
        canvas.height / height,
        0,
        0,
      );
      context.clearRect(0, 0, width, height);

      if (!transparent) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
      }

      context.translate(width / 2, height / 2);
      context.rotate(
        ((rotation + autoRotate * elapsed) * Math.PI) / 180,
      );
      context.translate(-width / 2, -height / 2);
      context.globalCompositeOperation = "screen";
      context.filter = `blur(${Math.max(12, height * 0.045)}px)`;

      selectedColors.forEach((color, colorIndex) => {
        for (
          let pass = 0;
          pass < Math.max(1, Math.min(4, Math.round(iterations)));
          pass += 1
        ) {
          drawRibbon(color, colorIndex, pass, elapsed);
        }
      });

      context.filter = "none";

      if (noise > 0) {
        context.globalCompositeOperation = "source-over";
        context.globalAlpha = Math.min(0.08, noise * 0.18);
        context.fillStyle = "#F0F2F5";

        for (let index = 0; index < 90; index += 1) {
          const seed = index * 97.13;
          const x =
            ((Math.sin(seed) * 43758.5453) % 1 + 1) % 1;
          const y =
            ((Math.cos(seed * 1.37) * 24634.6345) % 1 + 1) % 1;
          context.fillRect(x * width, y * height, 1, 1);
        }
      }

      context.restore();

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const startRendering = () => {
      if (!frame) {
        startedAt = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointerTarget.x =
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1;
      pointerTarget.y =
        ((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1;
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();

      if (reducedMotion) {
        startRendering();
      }
    });
    resizeObserver.observe(container);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;

        if (visible) {
          startRendering();
        } else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "160px" },
    );
    visibilityObserver.observe(container);

    if (!reducedMotion) {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    startRendering();

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    autoRotate,
    bandWidth,
    colors,
    frequency,
    intensity,
    iterations,
    mouseInfluence,
    noise,
    parallax,
    rotation,
    scale,
    speed,
    transparent,
    warpStrength,
  ]);

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className={`size-full overflow-hidden ${className}`}
      style={{
        backgroundColor: transparent ? "transparent" : "#000000",
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
