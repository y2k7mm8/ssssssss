import React from "react";
import { cn } from "../../../lib/cn";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-xl border border-stroke2 bg-surface px-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-accent/35",
        className
      )}
      {...props}
    />
  );
}
