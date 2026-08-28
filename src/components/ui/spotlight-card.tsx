"use client";

import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * React Bits' Spotlight Card pattern: a radial glow that tracks the cursor,
 * revealed on hover. Position is written straight to CSS custom properties
 * on the node (no React re-render per mousemove frame).
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(241, 96, 1, 0.16)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group relative overflow-hidden", className)}
      style={{ "--spotlight-color": spotlightColor } as CSSProperties}
    >
      {!reduceMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-color), transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
