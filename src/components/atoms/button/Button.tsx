import React from "react";
import { cn } from "../../../lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const sizeStyles: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-accent/35",
        variant === "primary" && "bg-accent text-white hover:brightness-95",
        variant === "ghost" &&
          "bg-transparent text-text hover:bg-black/5 border border-stroke",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
