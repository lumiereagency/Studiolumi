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
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium",
        light ? "border-ink/15 text-ink/70" : "border-line-strong text-paper/70",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange-bright" />
      {children}
    </span>
  );
}
