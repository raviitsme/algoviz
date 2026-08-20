"use client";
import { motion } from "framer-motion";
import { AnimationStep } from "@/app/types/visualizer";

interface VisualizerCanvasProps {
  activeStep: AnimationStep | null;
}

export default function VisualizerCanvas({
  activeStep,
}: VisualizerCanvasProps) {
  if (!activeStep) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-300 font-mono text-sm">
        No active animation
      </div>
    );
  }

  const { array, comparing, swapping, sorted, description } = activeStep;
  const maxValue = Math.max(...array, 100);

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) {
      return "bg-emerald-500 border-emerald-400 shadow-emerald-500/20";
    }
    if (swapping.includes(index)) {
      return "bg-rose-500 border-rose-400 shadow-rose-500/30 scale-105 z-10";
    }
    if (comparing.includes(index)) {
      return "bg-amber-400 border-amber-300 shadow-amber-400/30 scale-105 z-10";
    }
    return "bg-indigo-600/80 border-indigo-500/50 shadow-indigo-500/10";
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 bg-[#080811] rounded-2xl border border-white/10 relative overflow-hidden">
      <div className="h-9 px-3.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
        <span className="truncate">
          <strong className="text-emerald-400 mr-2">Action:</strong>
          {description || "Ready"}
        </span>
      </div>

      <div className="flex-1 flex items-end justify-center gap-2 md:gap-3 py-6 min-h-[250px]">
        {array.map((value, idx) => {
          const heightPercent = Math.max((value / maxValue) * 100, 10);

          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-1.5 flex-1 max-w-[44px] h-full justify-end"
            >
              <span className="text-[11px] font-mono text-slate-400 font-bold">
                {value}
              </span>

              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 25,
                }}
                style={{ height: `${heightPercent}` }}
                className={`w-full rounded-t-md border transition-colors duration-200 shadow-lg ${getBarColor(idx)}`}
              />
              <span className="text-[9px] font-mono text-slate-600">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6 border-t border-white/5 pt-3 text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-indigo-500" /> Default
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
