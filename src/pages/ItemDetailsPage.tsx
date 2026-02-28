import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useItemsStore, ItemStatus } from "../lib/items-store/ItemsStore";
import { Badge } from "../components/atoms/badge/Badge";
import { Button } from "../components/atoms/button/Button";
import { Input } from "../components/atoms/input/Input";
import { Segmented } from "../components/atoms/segmented/Segmented";
import { ActivityTimeline } from "../components/organisms/activity-timeline/ActivityTimeline";

const statusMap: Record<ItemStatus, { label: string; tone: "default" | "success" | "warning" }> = {
  active: { label: "Активно", tone: "success" },
  done: { label: "Завершено", tone: "default" },
  paused: { label: "Пауза", tone: "warning" },
};

type Task = { id: string; text: string; done: boolean };

export function ItemDetailsPage() {
  const { id } = useParams();
  const { items, changes, updateItem } = useItemsStore();

  const item = useMemo(() => items.find((x) => x.id === id), [items, id]);
  const s = item ? statusMap[item.status] : null;

  const [tasks, setTasks] = useState<Task[]>([
    { id: "s1", text: "Собрать конспект", done: true },
    { id: "s2", text: "Сделать 10 задач", done: false },
    { id: "s3", text: "Мини-тест", done: false },
  ]);

  if (!item) {
    return (
      <div className="rounded-xl2 border border-stroke2 bg-surface p-6 shadow-card">
        <div className="text-sm font-semibold">Элемент не найден</div>
        <div className="mt-3">
          <Link to="/items">
            <Button>Назад</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xl font-extrabold tracking-tight">{item.title}</div>
            <div className="text-sm text-muted mt-1">{item.description}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {s && <Badge tone={s.tone}>{s.label}</Badge>}
              {item.tags.map((t) => (
                <Badge key={t} tone="default">
                  {t}
                </Badge>
              ))}
              <Badge tone="default">Срок: {item.dueDate}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Segmented
              value={item.status}
              onChange={(v) => updateItem(item.id, { status: v })}
              options={[
                { value: "active", label: "Активно" },
                { value: "paused", label: "Пауза" },
                { value: "done", label: "Готово" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
          <div className="text-sm font-semibold">Подзадачи</div>
          <div className="mt-4 space-y-2">
            {tasks.map((t) => (
              <label key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-stroke2 bg-bg px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => setTasks((p) => p.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                  />
                  <span className={"text-sm truncate " + (t.done ? "line-through text-muted" : "")}>{t.text}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Input
              placeholder="Новая подзадача..."
              onKeyDown={(e) => {
                const v = (e.target as HTMLInputElement).value.trim();
                if (e.key === "Enter" && v) {
                  setTasks((p) => [{ id: Math.random().toString(16).slice(2, 8), text: v, done: false }, ...p]);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <div className="text-xs text-muted flex items-center">Enter — добавить</div>
          </div>
        </div>

        <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
          <div className="text-sm font-semibold">История изменений</div>
          <div className="mt-4 space-y-2">
            {(changes[item.id] || []).slice(0, 6).map((c, idx) => (
              <div key={idx} className="rounded-xl border border-stroke2 bg-bg px-3 py-2">
                <div className="text-sm font-semibold">{c.text}</div>
                <div className="text-xs text-muted mt-1">{new Date(c.at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
        <div className="text-sm font-semibold">Быстрые переходы</div>
        <div className="mt-3 flex gap-2">
          <Link to="/items">
            <Button>Назад в каталог</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Дашборд</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
