"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { INFINITY_PATH } from "./LogoMark";
import { cn } from "@/lib/utils";

const VB_W = 160;
const VB_H = 80;

export function InteractiveLogo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [interacting, setInteracting] = useState(false);
  const [size, setSize] = useState({ w: 240, h: 120 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mx = useMotionValue(size.w / 2);
  const my = useMotionValue(size.h / 2);
  const smx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  const radius = useMotionValue(0);
  const sRadius = useSpring(radius, { stiffness: 120, damping: 22 });

  const rotX = useSpring(0, { stiffness: 120, damping: 16 });
  const rotY = useSpring(0, { stiffness: 120, damping: 16 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${sRadius}px at ${smx}px ${smy}px, transparent 0%, transparent 55%, white 100%)`;
  const glowOpacity = useMotionTemplate`radial-gradient(circle ${sRadius}px at ${smx}px ${smy}px, rgba(217,195,171,0.9) 0%, rgba(232,80,2,0.55) 40%, transparent 75%)`;

  useEffect(() => {
    if (reduceMotion) return;
    let raf: number;
    let cancelled = false;

    if (!interacting) {
      const start = performance.now();
      const loop = (t: number) => {
        if (cancelled) return;
        const elapsed = (t - start) / 1000;
        const cx = size.w / 2 + Math.cos(elapsed * 0.5) * size.w * 0.29;
        const cy = size.h / 2 + Math.sin(elapsed * 0.7) * size.h * 0.28;
        mx.set(cx);
        my.set(cy);
        radius.set(Math.min(size.w, size.h) * 0.45);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [interacting, reduceMotion, mx, my, radius, size]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    mx.set(px * rect.width);
    my.set(py * rect.height);
    radius.set(Math.max(rect.width, rect.height) * 0.6);

    const offsetX = px - 0.5;
    const offsetY = py - 0.5;
    rotY.set(offsetX * 16);
    rotX.set(-offsetY * 16);
  };

  const handlePointerEnter = () => setInteracting(true);
  const handlePointerLeave = () => {
    setInteracting(false);
    radius.set(0);
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative aspect-[2/1] touch-none select-none", className)}
      style={{ perspective: 1000 }}
      role="img"
      aria-label="Símbolo do StudioLumi, um infinito com acabamento cromado que revela cor ao ser tocado"
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-6 rounded-full blur-2xl"
          style={{ background: glowOpacity, opacity: 0.5 }}
        />

        <svg
          viewBox={`-12 -12 ${VB_W + 24} ${VB_H + 24}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="lumi-color" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="40%" stopColor="#c10801" />
              <stop offset="75%" stopColor="#f16001" />
              <stop offset="100%" stopColor="#d9c3ab" />
            </linearGradient>
          </defs>
          <path
            d={INFINITY_PATH}
            fill="none"
            stroke="url(#lumi-color)"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <motion.svg
          viewBox={`-12 -12 ${VB_W + 24} ${VB_H + 24}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          aria-hidden
        >
          <defs>
            <linearGradient id="lumi-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b8b8b" />
              <stop offset="18%" stopColor="#f4f4f4" />
              <stop offset="34%" stopColor="#6c6c6c" />
              <stop offset="50%" stopColor="#e8e8e8" />
              <stop offset="66%" stopColor="#5c5c5c" />
              <stop offset="82%" stopColor="#f4f4f4" />
              <stop offset="100%" stopColor="#8b8b8b" />
            </linearGradient>
            <linearGradient id="lumi-chrome-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="55%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d={INFINITY_PATH}
            fill="none"
            stroke="url(#lumi-chrome)"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={INFINITY_PATH}
            fill="none"
            stroke="url(#lumi-chrome-sheen)"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.55}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
