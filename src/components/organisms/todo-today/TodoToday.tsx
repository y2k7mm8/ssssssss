import React, { useMemo, useState } from "react";
import { Segmented } from "../../atoms/segmented/Segmented";
import { CheckSquare, Square, Trash2 } from "lucide-react";

type Status = "all" | "active" | "done";

type Row = { id: string; text: string; done: boolean };

const seed: Row[] = [
  { id: "t1", text: "Повторить тему 1 (15 минут)", done: false },
  { id: "t2", text: "Решить 5 задач", done: false },
  { id: "t3", text: "Короткий тест по теме", done: true },
];

export function TodoToday() {
  const [rows, setRows] = useState<Row[]>(seed);
  const [filter, setFilter] = useState<Status>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "active") return rows.filter((r) => !r.done);
    return rows.filter((r) => r.done);
  }, [rows, filter]);

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">Задачи на сегодня</div>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "Все" },
            { value: "active", label: "Активные" },
            { value: "done", label: "Завершённые" },
          ]}
        />
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-stroke2 bg-bg px-3 py-2">
            <button
              type="button"
              className="flex items-center gap-2 min-w-0"
              onClick={() => setRows((p) => p.map((x) => (x.id === r.id ? { ...x, done: !x.done } : x)))}
            >
              {r.done ? <CheckSquare size={18} className="text-accent" /> : <Square size={18} className="text-muted" />}
              <div className={"text-sm truncate " + (r.done ? "line-through text-muted" : "")}>{r.text}</div>
            </button>

            <button
              type="button"
              className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition flex items-center justify-center"
              aria-label="Удалить"
              onClick={() => setRows((p) => p.filter((x) => x.id !== r.id))}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
