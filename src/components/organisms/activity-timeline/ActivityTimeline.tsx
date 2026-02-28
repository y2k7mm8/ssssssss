import React from "react";
import { Clock, FileText, CheckCircle2, Pencil } from "lucide-react";

const rows = [
  { icon: <Pencil size={16} />, title: "Обновлена цель", time: "Сегодня, 10:12", text: "Изменена цель по математике." },
  { icon: <CheckCircle2 size={16} />, title: "Задача выполнена", time: "Сегодня, 09:05", text: "Закрыта задача: конспект." },
  { icon: <FileText size={16} />, title: "Добавлен элемент", time: "Вчера, 18:40", text: "Создан новый пункт в каталоге." },
  { icon: <Clock size={16} />, title: "Напоминание", time: "Вчера, 16:20", text: "Повторение темы через 3 дня." },
];

export function ActivityTimeline() {
  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="text-sm font-semibold">Последние активности</div>
      <div className="mt-4 space-y-3">
        {rows.map((r, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center shrink-0">
              {r.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold truncate">{r.title}</div>
                <div className="text-xs text-muted">{r.time}</div>
              </div>
              <div className="text-sm text-muted mt-1">{r.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
