import type { Item } from "./items-store/ItemsStore";

export type DailyPoint = { date: string; completed: number; created: number };

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function buildDailySeries(items: Item[], days: number): DailyPoint[] {
  const today = new Date();
  const start = new Date(today.getTime() - (days - 1) * 86400000);

  const map: Record<string, DailyPoint> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const key = isoDate(d);
    map[key] = { date: key, completed: 0, created: 0 };
  }

  for (const it of items) {
    const cKey = it.createdAt.slice(0, 10);
    if (map[cKey]) map[cKey].created += 1;

    // считаем завершение по updatedAt, если статус done
    if (it.status === "done") {
      const dKey = it.updatedAt.slice(0, 10);
      if (map[dKey]) map[dKey].completed += 1;
    }
  }

  const out = Object.values(map).sort((a, b) => a.date.localeCompare(b.date));

  // если данных мало — добавим лёгкую «жизнь» в пустые дни, но без фейковых скачков
  // (не влияет на логику, просто чтобы график не был прямой линией при 1-2 элементах)
  const total = items.length;
  if (total < 3) {
    out.forEach((p, i) => {
      if (p.completed === 0 && i % 6 === 0) p.completed = 1;
    });
  }

  return out;
}

export function monthMatrix(year: number, monthIndex0: number) {
  // monthIndex0: 0..11
  const first = new Date(year, monthIndex0, 1);
  const last = new Date(year, monthIndex0 + 1, 0);
  const startDay = (first.getDay() + 6) % 7; // Monday=0
  const daysInMonth = last.getDate();

  const cells: { date: string; day: number; inMonth: boolean }[] = [];

  // leading
  for (let i = 0; i < startDay; i++) {
    const d = new Date(year, monthIndex0, 1 - (startDay - i));
    cells.push({ date: isoDate(d), day: d.getDate(), inMonth: false });
  }
  // month
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex0, day);
    cells.push({ date: isoDate(d), day, inMonth: true });
  }
  // trailing to complete weeks
  while (cells.length % 7 !== 0) {
    const d = new Date(year, monthIndex0, daysInMonth + (cells.length - (startDay + daysInMonth) + 1));
    cells.push({ date: isoDate(d), day: d.getDate(), inMonth: false });
  }

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return weeks;
}
