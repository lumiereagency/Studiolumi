"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./LogoMark";

/**
 * Auto-advancing 9:16 coverflow for UGC creators. Same rig family as
 * CardCylinder (magnetic-snap easing, perspective-exact edge alignment,
 * direct DOM writes per frame) but a slow autoplay drift instead of a
 * resting idle state, since this one is meant to keep turning on its own
 * until a visitor steps in.
 */

const GAP = 26;
const PEEK = -36;
const PERSPECTIVE = 1350;
const THICKNESS = [-1.2, -0.6, 0, 0.6, 1.2];
const AUTOPLAY_RATE = 1 / (60 * 7); // ~1 card every 7s at 60fps

export type Creator = {
  id: string;
  name?: string;
  handle?: string;
  image?: string;
};

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

export function InfluencerCarousel({ creators }: { creators: Creator[] }) {
  const count = creators.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef(0);

  const progress = useRef(0);
  const targetProgress = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);
  const paused = useRef(false);

  const reduceMotion = useRef(false);

  const [metrics, setMetrics] = useState({ cardW: 320, cardH: 180 });
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
  };
  const step = (dir: 1 | -1) => {
    targetProgress.current = Math.round(targetProgress.current) + dir;
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const activeRef = { current: active };

    const render = () => {
      if (!dragging.current) {
        if (Math.abs(targetProgress.current - progress.current) > 0.0005) {
          progress.current += (targetProgress.current - progress.current) * 0.1;
        } else {
          progress.current = targetProgress.current;
        }
        if (!paused.current && !reduceMotion.current) {
          progress.current += AUTOPLAY_RATE;
          targetProgress.current += AUTOPLAY_RATE;
        }
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

        const totalRotY = -sign * rot;

        card.style.zIndex = Math.round(z).toString();
        card.style.opacity = "1";
        card.style.transform = `translateX(${x.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateY(${totalRotY.toFixed(2)}deg)`;
      }

      frameId.current = requestAnimationFrame(render);
    };

    frameId.current = requestAnimationFrame(render);

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true;
      paused.current = true;
      dragStartX.current = e.clientX;
      dragStartProgress.current = progress.current;
      stage.setPointerCapture(e.pointerId);
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
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      paused.current = true;
      const clamped = Math.max(-60, Math.min(60, e.deltaX));
      targetProgress.current += clamped / 260;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { paused.current = true; step(1); }
      if (e.key === "ArrowLeft") { paused.current = true; step(-1); }
    };
    const onPointerEnter = () => { paused.current = true; };
    const onPointerLeave = () => {
      if (!dragging.current) paused.current = false;
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);
    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frameId.current);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics, count]);

  return (
    <div className="flex flex-col items-center gap-7">
      <div
        ref={stageRef}
        className="relative w-full touch-pan-y select-none outline-none"
        style={{
          height: metrics.cardH * 1.5 + 40,
          perspective: PERSPECTIVE,
          isolation: "isolate",
          overflow: "hidden",
        }}
        tabIndex={0}
        role="region"
        aria-label="Carrossel de criadores UGC parceiros do StudioLumi. Arraste ou use as setas para navegar."
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(232,80,2,0.35) 0%, rgba(193,8,1,0.18) 45%, transparent 75%)",
            }}
          />
        </div>

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: metrics.cardW,
            height: metrics.cardH,
            transform: "translate(-50%, -50%)",
            transformStyle: "preserve-3d",
          }}
        >
          {creators.map((creator, i) => (
            <div
              key={creator.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => {
                paused.current = true;
                goTo(i);
              }}
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
                      {creator.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={creator.image}
                          alt={creator.name ?? ""}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#120a06]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-10 w-10 text-paper/20"
                            aria-hidden
                          >
                            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                            <path
                              d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="grain absolute inset-0 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                      <LogoMark className="absolute right-4 top-4 h-4 w-8 text-paper/70" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        {creator.name ? (
                          <>
                            <span className="text-[10px] uppercase tracking-[0.24em] text-paper/55">
                              {creator.handle}
                            </span>
                            <h3 className="font-display mt-1 text-lg font-medium text-paper">
                              {creator.name}
                            </h3>
                          </>
                        ) : (
                          <span className="text-[11px] uppercase tracking-[0.24em] text-paper/55">
                            Em breve
                          </span>
                        )}
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
                    <div className="absolute inset-0 bg-[#120a06]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <LogoMark className="h-5 w-10 text-paper/70" />
                      <span className="text-[10px] uppercase tracking-[0.24em] text-paper/50">
                        {creator.name ?? "Em breve"}
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
          onClick={() => { paused.current = true; step(-1); }}
          aria-label="Criador anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {creators.map((creator, i) => (
            <button
              key={creator.id}
              type="button"
              onClick={() => { paused.current = true; goTo(i); }}
              aria-label={`Ir para criador ${i + 1}`}
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
          onClick={() => { paused.current = true; step(1); }}
          aria-label="Próximo criador"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
        >
          →
        </button>
      </div>
    </div>
  );
}
