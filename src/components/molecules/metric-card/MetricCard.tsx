import React from "react";
import { cn } from "../../../lib/cn";

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendDirection,
  icon,
}: {
  label: string;
  value: number;
  unit?: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
  icon: React.ReactNode;
}) {
  const trendClass =
    trendDirection === "up"
      ? "text-emerald-700"
      : trendDirection === "down"
      ? "text-rose-700"
      : "text-muted";

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-5 hover:shadow-soft transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted">{label}</div>
          <div className="text-2xl font-extrabold tracking-tight mt-2">
            {value}
            {unit ? <span className="text-base font-semibold ml-1">{unit}</span> : null}
          </div>
          <div className={cn("text-xs mt-2", trendClass)}>{trend}</div>
        </div>

        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
