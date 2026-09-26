"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { BarChart3, Code2, RotateCcw } from "lucide-react";
import Sidebar from "../components/UI/Sidebar";
import VisualizerCanvas from "../components/Visualizer/VisualizerCanvas";
import Controls from "../components/Visualizer/Controls";
import { AnimationStep } from "../types/visualizer";

import generateBubbleSortSteps from "../lib/algorithms/sorting/bubbleSort";
import generateMergeSortSteps from "../lib/algorithms/sorting/mergeSort";
import generateQuickSortSteps from "../lib/algorithms/sorting/quickSort";
import generateHeapSortSteps from "../lib/algorithms/sorting/heapSort";

// Dynamic Import for Monaco Editor
const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-75 rounded-xl bg-[#080811] border border-white/10 flex items-center justify-center text-slate-400 font-mono text-xs">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        Loading Monaco Editor...
      </span>
    </div>
  ),
});

const DEFAULT_ARRAY = [45, 12, 88, 34, 67, 23, 90, 11, 56];

const ALGORITHM_CODES: Record<string, string> = {
  bubbleSort: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  mergeSort: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,

  quickSort: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,

  heapSort: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }`,
};

// Complexity Helper for UI
const ALGORITHM_METRICS: Record<string, { time: string; space: string }> = {
  bubbleSort: { time: "O(N²)", space: "O(1)" },
  mergeSort: { time: "O(N log N)", space: "O(N)" },
  quickSort: { time: "O(N log N)", space: "O(log N)" },
  heapSort: { time: "O(N log N)", space: "O(1)" },
};

export default function PlaygroundPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(
    null,
  );
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100);
  const [code, setCode] = useState<string>(
    `// Select an algorithm from the sidebar to begin or \n// type your desired code...`,
  );

  // Memoized step snapshots
  const steps = useMemo<AnimationStep[]>(() => {
    if (!selectedAlgorithm) return [];

    let result: any = [];

    if (selectedAlgorithm === "bubbleSort") {
      result = generateBubbleSortSteps(array);
    } else if (selectedAlgorithm === "mergeSort") {
      result = generateMergeSortSteps(array);
    } else if (selectedAlgorithm === "quickSort") {
      result = generateQuickSortSteps(array);
    } else if(selectedAlgorithm === 'heapSort') {
      result = generateHeapSortSteps(array);
    }

    if (result && "steps" in result && Array.isArray(result.steps)) {
      return result.steps;
    }

    if (Array.isArray(result)) {
      return result;
    }

    return [];
  }, [selectedAlgorithm, array]);

  // Safe active step extraction with index boundary checks
  const activeStep = useMemo(() => {
    if (!selectedAlgorithm || steps.length === 0) return null;
    const safeIndex = Math.min(Math.max(0, currentStep), steps.length - 1);
    return steps[safeIndex] || null;
  }, [selectedAlgorithm, steps, currentStep]);

  // Handle Sidebar Algorithm Click
  const handleSelectAlgorithm = useCallback((algoKey: string) => {
    setSelectedAlgorithm(algoKey);
    setCode(ALGORITHM_CODES[algoKey] || "// Code coming soon...");
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Reset steps on array update or algorithm change
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array, selectedAlgorithm]);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(20, 1000 - speed);
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleRandomize = useCallback(() => {
    setIsPlaying(false);
    const newArr = Array.from(
      { length: 9 },
      () => Math.floor(Math.random() * 80) + 15,
    );
    setArray(newArr);
  }, []);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  return (
    <main className="h-screen w-screen bg-[#020204] text-white flex overflow-hidden font-mono selection:bg-emerald-500/30 relative">
      {/* Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 95%)",
        }}
      />

      {/* Sidebar with Props */}
      <Sidebar
        onSelectAlgorithm={handleSelectAlgorithm}
        selectedAlgorithm={selectedAlgorithm}
      />

      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden z-10 relative">
        {/* HEADER BAR */}
        <header className="h-12 border border-white/10 rounded-xl bg-[#080811]/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5">
              <BarChart3 className="size-3.5" />{" "}
              {selectedAlgorithm ? "SORTING" : "IDLE"}
            </span>
            <h1 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
              {selectedAlgorithm
                ? `${selectedAlgorithm.replace(/([A-Z])/g, " $1")} Visualization`
                : "Select an Algorithm"}
            </h1>
          </div>

          {selectedAlgorithm && ALGORITHM_METRICS[selectedAlgorithm] && (
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>
                Time:{" "}
                <code className="text-amber-400 font-bold">
                  {ALGORITHM_METRICS[selectedAlgorithm].time}
                </code>
              </span>
              <span className="text-slate-700">|</span>
              <span>
                Space:{" "}
                <code className="text-indigo-400 font-bold">
                  {ALGORITHM_METRICS[selectedAlgorithm].space}
                </code>
              </span>
            </div>
          )}
        </header>

        {/* BENTO GRID WORKSPACE */}
        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden min-h-0">
          {/* VISUALIZER CANVAS + CONTROLS (LEFT 7 COLS) */}
          <div className="col-span-7 flex flex-col gap-3 overflow-hidden h-full min-h-0">
            <div className="flex-1 overflow-hidden min-h-0">
              <VisualizerCanvas
                activeStep={activeStep}
                selectedAlgorithm={selectedAlgorithm}
              />
            </div>

            <Controls
              isPlaying={isPlaying}
              onPlayPause={() =>
                selectedAlgorithm && setIsPlaying((prev) => !prev)
              }
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
              canStepForward={
                selectedAlgorithm !== null && currentStep < steps.length - 1
              }
              canStepBackward={selectedAlgorithm !== null && currentStep > 0}
            />
          </div>

          {/* CODE EDITOR PANEL (RIGHT 5 COLS) */}
          <div className="col-span-5 bg-[#080811] border border-white/10 rounded-2xl p-3 flex flex-col overflow-hidden h-full min-h-0">
            <div className="px-2 py-1.5 border-b border-white/5 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-2">
                <Code2 className="size-4 text-indigo-400" />
                <span>
                  {selectedAlgorithm
                    ? `${selectedAlgorithm}.cpp`
                    : "editor.cpp"}
                </span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {selectedAlgorithm ? "Synchronized" : "Ready"}
              </span>
              {selectedAlgorithm && (
                <button
                  onClick={() => {
                    setSelectedAlgorithm(null);
                    setCode(
                      `// Select an algorithm from the sidebar to begin or \n// type your desired code...`,
                    );
                    setCurrentStep(0);
                    setIsPlaying(false);
                  }}
                  className="p-1 rounded bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Exit algorithm & reset editor"
                >
                  <RotateCcw className="size-3" />
                  <span>Exit</span>
                </button>
              )}
            </div>

            <div className="flex-1 relative w-full h-full min-h-0 overflow-hidden pt-2">
              <CodeEditor
                code={code}
                setCode={handleCodeChange}
                lineHighlight={activeStep?.lineHighlight}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
