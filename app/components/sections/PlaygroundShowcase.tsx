// "use client";

// import React, { useState, useEffect, ReactNode } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- CUSTOM BUTTON INTEGRATION ---
// interface CustomButtonProps {
//   children: ReactNode;
//   variant?: "gradient" | "outline";
//   className?: string;
//   onClick?: () => void;
// }

// function CustomButton({
//   children,
//   variant = "gradient",
//   className = "",
//   onClick,
// }: CustomButtonProps) {
//   if (variant === "gradient") {
//     return (
//       <button
//         onClick={onClick}
//         className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl p-px transition-all duration-500 hover:-translate-y-1 active:scale-95 cursor-pointer ${className}`}
//       >
//         <span className="absolute inset-0 bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 animate-text-gradient" />
//         <span className="absolute inset-0 bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-text-gradient" />
//         <span className="relative flex items-center justify-center gap-2 w-full h-full rounded-[11px] bg-zinc-950/95 px-8 py-3.5 text-sm font-black tracking-wide text-zinc-200 transition-all duration-500 group-hover:bg-zinc-900/40 group-hover:text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_0_30px_rgba(129,140,248,0.2),0_0_50px_rgba(217,70,239,0.15)]">
//           <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
//           {children}
//         </span>
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={onClick}
//       className={`rounded-xl border border-zinc-800 active:scale-95 bg-zinc-900/30 px-8 py-3.5 text-sm font-semibold text-zinc-400 backdrop-blur-xl transition duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-200 cursor-pointer ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// // --- TYPESCRIPT SCHEMATIC INTERFACES ---
// interface ArrayElement {
//   id: string;
//   value: number;
// }

// interface SimulationFrame {
//   line: number;
//   array: ArrayElement[];
//   activeIndices: number[];
//   variables: {
//     i: string | number;
//     j: string | number;
//     swapped: string;
//     temp: string;
//   };
//   console: string;
// }

// // --- PERFECTLY SEQUENCED FULL SORTING SIMULATION REGISTRY ---
// const SIMULATION_FRAMES: SimulationFrame[] = [
//   // i = 0 (Bubble Largest to End)
//   {
//     line: 2,
//     array: [
//       { id: "a", value: 45 },
//       { id: "b", value: 12 },
//       { id: "c", value: 85 },
//       { id: "d", value: 32 },
//     ],
//     activeIndices: [0, 1],
//     variables: { i: 0, j: 0, swapped: "false", temp: "null" },
//     console: "i = 0, j = 0: Comparing 45 > 12",
//   },
//   {
//     line: 4,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "c", value: 85 },
//       { id: "d", value: 32 },
//     ],
//     activeIndices: [0, 1],
//     variables: { i: 0, j: 0, swapped: "true", temp: "45" },
//     console: "Swap executed: [45, 12] -> [12, 45]",
//   },
//   {
//     line: 2,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "c", value: 85 },
//       { id: "d", value: 32 },
//     ],
//     activeIndices: [1, 2],
//     variables: { i: 0, j: 1, swapped: "true", temp: "45" },
//     console: "i = 0, j = 1: Comparing 45 > 85 -> False",
//   },
//   {
//     line: 2,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "c", value: 85 },
//       { id: "d", value: 32 },
//     ],
//     activeIndices: [2, 3],
//     variables: { i: 0, j: 2, swapped: "true", temp: "45" },
//     console: "i = 0, j = 2: Comparing 85 > 32",
//   },
//   {
//     line: 4,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "d", value: 32 },
//       { id: "c", value: 85 },
//     ],
//     activeIndices: [2, 3],
//     variables: { i: 0, j: 2, swapped: "true", temp: "85" },
//     console: "Swap executed: [85, 32] -> [32, 85]. 85 is now anchored!",
//   },

//   // i = 1 (Bubble Next Largest)
//   {
//     line: 1,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "d", value: 32 },
//       { id: "c", value: 85 },
//     ],
//     activeIndices: [0, 1],
//     variables: { i: 1, j: 0, swapped: "false", temp: "null" },
//     console: "i = 1, j = 0: Comparing 12 > 45 -> False",
//   },
//   {
//     line: 2,
//     array: [
//       { id: "b", value: 12 },
//       { id: "a", value: 45 },
//       { id: "d", value: 32 },
//       { id: "c", value: 85 },
//     ],
//     activeIndices: [1, 2],
//     variables: { i: 1, j: 1, swapped: "false", temp: "null" },
//     console: "i = 1, j = 1: Comparing 45 > 32",
//   },
//   {
//     line: 4,
//     array: [
//       { id: "b", value: 12 },
//       { id: "d", value: 32 },
//       { id: "a", value: 45 },
//       { id: "c", value: 85 },
//     ],
//     activeIndices: [1, 2],
//     variables: { i: 1, j: 1, swapped: "true", temp: "45" },
//     console: "Swap executed: [45, 32] -> [32, 45]. 45 is now anchored!",
//   },

