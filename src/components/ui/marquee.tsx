import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Infinite scrolling track (Magic UI's Marquee pattern): two copies of the
 * same content side by side, animated left by exactly half their combined
 * width so the loop is seamless. Relies on the site-wide reduced-motion
 * kill-switch in globals.css to freeze the CSS animation; no JS branching
 * needed since this has no timers of its own.
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "flex shrink-0 animate-marquee gap-14 pr-14 group-hover:[animation-play-state:paused]",
          className
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 animate-marquee gap-14 pr-14 group-hover:[animation-play-state:paused]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
