import React from "react";
import { cn } from "../../../lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "success" | "warning" | "default";
};

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-stroke bg-black/2 text-muted",
  success: "border-green-500/30 bg-green-500/10 text-green-700",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  default: "border-stroke bg-black/2 text-muted",
};

export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
