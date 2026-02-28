import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/organisms/sidebar/Sidebar";
import { Topbar } from "../components/organisms/topbar/Topbar";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const sidebarWidth = collapsed ? 84 : 256;

  return (
    <div className="min-h-full" style={{ ["--mf-sidebar" as any]: `${sidebarWidth}px` }}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="w-full px-4 py-6">
        <div className="space-y-4 lg:pl-[calc(var(--mf-sidebar))] max-w-screen-2xl w-full mx-auto">
          <Topbar onOpenSidebar={() => setMobileOpen(true)} />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
