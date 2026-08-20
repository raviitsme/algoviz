"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Code2, BarChart3 } from "lucide-react";
import Sidebar from "../components/UI/Sidebar";
import VisualizerCanvas from "../components/Visualizer/VisualizerCanvas";
import Controls from "../components/Visualizer/Controls";
import { AnimationStep } from "../types/visualizer";
import generateBubbleSortSteps from "../lib/algorithms/bubbleSort";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-100 rounded-xl bg-[#080811] border border-white/10 flex items-center justify-center text-slate-400 font-mono text-xs">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        Loading Monaco Editor...
      </span>
    </div>
  ),
});

const DEFAULT_ARRAY = [45, 12, 88, 34, 67, 23, 90, 11, 56];

const BUBBLE_SORT_CODE = `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`;

export default function PlaygroundPage() {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(250);
  const [code, setCode] = useState<string>(BUBBLE_SORT_CODE);

  // Re-generate step snapshots whenever the array changes
  useEffect(() => {
    const generatedSteps = generateBubbleSortSteps(array);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array]);

  // Animation Timer Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 500 - speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  const handleRandomize = () => {
    const newArr = Array.from(
      { length: 9 },
      () => Math.floor(Math.random() * 80) + 15
    );
    setArray(newArr);
  };

  const activeStep = steps[currentStep] || null;

  return (
    <main className="h-screen w-screen bg-[#020204] text-white flex overflow-hidden font-mono selection:bg-emerald-500/30 relative">
      {/* FADED GRID BACKGROUND OVERLAY */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
        }}
      />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN WORKSPACE */}
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden z-10 relative">
        {/* HEADER BAR */}
        <header className="h-12 border border-white/10 rounded-xl bg-[#080811]/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5">
              <BarChart3 className="size-3.5" /> SORTING
            </span>
            <h1 className="text-sm font-semibold tracking-wide text-slate-200">
              Bubble Sort Visualization
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>
              Time: <code className="text-amber-400 font-bold">O(N²)</code>
            </span>
            <span className="text-slate-700">|</span>
            <span>
              Space: <code className="text-indigo-400 font-bold">O(1)</code>
            </span>
          </div>
        </header>

        {/* BENTO WORKSPACE PANELS */}
        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
          {/* VISUALIZER CANVAS + CONTROLS (LEFT 7 COLS) */}
          <div className="col-span-7 flex flex-col gap-3 overflow-hidden h-full">
            <div className="flex-1 overflow-hidden">
              <VisualizerCanvas activeStep={activeStep} />
            </div>

            <Controls
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onStepForward={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              onStepBackward={() =>
                setCurrentStep((prev) => Math.max(0, prev - 1))
              }
              onReset={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              onRandomize={handleRandomize}
              speed={speed}
              onSpeedChange={setSpeed}
              canStepForward={currentStep < steps.length - 1}
              canStepBackward={currentStep > 0}
            />
          </div>

          {/* CODE EDITOR PANEL (RIGHT 5 COLS) */}
          <div className="col-span-5 bg-[#080811] border border-white/10 rounded-2xl p-3 flex flex-col overflow-hidden">
            <div className="px-2 py-1.5 border-b border-white/5 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-2">
                <Code2 className="size-4 text-indigo-400" />
                <span>bubble_sort.cpp</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Synchronized
              </span>
            </div>

            <div className="flex-1 overflow-hidden pt-3 min-h-0">
              <CodeEditor code={code} setCode={setCode} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}