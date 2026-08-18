import { cn } from "@/lib/utils";

/**
 * Infinity mark — two exact tangent circles (r=40) forming a continuous
 * figure-eight path, rendered with a chrome-to-color reveal in LogoReveal.tsx.
 */
export const INFINITY_PATH =
  "M 80 40 C 80 17.9 62.1 0 40 0 C 17.9 0 0 17.9 0 40 C 0 62.1 17.9 80 40 80 C 62.1 80 80 62.1 80 40 C 80 17.9 97.9 0 120 0 C 142.1 0 160 17.9 160 40 C 160 62.1 142.1 80 120 80 C 97.9 80 80 62.1 80 40 Z";

export function LogoMark({
  className,
  strokeWidth = 16,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="-12 -12 184 104"
      className={cn("h-auto w-10", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={INFINITY_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
