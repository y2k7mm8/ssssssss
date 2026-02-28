import React, { useEffect, useMemo, useRef, useState } from "react";
import { LineChart } from "lucide-react";

const points = [
  { x: 0, y: 100, label: "0ч" },
  { x: 1, y: 58, label: "1д" },
  { x: 2, y: 45, label: "2д" },
  { x: 6, y: 36, label: "6д" },
  { x: 31, y: 20, label: "31д" },
];

function buildScales(w: number, h: number, padL: number, padT: number, padR: number, padB: number) {
  const maxX = 31;
  const maxY = 100;
  const sx = (x: number) => padL + (x / maxX) * (w - padL - padR);
  const sy = (y: number) => padT + (1 - y / maxY) * (h - padT - padB);
  return { sx, sy };
}

function pathFor(w: number, h: number, padL: number, padT: number, padR: number, padB: number) {
  const { sx, sy } = buildScales(w, h, padL, padT, padR, padB);
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(" ");
}

export function ForgettingCurveSection() {
  const W = 520;
  const H = 280;

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCompact(w < 420);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // More left padding on small screens so Y labels don't clip
  const padL = compact ? 50 : 44;
  const padR = 16;
  const padT = 18;
  const padB = 34;

  const { sx, sy } = useMemo(() => buildScales(W, H, padL, padT, padR, padB), [padL, padT, padR, padB]);
  const path = useMemo(() => pathFor(W, H, padL, padT, padR, padB), [padL, padT, padR, padB]);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [tip, setTip] = useState<{ left: number; top: number } | null>(null);

  const onEnter = (idx: number) => {
    setHoverIdx(idx);
    const box = boxRef.current;
    if (!box) return;

    const cx = (sx(points[idx].x) / W) * box.clientWidth;
    const cy = (sy(points[idx].y) / H) * box.clientHeight;

    const tipW = 156;
    const tipH = 56;

    const left = Math.min(Math.max(cx - tipW / 2, 8), box.clientWidth - tipW - 8);
    const top = Math.max(cy - tipH - 12, 8);

    setTip({ left, top });
  };

  const onLeave = () => {
    setHoverIdx(null);
    setTip(null);
  };

  const yTicks = compact ? [0, 50, 100] : [0, 25, 50, 75, 100];
  const xLabels = compact ? points.filter((p) => [0, 1, 6, 31].includes(p.x)) : points;

  return (
    <section className="rounded-xl2 border border-stroke2 bg-surface shadow-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold tracking-tight">Кривая забывания</div>
          <div className="text-sm text-muted mt-1">
            Наведи на точки, чтобы увидеть удержание. Используется для выбора интервала повторения.
          </div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-stroke2 flex items-center justify-center">
          <LineChart size={18} className="text-accent" />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-stroke2 bg-bg p-4">
        <div className="text-sm font-semibold">График удержания информации</div>

        <div ref={boxRef} className="mt-3 rounded-xl border border-stroke2 bg-surface p-3 overflow-hidden relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* grid + y labels */}
            {yTicks.map((t) => {
              const y = sy(t);
              return (
                <g key={t}>
                  <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(17,24,39,0.10)" strokeDasharray="4 6" />
                  <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="12" fill="rgba(17,24,39,0.55)">
                    {t}%
                  </text>
                </g>
              );
            })}

            {/* axes */}
            <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="rgba(17,24,39,0.25)" />
            <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="rgba(17,24,39,0.25)" />

            {/* line */}
            <path d={path} fill="none" stroke="#F43F5E" strokeWidth="4" />

            {/* points */}
            {points.map((p, idx) => {
              const cx = sx(p.x);
              const cy = sy(p.y);
              const active = hoverIdx === idx;
              return (
                <g key={p.label}>
                  <circle cx={cx} cy={cy} r={active ? 9 : 7} fill="#F43F5E" />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="transparent"
                    onMouseEnter={() => onEnter(idx)}
                    onMouseLeave={onLeave}
                  />
                </g>
              );
            })}

            {/* x labels */}
            {xLabels.map((p) => {
              const cx = sx(p.x);
              return (
                <text key={p.label} x={cx} y={H - 10} textAnchor="middle" fontSize="12" fill="rgba(17,24,39,0.55)">
                  {p.label}
                </text>
              );
            })}
          </svg>

          {hoverIdx !== null && tip && (
            <div
              className="absolute rounded-xl border border-stroke2 bg-surface shadow-card px-3 py-2 text-sm pointer-events-none"
              style={{ left: tip.left, top: tip.top, width: 156 }}
            >
              <div className="text-xs text-muted">{points[hoverIdx].label}</div>
              <div className="font-semibold">Удержание: {points[hoverIdx].y}%</div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted mt-3">
          Подсказка: при падении удержания ниже ~50% планируй повторение.
        </div>
      </div>
    </section>
  );
}
