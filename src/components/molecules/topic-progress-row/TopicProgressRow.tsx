import React from "react";
import { ProgressBar } from "../../atoms/progress-bar/ProgressBar";
import { Badge } from "../../atoms/badge/Badge";
import { cn } from "../../../lib/cn";

export function TopicProgressRow({
  title,
  level,
  score,
}: {
  title: string;
  level: string;
  score: number;
}) {
  return (
    <div className="rounded-xl border border-stroke2 bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-muted mt-1">{level}</div>
        </div>
        <div className="text-xl font-bold">{score}</div>
      </div>

      <div className="mt-3">
        <ProgressBar value={score} />
      </div>
    </div>
  );
}
