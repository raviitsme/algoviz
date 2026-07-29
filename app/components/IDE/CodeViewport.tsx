// src/app/components/IDE/CodeViewport.tsx
"use client";

import React from "react";
import { CodeLine } from "@/app/types/componentsType";

interface CodeViewportProps {
  codeLines: CodeLine[];
  currentLine: number;
}

export default function CodeViewport({ codeLines, currentLine }: CodeViewportProps) {
  return (
    <div className="bg-zinc-950/50 border border-zinc-900 rounded-xl p-4 flex-1 flex flex-col justify-center min-w-0">
      <div className="text-[9px] text-zinc-600 font-bold mb-4 border-b border-zinc-900 pb-1.5 uppercase tracking-widest text-left">
        Algorithm Scope // bubble_sort.cpp
      </div>
      
      {/* Added horizontal scroll management and scrollbar configurations here */}
      <div className="flex flex-col gap-2 text-xs font-medium text-zinc-500 text-left overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pb-2">
        {codeLines.map((line, index) => {
          const isLineActive = index === currentLine;

          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 px-2 py-0.5 rounded transition-all duration-300 min-w-max ${
                isLineActive ? "text-white font-bold bg-zinc-900/70 shadow-[inset_1.5px_0_0_#10b981]" : ""
              }`}
            >
              <span className="w-3 text-right text-[9px] text-zinc-700 font-mono select-none">{index + 1}</span>
              <span className="font-mono tracking-wide whitespace-pre">
                {line.text}
                {line.token && <span className={isLineActive ? "text-emerald-400" : "text-zinc-400"}>{line.token}</span>}
                {line.end}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}