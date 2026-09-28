"use client";

import { motion } from "framer-motion";
import { AnimationStep } from "@/app/types/visualizer";
import MergeSortTreeCanvas from "./MergeSortTreeCanvas";
import HeapSortTreeCanvas from "./HeapSortTreeCanvas";


interface VisualizerCanvasProps {
  activeStep: AnimationStep | null;
  selectedAlgorithm?: string | null;
}

export default function VisualizerCanvas({
  activeStep,
  selectedAlgorithm,
}: VisualizerCanvasProps) {
  if (!activeStep) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-300 font-mono text-sm bg-[#080811] rounded-2xl border border-white/10">
        No active animation
      </div>
    );
  }

  // 1. RECURSION TREE CANVAS (Strictly for Merge Sort now)
  if (selectedAlgorithm === "mergeSort" && activeStep.treeData) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
        {/* ACTION COMMENTARY BAR */}
        <div className="h-9 px-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 mb-3 shrink-0">
          <span className="truncate">
            <strong className="text-emerald-400 mr-2">Action:</strong>
            {activeStep.description || "Ready"}
          </span>
        </div>

        {/* TREE CANVAS */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
          <MergeSortTreeCanvas
            treeData={activeStep.treeData}
            activeNodeID={activeStep.activeNodeID}
          />
        </div>
      </div>
    );
  }

  if(selectedAlgorithm === "heapSort") {
    return <HeapSortTreeCanvas step={activeStep}/>
  }

  // 2. STANDARD ARRAY BARS CANVAS (QuickSort, BubbleSort, etc.)
  const {
    array = [],
    comparing = [],
    highlights = [],
    swapping = [],
    sorted = [],
    sortedIndices = [],
    range,
    description,
    pivotIndex,
    pointers,
  } = activeStep;

  const activeComparing = comparing.length > 0 ? comparing : highlights;
  const activeSorted = sorted.length > 0 ? sorted : sortedIndices;

  const maxValue = Math.max(...array, 100);

  const getBarColor = (index: number) => {
    // 1. Sorted Check
    if (activeSorted?.includes(index)) {
      return "bg-emerald-500 border-emerald-400 shadow-emerald-500/20";
    }
    // 2. Pivot Check (Crucial for QuickSort)
    if (pivotIndex === index) {
      return "bg-fuchsia-500 border-fuchsia-400 shadow-fuchsia-500/30 scale-105 z-20";
    }
    // 3. Swapping / Overwriting Check
    if (swapping?.includes(index)) {
      return "bg-rose-500 border-rose-400 shadow-rose-500/30 scale-105 z-10";
    }
    // 4. Comparing Check
    if (activeComparing?.includes(index)) {
      return "bg-amber-400 border-amber-300 shadow-amber-400/30 scale-105 z-10";
    }
    // 5. Sub-array Range Check
    if (range && index >= range[0] && index <= range[1]) {
      return "bg-indigo-500 border-indigo-400 shadow-indigo-500/20";
    }
    // 6. Out of current range active opacity
    if (range) {
      return "bg-indigo-950/40 border-indigo-900/30 opacity-40";
    }

    // Default State
    return "bg-indigo-600/80 border-indigo-500/50 shadow-indigo-500/10";
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
      {/* ACTION COMMENTARY BAR */}
      <div className="h-9 px-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
        <span className="truncate">
          <strong className="text-emerald-400 mr-2">Action:</strong>
          {description || "Ready"}
        </span>
      </div>

      {/* BARS CONTAINER */}
      <div className="flex-1 flex items-end justify-center gap-2 md:gap-3 py-6 min-h-62.5">
        {array.map((value, idx) => {
          const heightPercent = Math.max((value / maxValue) * 100, 10);

          return (
            <div
              key={`bar-wrapper-${idx}`}
              className="flex flex-col items-center flex-1 max-w-11 h-full justify-end"
            >
              {/* Value Label */}
              <span className="text-[11px] font-mono text-slate-400 font-bold mb-1.5">
                {value}
              </span>

              {/* Animated Bar */}
              <motion.div
                layout
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-md border transition-colors duration-200 shadow-lg ${getBarColor(
                  idx
                )}`}
              />

              {/* Index Label */}
              <span className="text-[9px] font-mono text-slate-600 mt-1.5">
                [{idx}]
              </span>

              {/* Pointers (i and j for QuickSort) */}
              <div className="h-4 mt-1 flex gap-1 justify-center w-full">
                {pointers?.i === idx && (
                  <span className="text-[10px] font-mono font-bold text-rose-400">
                    i
                  </span>
                )}
                {pointers?.j === idx && (
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    j
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* COLOR LEGEND */}
      <div className="flex items-center justify-center gap-6 border-t border-white/5 pt-3 text-[11px] font-mono text-slate-400 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-indigo-500" /> Default
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-fuchsia-500" /> Pivot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-400" /> Comparing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500" /> Swapping
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Sorted
        </span>
      </div>
    </div>
  );
}
