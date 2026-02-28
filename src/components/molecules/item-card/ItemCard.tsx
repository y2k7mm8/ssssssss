import React from "react";
import { Badge } from "../../atoms/badge/Badge";
import { Button } from "../../atoms/button/Button";
import { cn } from "../../../lib/cn";
import { Link } from "react-router-dom";
import type { Item } from "../../../lib/items-store/ItemsStore";

const statusMap: Record<Item["status"], { label: string; tone: "default" | "success" | "warning" }> = {
  active: { label: "Активно", tone: "success" },
  done: { label: "Завершено", tone: "default" },
  paused: { label: "Пауза", tone: "warning" },
};

export function ItemCard({ item }: { item: Item }) {
  const s = statusMap[item.status];

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-5 hover:shadow-soft transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{item.title}</div>
          <div className="text-xs text-muted mt-1">Срок: {item.dueDate}</div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge tone={s.tone}>{s.label}</Badge>
            {item.tags.slice(0, 3).map((t) => (
              <Badge key={t} tone="default">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <Link to={`/items/${item.id}`}>
          <Button size="sm">Открыть</Button>
        </Link>
      </div>
    </div>
  );
}
