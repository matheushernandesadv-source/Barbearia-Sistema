import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendTone = "green",
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendTone?: "green" | "red" | "neutral";
  hint?: string;
}) {
  const trendColor =
    trendTone === "green"
      ? "text-emerald-400"
      : trendTone === "red"
      ? "text-red-400"
      : "text-ink-300";

  return (
    <div className="rounded-2xl border border-ink-600/70 bg-ink-800/60 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-300">{label}</span>
        <div className="h-9 w-9 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25">
          <Icon className="h-4.5 w-4.5 text-gold-300" size={18} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-display text-2xl text-ink-50">{value}</span>
        {trend && <span className={cn("text-xs font-medium", trendColor)}>{trend}</span>}
      </div>
      {hint && <span className="text-xs text-ink-400">{hint}</span>}
    </div>
  );
}
