"use client";

import React from "react";
import RecursionVisualizer from "../UI/RecursionVisualizer";
import CodeSandboxVisualizer from "../UI/CodeSandboxVisualizer";
import BigOComplexityVisualizer from "../UI/BigOComplexityVisualizer";
import AICodeAuditor from "../UI/AICodeAuditor";

export default function Features() {
  return (
    // 🛠️ FIX: Changed bg-[#09090b] to bg-transparent so the global blueprint mesh canvas bleeds through seamlessly
    <section id="features" className="relative z-10 p-16 sm:px-24 md:px-32 bg-transparent text-white w-full flex flex-col gap-20 overflow-hidden antialiased">
      
      {/* STEP 1: THE GRAND LUXURY FEATURES HEADER */}
      <div className="w-full max-w-5xl flex flex-col gap-6 select-none border-b border-zinc-900 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/60 w-fit backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
            Engine Infrastructure // FEATURES OVERHEAD
          </span>
        </div>
        
        {/* BIG HERO HEADING */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-zinc-200 font-sans">
          Engineered to dismantle <br />
          <span className="font-semibold text-white bg-clip-text bg-linear-to-r from-zinc-100 via-zinc-300 to-zinc-500">
            complex <span className="uppercase bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,5vw,5.5rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
                algorithmic
              </span> runtime.
          </span>
        </h1>

        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-2xl leading-relaxed tracking-wide mt-2">
          Visualize deep execution contexts, inspect frame allocations, trace recursion branches, 
          and watch data transformations in real-time—fully reactive, fully uncompromised.
        </p>
      </div>

      {/* THE ASYMMETRICAL INDUSTRIAL BENTO GRID */}
      <div className="grid grid-cols-12 gap-5 items-stretch w-full">
        {/* UPPER LEFT: Call Stack Analyzer */}
        {/* 🛠️ FIX: Added subtle glassmorphism backdrop blur to keep card elements readable over global grid */}
        <div className="col-span-12 lg:col-span-7 flex flex-col relative min-h-125 bg-zinc-900/30 border border-zinc-900/80 rounded-3xl p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md">
          <div className="p-6 pb-2 select-none">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              01 // Call Stack Analyzer
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              Real-time recursive thread parsing and contextual environment maps.
            </p>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden flex p-2">
            <RecursionVisualizer />
          </div>
        </div>

        {/* UPPER RIGHT: Complexity Tracker */}
        <div className="col-span-12 lg:col-span-5 w-full flex flex-col relative min-h-125 bg-zinc-900/20 border border-zinc-900/80 rounded-3xl p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md">
          <div className="p-6 pb-2 select-none">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              02 // Real Time Complexity Analyser
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              Dynamic operational footprint monitoring across scaling metrics.
            </p>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden flex p-2">
            <BigOComplexityVisualizer />
          </div>
        </div>

        {/* LOWER LEFT: Abstract Syntax Lexer */}
        <div className="col-span-12 lg:col-span-5 flex flex-col relative min-h-115 bg-zinc-900/30 border border-zinc-900/80 rounded-3xl p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md">
          <div className="p-6 pb-2 select-none">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              03 // Integrated AI optimization
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              Extreme micro level ai checks and corrections.
            </p>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden flex p-2">
            <AICodeAuditor />
          </div>
        </div>

        {/* LOWER RIGHT: Isolated Code Sandbox Workspace */}
        <div className="col-span-12 lg:col-span-7 flex flex-col relative min-h-115x bg-zinc-900/20 border border-zinc-900/80 rounded-3xl p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] backdrop-blur-md">
          <div className="p-6 pb-0 select-none flex items-center justify-between">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                04 // Isolated Code Playground
              </h3>
              <p className="text-[11px] font-mono text-zinc-500 mt-1">
                Multi-language code compilation execution frame environment.
              </p>
            </div>
            <div className="flex gap-1.5 opacity-40">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden flex p-4">
            <CodeSandboxVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}