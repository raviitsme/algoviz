"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface CodeLine {
  num: number;
  content: string;
}

export default function AICodeAuditor() {
  const [analysisActive, setAnalysisActive] = useState(false);
  const [showPatch, setShowPatch] = useState(false);

  const pristineCppCode: CodeLine[] = [
    { num: 1, content: "#include <bits/stdc++.h>" },
    { num: 2, content: "using namespace std;" },
    { num: 3, content: "" },
    { num: 4, content: "vector<int> twoSum(vector<int>& nums, int target) {" },
    { num: 5, content: "    int n = nums.size();" },
    { num: 6, content: "    for (int i = 0; i < n; i++) {" },
    { num: 7, content: "        for (let j = i + 1; j < n; j++) {" },
    { num: 8, content: "            if (nums[i] + nums[j] == target) {" },
    { num: 9, content: "                return {i, j};" },
    { num: 10, content: "            }" },
    { num: 11, content: "        }" },
    { num: 12, content: "    }" },
    { num: 13, content: "    return {};" },
    { num: 14, content: "}" },
  ];

  // Refactored optimized linear pipeline solution
  const optimizedCppCode: CodeLine[] = [
    { num: 1, content: "#include <bits/stdc++.h>" },
    { num: 2, content: "using namespace std;" },
    { num: 3, content: "" },
    { num: 4, content: "vector<int> twoSum(vector<int>& nums, int target) {" },
    { num: 5, content: "    unordered_map<int, int> numMap; // Key: Element, Value: Index" },
    { num: 6, content: "    int n = nums.size();" },
    { num: 7, content: "    for (int i = 0; i < n; i++) {" },
    { num: 8, content: "        int complement = target - nums[i];" },
    { num: 9, content: "        if (numMap.count(complement)) {" },
    { num: 10, content: "            return {numMap[complement], i};" },
    { num: 11, content: "        }" },
    { num: 12, content: "        numMap[nums[i]] = i;" },
    { num: 13, content: "    }" },
    { num: 14, content: "    return {};" },
    { num: 15, content: "}" },
  ];

  return (
    <div className="w-full h-full min-h-[460px] bg-[#050507] rounded-3xl px-6 pb-6 flex flex-col font-mono text-[11px] border border-zinc-900 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] text-zinc-400 overflow-hidden select-none relative">
      
      {/* HEADER CONTROLS */}
      <div className="border-b border-zinc-900 flex flex-col gap-1 pt-6 pb-3 shrink-0">
        <div>
          <span className="text-[11px] font-sans font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 uppercase">
            AI Code Analysis, One for All
          </span>
        </div>
        <p className="text-[0.6rem] text-zinc-600">
          Powerful AI to eliminate complexity
        </p>
      </div>

      {/* METRIC TAB ACTIONS STRIP */}
      <div className="w-full bg-[#08080a] border-b border-zinc-900/80 px-4 py-2 shrink-0 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-3 py-1 bg-[#050507] border border-zinc-900 rounded-lg text-[10px] text-zinc-300 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
            <span className="text-blue-400 text-[9px] font-bold">C++</span>
            <span>two_sum.cpp</span>
            <button 
              onClick={() => { setAnalysisActive(false); setShowPatch(false); }}
              className="text-zinc-600 hover:text-zinc-400 font-sans text-[9px] ml-1 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
          {showPatch && (
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md tracking-wide">
              ✦ OPTIMIZED
            </span>
          )}
        </div>

        {!showPatch ? (
          <button
            onClick={() => setAnalysisActive(true)}
            className={`text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-md transition-all cursor-pointer shadow-xs ${
              analysisActive 
                ? "text-amber-400 bg-amber-500/5 border border-amber-500/20" 
                : "text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800"
            }`}
          >
            {analysisActive ? "DIAGNOSTICS ACTIVE" : "RUN DIAGNOSTICS"}
          </button>
        ) : (
          <button
            onClick={() => {
              setAnalysisActive(false);
              setShowPatch(false);
            }}
            className="text-[9px] font-bold tracking-widest text-zinc-500 hover:text-zinc-400 bg-zinc-900/40 border border-zinc-900 px-3 py-1.5 rounded-md transition-all cursor-pointer"
          >
            RESET VIEW
          </button>
        )}
      </div>

      {/* THE CODE RECONSTRUCTION VIEWPORT */}
      <div className="flex-1 overflow-y-auto mt-4 bg-[#07070a]/30 border border-zinc-900/60 rounded-xl p-4 flex flex-col min-h-0 relative group custom-scrollbar">
        <div className="w-full overflow-x-auto scrollbar-none flex flex-col gap-0.5">
          
          {!showPatch ? (
            // STATE A: BRUTE SOLUTION VIEW
            pristineCppCode.map((line) => (
              <div key={line.num} className="w-full flex flex-col">
                <div
                  className={`flex items-start gap-4 py-0.5 w-full rounded px-1 transition-colors ${
                    analysisActive && (line.num === 7 || line.num === 8) 
                      ? "bg-amber-500/5 hover:bg-amber-500/10" 
                      : "hover:bg-zinc-900/10"
                  }`}
                >
                  <span className={`w-5 text-right select-none text-[10px] font-mono pt-0.5 border-r pr-2 shrink-0 transition-colors ${
                    analysisActive && (line.num === 7 || line.num === 8)
                      ? "text-amber-500/50 border-amber-500/20"
                      : "text-zinc-700 border-zinc-900/40"
                  }`}>
                    {String(line.num).padStart(2, "0")}
                  </span>
                  <pre className={`font-medium tracking-wide text-[11px] whitespace-pre leading-normal font-mono ${
                    analysisActive && (line.num === 7 || line.num === 8) ? "text-amber-200/90" : "text-zinc-300"
                  }`}>
                    {line.content || " "}
                  </pre>
                </div>

                {analysisActive && line.num === 7 && (
                  <div className="my-2 ml-10 mr-2 p-3 bg-[#09090c] border border-amber-500/20 rounded-xl flex items-start gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] animate-fadeIn">
                    <span className="text-amber-500 font-sans text-xs leading-none mt-0.5">⚠</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-200 uppercase tracking-wide">Quadratic Time Complexity</span>
                        <span className="text-[8px] font-sans font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/10 tracking-wider">O(N²) DETECTED</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 font-sans leading-relaxed">
                        Nested iterations over the same data collection produce execution scaling vulnerabilities. Consider initializing a hash map lookup instead.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowPatch(true)}
                      className="text-[8px] font-sans font-black px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shrink-0"
                    >
                      OPTIMIZE
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            // STATE B: COMPRESSED LINEAR EFFICIENCY PASSED
            optimizedCppCode.map((line) => (
              <div 
                key={line.num} 
                className={`flex items-start gap-4 py-0.5 w-full rounded px-1 transition-colors ${
                  line.num >= 5 && line.num <= 12 ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-zinc-900/10"
                }`}
              >
                <span className={`w-5 text-right select-none text-[10px] font-mono pt-0.5 border-r pr-2 shrink-0 transition-colors ${
                  line.num >= 5 && line.num <= 12 ? "text-emerald-500/40 border-emerald-500/20" : "text-zinc-700 border-zinc-900/40"
                }`}>
                  {String(line.num).padStart(2, "0")}
                </span>
                <pre className={`font-medium tracking-wide text-[11px] whitespace-pre leading-normal font-mono ${
                  line.num >= 5 && line.num <= 12 ? "text-emerald-400/90" : "text-zinc-400"
                }`}>
                  {line.content || " "}
                </pre>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}