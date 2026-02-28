import React from "react";
import { cn } from "../../../lib/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-stroke bg-black/2 px-2.5 py-1 text-xs text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
