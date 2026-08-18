"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function LogoReveal() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [interacting, setInteracting] = useState(false);
  const [size, setSize] = useState({ w: 560, h: 260 });

  // Cursor position that drives the reveal, in pixels relative to the mark.
  const mx = useMotionValue(size.w / 2);
  const my = useMotionValue(size.h / 2);
  const smx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  const radius = useMotionValue(0);
  const sRadius = useSpring(radius, { stiffness: 120, damping: 22 });

  const rotX = useSpring(0, { stiffness: 120, damping: 16 });
  const rotY = useSpring(0, { stiffness: 120, damping: 16 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${sRadius}px at ${smx}px ${smy}px, transparent 0%, transparent 55%, white 100%)`;
  const glowImage = useMotionTemplate`radial-gradient(circle ${sRadius}px at ${smx}px ${smy}px, rgba(217,195,171,0.9) 0%, rgba(232,80,2,0.55) 40%, transparent 75%)`;

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

  useEffect(() => {
    if (reduceMotion) return;
    let raf: number;
    let cancelled = false;

    if (!interacting) {
      const start = performance.now();
      const loop = (t: number) => {
        if (cancelled) return;
        const elapsed = (t - start) / 1000;
        const cx = size.w / 2 + Math.cos(elapsed * 0.5) * size.w * 0.28;
        const cy = size.h / 2 + Math.sin(elapsed * 0.7) * size.h * 0.3;
        mx.set(cx);
        my.set(cy);
        radius.set(Math.max(size.w, size.h) * 0.32);
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
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    mx.set(px);
    my.set(py);
    radius.set(Math.max(rect.width, rect.height) * 0.4);

    const offsetX = px / rect.width - 0.5;
    const offsetY = py / rect.height - 0.5;
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
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="container-lumi grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <Eyebrow>Identidade</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Uma marca com profundidade.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Assim como nossas produções, nossa identidade muda conforme o
            olhar se aproxima. Por fora, precisão e acabamento metálico. Por
            dentro, cor, sensibilidade e histórias.
          </p>
          <p className="mt-4 max-w-md text-sm text-paper/40">
            Aproxime o cursor — ou o dedo, no toque — do símbolo ao lado.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={wrapRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            className="relative mx-auto w-full max-w-xl touch-none select-none"
            style={{ aspectRatio: "556 / 259", perspective: 1000 }}
            role="img"
            aria-label="Símbolo do StudioLumi, um infinito cromado que revela cor ao ser tocado pelo cursor"
          >
            <motion.div
              style={{
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: "preserve-3d",
              }}
              className="relative h-full w-full"
            >
              <motion.div
                aria-hidden
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: glowImage, opacity: 0.55 }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-mark-color.png"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain"
              />

              <motion.img
                src="/brand/logo-mark.png"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain"
                style={{ maskImage, WebkitMaskImage: maskImage }}
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
