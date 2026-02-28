import React from "react";
import { cn } from "../../../lib/cn";

export function StatTile({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-stroke2 bg-surface p-4 shadow-card", className)}>
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-bold tracking-tight mt-1">{value}</div>
    </div>
  );
}
