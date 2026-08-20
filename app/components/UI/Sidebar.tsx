"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Binary,
  Cpu,
  Layers,
  Network,
  Play,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const MENU_OPTIONS = [
  {
    title: "Sorting",
    icon: <BarChart3 className="text-emerald-400 size-5 shrink-0" />,
    items: [
      { name: "Bubble Sort" },
      { name: "Merge Sort" },
      { name: "Quick Sort" },
      { name: "Heap Sort" },
    ],
  },
  {
    title: "Searching",
    icon: <Binary className="text-cyan-400 size-5 shrink-0" />,
    items: [{ name: "Binary Search" }, { name: "Linear Search" }],
  },
  {
    title: "Graph Algorithms",
    icon: <Network className="text-indigo-400 size-5 shrink-0" />,
    items: [
      { name: "Breadth-First Search (BFS)" },
      { name: "Depth-First Search (DFS)" },
      { name: "Dijkstra's Algorithm" },
      { name: "A* Search" },
    ],
  },
  {
    title: "Dynamic Programming",
    icon: <Cpu className="text-amber-400 size-5 shrink-0" />,
    items: [
      { name: "0/1 Knapsack" },
      { name: "Longest Common Subsequence" },
      { name: "Coin Change" },
    ],
  },
  {
    title: "Data Structures",
    icon: <Layers className="text-fuchsia-400 size-5 shrink-0" />,
    items: [
      { name: "Binary Search Tree" },
      { name: "Stack & Queue" },
      { name: "Linked List" },
    ],
  },
  {
    title: "Settings",
    icon: <Settings className="text-slate-400 size-5 shrink-0" />,
    items: [{ name: "Animation Speed" }, { name: "Theme / Colors" }],
  },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [openDropDown, setOpenDropDown] = useState<string | null>(null);

  const toggleDropDown = (title: string) => {
    if (!isHovered) setIsHovered(true);
    setOpenDropDown((prev) => (prev === title ? null : title));
  };

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setOpenDropDown(null);
      }}
      animate={{ width: isHovered ? 260 : 64 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen bg-[#080811] border-r border-white/10 flex flex-col p-3 overflow-hidden select-none shrink-0"
    >
      {/* APP LOGO & BRANDING */}
      <div className="flex items-center gap-3 h-10 w-full px-1 shrink-0">
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <Sparkles className="w-7 h-7 text-emerald-500" />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-black tracking-tight whitespace-nowrap overflow-hidden"
            >
              Algo
              <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
                Viz
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* MENU NAVIGATION ITEMS */}
      <div className="w-full h-full my-2 flex flex-col gap-1 overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {MENU_OPTIONS.map((menu) => (
          <div key={menu.title} className="flex flex-col">
            {/* Parent Item */}
            <button
              onClick={() => toggleDropDown(menu.title)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-slate-300 hover:text-white"
            >
              {menu.icon}

              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-medium whitespace-nowrap overflow-hidden text-left flex-1"
                  >
                    {menu.title}
                  </motion.span>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ChevronDown
                      className={`size-5 transition-transform duration-150 ${
                        openDropDown === menu.title
                          ? "rotate-180 text-gray-300"
                          : "rotate-0 text-green-500"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Sub-Items Dropdown Accordion */}
            <AnimatePresence>
              {isHovered && openDropDown === menu.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pl-9 pr-2 py-1 flex flex-col gap-1 overflow-hidden"
                >
                  {menu.items.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => console.log("Selected:", subItem.name)}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-emerald-500/10 hover:text-emerald-400 text-xs text-slate-400 transition-all text-left cursor-pointer"
                    >
                      <Play className="size-3 text-emerald-400/70" />
                      <span className="whitespace-normal wrap-break-word leading-tight flex-1">
                        {subItem.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
