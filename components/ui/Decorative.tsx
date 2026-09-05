import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  accent?: boolean;
  color?: "cyan" | "gold" | "pink" | "neutral";
}

const dividerColors = {
  cyan: "via-[var(--color-cyan)]/40",
  gold: "via-[var(--color-gold)]/40",
  pink: "via-[var(--color-pink)]/40",
  neutral: "via-black/10",
};

const dotColors = {
  cyan: "bg-[var(--color-cyan)]",
  gold: "bg-[var(--color-gold)]",
  pink: "bg-[var(--color-pink)]",
  neutral: "bg-[var(--color-ink-muted)]",
};

export function Divider({ className, accent = false, color = "neutral" }: DividerProps) {
  return (
    <div className={cn("relative flex items-center", className)} aria-hidden="true">
      <div className={cn("flex-1 h-px bg-gradient-to-r from-transparent", dividerColors[color], "to-transparent")} />
      {accent && (
        <>
          <div className={cn("w-1.5 h-1.5 rounded-full mx-4 shrink-0", dotColors[color])} />
          <div className={cn("flex-1 h-px bg-gradient-to-r from-transparent", dividerColors[color], "to-transparent")} />
        </>
      )}
    </div>
  );
}

interface CrossMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CrossMark({ className, size = 12, color = "var(--color-ink-muted)" }: CrossMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke={color} strokeWidth="0.75" />
      <line x1="0" y1="6" x2="12" y2="6" stroke={color} strokeWidth="0.75" />
    </svg>
  );
}
