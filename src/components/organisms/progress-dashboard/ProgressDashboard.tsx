import React from "react";
import { ProgressStatCard } from "../../molecules/progress-stat-card/ProgressStatCard";

export function ProgressDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <ProgressStatCard title="📚 План выполнен" value={48} hint="Цель: 70% за неделю" />
      <ProgressStatCard title="🧠 Повторение" value={62} hint="Интервалы: 1 → 3 → 7 дней" />
      <ProgressStatCard title="✍ Письмо" value={35} hint="Сделай 2 проверки эссе" />
    </div>
  );
}
