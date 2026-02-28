import React from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../../lib/cn";

const nav = [
  { to: "/dashboard", label: "Дашборд" },
  { to: "/study-plan", label: "План" },
  { to: "/explanation", label: "Объяснение" },
  { to: "/writing", label: "Письмо" },
  { to: "/progress", label: "Прогресс" },
];

export function Header() {
  return (
    <header className="border-b border-stroke bg-bg">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-tight">
          RE:<span className="text-accent">Mind</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-xl text-sm text-muted hover:text-text hover:bg-black/5 transition",
                  isActive && "text-text bg-black/5"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="px-3 py-2 rounded-xl text-sm border border-stroke hover:bg-black/5 transition">
          Войти
        </Link>
      </div>
    </header>
  );
}
