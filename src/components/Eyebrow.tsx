import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]",
        light ? "text-ink/50" : "text-paper/50",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          light ? "bg-ink/40" : "bg-orange-bright/70"
        )}
      />
      {children}
    </div>
  );
}
