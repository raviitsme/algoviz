"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlgoItem {
  id: string;
  title: string;
  category:
    | "Structures"
    | "Sorting"
    | "Searching"
    | "Trees"
    | "Graphs"
    | "DP"
    | "Advanced";
  desc: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  vizCount: number;
}

const LIBRARY_DATA: AlgoItem[] = [
  {
    id: "arrays",
    title: "Arrays & Layouts",
    category: "Structures",
    desc: "Contiguous memory blocks mapped linearly with instant index resolution vectors.",
    difficulty: "Easy",
    duration: "45m",
    vizCount: 4,
  },
  {
    id: "sorting",
    title: "Sorting Paradigms",
    category: "Sorting",
    desc: "Kinetic rearrangement bounds comparing operational stability thresholds.",
    difficulty: "Medium",
    duration: "1.5h",
    vizCount: 6,
  },
  {
    id: "graphs",
    title: "Graph Networks & Topology",
    category: "Graphs",
    desc: "Adjacency matrix allocations exploring mesh traversals and absolute node weights.",
    difficulty: "Hard",
    duration: "2h",
    vizCount: 8,
  },
  {
    id: "binary_search",
    title: "Binary Space Search",
    category: "Searching",
    desc: "Logarithmic constraint collapse reducing complexity intervals efficiently.",
    difficulty: "Easy",
    duration: "40m",
    vizCount: 3,
  },
  {
    id: "bst",
    title: "Binary Search Trees",
    category: "Trees",
    desc: "Hierarchical balanced data pointers optimizing directional branch selection.",
    difficulty: "Medium",
    duration: "1h",
    vizCount: 5,
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    category: "DP",
    desc: "Overlapping subproblem resolution caching optimization matrices.",
    difficulty: "Hard",
    duration: "3h",
    vizCount: 9,
  },
  {
    id: "linked_list",
    title: "Linked Pointers",
    category: "Structures",
    desc: "Dynamic node mutation flows linked via continuous heap addresses.",
    difficulty: "Easy",
    duration: "30m",
    vizCount: 2,
  },
  {
    id: "stack",
    title: "Stack Memory Frames",
    category: "Structures",
    desc: "LIFO execution boundaries mimicking runtime call stack push/pop mutations.",
    difficulty: "Easy",
    duration: "25m",
    vizCount: 2,
  },
  {
    id: "segment_tree",
    title: "Segment Tree Bounds",
    category: "Advanced",
    desc: "Advanced vector interval queries executing sub-logarithmic modifications.",
    difficulty: "Hard",
    duration: "2.5h",
    vizCount: 4,
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Structures",
  "Sorting",
  "Searching",
  "Trees",
  "Graphs",
  "DP",
  "Advanced",
];

export default function AlgorithmLibrary() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = useMemo(() => {
    return LIBRARY_DATA.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.category === activeFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="algorithms" className="relative w-full min-h-screen bg-transparent py-28 px-4 sm:px-12 md:px-24 flex flex-col justify-between overflow-hidden antialiased select-none font-sans">
      {/* BACKGROUND MESH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-size-[4.5rem_4.5rem] opacity-35" />
      </div>

      {/* HEADER */}
      <div className="w-full max-w-5xl flex flex-col items-start gap-5 z-10 relative mb-16">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70 shadow-[0_0_8px_#22d3ee]" />
          <span className="font-mono text-[8.5px] font-black tracking-[0.4em] text-zinc-500 uppercase">
            Library // Interactive Animations
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-code font-extralight tracking-tight text-zinc-100 leading-tight">
          Explore the Building Blocks of {' '}
          <span className="uppercase font-semibold bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,5vw,5.5rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
                Computer Science
              </span> 
        </h1>
      </div>

      {/* SEARCH / FILTERS */}
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-zinc-900/60 pb-6 mb-12 z-10 relative">
        <div className="flex flex-wrap gap-2">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider rounded-lg border transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-zinc-900 text-white border-zinc-700"
                  : "bg-[#060608]/20 text-zinc-500 border-zinc-900 hover:text-zinc-300 hover:border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search algorithms..."
            className="w-full bg-[#050507]/40 border border-zinc-900/80 rounded-xl pl-4 pr-12 py-2 font-mono text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors duration-300"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-[8px] text-zinc-600 bg-zinc-950 px-1.5 py-0.5 border border-zinc-900 rounded-md">
            ⌘K
          </div>
        </div>
      </div>

      {/* FULL-WIDTH STACKED LIST */}
      <motion.div
        layout
        className="w-full flex flex-col gap-4 z-10 relative min-h-100"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group w-full cursor-pointer rounded-2xl border border-zinc-900/80 bg-[#060608]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-500 hover:border-zinc-800 hover:bg-[#07070b]/30 hover:backdrop-blur-md relative overflow-hidden"
              >
                {/* Left side Metadata */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[8px] tracking-widest text-zinc-600 uppercase font-black">
                      // {item.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[7.5px] uppercase font-bold tracking-wider ${
                        item.difficulty === "Easy"
                          ? "border-zinc-800 text-green-400"
                          : item.difficulty === "Medium"
                            ? "border-cyan-500/10 text-yellow-400/80"
                            : "border-emerald-500/10 text-red-400"
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-light tracking-tight text-zinc-200 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed tracking-wide font-light max-w-2xl">
                    {item.desc}
                  </p>
                </div>

                {/* Right side Matrix & Visuals */}
                <div className="flex items-center gap-8 self-stretch sm:self-auto justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 border-zinc-900/40 pt-4 sm:pt-0">
                  <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-[8px] text-zinc-600">
                    <span>
                      TIME:{" "}
                      <strong className="text-zinc-400 font-normal">
                        {item.duration}
                      </strong>
                    </span>
                    <span>
                      VIZ_MODES:{" "}
                      <strong className="text-zinc-400 font-normal">
                        {item.vizCount}x
                      </strong>
                    </span>
                  </div>

                  {/* HIGH-QUALITY CUSTOM VISUALIZERS */}
                  <div className="w-16 h-10 rounded border border-zinc-900/80 bg-[#040406] flex items-center justify-center overflow-hidden relative">
                    {/* Arrays Animation */}
                    {item.id === "arrays" && (
                      <div className="flex gap-0.5 w-10 justify-center">
                        {[0, 1, 2, 3].map((x) => (
                          <motion.span
                            key={x}
                            animate={{
                              backgroundColor: [
                                "#1e1e24",
                                "#22d3ee",
                                "#1e1e24",
                              ],
                            }}
                            transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              delay: x * 0.2,
                            }}
                            className="w-2 h-3 rounded-sm border border-zinc-900"
                          />
                        ))}
                      </div>
                    )}

                    {/* Sorting Animation */}
                    {item.id === "sorting" && (
                      <div className="flex items-end gap-0.5 h-4 w-6">
                        <span className="w-1 h-2 bg-zinc-800 group-hover:bg-cyan-400 group-hover:h-3 transition-all duration-300" />
                        <span className="w-1 h-4 bg-zinc-800 group-hover:bg-cyan-400 group-hover:h-1 transition-all duration-300" />
                        <span className="w-1 h-1 bg-zinc-800 group-hover:bg-cyan-400 group-hover:h-4 transition-all duration-300" />
                        <span className="w-1 h-3 bg-zinc-800 group-hover:bg-cyan-400 group-hover:h-2 transition-all duration-300" />
                      </div>
                    )}

                    {/* Graphs Animation */}
                    {item.id === "graphs" && (
                      <div className="relative w-6 h-6">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1 h-1 rounded-full bg-cyan-400 absolute top-1 left-1"
                        />
                        <span className="w-1 h-1 rounded-full bg-zinc-700 absolute bottom-1 right-1" />
                        <span className="w-1 h-1 rounded-full bg-zinc-700 absolute top-3 right-1" />
                        <svg className="w-full h-full stroke-zinc-800 stroke-[0.8] fill-none">
                          <path d="M6,6 L18,18 M6,6 L18,12" />
                        </svg>
                      </div>
                    )}

                    {/* Binary Search Animation */}
                    {item.id === "binary_search" && (
                      <div className="w-10 h-2 border border-zinc-900 rounded relative flex items-center bg-zinc-950">
                        <motion.div
                          animate={{ left: ["0%", "50%", "0%"] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="h-full w-4 bg-cyan-500/20 absolute rounded-sm border-x border-cyan-400/40"
                        />
                      </div>
                    )}

                    {/* Binary Search Tree Animation */}
                    {item.id === "bst" && (
                      <div className="relative w-8 h-6 flex flex-col items-center justify-between">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
                        <div className="w-full flex justify-between px-1">
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1 rounded-full bg-zinc-600"
                          />
                          <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        </div>
                      </div>
                    )}

                    {/* Dynamic Programming Animation */}
                    {item.id === "dp" && (
                      <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="bg-zinc-800 border border-zinc-900 rounded-sm"
                          />
                        ))}
                      </div>
                    )}

                    {/* Linked List Animation */}
                    {item.id === "linked_list" && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded bg-zinc-800 border border-zinc-700" />
                        <motion.span
                          animate={{ x: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-zinc-700 text-[6px]"
                        >
                          ➔
                        </motion.span>
                        <span className="w-2 h-2 rounded bg-zinc-900 border border-zinc-800" />
                      </div>
                    )}

                    {/* Stack Animation */}
                    {item.id === "stack" && (
                      <div className="w-4 h-6 border-b border-x border-zinc-800 flex flex-col justify-end gap-0.5 p-0.5">
                        <motion.span
                          animate={{ y: [-4, 0, -4] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-full h-1.5 bg-cyan-500/30 border border-cyan-400/40 rounded-xs"
                        />
                        <span className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-xs" />
                      </div>
                    )}

                    {/* Segment Tree Animation */}
                    {item.id === "segment_tree" && (
                      <div className="w-8 h-4 border-t border-zinc-800 relative">
                        <motion.div
                          animate={{ x: ["0%", "70%", "0%"] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-2 h-full bg-zinc-900 border-x border-zinc-800 absolute top-0"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-zinc-500 group-hover:text-cyan-400 transition-colors duration-300">
                    <motion.span
                      variants={{ hover: { x: 3.5 } }}
                      className="text-[10px] font-sans font-bold"
                    >
                      ➔
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  whileHover="hover"
                  className="absolute inset-0 pointer-events-none"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
