"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Segment = { text: string; accent?: boolean };

export function ScrollWords({ segments, className }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words = segments.flatMap((seg) =>
    seg.text.split(" ").filter(Boolean).map((w) => ({ w, accent: seg.accent }))
  );

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={word.accent}
          still={!!reduceMotion}
        >
          {word.w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={still ? undefined : { opacity }}
      className={cn("mr-[0.25em]", accent && "text-orange-bright")}
    >
      {children}
    </motion.span>
  );
}
