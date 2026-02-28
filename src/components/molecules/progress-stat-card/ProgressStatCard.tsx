import React from "react";
import { ProgressBar } from "../../atoms/progress-bar/ProgressBar";
import { CalendarCheck, Brain, PenLine, LineChart } from "lucide-react";

function pickIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("план")) return CalendarCheck;
  if (t.includes("повтор")) return Brain;
  if (t.includes("письм")) return PenLine;
  if (t.includes("прогресс")) return LineChart;
  return LineChart;
}

export function ProgressStatCard({ title, value, hint }: { title: string; value: number; hint: string }) {
  const Icon = pickIcon(title);
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
          <Icon size={18} className="text-accent" />
        </div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <ProgressBar value={value} />
      <div className="text-xs text-muted">{hint}</div>
    </div>
  );
}
