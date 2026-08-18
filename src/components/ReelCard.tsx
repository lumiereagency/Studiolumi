"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ReelCategory = {
  id: string;
  label: string;
  tagline: string;
  pattern: "mobile" | "camera" | "cinema" | "drone" | "brandfilm" | "social";
  /** Optional real footage — drop a video URL in when the studio's reels are ready. */
  videoSrc?: string;
  poster?: string;
  /** "vertical" footage (phone-shot) is shown full-frame on a blurred backdrop instead of being cropped to fill 16:9. */
  orientation?: "horizontal" | "vertical";
};

/**
 * Motion placeholder standing in for real footage per category. Each pattern
 * is an abstract, slow-looping composition built from gradients only — kept
 * inside the brand palette so the reel reads as one system even before real
 * video is dropped into `videoSrc`.
 */
function ReelPattern({ pattern }: { pattern: ReelCategory["pattern"] }) {
  const reduceMotion = useReducedMotion();
  const loop = (duration: number) =>
    reduceMotion
      ? undefined
      : { duration, repeat: Infinity, ease: "easeInOut" as const };

  switch (pattern) {
    case "mobile":
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#120a06]">
          <motion.div
            animate={reduceMotion ? {} : { y: [-6, 6, -6] }}
            transition={loop(4)}
            className="h-[70%] w-[34%] rounded-[1.4rem] border border-paper/15 bg-gradient-to-b from-orange/25 via-red/20 to-transparent shadow-[0_0_60px_rgba(232,80,2,0.25)]"
          />
          <motion.div
            animate={reduceMotion ? {} : { opacity: [0.15, 0.4, 0.15] }}
            transition={loop(3)}
            className="absolute h-[76%] w-[38%] rounded-[1.6rem] border border-orange-bright/30"
          />
        </div>
      );
    case "camera":
      return (
        <div className="absolute inset-0 bg-[#0e0a08]">
          <motion.div
            animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
            transition={loop(9)}
            className="absolute inset-[-10%]"
            style={{
              background:
                "radial-gradient(45% 60% at 40% 50%, rgba(232,80,2,0.35) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper/10" />
          </div>
          <motion.div
            animate={reduceMotion ? {} : { rotate: [0, 6, 0] }}
            transition={loop(7)}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/25"
          />
        </div>
      );
    case "cinema":
      return (
        <div className="absolute inset-0 bg-black">
          <motion.div
            animate={reduceMotion ? {} : { scale: [1.04, 1, 1.04] }}
            transition={loop(12)}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(0,0,0,0.9) 0%, rgba(193,8,1,0.28) 45%, rgba(217,195,171,0.18) 75%, rgba(0,0,0,0.95) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[16%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[16%] bg-black" />
        </div>
      );
    case "drone":
      return (
        <div className="absolute inset-0 bg-[#0a0d0a]">
          <motion.div
            animate={reduceMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, 2, 0] }}
            transition={loop(14)}
            className="absolute inset-[-20%]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(249,249,249,0.05) 0px, rgba(249,249,249,0.05) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(90deg, rgba(249,249,249,0.05) 0px, rgba(249,249,249,0.05) 1px, transparent 1px, transparent 42px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 45%, rgba(217,195,171,0.18) 0%, transparent 70%)",
            }}
          />
        </div>
      );
    case "brandfilm":
      return (
        <div className="absolute inset-0 bg-[#100906]">
          <motion.div
            animate={reduceMotion ? {} : { x: ["-10%", "10%", "-10%"] }}
            transition={loop(10)}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, rgba(241,96,1,0.3) 45%, rgba(193,8,1,0.2) 55%, transparent 100%)",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-px w-[60%] -translate-x-1/2 -translate-y-1/2 bg-paper/15" />
        </div>
      );
    case "social":
      return (
        <div className="absolute inset-0 bg-[#0d0806]">
          <div className="absolute inset-0 grid grid-cols-3 gap-[2px] p-[2px] opacity-70">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                animate={
                  reduceMotion
                    ? {}
                    : { opacity: [0.25, 0.6, 0.25] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                className="bg-gradient-to-br from-orange/20 to-transparent"
              />
            ))}
          </div>
        </div>
      );
  }
}

export function ReelCard({
  category,
  index,
}: {
  category: ReelCategory;
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative aspect-video w-[82vw] shrink-0 snap-center overflow-hidden rounded-xl border border-line bg-ink-soft sm:w-[65vw] md:w-[46vw] lg:w-[38vw]"
      )}
      role="group"
      aria-label={`${category.label} — ${category.tagline}`}
    >
      {category.videoSrc && category.orientation === "vertical" ? (
        <>
          <video
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.55] saturate-150"
            src={category.videoSrc}
            poster={category.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
          <video
            className="absolute inset-0 mx-auto h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            src={category.videoSrc}
            poster={category.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        </>
      ) : category.videoSrc ? (
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
        <div className="absolute inset-0 scale-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.12]">
          <ReelPattern pattern={category.pattern} />
        </div>
      )}

      <div className="grain absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-paper/45">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display mt-1 text-xl font-medium text-paper md:text-2xl">
            {category.label}
          </h3>
          <p className="mt-0.5 text-sm text-paper/60">{category.tagline}</p>
        </div>
      </div>
    </motion.div>
  );
}