//   // Final verification / Completion
//   {
//     line: 6,
//     array: [
//       { id: "b", value: 12 },
//       { id: "d", value: 32 },
//       { id: "a", value: 45 },
//       { id: "c", value: 85 },
//     ],
//     activeIndices: [],
//     variables: { i: 2, j: "null", swapped: "false", temp: "null" },
//     console: "Array completely optimized and sorted: [12, 32, 45, 85]",
//   },
// ];

// const CODE_STRING = `void bubbleSort(int arr[], int n) {
//     for (int i = 0; i < n-1; i++) {
//         for (int j = 0; j < n-i-1; j++) {
//             if (arr[j] > arr[j+1]) {
//                 swap(&arr[j], &arr[j+1]);
//             }
//         }
//     }
// }`;

// export default function PlaygroundShowcase() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [activeTab, setActiveTab] = useState("timeline");
//   const [selectedLang, setSelectedLang] = useState("C++");

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentStep((prev) => (prev + 1) % SIMULATION_FRAMES.length);
//     }, 1800); // Slightly faster pacing for engaging UX
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const frame = SIMULATION_FRAMES[currentStep];

//   return (
//     <section className="relative w-full min-h-screen bg-transparent py-32 px-4 sm:px-12 md:px-20 flex flex-col justify-between overflow-hidden antialiased select-none font-sans">
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#161619_1px,transparent_1px),linear-gradient(to_bottom,#161619_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
//       </div>

//       <div className="w-full max-w-4xl flex flex-col items-start gap-4 z-10 relative mb-16 pointer-events-none">
//         <div className="flex items-center gap-2">
//           <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
//           <span className="font-mono text-[8px] font-black tracking-[0.4em] text-zinc-500 uppercase">
//             Playground // Interactive Workspace
//           </span>
//         </div>
//         <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-100">
//           Where Algorithms{" "}
//           <span className="font-normal text-white">Come Alive.</span>
//         </h2>
//       </div>

//       <motion.div className="w-full border border-zinc-800 bg-[#07070a]/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] z-10 relative flex flex-col">
//         <div className="w-full h-11 border-b border-zinc-900 bg-[#040406]/70 px-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex gap-1.5">
//               <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
//               <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
//               <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50" />
//             </div>
//             <span className="h-4 w-[1px] bg-zinc-900 mx-1" />
//             <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-zinc-400 uppercase">
//               AlgoViz_IDE v2.4
//             </span>
//           </div>
//         </div>

//         <div className="w-full grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-900">
//           {/* LEFT PANEL */}
//           <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-zinc-900 p-4 font-mono text-[11px] leading-relaxed bg-[#030305]/20">
//             <div className="w-full flex justify-between items-center mb-3 pb-2 border-b border-zinc-900/40">
//               <span className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
//                 // SOURCE_FILE.cpp
//               </span>
//             </div>
//             <div className="relative">
//               {CODE_STRING.split("\n").map((codeLine, idx) => {
//                 const isCurrentLine = idx === frame.line;
//                 return (
//                   <div
//                     key={idx}
//                     className={`flex items-center w-full transition-all duration-300 relative ${isCurrentLine ? "bg-cyan-500/5 text-zinc-100" : "text-zinc-500"}`}
//                   >
//                     {isCurrentLine && (
//                       <motion.div
//                         layoutId="lineIndicator"
//                         className="absolute left-0 w-0.5 h-full bg-cyan-400"
//                       />
//                     )}
//                     <span className="w-6 text-right pr-3 select-none text-[9px] text-zinc-700 font-black">
//                       {idx + 1}
//                     </span>
//                     <pre
//                       className={`whitespace-pre tracking-wide ${isCurrentLine ? "text-cyan-400 font-medium" : ""}`}
//                     >
//                       {codeLine}
//                     </pre>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* CENTER PANEL - NOW WITH ACCURATE MULTI-PASS LIFECYCLE */}
//           <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-900 p-6 flex flex-col justify-between min-h-[280px]">
//             <div className="w-full flex justify-between items-center mb-4">
//               <span className="font-mono text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
//                 // VISUALIZATION_MATRIX
//               </span>
//               <span className="font-mono text-[8px] text-cyan-400/80 bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-900/40">
//                 BUBBLE_SORT
//               </span>
//             </div>

