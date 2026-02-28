import React from "react";
import { cn } from "../../../lib/cn";

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-muted">
        Страница {page} из {pageCount}
      </div>

      <div className="flex items-center gap-2">
        <button
          className={cn(
            "h-9 px-3 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition text-sm",
            !canPrev && "opacity-50 pointer-events-none"
          )}
          onClick={() => onChange(page - 1)}
          type="button"
        >
          Назад
        </button>
        <button
          className={cn(
            "h-9 px-3 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition text-sm",
            !canNext && "opacity-50 pointer-events-none"
          )}
          onClick={() => onChange(page + 1)}
          type="button"
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}
