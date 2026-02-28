import React, { useMemo, useState } from "react";
import { DataTable } from "../components/organisms/data-table/DataTable";
import { Segmented } from "../components/atoms/segmented/Segmented";
import { ItemCard } from "../components/molecules/item-card/ItemCard";
import { useItemsStore } from "../lib/items-store/ItemsStore";

type View = "table" | "grid";

export function ItemsPage() {
  const { items } = useItemsStore();
  const [view, setView] = useState<View>("table");

  const gridItems = useMemo(() => items, [items]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight">Каталог</div>
          <div className="text-sm text-muted mt-1">Таблица или карточки. Поиск и фильтры внутри таблицы.</div>
        </div>

        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "table", label: "Таблица" },
            { value: "grid", label: "Карточки" },
          ]}
        />
      </div>

      {view === "table" ? (
        <DataTable />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}
