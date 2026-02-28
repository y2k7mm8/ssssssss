import React from "react";
import { Input } from "../../atoms/input/Input";
import { Button } from "../../atoms/button/Button";
import { IconButton } from "../../atoms/icon-button/IconButton";
import { Bell, Search, Settings, UserCircle, Menu } from "lucide-react";

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 w-full">
        <div className="lg:hidden">
          <IconButton aria-label="Открыть меню" onClick={onOpenSidebar}>
            <Menu size={18} />
          </IconButton>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <Input className="pl-10" placeholder="Поиск по темам, планам, заметкам" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" aria-label="Уведомления">
          <Bell size={18} />
        </Button>
        <Button variant="ghost" aria-label="Настройки">
          <Settings size={18} />
        </Button>
        <Button variant="ghost" aria-label="Профиль">
          <UserCircle size={18} />
        </Button>
      </div>
    </div>
  );
}
