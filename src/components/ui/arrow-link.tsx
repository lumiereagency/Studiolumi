import { cn } from "@/lib/utils";

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("h-3.5 w-3.5", className)}>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowCircle({
  className,
  tone = "orange",
}: {
  className?: string;
  tone?: "orange" | "ink" | "paper";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45",
        tone === "orange" && "bg-orange-bright text-paper",
        tone === "ink" && "bg-ink text-paper",
        tone === "paper" && "bg-paper text-ink",
        className
      )}
    >
      <ArrowIcon />
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "light",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange";
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-colors duration-300",
        variant === "light" && "bg-paper text-ink hover:bg-cream",
        variant === "dark" && "border border-line-strong text-paper hover:border-paper/40",
        variant === "orange" && "bg-orange-bright text-paper hover:bg-orange",
        className
      )}
    >
      {children}
      <ArrowCircle tone={variant === "orange" ? "paper" : variant === "dark" ? "paper" : "orange"} />
    </a>
  );
}
