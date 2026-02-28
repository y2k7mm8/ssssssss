import React from "react";
import { cn } from "../../../lib/cn";

type Opt<T extends string> = { value: T; label: string };

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  items,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  /** preferred prop */
  options?: Opt<T>[];
  /** backward/alternate prop used in some pages */
  items?: Opt<T>[];
  className?: string;
}) {
  const list = (options ?? items ?? []) as Opt<T>[];

  if (!list.length) return null;

  return (
    <div className={cn("inline-flex rounded-xl border border-stroke2 bg-surface p-1", className)}>
      {list.map((o) => (
        <button
          key={o.value}
          type="button"
          className={cn(
            "h-9 px-3 rounded-lg text-sm transition",
            value === o.value ? "bg-bg shadow-sm text-text" : "text-muted hover:text-text hover:bg-black/5"
          )}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
