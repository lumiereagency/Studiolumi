"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./LogoMark";
import { ReelPattern, type ReelCategory } from "./ReelPatterns";

/**
 * High-performance 3D "cylinder" carousel for 9:16 reels. Cards sit on a
 * continuous circular timeline (`progress`) and are positioned every frame
 * with direct DOM writes (no React re-render, no animation library) so the
 * whole thing stays smooth at 60fps. The math is a horizontal adaptation of
 * a vertical coverflow rig: same magnetic-snap easing and perspective-exact
 * edge alignment, translateX/rotateY in place of translateY/rotateX.
 */

const GAP = 26;
const PEEK = -36;
const PERSPECTIVE = 1350;
const THICKNESS = [-1.2, -0.6, 0, 0.6, 1.2];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function computeMetrics(vw: number, vh: number) {
  let cardH = vh * 0.52;
  cardH = Math.min(560, Math.max(260, cardH));
  let cardW = (cardH * 9) / 16;
  const maxW = vw * 0.56;
  if (cardW > maxW) {
    cardW = maxW;
    cardH = (cardW * 16) / 9;
  }
  cardW = Math.max(150, cardW);
  cardH = (cardW * 16) / 9;
  return { cardW: Math.round(cardW), cardH: Math.round(cardH) };
}

export function CardCylinder({ categories }: { categories: ReelCategory[] }) {
  const count = categories.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef(0);

  const progress = useRef(0);
  const targetProgress = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const reduceMotion = useRef(false);
  const running = useRef(false);
  const wake = useRef<() => void>(() => {});

  const [metrics, setMetrics] = useState({ cardW: 220, cardH: 391 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onResize = () => setMetrics(computeMetrics(window.innerWidth, window.innerHeight));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nearestEquivalent = (index: number, current: number) => {
    let best = index;
    let bestDist = Infinity;
    for (let k = -1; k <= 1; k++) {
      const candidate = index + k * count;
      const dist = Math.abs(candidate - current);
      if (dist < bestDist) {
        bestDist = dist;
        best = candidate;
      }
    }
    return best;
  };

  const goTo = (index: number) => {
    targetProgress.current = nearestEquivalent(index, targetProgress.current);
    wake.current();
  };
  const step = (dir: 1 | -1) => {
    targetProgress.current = Math.round(targetProgress.current) + dir;
    wake.current();
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const PROGRESS_EPS = 0.0006;
    const MOUSE_EPS = 0.001;
    const activeRef = { current: active };

    const render = () => {
      const settleRate = reduceMotion.current ? 1 : 0.14;
      if (dragging.current) {
        // progress already tracks the pointer 1:1 — nothing to settle.
      } else if (Math.abs(targetProgress.current - progress.current) < PROGRESS_EPS) {
        progress.current = targetProgress.current;
      } else {
        progress.current += (targetProgress.current - progress.current) * settleRate;
      }

      if (Math.abs(mouse.current.targetX - mouse.current.x) < MOUSE_EPS) {
        mouse.current.x = mouse.current.targetX;
      } else {
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      }
      if (Math.abs(mouse.current.targetY - mouse.current.y) < MOUSE_EPS) {
        mouse.current.y = mouse.current.targetY;
      } else {
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;
      }

      const cards = cardRefs.current;
      const vw = window.innerWidth;
      const { cardW } = metrics;

      const continuousProgress = progress.current;
      const roundedIndex = Math.round(continuousProgress);
      const diffFromRound = continuousProgress - roundedIndex;
      const easedDiff =
        Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
      const virtualActiveIndex = roundedIndex + easedDiff;

      let normalizedActive = roundedIndex % count;
      if (normalizedActive < 0) normalizedActive += count;
      if (normalizedActive !== activeRef.current) {
        activeRef.current = normalizedActive;
        setActive(normalizedActive);
      }

      for (let i = 0; i < count; i++) {
        const card = cards[i];
        if (!card) continue;

        let offset = i - virtualActiveIndex;
        const half = count / 2;
        while (offset > half) offset -= count;
        while (offset < -half) offset += count;

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        if (absOffset > 3.0) {
          card.style.visibility = "hidden";
          continue;
        }
        card.style.visibility = "visible";

        const D = PERSPECTIVE;
        let x = 0;
        let z = 0;
        let rot = 0;

        if (absOffset <= 1) {
          const t = absOffset;
          const eT = smoothstep(t);
          const target = cardW + GAP;
          x = -sign * eT * target;
          z = 400 + eT * (220 - 400);
          rot = eT * 132;
        } else if (absOffset <= 2) {
          const t = absOffset - 1;
          const eT = smoothstep(t);
          const xStart = cardW + GAP;
          const zStart = 220;
          const rotStart = 132;
          const zEnd = -60;
          const rotEnd = 175;
          const sEnd = D / (D - zEnd);
          const xEnd = (vw / 2 - PEEK) / sEnd - cardW / 2;
          const current = xStart + eT * (xEnd - xStart);
          x = -sign * current;
          z = zStart + eT * (zEnd - zStart);
          rot = rotStart + eT * (rotEnd - rotStart);
        } else {
          const t = Math.min(absOffset - 2, 1);
          const eT = smoothstep(t);
          const zStart = -60;
          const rotStart = 175;
          const zEnd3 = -250;
          const rotEnd3 = 195;
          const sEnd2 = D / (D - zStart);
          const xEnd2 = (vw / 2 - PEEK) / sEnd2 - cardW / 2;
          const sEnd3 = D / (D - zEnd3);
          const xEnd3 = (vw / 2 + 100) / sEnd3 + cardW / 2;
          const current = xEnd2 + eT * (xEnd3 - xEnd2);
          x = -sign * current;
          z = zStart + eT * (zEnd3 - zStart);
          rot = rotStart + eT * (rotEnd3 - rotStart);
        }

        const localRotY = -sign * rot;
        const centerFactor = Math.max(0, 1 - absOffset);

        const maxTiltY = 14;
        const maxTiltX = 10;
        const activeTiltY = mouse.current.x * maxTiltY * centerFactor;
        const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;

        const totalRotY = localRotY + activeTiltY;
        const totalRotX = activeTiltX;

        card.style.zIndex = Math.round(z).toString();
        card.style.opacity = "1";
        card.style.transform = `translateX(${x.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateY(${totalRotY.toFixed(2)}deg) rotateX(${totalRotX.toFixed(2)}deg)`;
      }

      const settled =
        !dragging.current &&
        progress.current === targetProgress.current &&
        mouse.current.x === mouse.current.targetX &&
        mouse.current.y === mouse.current.targetY;

      if (settled) {
        running.current = false;
      } else {
        frameId.current = requestAnimationFrame(render);
      }
    };

    wake.current = () => {
      // Always cancel + reschedule fresh rather than gating on `running`: a
      // stale in-flight frame could be one tick from declaring itself
      // settled, and a boolean guard can't tell that apart from a genuinely
      // running loop. This coalesces bursts (e.g. rapid mousemove) into the
      // latest scheduled frame and can never leave the loop stuck idle.
      running.current = true;
      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(render);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartProgress.current = progress.current;
      stage.setPointerCapture(e.pointerId);
      wake.current();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const deltaPx = e.clientX - dragStartX.current;
      const cardSpan = metrics.cardW + GAP;
      const next = dragStartProgress.current - deltaPx / cardSpan;
      progress.current = next;
      targetProgress.current = next;
    };
    const endDrag = () => {
      if (!dragging.current) return;
      dragging.current = false;
      targetProgress.current = Math.round(targetProgress.current);
      wake.current();
    };
    const onWheel = (e: WheelEvent) => {
      // Only hijack the gesture when it's clearly horizontal (trackpad swipe,
      // shift+wheel). A dominant vertical delta is the visitor trying to
      // scroll the page past this section — let it through untouched, or
      // hovering over the carousel silently blocks all page scrolling.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const clamped = Math.max(-60, Math.min(60, e.deltaX));
      targetProgress.current += clamped / 260;
      wake.current();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (reduceMotion.current) return;
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
      wake.current();
    };
    const onMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
      wake.current();
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    wake.current();

    return () => {
      cancelAnimationFrame(frameId.current);
      running.current = false;
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
    // `active` is intentionally read via activeRef, not closed over — depending
    // on it would tear down and rebuild the rAF loop and every listener on
    // each card change, which is exactly the per-frame churn this is meant to avoid.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics, count]);

  return (
    <div className="flex flex-col items-center gap-7">
    <div
      ref={stageRef}
      className="relative w-full touch-pan-y select-none outline-none"
      style={{
        // The centered card sits at translateZ(400) — with perspective 1350 that's
        // ~1.42x foreshortening, so its visual footprint is well past cardH. Reserve
        // real clearance here or its enlarged bottom edge covers the controls below.
        height: metrics.cardH * 1.5 + 40,
        perspective: PERSPECTIVE,
        isolation: "isolate",
        // Off-stage cards sit way outside the stage's own box (that's the point of
        // a coverflow) — without clipping, they were widening the whole document
        // and the page would drift sideways on any scroll gesture with a horizontal
        // component (trackpads especially).
        overflow: "hidden",
      }}
      tabIndex={0}
      role="region"
      aria-label="Carrossel de produções em vídeo. Use as setas do teclado, arraste ou role para navegar."
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: metrics.cardW,
          height: metrics.cardH,
          transform: "translate(-50%, -50%)",
          transformStyle: "preserve-3d",
        }}
      >
        {categories.map((category, i) => (
          <div
            key={category.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => goTo(i)}
          >
            {THICKNESS.map((zOffset, layerIdx) => {
              const isFront = layerIdx === THICKNESS.length - 1;
              const isBack = layerIdx === 0;

              if (!isFront && !isBack) {
                return (
                  <div
                    key={layerIdx}
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-gray-dark"
                    style={{ transform: `translateZ(${zOffset}px)` }}
                  />
                );
              }

              if (isFront) {
                return (
                  <div
                    key={layerIdx}
                    className="absolute inset-0 overflow-hidden rounded-2xl border border-line-strong bg-ink-soft"
                    style={{
                      transform: `translateZ(${zOffset}px)`,
                      backfaceVisibility: "hidden",
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12)",
                    }}
                  >
                    {category.videoSrc ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={category.videoSrc}
                        poster={category.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                      />
                    ) : (
                      <ReelPattern pattern={category.pattern} />
                    )}

                    <div className="grain absolute inset-0 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                    <LogoMark className="absolute right-4 top-4 h-4 w-8 text-paper/70" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-paper/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display mt-1 text-lg font-medium text-paper">
                        {category.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-paper/60">{category.tagline}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={layerIdx}
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-line-strong bg-ink-soft"
                  style={{
                    transform: `translateZ(${zOffset}px) rotateY(180deg)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    className="absolute inset-0 scale-110"
                    style={{ filter: "blur(18px) brightness(0.5)" }}
                  >
                    {category.videoSrc ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={category.videoSrc}
                        poster={category.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                      />
                    ) : (
                      <ReelPattern pattern={category.pattern} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <LogoMark className="h-5 w-10 text-paper/80" />
                    <span className="text-[10px] uppercase tracking-[0.24em] text-paper/60">
                      {category.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Item anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {categories.map((category, i) => (
            <button
              key={category.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para ${category.label}`}
              aria-current={i === active}
              className={
                i === active
                  ? "h-1.5 w-6 rounded-full bg-orange-bright transition-all"
                  : "h-1.5 w-1.5 rounded-full bg-line-strong transition-all hover:bg-paper/40"
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Próximo item"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
        >
          →
        </button>
      </div>
    </div>
  );
}
