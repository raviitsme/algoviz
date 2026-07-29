"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CodeLine } from "../../types/componentsType";
import { generateBubbleSortTimeline } from "../../helpers/bubbleSortEngine";
import { AnimatePresence, motion } from "framer-motion";
import CodeViewport from "./CodeViewport";
import ConsoleLogger from "./ConsoleLogger";

interface IDEMainProps {
  codeLines: CodeLine[];
  initialArray: number[];
}

export default function IDE({ codeLines, initialArray }: IDEMainProps) {
  const timeline = useMemo(
    () => generateBubbleSortTimeline(initialArray),
    [initialArray],
  );
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % timeline.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, timeline.length]);

  const currentFrame = timeline[stepIndex] || timeline[0];

  return (
    // 🛠️ FIX 1: Upgraded wrapper to premium glassmorphism to allow global canvas matrix layers to bleed through
    <div className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-5 text-zinc-200 font-mono shadow-2xl relative flex flex-col gap-5 overflow-hidden backdrop-blur-xl">
      
      {/* Top Header Panel */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <div className="flex flex-col text-left">
          <span className="text-xs font-black tracking-widest text-zinc-200 uppercase">
            ALGOVIZ // BUBBLE_SORT
          </span>
          <span className="text-[9px] text-zinc-500 font-sans tracking-wide mt-0.5">
            Automated Array Loop Engine
          </span>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs text-zinc-400 hover:text-zinc-100 px-3 py-1 rounded-lg transition-colors cursor-pointer outline-none"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(false);
            }}
            className="text-xs text-zinc-500 hover:text-zinc-100 px-2 py-1 rounded-lg transition-colors cursor-pointer outline-none"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid Deck */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">

        {/* GRAPHICAL SIMULATION CANVAS */}
        {/* 🛠️ FIX 2: Replaced invalid 'min-h-55' class with standard arbitrary height bracket 'min-h-[220px]' */}
        <div className="xl:col-span-6 bg-zinc-950/40 border border-zinc-900/80 rounded-xl p-4 flex flex-col justify-center items-center relative min-h-[220px] overflow-hidden shadow-inner">
          <div className="absolute top-3 left-3 text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
            Visual Array Heap // Sandbox View
          </div>

          {/* Dynamic centering bounds container */}
          <div className="relative w-full min-h-24 flex items-center justify-center mt-6 overflow-x-auto scrollbar-none">
            
            {/* 🛠️ FIX 3: Replaced uncompiled 'w-67.5' with explicit arbitrary width bracket matching sorting scale layout */}
            <div className="relative h-12 w-[270px]">
              <AnimatePresence mode="popLayout">
                {currentFrame?.activeNodes?.map((node) => {
                  const isHighlighted = currentFrame.highlightNodeIds?.includes(
                    node.id,
                  );

                  return (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                      className={`absolute h-12 w-12 text-xs font-black flex items-center justify-center border transition-colors duration-300 rounded-lg ${
                        isHighlighted
                          ? "bg-zinc-900 border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-105"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400"
                      }`}
                      style={{ left: `${node.x}px`, top: `0px` }}
                    >
                      {node.label}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* COMPILER DESK SYNTAX VIEWPORT */}
        <div className="xl:col-span-6 flex flex-col gap-3">
          <CodeViewport
            codeLines={codeLines}
            currentLine={currentFrame?.currentCodeLine}
          />
        </div>
      </div>

      {/* INTERPRETER CONSOLE LOGGER */}
      <ConsoleLogger message={currentFrame?.message} />
    </div>
  );
}