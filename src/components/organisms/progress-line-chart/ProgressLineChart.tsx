import React, { useMemo, useState } from "react";
import { useItemsStore } from "../../../lib/items-store/ItemsStore";
import { buildDailySeries } from "../../../lib/progress";
import { Segmented } from "../../atoms/segmented/Segmented";
import { cn } from "../../../lib/cn";

type RangeKey = "7" | "30" | "90";

function fmtShort(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  return `${d}.${String(m).padStart(2, "0")}`;
}

export function ProgressLineChart() {
  const { items } = useItemsStore();
  const [range, setRange] = useState<RangeKey>("30");

  const series = useMemo(() => buildDailySeries(items, Number(range)), [items, range]);

  const max = Math.max(1, ...series.map((p) => p.completed));
  const padX = 26;
  const padY = 18;
  const w = 760;
  const h = 260;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  const pts = series.map((p, i) => {
    const x = padX + (i / Math.max(1, series.length - 1)) * innerW;
    const y = padY + (1 - p.completed / max) * innerH;
    return { ...p, x, y };
  });

  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Прогресс по датам</div>
          <div className="text-xs text-muted mt-1">Сколько задач было завершено за день.</div>
        </div>

        <Segmented
          value={range}
          onChange={(v) => setRange(v as RangeKey)}
          items={[
            { value: "7", label: "7 дней" },
            { value: "30", label: "30 дней" },
            { value: "90", label: "90 дней" },
          ]}
        />
      </div>

      <div className="mt-4 w-full overflow-hidden">
        <div className="w-full">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full h-auto"
            onMouseLeave={() => setHover(null)}
          >
            {/* grid */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = padY + (1 - t) * innerH;
              return (
                <g key={t}>
                  <line x1={padX} y1={y} x2={padX + innerW} y2={y} stroke="rgba(0,0,0,0.08)" strokeDasharray="4 6" />
                  <text x={6} y={y + 4} fontSize="11" fill="rgba(0,0,0,0.45)">
                    {Math.round(t * max)} шт.
                  </text>
                </g>
              );
            })}

            {/* axis labels */}
            {pts.map((p, i) => {
              if (series.length > 35 && i % 7 !== 0 && i !== series.length - 1) return null;
              if (series.length <= 35 && i % 5 !== 0 && i !== series.length - 1) return null;
              return (
                <text
                  key={p.date}
                  x={p.x}
                  y={h - 4}
                  fontSize="11"
                  textAnchor="middle"
                  fill="rgba(0,0,0,0.45)"
                >
                  {fmtShort(p.date)}
                </text>
              );
            })}

            {/* line */}
            <path d={path} fill="none" stroke="rgb(16,185,129)" strokeWidth="4" strokeLinecap="round" />
            {/* points */}
            {pts.map((p, i) => (
              <circle
                key={p.date}
                cx={p.x}
                cy={p.y}
                r={hover === i ? 8 : 6}
                fill={hover === i ? "rgb(16,185,129)" : "rgba(16,185,129,0.85)"}
                stroke="white"
                strokeWidth="3"
                onMouseMove={() => setHover(i)}
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* tooltip */}
            {hover !== null && pts[hover] && (
              <g>
                <rect
                  x={Math.min(w - 190, Math.max(12, pts[hover].x - 90))}
                  y={Math.max(10, pts[hover].y - 56)}
                  width="180"
                  height="44"
                  rx="12"
                  fill="white"
                  stroke="rgba(0,0,0,0.12)"
                />
                <text
                  x={Math.min(w - 190, Math.max(12, pts[hover].x - 90)) + 12}
                  y={Math.max(10, pts[hover].y - 56) + 18}
                  fontSize="12"
                  fill="rgba(0,0,0,0.7)"
                >
                  {pts[hover].date}
                </text>
                <text
                  x={Math.min(w - 190, Math.max(12, pts[hover].x - 90)) + 12}
                  y={Math.max(10, pts[hover].y - 56) + 34}
                  fontSize="13"
                  fontWeight="700"
                  fill="rgba(0,0,0,0.9)"
                >
                  Завершено: {pts[hover].completed} шт.
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className={cn("mt-3 text-xs text-muted")}>
        Подсказка: меняй период и наведи на точки, чтобы увидеть значения.
      </div>
    </div>
  );
}
