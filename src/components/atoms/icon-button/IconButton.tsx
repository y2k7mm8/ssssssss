import React from "react";
import { cn } from "../../../lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md";
};

export function IconButton({ size = "md", className, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition",
        "focus:outline-none focus:ring-2 focus:ring-accent/35",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}
