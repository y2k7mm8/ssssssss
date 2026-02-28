import React from "react";
import { cn } from "../../../lib/cn";

export function H1({ children, className }: any) {
  return <h1 className={cn("text-3xl font-bold tracking-tight", className)}>{children}</h1>;
}

export function H2({ children, className }: any) {
  return <h2 className={cn("text-xl font-semibold tracking-tight", className)}>{children}</h2>;
}

export function Text({ children, className }: any) {
  return <p className={cn("text-sm text-muted", className)}>{children}</p>;
}
