"use client";

import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface MenuItems {
  title: string;
  icon: React.ReactNode;
  items?: { name: string; icon: React.ReactNode }[];
}

interface SidebarItemProps {
  menu: MenuItems;
  isOpen: boolean;
  isSidebarHovered: boolean;
  onToggle: (title: string) => void;
  onSelectSubItem?: (name: string) => void;
}

export default function SidebarItem({
  menu,
  isOpen,
  isSidebarHovered,
  onToggle,
  onSelectSubItem,
}: SidebarItemProps) {
  return (
    <div className="flex flex-col w-full scrollbar-none">
      <button
        onClick={() => onToggle(menu.title)}
        className="flex items-center justify-between gap-5 h-10 w-full p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-slate-300 hover:text-white"
      >
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            {menu.icon}
          </div>

          <div
            className={`transition-all duration-300 flex  ease-in-out overflow-hidden whitespace-nowrap ${isSidebarHovered ? "w-full opacity-100" : "w-0 opacity-0"}`}
          >
            {menu.title}
          </div>
        </div>
        <div>
          {menu.items && (
            <div
              className={`transition-all duration-300 overflow-hidden shrink-0 ${isSidebarHovered ? "opacity-100 pr-2" : "opacity-0 w-0"}`}
            >
              <ChevronDown
                className={`size-4 transition-all duration-200 ${isOpen ? "rotate-180 text-emerald-400" : "text-slate-500"}`}
              />
            </div>
          )}
        </div>
      </button>

      {isOpen && isSidebarHovered && menu.items && (
        <div className="flex flex-col gap-1 pl-10 py-1 transition-all">
            {menu.items.map((subItem, index) => (
                <button key={index} onClick={() => onSelectSubItem?.(subItem.name)} className="flex items-center gap-2 py-1.5 px-2 rounded-md text-xs font-mono text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer text-left">
                    {subItem.icon}
                    <span className="whitespace-nowrap">{subItem.name}</span>
                </button>
            ))}
        </div>
      )}
    </div>
  );
}