//             <div className="flex-1 flex items-end justify-center gap-3 px-4 h-32">
//               {frame.array.map((element, idx) => {
//                 const isActive = frame.activeIndices.includes(idx);
//                 return (
//                   <motion.div
//                     layout
//                     key={element.id}
//                     transition={{ type: "spring", stiffness: 380, damping: 26 }}
//                     className="flex flex-col items-center gap-2 flex-1 max-w-[45px]"
//                   >
//                     <span
//                       className={`font-mono text-[9px] font-bold transition-colors ${isActive ? "text-cyan-400" : "text-zinc-600"}`}
//                     >
//                       {element.value}
//                     </span>
//                     <motion.div
//                       style={{ height: `${element.value * 1.1}px` }}
//                       className={`w-full rounded-md border transition-all duration-300 ${
//                         isActive
//                           ? "bg-cyan-400/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
//                           : "bg-zinc-950 border-zinc-800"
//                       }`}
//                     />
//                     <span className="font-mono text-[7.5px] text-zinc-700 font-black">
//                       [{idx}]
//                     </span>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             <div className="w-full flex justify-center items-center gap-4 mt-6 pt-3 border-t border-zinc-900/40">
//               <button
//                 onClick={() => setIsPlaying(!isPlaying)}
//                 className="p-1.5 rounded-md border border-zinc-800 bg-[#07070a] hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
//               >
//                 {isPlaying ? (
//                   <svg
//                     className="w-3 h-3"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-3 h-3"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M8 5v14l11-7z" />
//                   </svg>
//                 )}
//               </button>
//               <div className="h-1 w-24 bg-zinc-900 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-cyan-400"
//                   animate={{
//                     width: `${((currentStep + 1) / SIMULATION_FRAMES.length) * 100}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="lg:col-span-3 p-4 bg-[#030305]/40 flex flex-col justify-between">
//             <div className="flex flex-col gap-4">
//               <span className="font-mono text-[9px] text-zinc-600 font-bold tracking-widest uppercase block mb-1">
//                 // RUNTIME_INSPECTOR
//               </span>

//               <div className="flex flex-col gap-1.5 border border-zinc-900 bg-zinc-950/40 p-3 rounded-xl font-mono text-[10px]">
//                 <span className="text-[8px] text-zinc-600 block mb-1 font-bold">
//                   VARIABLES
//                 </span>
//                 {Object.entries(frame.variables).map(([key, val]) => (
//                   <div
//                     key={key}
//                     className="flex justify-between border-b border-zinc-900/40 pb-1"
//                   >
//                     <span className="text-zinc-500">{key}:</span>
//                     <span className="text-zinc-300 font-bold">{val}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col gap-1.5 border border-zinc-900 bg-zinc-950/40 p-3 rounded-xl font-mono text-[10px]">
//                 <span className="text-[8px] text-zinc-600 block mb-1 font-bold">
//                   COMPLEXITY BOUNDS
//                 </span>
//                 <div className="flex justify-between">
//                   <span className="text-zinc-500">Time Complexity:</span>
//                   <span className="text-amber-400 font-bold">O(n²)</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM METRICS */}
//         <div className="w-full bg-[#030305]/80 p-4">
//           <div className="flex gap-4 border-b border-zinc-900 pb-2 mb-3">
//             {["timeline", "console"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`font-mono text-[9px] tracking-widest uppercase transition-colors ${activeTab === tab ? "text-cyan-400 font-bold" : "text-zinc-600 hover:text-zinc-400"}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="w-full font-mono text-[10px] text-zinc-400 min-h-[30px] flex items-center">
//             {activeTab === "console" ? (
//               <div className="text-zinc-500 flex items-center gap-2">
//                 <span className="text-cyan-500/70">stdout &gt;</span>
//                 <span>{frame.console}</span>
//               </div>
//             ) : (
//               <div className="w-full flex items-center gap-1.5 overflow-hidden">
//                 {SIMULATION_FRAMES.map((_, index) => (
//                   <span
//                     key={index}
//                     className={`h-1 flex-1 rounded-full transition-all duration-300 ${index === currentStep ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-zinc-900"}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       <div className="w-full flex flex-col items-center justify-center text-center mt-20 gap-6 z-10 relative">
//         <h3 className="font-mono text-xs tracking-wider text-zinc-400 max-w-sm">
//           Ready to build true system intuition instead of memorizing code
//           blocks?
//         </h3>
//         <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
//           <CustomButton variant="gradient">Launch Playground</CustomButton>
//           <CustomButton variant="outline">Browse Algorithms</CustomButton>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";

