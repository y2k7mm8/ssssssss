import React from "react";

export function NotificationCard({
  title,
  time,
  text,
  icon,
}: {
  title: string;
  time: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stroke2 bg-surface p-4 shadow-card hover:shadow-soft transition">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold truncate">{title}</div>
            <div className="text-xs text-muted">{time}</div>
          </div>
          <div className="text-sm text-muted mt-1">{text}</div>
        </div>
      </div>
    </div>
  );
}
