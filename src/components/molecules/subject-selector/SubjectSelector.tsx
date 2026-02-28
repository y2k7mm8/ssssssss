import React from "react";
import { Badge } from "../../atoms/badge/Badge";
import { cn } from "../../../lib/cn";
import { Tags } from "lucide-react";

const SUBJECTS = ["Математика", "Английский", "История", "Физика", "IT", "Биология"];

export function SubjectSelector({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (s: string) => void;
}) {
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card space-y-3">
      <div className="flex items-center gap-2">
        <Tags size={18} className="text-accent" />
        <div className="text-sm font-semibold">Предметы</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              onClick={() => onToggle(s)}
              className={cn("transition", active ? "opacity-100" : "opacity-80 hover:opacity-100")}
              type="button"
            >
              <Badge className={cn(active && "border-accent/40 text-text")}>{s}</Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