// Detailed copy of a particular frame
interface Snapshot {
  line: number;
  dpTable: (number | null)[][];
  currentCell: {
    row: number;
    column: number;
  };
  dependentCells: {
    row: number;
    column: number;
  }[];
  logMessage: string;
}

interface Item {
  weight: number;
  value: number;
  name: string;
}

function generateKnapsackSteps(items: Item[], maxCapacity: number): Snapshot[] {
  let snapShots: Snapshot[] = [];

  const numItems = items.length;

  let table: (number | null)[][] = Array(numItems + 1)
    .fill(null)
    .map(() => Array(maxCapacity + 1).fill(null));

  // If the capacity of bag is 0kg then no item in the shop can be fit in the bag
  // Hence it generates a table of n * m and fills the first row and column with 0
  for (let w = 0; w <= maxCapacity; w++) table[0][w] = 0;

  for (let i = 0; i <= numItems; i++) table[i][0] = 0;

  snapShots.push({
    line: 1,
    dpTable: table.map((row) => [...row]),
    currentCell: { row: 0, column: 0 },
    dependentCells: [],
    logMessage: "Base case initialized. 0 items or 0 capacity gives 0 value.",
  });

  // Solution starts
  for (let i = 1; i <= numItems; i++) {
    const currentItem = items[i - 1];

    for (let w = 1; w <= maxCapacity; w++) {
      snapShots.push({
        line: 3,
        dpTable: table.map((row) => [...row]),
        currentCell: { row: i, column: w },
        dependentCells: [],
        logMessage: `Evaluating cell for ${currentItem.name} at capacity ${w}kg`,
      });

      if (currentItem.weight <= w) {
        const exVal = table[i - 1][w] as number;
        const inVal =
          currentItem.value + (table[i - 1][w - currentItem.weight] as number);

        snapShots.push({
          line: 4,
          dpTable: table.map((row) => [...row]),
          currentCell: {
            row: i,
            column: w,
          },
          dependentCells: [
            { row: i - 1, column: w },
            { row: i - 1, column: w - currentItem.weight },
          ],
          logMessage: `Comparing: Exclude (${exVal}) vs Include (${inVal}).`,
        });

        table[i][w] = Math.max(inVal, exVal);
      } else {
        const exVal = table[i - 1][w] as number;
        snapShots.push({
          line: 6,
          dpTable: table.map((row) => [...row]),
          currentCell: { row: i, column: w },
          dependentCells: [{ row: i - 1, column: w }],
          logMessage: `Item too heavy (${currentItem.weight}kg > ${w}kg). Copying value from above.`,
        });
        table[i][w] = exVal;
      }
      snapShots.push({
        line: 7,
        dpTable: table.map((row) => [...row]),
        currentCell: { row: i, column: w },
        dependentCells: [],
        logMessage: `Value locked: ${table[i][w]} at cell [${i}][${w}].`,
      });
    }
  }

  return snapShots;
}

