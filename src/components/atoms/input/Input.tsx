import React from "react";
import { cn } from "../../../lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-stroke bg-surface px-3 py-2 text-sm",
        "placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30",
        className
      )}
      {...props}
    />
  );
}
