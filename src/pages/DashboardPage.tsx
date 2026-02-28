import React, { useMemo } from "react";
import { useItemsStore } from "../lib/items-store/ItemsStore";
import { CourseOverviewCard } from "../components/molecules/course-overview-card/CourseOverviewCard";
import { MetricCard } from "../components/molecules/metric-card/MetricCard";
import { ActivityTimeline } from "../components/organisms/activity-timeline/ActivityTimeline";
import { TodoToday } from "../components/organisms/todo-today/TodoToday";
import { AddTopicCard } from "../components/organisms/add-topic-card/AddTopicCard";
import { MonthCalendar } from "../components/organisms/month-calendar/MonthCalendar";
import { BookOpen, CheckCircle2, Clock, Flame, Layers } from "lucide-react";

export function DashboardPage() {
  const { items } = useItemsStore();

  const metrics = useMemo(() => {
    const total = items.length;
    const done = items.filter((i) => i.status === "done").length;
    const active = items.filter((i) => i.status === "active").length;
    const paused = items.filter((i) => i.status === "paused").length;

    const donePct = total ? Math.round((done / total) * 100) : 0;

    return [
      {
        label: "Всего тем",
        value: total,
        unit: "шт.",
        trend: total ? `+${Math.min(3, total)} за неделю` : "нет данных",
        trendDirection: "up" as const,
        icon: <Layers size={18} />,
      },
      {
        label: "Завершено",
        value: donePct,
        unit: "%",
        trend: done ? `+${Math.min(2, done)}%` : "0%",
        trendDirection: done ? ("up" as const) : ("flat" as const),
        icon: <CheckCircle2 size={18} />,
      },
      {
        label: "Активные",
        value: active,
        unit: "шт.",
        trend: active ? `${active} сейчас` : "0",
        trendDirection: active ? ("up" as const) : ("flat" as const),
        icon: <Flame size={18} />,
      },
      {
        label: "На паузе",
        value: paused,
        unit: "шт.",
        trend: paused ? `${paused} шт.` : "0",
        trendDirection: paused ? ("down" as const) : ("flat" as const),
        icon: <Clock size={18} />,
      },
    ];
  }, [items]);

  const topCourses = useMemo(() => items.slice(0, 4), [items]);
  const ongoing = useMemo(() => items.find((i) => i.status === "active") || items[0], [items]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        {/* left */}
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">Обзор</div>

          </div>

          <AddTopicCard />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                unit={m.unit}
                trend={m.trend}
                trendDirection={m.trendDirection}
                icon={m.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm font-semibold">Мои темы</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topCourses.map((it) => (
                  <CourseOverviewCard
                    key={it.id}
                    title={it.title}
                    category={it.category}
                    dueDate={it.dueDate}
                    status={it.status}
                    tags={it.tags}
                  />
                ))}
              </div>
            </div>

            <MonthCalendar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ActivityTimeline />
            <TodoToday />
          </div>
        </div>

        {/* right */}
        <div className="space-y-4">
        </div>
      </div>
    </div>
  );
}
