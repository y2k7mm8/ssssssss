import React from "react";
import { ProgressLineChart } from "../components/organisms/progress-line-chart/ProgressLineChart";
import { MonthCalendar } from "../components/organisms/month-calendar/MonthCalendar";

export function ProgressPage() {
  return (
    <div className="space-y-4">
      <ProgressLineChart />
      <MonthCalendar />
    </div>
  );
}
