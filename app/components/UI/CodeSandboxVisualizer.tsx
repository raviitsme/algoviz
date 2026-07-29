"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSnippet {
  name: string;
  extension: string;
  code: string;
  clickTargetY: number; // The exact Y coordinate of the *next* language option in the dropdown
}

const SNIPPETS: Record<string, LanguageSnippet> = {
  cpp: {
    name: "C++",
    extension: "main.cpp",
    code: `#include <iostream>\n#include <vector>\n\nvoid bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                std::swap(arr[j], arr[j+1]);\n            }\n        }\n    }\n}`,
    clickTargetY: 108, // Coordinates calculated to click "Java" next
  },
  java: {
    name: "Java",
    extension: "Solution.java",
    code: `public class Solution {\n    public int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
    clickTargetY: 120, // Coordinates calculated to click "JavaScript" next
  },
  javascript: {
    name: "JavaScript",
    extension: "app.js",
    code: `function fibonacci(n) {\n    const table = Array(n + 1).fill(0);\n    table[1] = 1;\n    for (let i = 2; i <= n; i++) {\n        table[i] = table[i - 1] + table[i - 2];\n    }\n    return table[n];\n}`,
    clickTargetY: 152, // Coordinates calculated to click "Python" next
  },
  python: {
    name: "Python",
    extension: "main.py",
    code: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
    clickTargetY: 85, // Coordinates calculated to loop back up and click "C++" next
  },
};

export default function CodeSandboxVisualizer() {
  const [activeKey, setActiveKey] = useState<string>("cpp");
  const [displayText, setDisplayText] = useState<string>(" ");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  
  // Track cursor position coordinates (X, Y) relative to the top-left of the card
  const [cursor, setCursor] = useState({ x: 200, y: 150, opacity: 0 });

  const currentSnippet = SNIPPETS[activeKey];

  useEffect(() => {
    let isMounted = true;
    let currIdx = 0;
    let timeout: NodeJS.Timeout;

    const typeCode = async () => {
      if (!isMounted) return;

      if (currIdx <= currentSnippet.code.length) {
        setDisplayText(currentSnippet.code.slice(0, currIdx));
        currIdx++;
        timeout = setTimeout(typeCode, 12);
      } else {
        // --- DYNAMIC PIPELINE TIMELINE ---
        
        // 1. Pause after text finishes typing so it's readable
        await new Promise((r) => setTimeout(r, 2000));
        if (!isMounted) return;

        // 2. Make cursor materialize and glide up to the dropdown header button position
        setCursor({ x: 620, y: 28, opacity: 1 });
        await new Promise((r) => setTimeout(r, 700));
        if (!isMounted) return;

        // 3. Simulated trigger event to open the drop selection panel
        setIsMenuOpen(true);
        setHoveredKey(null); // Keep items unhighlighted initially
        await new Promise((r) => setTimeout(r, 400));
        if (!isMounted) return;

        // 4. Glide mouse cursor down onto the dynamic snippet item coordinate target
        const keys = Object.keys(SNIPPETS);
        const nextKey = keys[(keys.indexOf(activeKey) + 1) % keys.length];

        setCursor({ x: 620, y: currentSnippet.clickTargetY, opacity: 1 });
        await new Promise((r) => setTimeout(r, 600)); // Wait for pathing glide to complete
        if (!isMounted) return;

        // 5. Fire hover state highlight EXACTLY when the cursor settles
        setHoveredKey(nextKey);
        await new Promise((r) => setTimeout(r, 400)); // Visual click pause frame
        if (!isMounted) return;

        // 6. Close out systems cleanly and cycle indices
        setIsMenuOpen(false);
        setHoveredKey(null);
        setCursor((prev) => ({ ...prev, opacity: 0 }));

        await new Promise((r) => setTimeout(r, 200));
        if (!isMounted) return;
        
        setDisplayText("");
        setActiveKey(nextKey);
      }
    };

    typeCode();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [activeKey]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden min-h-95">
      
      {/* GLIDING INTERACTIVE MOUSE POINTER */}
      <motion.div
        animate={{ x: cursor.x, y: cursor.y, opacity: cursor.opacity }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
        className="absolute pointer-events-none z-50 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        style={{ left: 0, top: 0 }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M4.5 3V17l4.2-4.2 3.3 6.8 2.5-1.2-3.3-6.7 5.3-.1z"/>
        </svg>
      </motion.div>

      {/* HEADER BAR PLATFORM LAYER */}
      <div className="border-b border-zinc-900/80 pb-3 flex items-center justify-between relative z-30 select-none">
        <div>
          <span className="text-[11px] font-sans font-black tracking-widest bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-cyan-400 uppercase">
            One Editor, Mutiple Languages
          </span>
          <div className="text-[9px] font-mono text-zinc-600 mt-0.5">
            Target Workspace:{" "}
            <span className="text-zinc-400 font-bold">
              {currentSnippet.extension}
            </span>
          </div>
        </div>

        {/* COMPONENT DROPDOWN CONTROL SELECTION WRAPPER */}
        <div className="relative">
          <div className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg font-mono text-[10px] text-zinc-300 flex items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span className="tracking-wide font-bold">{currentSnippet.name}</span>
            <span className="text-zinc-600 text-[8px]">▼</span>
          </div>

          {/* DYNAMIC DROPDOWN MODAL WINDOW */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                className="absolute right-0 mt-1.5 w-28 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl p-1 z-40 font-mono text-[10px]"
              >
                {Object.keys(SNIPPETS).map((key) => {
                  const isCurrentlyHovered = key === hoveredKey;
                  return (
                    <div
                      key={key}
                      className={`px-2 py-1.5 rounded-md transition-colors duration-150 ${
                        isCurrentlyHovered 
                          ? "bg-zinc-800 text-cyan-400 font-bold" 
                          : "text-zinc-500"
                      }`}
                    >
                      {SNIPPETS[key].name}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* TEXT EDITOR MAIN WINDOW SCREEN */}
      <div className="flex-1 flex gap-4 pt-4 items-stretch overflow-hidden">
        <div className="flex-1 font-mono text-[11px] leading-relaxed p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl overflow-auto min-h-55 whitespace-pre text-zinc-200">
          {displayText}
          <span className="inline-block w-1 h-3.5 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
        </div>
      </div>

    </div>
  );
}
