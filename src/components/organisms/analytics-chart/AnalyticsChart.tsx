import React, { useMemo, useRef, useState } from "react";
import { Segmented } from "../../atoms/segmented/Segmented";
import { Select } from "../../atoms/select/Select";

type Range = "7" | "30" | "90";
type Metric = "retention" | "tasks" | "repeats";

function makeSeries(days: number, metric: Metric) {
  const today = new Date();
  const points = Array.from({ length: days }).map((_, i) => {
    const d = new Date(today.getTime() - (days - 1 - i) * 86400000);
    const date = d.toISOString().slice(0, 10);
    let v = 0;

    if (metric === "retention") {
      // smooth curve 55..92
      v = Math.round(70 + 18 * Math.sin(i / 6) + (i / days) * 6);
      v = Math.max(40, Math.min(98, v));
    } else if (metric === "tasks") {
      v = Math.round(6 + 3 * Math.sin(i / 4) + (i % 7 === 0 ? 3 : 0));
      v = Math.max(0, v);
    } else {
      v = Math.round(10 + 6 * Math.sin(i / 5) + (i % 9 === 0 ? 4 : 0));
      v = Math.max(0, v);
    }

    return { date, value: v };
  });

  return points;
}

export function AnalyticsChart() {
  const W = 760;
  const H = 260;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 32;

  const [range, setRange] = useState<Range>("30");
  const [metric, setMetric] = useState<Metric>("retention");

  const data = useMemo(() => makeSeries(Number(range), metric), [range, metric]);

  const min = useMemo(() => Math.min(...data.map((d) => d.value)), [data]);
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  const sx = (i: number) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const sy = (v: number) => padT + (1 - (v - min) / Math.max(1, max - min)) * (H - padT - padB);

  const path = data
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(i).toFixed(1)} ${sy(p.value).toFixed(1)}`)
    .join(" ");

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [tip, setTip] = useState<{ left: number; top: number } | null>(null);

  const unit = metric === "retention" ? "%" : "задач";

  const metricLabel =
    metric === "retention" ? "Удержание" : metric === "tasks" ? "Задачи" : "Повторения";

  const onMove = (idx: number) => {
    setHoverIdx(idx);
    const box = boxRef.current;
    if (!box) return;

    const cx = (sx(idx) / W) * box.clientWidth;
    const cy = (sy(data[idx].value) / H) * box.clientHeight;

    const tipW = 190;
    const tipH = 60;

    const left = Math.min(Math.max(cx - tipW / 2, 8), box.clientWidth - tipW - 8);
    const top = Math.max(cy - tipH - 12, 8);

    setTip({ left, top });
  };

  const onLeave = () => {
    setHoverIdx(null);
    setTip(null);
  };

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Аналитика</div>
          <div className="text-xs text-muted mt-1">Hover-подсказки, диапазон и выбор метрики.</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            value={range}
            onChange={setRange}
            options={[
              { value: "7", label: "7 дней" },
              { value: "30", label: "30 дней" },
              { value: "90", label: "90 дней" },
            ]}
          />
          <div className="w-[180px]">
            <Select value={metric} onChange={(e) => setMetric(e.target.value as Metric)}>
              <option value="retention">Удержание (%)</option>
              <option value="tasks">Задачи (шт.)</option>
              <option value="repeats">Повторения (шт.)</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-stroke2 bg-bg p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">{metricLabel}</div>
          <div className="text-xs text-muted">Единицы: {unit}</div>
        </div>

        <div ref={boxRef} className="mt-3 rounded-xl border border-stroke2 bg-surface p-3 relative overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* y grid */}
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padT + (i / 4) * (H - padT - padB);
              return (
                <line
                  key={i}
                  x1={padL}
                  y1={y}
                  x2={W - padR}
                  y2={y}
                  stroke="rgba(17,24,39,0.10)"
                  strokeDasharray="4 6"
                />
              );
            })}

            {/* axes */}
            <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="rgba(17,24,39,0.25)" />
            <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="rgba(17,24,39,0.25)" />

            {/* line */}
            <path d={path} fill="none" stroke="#14B8A6" strokeWidth="4" />

            {/* points */}
            {data.map((p, i) => {
              const cx = sx(i);
              const cy = sy(p.value);
              const active = hoverIdx === i;
              return (
                <g key={p.date}>
                  <circle cx={cx} cy={cy} r={active ? 7 : 5} fill="#14B8A6" />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="16"
                    fill="transparent"
                    onMouseEnter={() => onMove(i)}
                    onMouseLeave={onLeave}
                  />
                </g>
              );
            })}
          </svg>

          {hoverIdx !== null && tip && (
            <div
              className="absolute rounded-xl border border-stroke2 bg-surface shadow-card px-3 py-2 text-sm pointer-events-none"
              style={{ left: tip.left, top: tip.top, width: 190 }}
            >
              <div className="text-xs text-muted">{data[hoverIdx].date}</div>
              <div className="font-semibold">
                {metricLabel}: {data[hoverIdx].value} {unit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
