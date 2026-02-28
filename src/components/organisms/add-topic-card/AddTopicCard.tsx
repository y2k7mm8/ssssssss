import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "../../atoms/input/Input";
import { Button } from "../../atoms/button/Button";
import { Select } from "../../atoms/select/Select";
import { useItemsStore } from "../../../lib/items-store/ItemsStore";

const categories = ["Математика", "Английский", "История", "Физика", "IT", "Биология"];

function isoTodayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function AddTopicCard() {
  const { addItem } = useItemsStore();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState(isoTodayPlus(14));
  const [tags, setTags] = useState("");

  const can = useMemo(() => title.trim().length >= 2, [title]);

  const submit = () => {
    if (!can) return;

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6);

    addItem({
      title: title.trim(),
      description: "",
      category,
      dueDate,
      tags: tagList,
      status: "active",
    });

    setTitle("");
    setTags("");
  };

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Добавить тему</div>
        </div>
        <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Plus size={18} className="text-accent" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs text-muted">Название</div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: Производные" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted">Категория</div>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted">Срок</div>
          <Input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted">Теги</div>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="через запятую (алгебра, тест)" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button onClick={submit} disabled={!can}>
          Добавить
        </Button>
      </div>
    </div>
  );
}
