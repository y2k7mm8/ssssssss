import React, { useMemo, useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Input } from "../../atoms/input/Input";
import { Select } from "../../atoms/select/Select";
import { Pagination } from "../../molecules/pagination/Pagination";
import { Modal } from "../../atoms/modal/Modal";
import { Badge } from "../../atoms/badge/Badge";
import { cn } from "../../../lib/cn";
import { useItemsStore, Item, ItemStatus, ItemCategory } from "../../../lib/items-store/ItemsStore";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

const statusLabel: Record<ItemStatus, { label: string; tone: "default" | "success" | "warning" }> = {
  active: { label: "Активно", tone: "success" },
  done: { label: "Завершено", tone: "default" },
  paused: { label: "Пауза", tone: "warning" },
};

const categoryLabel: Record<ItemCategory, string> = {
  math: "Математика",
  english: "Английский",
  history: "История",
  physics: "Физика",
  it: "IT",
};

type SortKey = "title" | "status" | "dueDate" | "category";
type SortDir = "asc" | "desc";

export function DataTable() {
  const { items, addItem, updateItem, deleteItem } = useItemsStore();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ItemStatus | "all">("all");
  const [category, setCategory] = useState<ItemCategory | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [page, setPage] = useState(1);
  const pageSize = 6;

  // modals
  const [addOpen, setAddOpen] = useState(false);
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false });

  // inline edit
  const [editId, setEditId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const filtered = useMemo(() => {
    const byQ = (it: Item) =>
      it.title.toLowerCase().includes(q.toLowerCase()) ||
      it.tags.join(" ").toLowerCase().includes(q.toLowerCase());

    return items
      .filter((it) => (q ? byQ(it) : true))
      .filter((it) => (status === "all" ? true : it.status === status))
      .filter((it) => (category === "all" ? true : it.category === category));
  }, [items, q, status, category]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const s = [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      return String(va).localeCompare(String(vb)) * dir;
    });
    return s;
  }, [filtered, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  const openEdit = (it: Item) => {
    setEditId(it.id);
    setDraftTitle(it.title);
  };

  const saveEdit = () => {
    if (!editId) return;
    updateItem(editId, { title: draftTitle.trim() || "Без названия" });
    setEditId(null);
  };

  const AddForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [st, setSt] = useState<ItemStatus>("active");
    const [cat, setCat] = useState<ItemCategory>("math");

    return (
      <Modal
        open={addOpen}
        title="Добавить"
        onClose={() => setAddOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                addItem({
                  title: title.trim() || "Без названия",
                  description,
                  tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                  dueDate,
                  status: st,
                  category: cat,
                });
                setAddOpen(false);
              }}
            >
              Сохранить
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted mb-1">Название</div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: повторить тему" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Описание</div>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Коротко" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Статус</div>
              <Select value={st} onChange={(e) => setSt(e.target.value as ItemStatus)}>
                <option value="active">Активно</option>
                <option value="paused">Пауза</option>
                <option value="done">Завершено</option>
              </Select>
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Категория</div>
              <Select value={cat} onChange={(e) => setCat(e.target.value as ItemCategory)}>
                <option value="math">Математика</option>
                <option value="english">Английский</option>
                <option value="history">История</option>
                <option value="physics">Физика</option>
                <option value="it">IT</option>
              </Select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Срок</div>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Теги (через запятую)</div>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="например: контрольная, важное" />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Каталог</div>
          <div className="text-xs text-muted mt-1">Поиск, фильтры, сортировка, пагинация, редактирование.</div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} className="mr-2" /> Добавить
          </Button>
        </div>
      </div>

      <div className="mt-4 grid lg:grid-cols-3 gap-3">
        <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Поиск по названию и тегам" />
        <Select value={status} onChange={(e) => { setStatus(e.target.value as any); setPage(1); }}>
          <option value="all">Все статусы</option>
          <option value="active">Активно</option>
          <option value="paused">Пауза</option>
          <option value="done">Завершено</option>
        </Select>
        <Select value={category} onChange={(e) => { setCategory(e.target.value as any); setPage(1); }}>
          <option value="all">Все категории</option>
          <option value="math">Математика</option>
          <option value="english">Английский</option>
          <option value="history">История</option>
          <option value="physics">Физика</option>
          <option value="it">IT</option>
        </Select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted">
              {[
                { k: "title", label: "Название" },
                { k: "status", label: "Статус" },
                { k: "category", label: "Категория" },
                { k: "dueDate", label: "Срок" },
              ].map((c) => (
                <th
                  key={c.k}
                  className="text-left font-semibold py-3 px-3 cursor-pointer select-none"
                  onClick={() => toggleSort(c.k as SortKey)}
                >
                  {c.label} {sortKey === c.k ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
              <th className="text-right font-semibold py-3 px-3">Действия</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((it) => {
              const s = statusLabel[it.status];
              const isEdit = editId === it.id;

              return (
                <tr key={it.id} className="border-t border-stroke2">
                  <td className="py-3 px-3 min-w-[280px]">
                    {isEdit ? (
                      <Input
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") setEditId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <Link to={`/items/${it.id}`} className="font-semibold hover:underline truncate">
                          {it.title}
                        </Link>
                      </div>
                    )}
                    <div className="text-xs text-muted mt-1 line-clamp-1">{it.description}</div>
                  </td>

                  <td className="py-3 px-3">
                    <Badge tone={s.tone}>{s.label}</Badge>
                  </td>

                  <td className="py-3 px-3 text-muted">{categoryLabel[it.category]}</td>

                  <td className="py-3 px-3 text-muted">{it.dueDate}</td>

                  <td className="py-3 px-3">
                    <div className="flex items-center justify-end gap-2">
                      {isEdit ? (
                        <>
                          <Button size="sm" onClick={saveEdit}>
                            Сохранить
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditId(null)}>
                            Отмена
                          </Button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition flex items-center justify-center"
                            aria-label="Редактировать"
                            onClick={() => openEdit(it)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition flex items-center justify-center"
                            aria-label="Удалить"
                            onClick={() => setConfirm({ open: true, id: it.id })}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {!rows.length && (
              <tr>
                <td className="py-8 px-3 text-sm text-muted" colSpan={5}>
                  Ничего не найдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      </div>

      <AddForm />

      <Modal
        open={confirm.open}
        title="Удалить?"
        onClose={() => setConfirm({ open: false })}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirm({ open: false })}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (confirm.id) deleteItem(confirm.id);
                setConfirm({ open: false });
              }}
            >
              Удалить
            </Button>
          </div>
        }
        widthClass="max-w-md"
      >
        <div className="text-sm text-muted">Действие нельзя отменить. Удалить выбранный элемент?</div>
      </Modal>
    </div>
  );
}
