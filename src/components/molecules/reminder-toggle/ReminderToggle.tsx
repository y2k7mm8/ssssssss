import React from "react";
import { cn } from "../../../lib/cn";
import { motion } from "framer-motion";

export function ReminderToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "w-12 h-7 rounded-full border border-stroke p-1 transition",
        enabled ? "bg-accent/15" : "bg-black/5"
      )}
      aria-pressed={enabled}
      type="button"
    >
      <motion.div
        className="h-5 w-5 rounded-full bg-accent"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ marginLeft: enabled ? "1.25rem" : "0rem" }}
      />
    </button>
  );
}
