// src/app/components/IDE/ConsoleLogger.tsx
"use client";

import React from "react";
import { Terminal } from "lucide-react";

interface ConsoleLoggerProps {
  message: string;
}

export default function ConsoleLogger({ message }: ConsoleLoggerProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 flex items-start gap-3 text-[11px] text-left leading-relaxed shadow-inner">
      {/* Terminal Icon Wrapper */}
      <div className="p-1 rounded-md bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
        <Terminal className="h-3.5 w-3.5 text-zinc-500" />
      </div>
      
      {/* Log Feed */}
      <div className="flex flex-col">
        <span className="text-[8px] text-zinc-600 font-bold tracking-wider mb-0.5">
          THREAD_STACK_INTERPRETER_LOG
        </span>
        <span className="text-zinc-300 font-medium tracking-wide">
          {message}
        </span>
      </div>
    </div>
  );
}