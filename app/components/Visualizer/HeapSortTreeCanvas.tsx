"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimationStep } from "@/app/types/visualizer";

interface HeapSortTreeCanvasProps {
  step: AnimationStep;
}

export default function HeapSortTreeCanvas({ step }: HeapSortTreeCanvasProps) {
  const {
    array = [],
    comparing = [],
    swapping = [],
    sorted = [],
    sortedIndices = [],
    range,
    description,
  } = step;

  const activeSorted = sorted.length > 0 ? sorted : sortedIndices;
  const isFullySorted = activeSorted.length === array.length && array.length > 0;

  // Calculate coordinates relative to container width percentage and level depth
  const getNodePosition = (index: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelIndex = index - (Math.pow(2, level) - 1);
    const totalNodesInLevel = Math.pow(2, level);

    const sectionWidth = 100 / totalNodesInLevel;
    const xPercent = (levelIndex + 0.5) * sectionWidth;
    const yPx = level * 65 + 40;

    return { xPercent, yPx };
  };

  // 1. FINAL STEP: Switch to Array Bars view when fully sorted
  if (isFullySorted) {
    const maxValue = Math.max(...array, 100);

    return (
      <div className="w-full h-full flex flex-col justify-between p-5 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
        {/* ACTION COMMENTARY BAR */}
        <div className="w-full h-9 px-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 shrink-0 z-20">
          <span className="truncate">
            <strong className="text-emerald-400 mr-2">Action:</strong>
            {description || "Complete heap sorted! All values are sorted in order."}
          </span>
        </div>

        {/* ARRAY BARS VIEW */}
        <div className="flex-1 flex items-end justify-center gap-2 md:gap-3 py-6 min-h-[280px]">
          {array.map((value, idx) => {
            const heightPercent = Math.max((value / maxValue) * 100, 10);

            return (
              <div
                key={`sorted-bar-${idx}`}
                className="flex flex-col items-center flex-1 max-w-11 h-full justify-end"
              >
                <span className="text-[11px] font-mono text-slate-400 font-bold mb-1.5">
                  {value}
                </span>

                <motion.div
                  layout
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full rounded-t-md border bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                />

                <span className="text-[9px] font-mono text-slate-600 mt-1.5">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="flex items-center justify-center gap-5 border-t border-white/5 pt-3 text-[11px] font-mono text-slate-400 shrink-0 flex-wrap w-full z-20">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald-500" /> Complete Sorted Array
          </span>
        </div>
      </div>
    );
  }

  // 2. ACTIVE HEAPIFICATION STEP: Display Binary Tree view
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
      {/* ACTION COMMENTARY BAR */}
      <div className="w-full h-9 px-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 shrink-0 z-20">
        <span className="truncate">
          <strong className="text-emerald-400 mr-2">Action:</strong>
          {description || "Ready"}
        </span>
      </div>

      {/* TREE CANVAS AREA */}
      <div className="flex-1 w-full relative min-h-[300px] my-auto">
        {/* SVG CONNECTING LINES */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {array.map((_, idx) => {
            const leftChild = 2 * idx + 1;
            const rightChild = 2 * idx + 2;
            const parent = getNodePosition(idx);

            // Hide connections for elements outside active heap size
            const isParentInHeap = range ? idx >= range[0] && idx <= range[1] : true;
            if (!isParentInHeap) return null;

            return (
              <React.Fragment key={`edges-${idx}`}>
                {leftChild < array.length && (range ? leftChild <= range[1] : true) && (() => {
                  const child = getNodePosition(leftChild);
                  return (
                    <line
                      x1={`${parent.xPercent}%`}
                      y1={`${parent.yPx}px`}
                      x2={`${child.xPercent}%`}
                      y2={`${child.yPx}px`}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="2"
                    />
                  );
                })()}

                {rightChild < array.length && (range ? rightChild <= range[1] : true) && (() => {
                  const child = getNodePosition(rightChild);
                  return (
                    <line
                      x1={`${parent.xPercent}%`}
                      y1={`${parent.yPx}px`}
                      x2={`${child.xPercent}%`}
                      y2={`${child.yPx}px`}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="2"
                    />
                  );
                })()}
              </React.Fragment>
            );
          })}
        </svg>

        {/* TREE CIRCLE NODES */}
        {array.map((val, idx) => {
          const { xPercent, yPx } = getNodePosition(idx);
          const isSorted = activeSorted.includes(idx);
          const isComparing = comparing.includes(idx);
          const isSwapping = swapping.includes(idx);
          const isInHeap = range ? idx >= range[0] && idx <= range[1] : true;

          let nodeStyle = "bg-indigo-600/30 border-indigo-500 text-indigo-200";

          if (isSwapping) {
            nodeStyle = "bg-rose-500/30 border-rose-400 text-rose-300 ring-4 ring-rose-500/30 scale-110 shadow-[0_0_15px_rgba(244,63,94,0.4)] z-30";
          } else if (isComparing) {
            nodeStyle = "bg-amber-500/30 border-amber-400 text-amber-300 ring-4 ring-amber-500/30 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.4)] z-30";
          } else if (isSorted || !isInHeap) {
            nodeStyle = "bg-slate-900/60 border-slate-700/50 text-slate-500 opacity-40 scale-90 z-10";
          }

          return (
            <motion.div
              key={`node-${idx}`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                left: `${xPercent}%`,
                top: `${yPx}px`,
              }}
              className={`absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-xs backdrop-blur-md transition-colors ${nodeStyle}`}
            >
              <span>{val}</span>
              <span className="text-[9px] opacity-60 font-normal">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>

      {/* COLOR LEGEND */}
      <div className="flex items-center justify-center gap-5 border-t border-white/5 pt-3 text-[11px] font-mono text-slate-400 shrink-0 flex-wrap w-full z-20">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-indigo-500" /> Active Max-Heap
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-400" /> Heapifying
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500" /> Swapping
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-700" /> Extracted Node
        </span>
      </div>
    </div>
  );
}