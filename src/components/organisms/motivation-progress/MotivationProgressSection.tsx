import React, { useMemo } from "react";
import { StatTile } from "../../molecules/stat-tile/StatTile";
import { TopicProgressRow } from "../../molecules/topic-progress-row/TopicProgressRow";

const topics = [
  { title: "Математика", level: "Мастер", score: 94 },
  { title: "Физика", level: "Продвинутый", score: 87 },
  { title: "История", level: "Изучается", score: 72 },
  { title: "Английский", level: "Новичок", score: 45 },
];

export function MotivationProgressSection() {
  const memoryIndex = useMemo(() => {
    const avg = topics.reduce((s, t) => s + t.score, 0) / topics.length;
    return Math.round(avg);
  }, []);

  return (
    <section className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="text-2xl font-extrabold tracking-tight">Прогресс</div>
      <div className="text-sm text-muted mt-1">
        Индекс памяти — средний показатель освоения тем (0–100). Обновляется от статусов тем.
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl2 border border-stroke2 bg-bg p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-bold tracking-tight">Индекс памяти</div>
              <div className="text-sm text-muted mt-2">Средний показатель удержания знаний</div>
            </div>
            <div className="text-5xl font-extrabold text-accent leading-none">{memoryIndex}</div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <svg viewBox="0 0 240 120" className="w-full max-w-[360px] h-auto">
              <path
                d="M20 110 A100 100 0 0 1 220 110"
                stroke="rgba(17,24,39,0.10)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20 110 A100 100 0 0 1 220 110"
                stroke="#14B8A6"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${memoryIndex} 100`}
              />
            </svg>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <StatTile label="За месяц" value="+12" />
            <StatTile label="Точность" value="94%" />
            <StatTile label="Повторений" value="156" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xl font-bold tracking-tight">Статусы тем</div>
          {topics.map((t) => (
            <TopicProgressRow key={t.title} title={t.title} level={t.level} score={t.score} />
          ))}
        </div>
      </div>
    </section>
  );
}
