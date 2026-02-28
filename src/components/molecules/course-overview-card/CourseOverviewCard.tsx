import React from "react";
import { CalendarDays, Tag } from "lucide-react";
import { Badge } from "../../atoms/badge/Badge";
import { ProgressBar } from "../../atoms/progress-bar/ProgressBar";

type Props = {
  title: string;
  category?: string;
  dueDate?: string;
  status: "active" | "paused" | "done";
  tags?: string[];
};

const statusLabel: Record<Props["status"], string> = {
  active: "Активно",
  paused: "Пауза",
  done: "Завершено",
};

const statusTone: Record<Props["status"], "neutral" | "success" | "warning"> = {
  active: "success",
  paused: "warning",
  done: "neutral",
};

function statusProgress(s: Props["status"]) {
  if (s === "done") return 100;
  if (s === "active") return 55;
  return 25;
}

export function CourseOverviewCard({ title, category, dueDate, status, tags = [] }: Props) {
  const progress = statusProgress(status);
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-5 hover:shadow-cardHover transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{title}</div>
          <div className="text-xs text-muted mt-1 truncate">{category || "Тема"}</div>
        </div>
        <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>
      </div>

      <div className="mt-4 space-y-3">
        <ProgressBar value={progress} />
        <div className="flex flex-wrap gap-2 items-center text-xs text-muted">
          {dueDate && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} />
              <span>Срок: {dueDate}</span>
            </span>
          )}
          {tags.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <Tag size={14} />
              <span className="truncate max-w-[220px]">{tags.slice(0, 3).join(", ")}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
