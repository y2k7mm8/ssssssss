import React from "react";
import { Badge } from "../../atoms/badge/Badge";

export function StudyPlanItem({ day, title, minutes }: { day: number; title: string; minutes: number }) {
  return (
    <div className="rounded-xl border border-stroke bg-bg p-4 flex items-start justify-between gap-3">
      <div className="space-y-1">
        <div className="text-sm font-semibold">День {day}</div>
        <div className="text-sm text-muted">{title}</div>
      </div>
      <Badge>⏱ {minutes} мин</Badge>
    </div>
  );
}
