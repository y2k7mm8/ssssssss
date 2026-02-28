import React, { useState } from "react";
import { ReminderToggle } from "../../molecules/reminder-toggle/ReminderToggle";
import { Badge } from "../../atoms/badge/Badge";
import { BellRing } from "lucide-react";

export function ReminderSystem() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface p-5 shadow-card flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
          <BellRing size={18} className="text-accent" />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold">Умные напоминания</div>
          <div className="text-xs text-muted">Микро-мотивация и повторение по плану</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge>{enabled ? "включено" : "выключено"}</Badge>
        <ReminderToggle enabled={enabled} onChange={setEnabled} />
      </div>
    </div>
  );
}
