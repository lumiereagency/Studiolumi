import { cn } from "@/lib/utils";

/**
 * StudioLumi's actual mark — a photographed chrome infinity charm, background
 * removed. See public/brand/logo-mark.png (chrome) and logo-mark-color.png
 * (same silhouette, filled with the brand gradient) for the interactive
 * reveal in LogoReveal.tsx.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-mark.png"
      alt="StudioLumi"
      className={cn("h-auto w-10 object-contain", className)}
    />
  );
}
