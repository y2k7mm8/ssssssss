import React from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import {
  LayoutDashboard,
  BookOpen,
  LineChart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ListTodo,
} from "lucide-react";
import { IconButton } from "../../atoms/icon-button/IconButton";

const items = [
  { to: "/dashboard", label: "Дашборд", Icon: LayoutDashboard },
  { to: "/items", label: "Каталог", Icon: ListTodo },
  { to: "/explanation", label: "Объяснение", Icon: BookOpen },
  { to: "/progress", label: "Прогресс", Icon: LineChart },
];

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  isMobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const width = collapsed ? "w-[84px]" : "w-64";

  return (
    <>
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/30 transition-opacity",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onCloseMobile}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50",
          "bg-surface border-r border-stroke2",
          "transition-all",
          width,
          isMobileOpen ? "block" : "hidden lg:block"
        )}
      >
        <div className="h-full flex flex-col p-3">
          <div className={cn("flex", collapsed ? "flex-col items-center gap-3" : "items-center justify-between gap-2")}>
            <Link to="/" className={cn("flex items-center gap-2 min-w-0", collapsed && "justify-center")}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-stroke2 shrink-0">
                <Sparkles size={18} className="text-accent" />
              </span>

              {!collapsed && (
                <span className="text-sm font-bold tracking-tight truncate">
                  RE:<span className="text-accent">Mind</span>
                </span>
              )}
            </Link>

            <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
              <div className="lg:hidden">
                <IconButton size="sm" aria-label="Закрыть меню" onClick={onCloseMobile}>
                  <X size={18} />
                </IconButton>
              </div>

              <div className="hidden lg:block">
                <IconButton
                  size="sm"
                  aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
                  onClick={onToggleCollapsed}
                >
                  {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </IconButton>
              </div>
            </div>
          </div>

          {!collapsed && <div className="mt-5 text-xs text-muted">Разделы</div>}

          <nav className={cn("mt-3 space-y-1", collapsed && "mt-6 space-y-2")}>
            {items.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-text hover:bg-black/5 transition",
                    "border border-transparent",
                    isActive && "text-text bg-black/5 border-stroke2",
                    collapsed && "px-0 justify-center"
                  )
                }
                title={collapsed ? label : undefined}
              >
                <Icon size={20} className="text-muted" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />
        </div>
      </aside>
    </>
  );
}
