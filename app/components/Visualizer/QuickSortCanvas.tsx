// components/visualizer/QuickSortCanvas.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimationStep } from "@/app/types/visualizer";

interface QuickSortCanvasProps {
  step: AnimationStep;
}

export default function QuickSortCanvas({ step }: QuickSortCanvasProps) {
  const {
    array = [],
    comparing = [],
    swapping = [],
    pivotIndex,
    sortedIndices = [],
    pointers,
    range,
  } = step;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
      {/* Array Bars / Cards */}
      <div className="flex items-end gap-3 h-64">
        {array.map((val, idx) => {
          const isPivot = idx === pivotIndex;
          const isComparing = comparing.includes(idx);
          const isSwapping = swapping.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          const isInRange = range ? idx >= range[0] && idx <= range[1] : true;

          let cardStyle = "bg-slate-800 border-slate-700 text-slate-300";

          if (isPivot) {
            cardStyle = "bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-400";
          } else if (isSwapping) {
            cardStyle = "bg-rose-500/20 border-rose-500 text-rose-300 ring-2 ring-rose-400";
          } else if (isComparing) {
            cardStyle = "bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-2 ring-indigo-400";
          } else if (isSorted) {
            cardStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
          } else if (!isInRange) {
            cardStyle = "bg-slate-900/40 border-slate-800 text-slate-600 opacity-40";
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                animate={{ scale: isPivot || isComparing || isSwapping ? 1.12 : 1 }}
                className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md transition-colors ${cardStyle}`}
              >
                <span>{val}</span>
                <span className="text-[10px] opacity-50 font-normal">[{idx}]</span>
              </motion.div>

              {/* Pointer Badges (i and j) */}
              <div className="h-6 flex gap-1 items-center font-mono text-[11px] font-bold">
                {pointers?.i === idx && (
                  <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300">
                    i
                  </span>
                )}
                {pointers?.j === idx && (
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/50 text-indigo-300">
                    j
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}