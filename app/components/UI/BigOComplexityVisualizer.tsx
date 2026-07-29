"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ComplexityType = "constant" | "logarithmic" | "linear" | "logLinear" | "quadratic";

interface ComplexityProfile {
  label: string;
  notation: string;
  color: string;
  // The path string definition built using standard graph scaling proportions
  path: string;
  description: string;
}

const COMPLEXITY_PROFILES: Record<ComplexityType, ComplexityProfile> = {
  constant: {
    label: "Constant",
    notation: "O(1)",
    color: "stroke-emerald-400 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]",
    path: "M 40 160 L 360 160",
    description: "Execution time remains independent of data footprint scale.",
  },
  logarithmic: {
    label: "Logarithmic",
    notation: "O(log N)",
    color: "stroke-cyan-400 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]",
    path: "M 40 160 Q 60 80 360 70",
    description: "Input dataset splits iteratively (e.g., Binary Search). Highly efficient.",
  },
  linear: {
    label: "Linear",
    notation: "O(N)",
    color: "stroke-sky-400 text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]",
    path: "M 40 160 L 360 40",
    description: "Processing time scales in a direct 1:1 proportion with element count.",
  },
  logLinear: {
    label: "Log-Linear",
    notation: "O(N log N)",
    color: "stroke-violet-400 text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.3)]",
    path: "M 40 160 Q 180 100 280 20",
    description: "Standard bound for optimized sorting frameworks (e.g., Merge Sort).",
  },
  quadratic: {
    label: "Quadratic",
    notation: "O(N²)",
    color: "stroke-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.3)]",
    path: "M 40 160 Q 160 160 180 20",
    description: "Nested execution passes over the collection space. Scales poorly.",
  },
};

export default function BigOComplexityVisualizer() {
  // Cycle through different modes automatically to simulate real-time analysis updates
  const [activeComplexity, setActiveComplexity] = useState<ComplexityType>("linear");
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    const sequence: ComplexityType[] = ["constant", "logarithmic", "linear", "logLinear", "quadratic"];
    let idx = 2; // Start on Linear O(N) matching your target reference frame

    const interval = setInterval(() => {
      setIsScanning(true);
      
      // Short delay frame window simulating calculation delay before locking onto the final type
      setTimeout(() => {
        idx = (idx + 1) % sequence.length;
        setActiveComplexity(sequence[idx]);
        setIsScanning(false);
      }, 800);

    }, 5000); // Shift example every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentProfile = COMPLEXITY_PROFILES[activeComplexity];

  return (
    <div className="w-full p-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col gap-4 relative overflow-hidden select-none">
      
      {/* HEADER META PROMPT CARD */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div>
          <span className="text-[10px] font-sans font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 uppercase">
            Asymptotic Evaluator
          </span>
          <div className="text-[11px] font-mono mt-0.5 text-zinc-400 flex items-center gap-1.5">
            Target Bounds: 
            <span className={`font-bold transition-all duration-300 ${isScanning ? "text-zinc-600 animate-pulse" : currentProfile.color.split(" ")[1]}`}>
              {isScanning ? "COMPUTING..." : currentProfile.notation}
            </span>
          </div>
        </div>
        
        <div className={`text-[9px] font-mono border px-2 py-0.5 rounded-md transition-colors duration-300 ${
          isScanning 
            ? "bg-zinc-900 border-zinc-800 text-zinc-500 animate-pulse" 
            : "bg-zinc-900/40 border-zinc-900 text-zinc-400"
        }`}>
          {isScanning ? "SCANNING" : currentProfile.label}
        </div>
      </div>

      {/* GRAPH CANVAS BOUNDS */}
      <div className="relative w-full bg-zinc-950/20 border border-zinc-900/60 rounded-xl p-2 h-44 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 400 180" className="w-full h-full fill-none">
          
          {/* FLOOR GRID SYSTEM GUIDES */}
          <g stroke="#141416" strokeWidth="1">
            <line x1="40" y1="20" x2="360" y2="20" />
            <line x1="40" y1="90" x2="360" y2="90" />
            <line x1="40" y1="160" x2="360" y2="160" />
            <line x1="40" y1="20" x2="40" y2="160" stroke="#1c1c1e" />
            <line x1="360" y1="20" x2="360" y2="160" stroke="#1c1c1e" />
          </g>

          {/* INACTIVE BACKGROUND TRACK LINES (Low opacity references) */}
          {Object.entries(COMPLEXITY_PROFILES).map(([key, profile]) => {
            const isTarget = key === activeComplexity;
            return (
              <path
                key={key}
                d={profile.path}
                stroke={isTarget && !isScanning ? "transparent" : "#222226"}
                strokeWidth={isTarget ? "1" : "1.5"}
                strokeDasharray={isTarget ? "0" : "3 3"}
                className="transition-all duration-300"
              />
            );
          })}

          {/* DYNAMICALLY ACTIVE ACQUIRED COMPLEXITY VECTOR LINE */}
          {!isScanning && (
            <motion.path
              layoutId="activeComplexityLine"
              d={currentProfile.path}
              className={`fill-none stroke-[2.5] ${currentProfile.color.split(" ").slice(0, 2).join(" ")}`}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </svg>

        {/* NOTATION RENDERING LABELS ON AXIS FLOORS */}
        <div className="absolute right-4 top-2 text-[9px] font-mono font-bold text-zinc-800 tracking-wider">O(N²)</div>
        <div className="absolute right-20 top-2 text-[9px] font-mono font-bold text-zinc-800 tracking-wider">O(N log N)</div>
        <div className="absolute right-4 top-10 text-[9px] font-mono font-bold text-zinc-700 tracking-wider">O(N)</div>
        <div className="absolute right-4 bottom-14 text-[9px] font-mono font-bold text-zinc-800 tracking-wider">O(log N)</div>
        <div className="absolute right-4 bottom-6 text-[9px] font-mono font-bold text-zinc-800 tracking-wider">O(1)</div>
      </div>

      {/* FOOTER INTERACTIVE DESCRIPTION BLOCK */}
      <div className="p-3 bg-zinc-900/30 border border-zinc-900/80 rounded-xl min-h-12 flex flex-col justify-center">
        <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-wider">
          Asymptotic Analysis Note:
        </span>
        <p className="text-[10px] font-mono text-zinc-400 mt-0.5 leading-relaxed transition-opacity duration-200">
          {isScanning ? "Recalculating branch operational trajectories..." : currentProfile.description}
        </p>
      </div>

    </div>
  );
}