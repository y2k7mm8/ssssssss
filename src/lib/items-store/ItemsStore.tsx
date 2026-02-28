import React, { createContext, useContext, useMemo, useState } from "react";

export type ItemStatus = "active" | "done" | "paused";
export type ItemCategory = "math" | "english" | "history" | "physics" | "it";

export type Item = {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  category: ItemCategory;
  dueDate: string; // ISO date
  tags: string[];
  updatedAt: string; // ISO
  createdAt: string; // ISO
};

export type ItemChange = { id: string; at: string; text: string };

type Ctx = {
  items: Item[];
  changes: Record<string, ItemChange[]>;
  addItem: (data: Omit<Item, "id" | "createdAt" | "updatedAt">) => void;
  updateItem: (id: string, patch: Partial<Omit<Item, "id">>) => void;
  deleteItem: (id: string) => void;
};

const ItemsContext = createContext<Ctx | null>(null);

const nowISO = () => new Date().toISOString();

function seed(): { items: Item[]; changes: Record<string, ItemChange[]> } {
  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const items: Item[] = [
    {
      id: "it-1",
      title: "Подготовка к контрольной по математике",
      description: "Повторить функции, производные и базовые задачи.",
      status: "active",
      category: "math",
      dueDate: iso(new Date(today.getTime() + 7 * 86400000)),
      tags: ["контрольная", "повторение"],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    },
    {
      id: "it-2",
      title: "Грамматика: времена в английском",
      description: "Present Perfect vs Past Simple + упражнения.",
      status: "paused",
      category: "english",
      dueDate: iso(new Date(today.getTime() + 14 * 86400000)),
      tags: ["grammar"],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    },
    {
      id: "it-3",
      title: "История: подготовить конспект по теме",
      description: "Сделать краткий конспект и 10 вопросов.",
      status: "done",
      category: "history",
      dueDate: iso(new Date(today.getTime() - 2 * 86400000)),
      tags: ["конспект"],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    },
    {
      id: "it-4",
      title: "Физика: механика — задачи",
      description: "Решить 15 задач на кинематику.",
      status: "active",
      category: "physics",
      dueDate: iso(new Date(today.getTime() + 3 * 86400000)),
      tags: ["задачи"],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    },
    {
      id: "it-5",
      title: "IT: подготовить мини-проект",
      description: "Собрать небольшой React модуль и оформить README.",
      status: "active",
      category: "it",
      dueDate: iso(new Date(today.getTime() + 10 * 86400000)),
      tags: ["react", "practice"],
      createdAt: nowISO(),
      updatedAt: nowISO(),
    },
  ];

  const changes: Record<string, ItemChange[]> = Object.fromEntries(
    items.map((it) => [
      it.id,
      [
        { id: it.id, at: nowISO(), text: "Создано" },
        { id: it.id, at: nowISO(), text: `Статус: ${it.status}` },
      ],
    ])
  );

  return { items, changes };
}

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const s = useMemo(() => seed(), []);
  const [items, setItems] = useState<Item[]>(s.items);
  const [changes, setChanges] = useState<Record<string, ItemChange[]>>(s.changes);

  const addItem: Ctx["addItem"] = (data) => {
    const id = `it-${Math.random().toString(16).slice(2, 8)}`;
    const item: Item = { ...data, id, createdAt: nowISO(), updatedAt: nowISO() };
    setItems((prev) => [item, ...prev]);
    setChanges((prev) => ({
      ...prev,
      [id]: [{ id, at: nowISO(), text: "Создано" }],
    }));
  };

  const updateItem: Ctx["updateItem"] = (id, patch) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch, updatedAt: nowISO() } : it))
    );
    setChanges((prev) => ({
      ...prev,
      [id]: [{ id, at: nowISO(), text: "Обновлено" }, ...(prev[id] || [])],
    }));
  };

  const deleteItem: Ctx["deleteItem"] = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setChanges((prev) => {
      const cp = { ...prev };
      delete cp[id];
      return cp;
    });
  };

  const value: Ctx = { items, changes, addItem, updateItem, deleteItem };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItemsStore() {
  const ctx = useContext(ItemsContext);
  if (!ctx) throw new Error("useItemsStore must be used within ItemsProvider");
  return ctx;
}
