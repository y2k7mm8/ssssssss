import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useItemsStore } from "../../../lib/items-store/ItemsStore";
import { monthMatrix } from "../../../lib/progress";
import { cn } from "../../../lib/cn";

const monthNames = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];
const week = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

export function MonthCalendar() {
  const { items } = useItemsStore();
  const today = new Date();

  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const weeks = useMemo(() => monthMatrix(ym.y, ym.m), [ym]);
  const doneByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const it of items) {
      if (it.status !== "done") continue;
      const d = it.updatedAt.slice(0, 10);
      map[d] = (map[d] || 0) + 1;
    }
    return map;
  }, [items]);

  const prev = () => {
    setYm((p) => {
      const m = p.m - 1;
      if (m < 0) return { y: p.y - 1, m: 11 };
      return { y: p.y, m };
    });
  };

  const next = () => {
    setYm((p) => {
      const m = p.m + 1;
      if (m > 11) return { y: p.y + 1, m: 0 };
      return { y: p.y, m };
    });
  };

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Расписание</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition flex items-center justify-center"
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-sm font-semibold w-[140px] text-center">
            {monthNames[ym.m]} {ym.y}
          </div>
          <button
            type="button"
            onClick={next}
            className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition flex items-center justify-center"
            aria-label="Следующий месяц"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-muted">
        {week.map((d) => (
          <div key={d} className="px-1">{d}</div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {weeks.flat().map((c) => {
          const done = doneByDate[c.date] || 0;
          const isToday = c.date === new Date().toISOString().slice(0, 10);

          return (
            <div
              key={c.date}
              className={cn(
                "rounded-xl border border-stroke2 bg-bg p-2 min-h-[54px] flex flex-col justify-between",
                !c.inMonth && "opacity-50",
                isToday && "ring-2 ring-accent/25"
              )}
              title={done ? `${c.date}: выполнено ${done}` : c.date}
            >
              <div className="text-xs font-semibold">{c.day}</div>
              <div className="flex items-center gap-1 justify-end">
                {done > 0 && (
                  <>
                    <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                    <span className="text-[11px] text-muted">{done}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
