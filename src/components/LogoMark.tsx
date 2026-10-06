import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Interlocked-rings mark: two circles woven like linked rings (an "aliança"),
 * each cut away where the other ring crosses on top, alternating at the two
 * crossing points. Geometry matches the brand's reference mark exactly.
 * Reused as a flat currentColor icon here, and with gradient fills for the
 * chrome/gold reveal in InteractiveLogo.tsx.
 */
export const LOGO_VIEWBOX = "4 -2 112 76";
export const RING_LEFT = { cx: 39.5, cy: 36, r: 27 };
export const RING_RIGHT = { cx: 80.5, cy: 36, r: 27 };
const CLIP_TOP = { cx: 60, cy: 18.42871660919442, r: 14 };
const CLIP_BOTTOM = { cx: 60, cy: 53.571283390805576, r: 14 };

export function LogoRings({
  id,
  stroke,
  strokeWidth = 10,
}: {
  id: string;
  stroke: string;
  strokeWidth?: number;
}) {
  const cutoutWidth = strokeWidth * 1.3;

  return (
    <>
      <defs>
        <clipPath id={`${id}-ct`}>
          <circle cx={CLIP_TOP.cx} cy={CLIP_TOP.cy} r={CLIP_TOP.r} />
        </clipPath>
        <clipPath id={`${id}-cb`}>
          <circle cx={CLIP_BOTTOM.cx} cy={CLIP_BOTTOM.cy} r={CLIP_BOTTOM.r} />
        </clipPath>
        <mask id={`${id}-mr`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="140" height="92">
          <rect x="-10" y="-10" width="140" height="92" fill="#fff" />
          <g clipPath={`url(#${id}-ct)`}>
            <circle cx={RING_LEFT.cx} cy={RING_LEFT.cy} r={RING_LEFT.r} fill="none" stroke="#000" strokeWidth={cutoutWidth} />
          </g>
        </mask>
        <mask id={`${id}-ml`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="140" height="92">
          <rect x="-10" y="-10" width="140" height="92" fill="#fff" />
          <g clipPath={`url(#${id}-cb)`}>
            <circle cx={RING_RIGHT.cx} cy={RING_RIGHT.cy} r={RING_RIGHT.r} fill="none" stroke="#000" strokeWidth={cutoutWidth} />
          </g>
        </mask>
      </defs>
      <circle
        cx={RING_LEFT.cx}
        cy={RING_LEFT.cy}
        r={RING_LEFT.r}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        mask={`url(#${id}-ml)`}
      />
      <circle
        cx={RING_RIGHT.cx}
        cy={RING_RIGHT.cy}
        r={RING_RIGHT.r}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        mask={`url(#${id}-mr)`}
      />
    </>
  );
}

export function LogoMark({
  className,
  strokeWidth = 10,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const id = useId();

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("h-auto w-10", className)}
      fill="none"
      aria-hidden="true"
    >
      <LogoRings id={id} stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