export default function PlaygroundShowcase() {
  const items: Item[] = [
    { name: "Guitar", weight: 1, value: 10 },
    { name: "Laptop", weight: 2, value: 15 },
    { name: "Watch", weight: 3, value: 40 },
  ];

  const maxCapacity = 4;

  // State managing hooks
  const [snapShots, setSnapShots] = useState<Snapshot[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Initialize snapshots on mount
  useEffect(() => {
    const steps = generateKnapsackSteps(items, maxCapacity);
    setSnapShots(steps);
  }, []);

  // Clock ticking interval
  useEffect(() => {
    if (!isPlaying || snapShots.length == 0) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= snapShots.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, snapShots]);

  if (snapShots.length === 0)
    return <div className="text-white p-8">Loading DP Matrix...</div>;

  const currentFrame = snapShots[currentStep];

  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col py-16 px-4 sm:px-12 md:px-24 font-sans antialiased selection:bg-cyan-500/30">
      {/* 🚀 HEADER & TYPOGRAPHY SECTION */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-fit border-b border-b-emerald-500 rounded-lg flex justify-start items-center font-mono">
          <p className="text-zinc-400 text-[0.6rem] p-2 uppercase tracking-widest">
            0/1 Knapsack visualization
          </p>
        </div>

        <h1 className="text-5xl font-mono text-zinc-100 font-extralight tracking-tight flex flex-col sm:flex-row sm:items-center gap-3">
          Your
          <span className="mt-2 block bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,8vw,6.2rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
            Code
          </span>
          Your
          <span className="mt-2 block bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,8vw,6.2rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
            Playground
          </span>
        </h1>

        {/* Dynamic Description Line */}
        <p className="text-zinc-500 font-light text-sm tracking-wide mt-1">
          Visualize anything you wished for... Watch matrix nodes step through
          optimal choices live.
        </p>

        <div className="border-b border-zinc-800/60 w-full h-px mt-2" />
      </div>

      {/* ⚙️ MAIN INTERACTIVE WORKSPACE CONTAINER */}
      <div className="w-full flex flex-col mt-4">
        {/* 🎛️ CONTROLS DECK */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-zinc-900/20 border border-zinc-900 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col gap-0.5 font-mono">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Execution Engine
            </span>
            <span className="text-xs text-cyan-400 font-bold">
              FRAME: {currentStep + 1} / {snapShots.length}
            </span>
          </div>

          {/* Button Triggers */}
          <div className="flex items-center gap-3 font-mono text-xs w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all duration-200 cursor-pointer"
            >
              [RESET]
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 font-black tracking-wider hover:opacity-90 shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-all duration-200 cursor-pointer"
            >
              {isPlaying ? "PAUSE RUNTIME" : "INITIALIZE PLAY"}
            </button>

            <button
              disabled={isPlaying || currentStep >= snapShots.length - 1}
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-200 disabled:opacity-20 disabled:hover:border-zinc-900 transition-all duration-200 cursor-pointer"
            >
              NEXT ➔
            </button>
          </div>
        </div>

        {/* 🖥️ SYSTEM TERMINAL LOG */}
        <div className="w-full bg-zinc-950/60 border border-zinc-900/50 rounded-xl p-4 font-mono text-xs flex items-center gap-3 mt-4 shadow-inner">
          <span className="text-emerald-500 font-extrabold select-none animate-pulse">
            CORE_STDOUT &gt;
          </span>
          <span className="text-zinc-300 font-medium tracking-wide transition-all duration-300">
            {currentFrame.logMessage}
          </span>
        </div>

        {/* 📊 2D MATRIX CANVAS ENGINE */}
        <div className="w-full bg-zinc-950/20 border border-zinc-900 p-6 rounded-2xl backdrop-blur-md overflow-x-auto shadow-2xl mt-6">
          <table className="w-full border-collapse text-center">
            {/* Table Headers: Capacity Columns */}
            <thead>
              <tr className="border-b border-zinc-900/80 font-mono">
                <th className="p-4 text-zinc-600 text-xs font-bold uppercase tracking-widest text-left">
                  Items \ Capacity
                </th>
                {Array.from({ length: maxCapacity + 1 }).map((_, colIdx) => (
                  <th
                    key={colIdx}
                    className="p-4 text-zinc-500 font-bold text-xs sm:text-sm"
                  >
                    {colIdx}kg
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Rows and Cells Mapping */}
            <tbody>
              {currentFrame.dpTable.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-zinc-900/30 last:border-none group"
                >
                  {/* Left Vertical Label (Item Meta) */}
                  <td className="p-4 text-left font-sans text-xs text-zinc-400 font-semibold bg-zinc-950/10 whitespace-nowrap">
                    {rowIndex === 0 ? (
                      <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-wider">
                        Ø Base Case
                      </span>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-zinc-200 font-bold">
                          {items[rowIndex - 1].name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          W: {items[rowIndex - 1].weight}kg | V: $
                          {items[rowIndex - 1].value}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Dynamic DP Table Cells */}
                  {row.map((cellValue, colIdx) => {
                    const isCurrent =
                      currentFrame.currentCell.row === rowIndex &&
                      currentFrame.currentCell.column === colIdx;

                    const isDependent = currentFrame.dependentCells.some(
                      (cell) => cell.row === rowIndex && cell.column === colIdx,
                    );

                    return (
                      <td key={colIdx} className="p-2 font-mono">
                        <div
                          className={`w-full py-3.5 px-3 rounded-xl border font-bold transition-all duration-300 min-w-[65px] flex items-center justify-center text-sm ${
                            isCurrent
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] scale-105"
                              : isDependent
                                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 animate-pulse scale-95"
                                : cellValue !== null
                                  ? "border-zinc-900 bg-zinc-900/20 text-zinc-300"
                                  : "border-dashed border-zinc-900/40 text-zinc-800 font-light select-none"
                          }`}
                        >
                          {cellValue !== null ? cellValue : "-"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
