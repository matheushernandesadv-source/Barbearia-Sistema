import { cn } from "@/lib/utils";

type Tone = "gold" | "green" | "red" | "blue" | "neutral" | "orange";

const toneMap: Record<Tone, string> = {
  gold: "bg-gold-400/10 text-gold-300 ring-1 ring-inset ring-gold-400/30",
  green: "bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
  red: "bg-red-400/10 text-red-300 ring-1 ring-inset ring-red-400/30",
  blue: "bg-sky-400/10 text-sky-300 ring-1 ring-inset ring-sky-400/30",
  orange: "bg-orange-400/10 text-orange-300 ring-1 ring-inset ring-orange-400/30",
  neutral: "bg-ink-500/20 text-ink-200 ring-1 ring-inset ring-ink-400/30",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
