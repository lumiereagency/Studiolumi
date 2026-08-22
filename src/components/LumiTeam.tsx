"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

type Member = {
  id: string;
  role: string;
  icon: "crown" | "star" | "pen" | "video" | "camera" | "book";
  pattern: string;
};

const TEAM: Member[] = [
  {
    id: "founder",
    role: "Fundador & CEO",
    icon: "crown",
    pattern: "linear-gradient(135deg, #000 0%, #c10801 55%, #f16001 100%)",
  },
  {
    id: "cofounder",
    role: "Cofundadora",
    icon: "star",
    pattern: "linear-gradient(135deg, #0c0a09 0%, #333333 60%, #d9c3ab 130%)",
  },
  {
    id: "copywriter",
    role: "Copywriter",
    icon: "pen",
    pattern: "linear-gradient(135deg, #000 0%, #e85002 70%, #d9c3ab 140%)",
  },
  {
    id: "videomaker",
    role: "Videomaker",
    icon: "video",
    pattern: "linear-gradient(135deg, #100906 0%, #f16001 80%, transparent 130%)",
  },
  {
    id: "photographer",
    role: "Fotógrafa",
    icon: "camera",
    pattern: "linear-gradient(135deg, #0a0d0a 0%, #333333 55%, #d9c3ab 140%)",
  },
  {
    id: "storymaker",
    role: "Storymaker",
    icon: "book",
    pattern: "linear-gradient(135deg, #000 0%, #c10801 40%, #f16001 90%, #d9c3ab 140%)",
  },
];

/** Fanned-deck offsets by distance behind the front card (depth 0 = front). */
const FAN_STEPS = [
  { rotate: 0, x: 0, y: 0, scale: 1 },
  { rotate: 6, x: 16, y: -10, scale: 0.96 },
  { rotate: -7, x: -22, y: -18, scale: 0.92 },
  { rotate: 10, x: 30, y: -26, scale: 0.88 },
  { rotate: -11, x: -36, y: -34, scale: 0.84 },
  { rotate: 13, x: 42, y: -42, scale: 0.8 },
];

function RoleIcon({ icon, className }: { icon: Member["icon"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "crown":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L12 3z" />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" />
          <path d="M14 6l3 3" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="M16 10l5-3v10l-5-3" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
          <circle cx="12" cy="13" r="3.4" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M4 5c2-1 5-1 7 0v14c-2-1-5-1-7 0V5z" />
          <path d="M20 5c-2-1-5-1-7 0v14c2-1 5-1 7 0V5z" />
        </svg>
      );
  }
}

function TeamCard({
  member,
  depth,
  count,
  onOpen,
  hidden,
}: {
  member: Member;
  depth: number;
  count: number;
  onOpen: () => void;
  hidden: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const step = FAN_STEPS[depth] ?? FAN_STEPS[FAN_STEPS.length - 1];

  return (
    <motion.button
      type="button"
      layoutId={`team-card-${member.id}`}
      onClick={onOpen}
      animate={{
        x: step.x,
        y: step.y,
        rotate: reduceMotion ? 0 : step.rotate,
        scale: step.scale,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        zIndex: count - depth,
        pointerEvents: hidden ? "none" : "auto",
      }}
      className="absolute left-1/2 top-1/2 h-[280px] w-[158px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-strong shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] focus-visible:outline-none sm:h-[340px] sm:w-[191px] md:h-[400px] md:w-[225px]"
      aria-label={`Ver ${member.role}`}
    >
      <div className="absolute inset-0" style={{ background: member.pattern }} />
      <div className="grain absolute inset-0 opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-paper/20 md:h-10 md:w-10" aria-hidden>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm md:left-3 md:top-3">
        <RoleIcon icon={member.icon} className="h-3 w-3 text-orange-bright md:h-3.5 md:w-3.5" />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 md:p-3.5">
        <p className="font-display text-xs font-medium leading-tight text-paper md:text-sm">{member.role}</p>
      </div>
    </motion.button>
  );
}

export function LumiTeam() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = TEAM.length;
  const active = TEAM.find((m) => m.id === activeId) ?? null;

  useEffect(() => {
    if (reduceMotion || activeId) return;
    const id = setInterval(() => {
      setFrontIndex((i) => (i + 1) % count);
    }, 3200);
    return () => clearInterval(id);
  }, [reduceMotion, activeId, count]);

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Lumi Team</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            As pessoas por trás de cada produção.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg">
            Direção, imagem e estratégia com nomes e funções bem definidas. Toque em cada card para conhecer o time.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 h-[340px] max-w-5xl sm:h-[400px] md:mt-20 md:h-[460px]">
        {TEAM.map((member, i) => {
          const depth = (i - frontIndex + count) % count;
          return (
            <TeamCard
              key={member.id}
              member={member}
              depth={depth}
              count={count}
              hidden={activeId === member.id}
              onOpen={() => setActiveId(member.id)}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 z-40 bg-ink/80 backdrop-blur-md"
              onClick={() => setActiveId(null)}
              aria-hidden
            />
            <motion.div
              layoutId={`team-card-${active.id}`}
              transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute left-1/2 top-1/2 z-50 h-[400px] w-[225px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:h-[498px] sm:w-[280px]"
              role="dialog"
              aria-label={active.role}
            >
              <div className="absolute inset-0" style={{ background: active.pattern }} />
              <div className="grain absolute inset-0 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16 text-paper/20" aria-hidden>
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-paper backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                ×
              </button>
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                <RoleIcon icon={active.icon} className="h-3.5 w-3.5 text-orange-bright" />
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-paper/40">Em breve</span>
                <p className="font-display mt-1 text-xl font-medium text-paper">{active.role}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
