"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlgoConfig {
  id: string;
  lang: string;
  filename: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeLines: string[];
}

const ALGO_REGISTRY: AlgoConfig[] = [
  {
    id: "bubble",
    lang: "C++",
    filename: "bubble_sort.cpp",
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    codeLines: [
      "void bubbleSort(vector<int>& arr) {",
      "    int n = arr.size();",
      "    for (int i = 0; i < n - 1; i++) {",
      "        if (arr[j] > arr[j + 1]) {",
      "            swap(arr[j], arr[j + 1]);",
      "        }",
      "    }",
      "}",
    ],
  },
  {
    id: "binary",
    lang: "Python",
    filename: "binary_search.py",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeLines: [
      "def binary_search(arr, target):",
      "    low, high = 0, len(arr) - 1",
      "    while low <= high:",
      "        mid = (low + high) // 2",
      "        if arr[mid] == target:",
      "            return mid",
      "        elif arr[mid] < target:",
      "            low = mid + 1",
    ],
  },
];

export default function LiveCodingExperience() {
  const [algoIdx, setAlgoIdx] = useState(0);
  const currentAlgo = ALGO_REGISTRY[algoIdx];

  // --- ALGORITHM LIVE STATES ---
  // Bubble Sort States
  const [sortArray, setSortArray] = useState<number[]>([
    74, 22, 90, 45, 12, 60, 38,
  ]);
  const [bubbleI, setBubbleI] = useState(0);
  const [bubbleJ, setBubbleJ] = useState(0);
  const [sortActiveLine, setSortActiveLine] = useState(2);

  // Binary Search States
  const [searchArray] = useState<number[]>([
    12, 22, 38, 45, 56, 60, 74, 82, 90,
  ]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(8);
  const [mid, setMid] = useState(4);
  const [searchActiveLine, setSearchActiveLine] = useState(1);
  const target = 60;

  // Global Pipeline Loop Controller
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentAlgo.id === "bubble") {
      let localArr = [...sortArray];
      let i = bubbleI;
      let j = bubbleJ;

      interval = setInterval(() => {
        if (i < localArr.length - 1) {
          setSortActiveLine(3); // Evaluating condition

          if (j < localArr.length - i - 1) {
            if (localArr[j] > localArr[j + 1]) {
              setSortActiveLine(4); // Trigger swap line highlight
              const temp = localArr[j];
              localArr[j] = localArr[j + 1];
              localArr[j + 1] = temp;
              setSortArray([...localArr]);
            }
            j++;
            setBubbleJ(j);
          } else {
            j = 0;
            i++;
            setBubbleJ(j);
            setBubbleI(i);
          }
        } else {
          // Reset array and move to next algorithm
          clearInterval(interval);
          setTimeout(() => {
            setSortArray([74, 22, 90, 45, 12, 60, 38]);
            setBubbleI(0);
            setBubbleJ(0);
            setAlgoIdx(1);
          }, 1200);
        }
      }, 800);
    } else if (currentAlgo.id === "binary") {
      let l = low;
      let h = high;

      interval = setInterval(() => {
        if (l <= h) {
          setSearchActiveLine(3); // Loop condition verification
          const m = Math.floor((l + h) / 2);
          setMid(m);
          setSearchActiveLine(4); // Calculated mid pointer

          setTimeout(() => {
            if (searchArray[m] === target) {
              setSearchActiveLine(5); // Return statement match
              clearInterval(interval);
              setTimeout(() => {
                setLow(0);
                setHigh(8);
                setMid(4);
                setAlgoIdx(0);
              }, 2000);
            } else if (searchArray[m] < target) {
              setSearchActiveLine(7); // Shifting bounds
              l = m + 1;
              setLow(l);
            } else {
              h = m - 1;
              setHigh(h);
            }
          }, 400);
        } else {
          clearInterval(interval);
          setLow(0);
          setHigh(8);
          setMid(4);
          setAlgoIdx(0);
        }
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [algoIdx, bubbleI, bubbleJ, low, high]);

  const currentActiveLine =
    currentAlgo.id === "bubble" ? sortActiveLine : searchActiveLine;

  return (
    <section id="visualizer" className="relative w-full min-h-screen bg-transparent py-20 px-4 sm:px-12 md:px-20 flex flex-col justify-between overflow-hidden antialiased select-none font-sans border-t border-zinc-900/40">
      {/* MONOCHROME COMPOSITE LAYOUT MESH BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1b1f_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1f_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-35" />
        <span className="absolute top-8 left-12 font-mono text-[7.5px] tracking-[0.3em] text-zinc-700">
          CORE_ENGINE // ENGINE_LIVE_ACTIVE
        </span>
      </div>

      {/* MINIMALIST EDITORIAL INTRO HEADLINE */}
      <div className="w-full flex flex-col items-start gap-3 z-10 relative mb-12">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span className="font-mono text-[8.5px] font-black tracking-[0.35em] text-zinc-500 uppercase">
            Live Compilation // Live Computational Engine
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-200">
          Code and visual logic,{" "}
          <span className="uppercase font-mono font-semibold block bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,5vw,5.5rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
            fully synchronized
          </span>
        </h2>
      </div>

      {/* DETAILED DOUBLE-PANEL EXPERIMENTAL WORKSPACE ARCHITECTURE */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-10 relative min-h-125">
        {/* PANEL LEFT: PRODUCTION GRADE INTERACTIVE TEXT COMPILER EDITOR */}
        <div className="lg:col-span-5 rounded-2xl bg-[#060608]/50 border border-zinc-900/90 backdrop-blur-md flex flex-col shadow-2xl overflow-hidden">
          <div className="w-full border-b border-zinc-900/80 bg-[#08080a] px-4 py-2.5 flex items-center justify-between font-mono text-[9px]">
            <div className="flex items-center gap-2.5 px-3 py-1 bg-[#050507] border border-zinc-900 rounded-lg text-zinc-300 font-medium">
              <span className="text-cyan-400 text-[8.5px] font-bold uppercase">
                {currentAlgo.lang}
              </span>
              <span className="text-zinc-500">/</span>
              <span>{currentAlgo.filename}</span>
            </div>
          </div>

          {/* Code Render Line Execution Field */}
          <div className="flex-1 p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-y-auto">
            {currentAlgo.codeLines.map((line, idx) => {
              const isCurrentLine = idx === currentActiveLine;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 w-full px-1.5 rounded transition-all duration-300 ${
                    isCurrentLine
                      ? "bg-cyan-500/5 border-l-2 border-cyan-400 pl-1"
                      : "border-l-2 border-transparent"
                  }`}
                >
                  <span
                    className={`w-5 text-right opacity-30 text-[10px] ${isCurrentLine ? "text-cyan-400 opacity-80 font-bold" : "text-zinc-600"}`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <pre
                    className={`tracking-wide whitespace-pre ${isCurrentLine ? "text-cyan-200 font-medium" : "text-zinc-400"}`}
                  >
                    {line}
                  </pre>
                </div>
              );
            })}
          </div>

          {/* Realtime Live Evaluator Tracking Matrix Overlay */}
          <div className="border-t border-zinc-900 bg-[#070709]/80 p-4 font-mono text-[9px] grid grid-cols-2 gap-y-1.5 gap-x-4 text-zinc-500">
            {currentAlgo.id === "bubble" ? (
              <>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>index_i:</span>
                  <span className="text-zinc-300">{bubbleI}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>index_j:</span>
                  <span className="text-cyan-400 font-bold">{bubbleJ}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>arr[j]:</span>
                  <span className="text-zinc-300">{sortArray[bubbleJ]}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>status:</span>
                  <span className="text-emerald-400 uppercase font-black">
                    MUTATING
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>ptr_low:</span>
                  <span className="text-zinc-300">{low}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>ptr_high:</span>
                  <span className="text-zinc-300">{high}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>ptr_mid:</span>
                  <span className="text-cyan-400 font-bold">{mid}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/40 pb-1">
                  <span>target_val:</span>
                  <span className="text-amber-400">{target}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PANEL RIGHT: LIVE FUNCTIONING KINETIC SIMULATOR VISUALIZATION */}
        <div className="lg:col-span-7 rounded-2xl bg-[#050507]/20 border border-zinc-900/60 backdrop-blur-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] flex flex-col justify-between overflow-hidden p-6">
          <div className="w-full flex justify-between items-center font-mono text-[9px] border-b border-zinc-900/40 pb-4">
            <div className="flex gap-6 text-zinc-500">
              <span>
                TIME_COMPLEXITY:{" "}
                <strong className="text-zinc-300">
                  {currentAlgo.timeComplexity}
                </strong>
              </span>
              <span>
                SPACE_COMPLEXITY:{" "}
                <strong className="text-zinc-300">
                  {currentAlgo.spaceComplexity}
                </strong>
              </span>
            </div>
            <span className="text-[8px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 tracking-wider uppercase">
              {currentAlgo.id}_MATRIX
            </span>
          </div>

          {/* ACTIVE GRAPH RE-LAYERING CANVAS ENGINE PLATFORM */}
          <div className="flex-1 w-full flex items-center justify-center p-4 min-h-65">
            <AnimatePresence mode="wait">
              {/* RENDER GRAPH A: FULLY DYNAMIC BUBBLE SORT CORE ARRAY SWAPS */}
              {currentAlgo.id === "bubble" && (
                <motion.div
                  key="b_sort_live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-end gap-2.5 h-40 w-full max-w-sm px-2"
                >
                  {sortArray.map((val, idx) => {
                    const isScanning = idx === bubbleJ || idx === bubbleJ + 1;
                    return (
                      <motion.div
                        key={idx}
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        style={{ height: `${val}%` }}
                        className={`flex-1 rounded-t-[3px] transition-colors duration-300 relative ${
                          isScanning
                            ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                            : "bg-zinc-900/80 border border-zinc-800/40"
                        }`}
                      >
                        <span
                          className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[7.5px] font-mono font-bold ${isScanning ? "text-cyan-400" : "text-zinc-600"}`}
                        >
                          {val}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* RENDER GRAPH B: LIVE CALCULATION BINARY SEARCH INDEX COLLAPSE */}
              {currentAlgo.id === "binary" && (
                <motion.div
                  key="b_search_live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6 items-center justify-center w-full max-w-md"
                >
                  <div className="flex gap-1.5 w-full justify-between">
                    {searchArray.map((val, idx) => {
                      const isMid = idx === mid;
                      const isOutOfRange = idx < low || idx > high;
                      return (
                        <motion.div
                          key={idx}
                          animate={{ scale: isMid ? 1.1 : 1 }}
                          className={`h-7 w-7 rounded border text-[8.5px] font-mono font-bold flex flex-col items-center justify-center transition-all duration-300 ${
                            isMid
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                              : isOutOfRange
                                ? "bg-zinc-950/20 border-zinc-950 text-zinc-800 opacity-20"
                                : "bg-[#09090d] border-zinc-800 text-zinc-300"
                          }`}
                        >
                          <span>{val}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex gap-8 font-mono text-[7px] text-zinc-600 uppercase tracking-wider">
                    <span>LOW_BOUND: {low}</span>
                    <span className="text-cyan-400 font-bold">
                      MIDPOINT: {mid}
                    </span>
                    <span>HIGH_BOUND: {high}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full flex justify-between font-mono text-[7.5px] text-zinc-700/80 border-t border-zinc-900/40 pt-3">
            <span>PIPELINE_RESOLVER_STATE: SUCCESS</span>
            <span>DATASTREAM_BUFFER_OK</span>
          </div>
        </div>
      </div>

      {/* COMPRESS FOOTER LOG DATA LAYERS */}
      <div className="w-full mt-14 flex flex-wrap gap-y-4 items-center justify-between border-t border-zinc-900/60 pt-5 z-10 relative">
        <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-600 uppercase font-black">
          AlgoViz Integrated Development Matrix // Core Functional Simulator
        </span>
      </div>
    </section>
  );
}
