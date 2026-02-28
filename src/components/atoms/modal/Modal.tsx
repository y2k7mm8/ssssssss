import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/cn";

export function Modal({
  open,
  title,
  children,
  onClose,
  footer,
  widthClass = "max-w-lg",
}: {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  widthClass?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "w-full rounded-xl2 border border-stroke2 bg-surface shadow-card",
            widthClass,
          )}
        >
          {title && (
            <div className="p-5 border-b border-stroke2 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{title}</div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-xl border border-stroke2 bg-surface hover:bg-black/5 transition"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
          )}
          <div className="p-5">{children}</div>
          {footer && (
            <div className="p-5 border-t border-stroke2">{footer}</div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
