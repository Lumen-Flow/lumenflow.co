"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";

import "./color-bends.css";

const MAX_COLORS = 8;

const fragmentShader = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(
    p.x * uRot.x - p.y * uRot.y,
    p.x * uRot.y + p.y * uRot.x
  );
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = uPointer - rp;
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(
      1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency)
    );
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;

    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.045;
      vec2 r = sin(
        1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency)
      );
      float m0 = length(
        r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0
      );
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(
        warped +
        sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0
      );
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }

    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(
      sin(
        dot(
          gl_FragCoord.xy + vec2(uTime),
          vec2(12.9898, 78.233)
        )
      ) * 43758.5453123
    );
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = uTransparent > 0 ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export type ColorBendsProps = {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  autoRotate?: number;
  speed?: number;
  colors?: readonly string[];
  transparent?: boolean;
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

function hexToVector(hex: string): THREE.Vector3 | null {
  const normalized = hex.replace("#", "").trim();

  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(normalized)) {
    return null;
  }

  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character.repeat(2))
          .join("")
      : normalized;

  return new THREE.Vector3(
    Number.parseInt(expanded.slice(0, 2), 16) / 255,
    Number.parseInt(expanded.slice(2, 4), 16) / 255,
    Number.parseInt(expanded.slice(4, 6), 16) / 255,
  );
}

export function ColorBends({
  className = "",
  style,
  rotation = 90,
  autoRotate = 0,
  speed = 0.2,
  colors = [],
  transparent = true,
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

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      });
    } catch {
      container.dataset.webgl = "unavailable";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const colorUniforms = Array.from(
      { length: MAX_COLORS },
      () => new THREE.Vector3(),
    );
    const palette = colors
      .map(hexToVector)
      .filter((color): color is THREE.Vector3 => color !== null)
      .slice(0, MAX_COLORS);

    palette.forEach((color, index) => {
      colorUniforms[index].copy(color);
    });

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: palette.length },
        uColors: { value: colorUniforms },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2() },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uIterations: { value: Math.min(Math.max(iterations, 1), 5) },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth },
      },
      premultipliedAlpha: true,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const pointerTarget = new THREE.Vector2();
    const pointerCurrent = new THREE.Vector2();
    const timer = new THREE.Timer();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frameId: number | null = null;

    scene.add(mesh);
    timer.connect(document);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      renderer.setSize(width, height, false);
      material.uniforms.uCanvas.value.set(width, height);
      renderer.render(scene, camera);
    };

    const updateRotation = (elapsed: number) => {
      const degrees = (rotation % 360) + autoRotate * elapsed;
      const radians = THREE.MathUtils.degToRad(degrees);

      material.uniforms.uRot.value.set(Math.cos(radians), Math.sin(radians));
    };

    const renderFrame = (timestamp: number) => {
      timer.update(timestamp);
      const delta = timer.getDelta();
      const elapsed = timer.getElapsed();
      const pointerLerp = Math.min(1, delta * 8);

      pointerCurrent.lerp(pointerTarget, pointerLerp);
      material.uniforms.uPointer.value.copy(pointerCurrent);
      material.uniforms.uTime.value = elapsed;
      updateRotation(elapsed);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / (bounds.width || 1)) * 2 - 1;
      const y = -((event.clientY - bounds.top) / (bounds.height || 1)) * 2 + 1;

      pointerTarget.set(x, y);
    };

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(resize) : null;

    if (resizeObserver) {
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    if (!reducedMotion) {
      container.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    resize();
    updateRotation(0);

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      timer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
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
      ref={containerRef}
      className={`color-bends-container ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}
