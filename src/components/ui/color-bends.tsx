"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";

export type ColorBendsProps = {
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
  blur?: number;
};

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
  uniform float uPixelRatio;
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
        1.5 * (q.yx * uFrequency) +
        2.0 * cos(q * uFrequency)
      );

      q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float alpha = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;

      for (int i = 0; i < MAX_COLORS; ++i) {
        if (i >= uColorCount) break;

        s -= 0.01;

        vec2 r = sin(
          1.5 * (s.yx * uFrequency) +
          2.0 * cos(s * uFrequency)
        );

        float m0 = length(
          r +
          sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0
        );

        float kBelow = clamp(uWarpStrength, 0.0, 1.0);
        float kMix = pow(kBelow, 0.3);
        float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 displacement = (r - s) * kBelow;
        vec2 warped = s + displacement * gain;

        float m1 = length(
          warped +
          sin(
            5.0 * warped.y * uFrequency -
            3.0 * t +
            float(i)
          ) / 4.0
        );

        float m = mix(m0, m1, kMix);
        float weight =
          1.0 - exp(-uBandWidth / exp(uBandWidth * m));

        sumCol += uColors[i] * weight;
        cover = max(cover, weight);
      }

      col = clamp(sumCol, 0.0, 1.0);
      alpha = uTransparent > 0 ? cover : 1.0;
    } else {
      vec2 s = q;

      for (int k = 0; k < 3; ++k) {
        s -= 0.01;

        vec2 r = sin(
          1.5 * (s.yx * uFrequency) +
          2.0 * cos(s * uFrequency)
        );

        float m0 = length(
          r +
          sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0
        );

        float kBelow = clamp(uWarpStrength, 0.0, 1.0);
        float kMix = pow(kBelow, 0.3);
        float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 displacement = (r - s) * kBelow;
        vec2 warped = s + displacement * gain;

        float m1 = length(
          warped +
          sin(
            5.0 * warped.y * uFrequency -
            3.0 * t +
            float(k)
          ) / 4.0
        );

        float m = mix(m0, m1, kMix);
        col[k] =
          1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      }

      alpha =
        uTransparent > 0
          ? max(max(col.r, col.g), col.b)
          : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {
      vec2 noiseCoordinate =
        floor(gl_FragCoord.xy / max(uPixelRatio, 1.0));

      float grain = fract(
        sin(
          dot(
            noiseCoordinate + vec2(uTime),
            vec2(12.9898, 78.233)
          )
        ) * 43758.5453123
      );

      col += (grain - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = uTransparent > 0 ? col * alpha : col;
    gl_FragColor = vec4(rgb, alpha);
  }
`;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function toThreeColor(value: string) {
  const color = new THREE.Color(value);
  return new THREE.Vector3(color.r, color.g, color.b);
}

export function ColorBends({
  className = "",
  style,
  rotation = 90,
  speed = 0.2,
  colors = [],
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
  blur = 0,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const frameRef = useRef<number>(null);
  const resizeObserverRef = useRef<ResizeObserver>(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniformColors = Array.from(
      { length: MAX_COLORS },
      () => new THREE.Vector3(0, 0, 0),
    );

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uniformColors },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uPixelRatio: { value: 1 },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth },
      },
      premultipliedAlpha: true,
      transparent: true,
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: true,
    });

    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, transparent ? 0 : 1);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.transformOrigin = "center";
    canvas.style.backfaceVisibility = "hidden";
    canvas.style.willChange = "filter, transform";

    container.appendChild(canvas);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      material.uniforms.uCanvas.value.set(width, height);
      material.uniforms.uPixelRatio.value = pixelRatio;
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resizeObserverRef.current = observer;

    const clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      const degrees =
        (rotationRef.current % 360) +
        autoRotateRef.current * elapsed;
      const radians = (degrees * Math.PI) / 180;

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uRot.value.set(
        Math.cos(radians),
        Math.sin(radians),
      );

      pointerCurrentRef.current.lerp(
        pointerTargetRef.current,
        Math.min(1, delta * 8),
      );

      material.uniforms.uPointer.value.copy(
        pointerCurrentRef.current,
      );

      renderer.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(render);
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      resizeObserverRef.current?.disconnect();

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }

      rendererRef.current = null;
      materialRef.current = null;
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;

    if (!material) {
      return;
    }

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;

    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;
    material.uniforms.uIterations.value = iterations;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uBandWidth.value = bandWidth;

    const activeColors = colors
      .filter(Boolean)
      .slice(0, MAX_COLORS)
      .map(toThreeColor);
    const uniformColors = material.uniforms.uColors
      .value as THREE.Vector3[];

    for (let index = 0; index < MAX_COLORS; index += 1) {
      if (activeColors[index]) {
        uniformColors[index].copy(activeColors[index]);
      } else {
        uniformColors[index].set(0, 0, 0);
      }
    }

    material.uniforms.uColorCount.value = activeColors.length;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    renderer?.setClearColor(0x000000, transparent ? 0 : 1);
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

  useEffect(() => {
    const canvas = rendererRef.current?.domElement;

    if (!canvas) {
      return;
    }

    const safeBlur = Math.max(0, blur);
    const filter = safeBlur > 0 ? `blur(${safeBlur}px)` : "none";
    const overscan = 1 + Math.min(safeBlur / 180, 0.2);

    canvas.style.filter = filter;
    canvas.style.setProperty("-webkit-filter", filter);
    canvas.style.transform =
      safeBlur > 0
        ? `translateZ(0) scale(${overscan})`
        : "translateZ(0)";
  }, [blur]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const x =
        ((event.clientX - bounds.left) /
          Math.max(bounds.width, 1)) *
          2 -
        1;
      const y = -(
        ((event.clientY - bounds.top) /
          Math.max(bounds.height, 1)) *
          2 -
        1
      );

      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      container.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full overflow-hidden ${className}`}
      style={style}
    />
  );
}

export default ColorBends;
