"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface VirtualNode {
  id: string;
  label: string;
  returnValue?: number;
  status: "active" | "completed";
  children: string[];
  parentId: string | null;
}

interface VisualizerStep {
  nodes: Record<string, VirtualNode>;
  activeNodeId: string | null;
  description: string;
}

// --- HOOK FOR TRACKING GRAPH NODE COORDINATES FOR SVG LINES ---
function useNodeCoordinates(dependencies: any) {
  const [coords, setCoords] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const nodeElements = canvasRef.current.querySelectorAll("[data-node-id]");
    const nextCoords: Record<string, { x: number; y: number }> = {};

    nodeElements.forEach((el) => {
      const id = el.getAttribute("data-node-id");
      if (id) {
        const rect = el.getBoundingClientRect();
        // Target the center points of each node relative to the visualizer box container
        nextCoords[id] = {
          x: rect.left + rect.width / 2 - canvasRect.left,
          y: rect.top + rect.height / 2 - canvasRect.top,
        };
      }
    });

    setCoords(nextCoords);
  }, dependencies);

  return { canvasRef, coords };
}

// --- HARDCODED/GENERATED DISPATCH IMMUTABLE TIMELINE TRACE FOR FIB(3) ---
const TRACE_STEPS: VisualizerStep[] = [
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: [],
        parentId: null,
      },
    },
    activeNodeId: "1",
    description: "Main Engine entry: fib(3) called",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "active",
        children: [],
        parentId: "1",
      },
    },
    activeNodeId: "2",
    description: "Stack push: Evaluating left child fib(2)",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "active",
        children: ["3"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "active",
        children: [],
        parentId: "2",
      },
    },
    activeNodeId: "3",
    description: "Stack push: Evaluating left child fib(1)",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "active",
        children: ["3"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
    },
    activeNodeId: "2",
    description: "Base case hit! fib(1) returns 1",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "active",
        children: ["3", "4"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
      "4": {
        id: "4",
        label: "fib(0)",
        status: "active",
        children: [],
        parentId: "2",
      },
    },
    activeNodeId: "4",
    description: "Stack push: Evaluating right child fib(0)",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "active",
        children: ["3", "4"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
      "4": {
        id: "4",
        label: "fib(0)",
        status: "completed",
        returnValue: 0,
        children: [],
        parentId: "2",
      },
    },
    activeNodeId: "2",
    description: "Base case hit! fib(0) returns 0",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "completed",
        returnValue: 1,
        children: ["3", "4"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
      "4": {
        id: "4",
        label: "fib(0)",
        status: "completed",
        returnValue: 0,
        children: [],
        parentId: "2",
      },
    },
    activeNodeId: "1",
    description: "fib(2) finished resolving left tree branches: 1 + 0 = 1",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "active",
        children: ["2", "5"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "completed",
        returnValue: 1,
        children: ["3", "4"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
      "4": {
        id: "4",
        label: "fib(0)",
        status: "completed",
        returnValue: 0,
        children: [],
        parentId: "2",
      },
      "5": {
        id: "5",
        label: "fib(1)",
        status: "active",
        children: [],
        parentId: "1",
      },
    },
    activeNodeId: "5",
    description: "Stack push: Evaluating right child fib(1)",
  },
  {
    nodes: {
      "1": {
        id: "1",
        label: "fib(3)",
        status: "completed",
        returnValue: 2,
        children: ["2", "5"],
        parentId: null,
      },
      "2": {
        id: "2",
        label: "fib(2)",
        status: "completed",
        returnValue: 1,
        children: ["3", "4"],
        parentId: "1",
      },
      "3": {
        id: "3",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "2",
      },
      "4": {
        id: "4",
        label: "fib(0)",
        status: "completed",
        returnValue: 0,
        children: [],
        parentId: "2",
      },
      "5": {
        id: "5",
        label: "fib(1)",
        status: "completed",
        returnValue: 1,
        children: [],
        parentId: "1",
      },
    },
    activeNodeId: null,
    description: "Trace complete! fib(3) resolved: 1 + 1 = 2",
  },
];

export default function RecursionVisualizer() {
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = TRACE_STEPS[stepIdx];

  // Recalculate node layout coordinate markers whenever step changes
  const { canvasRef, coords } = useNodeCoordinates([stepIdx, currentStep]);

  // Infinite autonomous player loop (perfect for showcasing on landing layouts)
  useEffect(() => {
    const clock = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % TRACE_STEPS.length);
    }, 2400);
    return () => clearInterval(clock);
  }, []);

  // UI Tree Renderer Strategy Block
  const renderNode = (nodeId: string) => {
    const node = currentStep.nodes[nodeId];
    if (!node) return null;

    const isActive = currentStep.activeNodeId === nodeId;
    const isCompleted = node.status === "completed";

    return (
      <div key={nodeId} className="flex flex-col items-center flex-1">
        {/* Dynamic Bubble Core UI Component */}
        <motion.div
          layout
          data-node-id={nodeId}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            borderColor: isActive
              ? "#22d3ee"
              : isCompleted
                ? "#818cf8"
                : "#27272a", // Cyan / Indigo / Zinc
            backgroundColor: isActive
              ? "rgba(34, 211, 238, 0.08)"
              : "rgba(9, 9, 11, 0.85)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className={`relative z-10 px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold shadow-xl select-none ${
            isActive
              ? "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              : "text-zinc-300"
          }`}
        >
          {node.label}

          {/* Value return bubble notification */}
          <AnimatePresence>
            {node.returnValue !== undefined && (
              <motion.span
                initial={{ scale: 0, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                className="absolute -bottom-2 -right-2 bg-cyan-500 text-zinc-950 font-sans font-bold text-[9px] px-1.5 py-0.5 rounded shadow-lg"
              >
                ➔ {node.returnValue}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Render child tree node layers recursively */}
        {node.children.length > 0 && (
          <div className="flex w-full gap-4 pt-14 relative justify-center">
            {node.children.map((childId) => renderNode(childId))}
          </div>
        )}
      </div>
    );
  };

  const rootNodes = Object.values(currentStep.nodes).filter(
    (n) => n.parentId === null,
  );

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl relative overflow-hidden min-h-95">
      {/* Top Banner Control Description Info */}
      <div className="border-b border-zinc-900 pb-3 flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-sans font-black tracking-widest bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-cyan-400 uppercase">
            Live Recursion Tree
          </span>
        </div>
        <p className="text-xs font-mono text-zinc-400 min-h-4 italic">
          {currentStep.description}
        </p>
      </div>

      {/* Main Dynamic SVG Tracking Tree Workspace Node Viewport */}
      <div
        ref={canvasRef}
        className="relative flex-1 flex items-start justify-center pt-8 overflow-visible"
      >
        {/* Dynamic Vector Overlay Canvas for branch link tracking */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible">
          <g>
            {Object.values(currentStep.nodes).map((node) => {
              const startPos = coords[node.id];
              return node.children.map((childId) => {
                const endPos = coords[childId];
                if (!startPos || !endPos) return null;

                const isLinkActive =
                  currentStep.activeNodeId === childId ||
                  currentStep.nodes[childId]?.status === "active";

                return (
                  <motion.line
                    key={`${node.id}-${childId}`}
                    initial={{
                      strokeWidth: 1.25,
                      opacity: 0.3,
                      pathLength : 0
                    }}
                    animate={{
                      pathLength: 1,
                      // Force a strict boolean fallback so it can NEVER pass undefined properties
                      stroke: Boolean(isLinkActive) ? "#22d3ee" : "#27272a",
                      strokeWidth: Boolean(isLinkActive) ? 1.75 : 1.25,
                      opacity: Boolean(isLinkActive) ? 0.8 : 0.3,
                    }}
                    transition={{ duration: 0.35 }}
                    x1={startPos.x}
                    y1={startPos.y + 14} // Pad offset from center out below boundaries
                    x2={endPos.x}
                    y2={endPos.y - 14} // Pad offset directly above target bubble box
                  />
                );
              });
            })}
          </g>
        </svg>

        {/* Tree Map Insertion Point */}
        <div className="flex items-start gap-12 justify-center w-full">
          {rootNodes.map((root) => renderNode(root.id))}
        </div>
      </div>

      {/* Frame Linear Loading Index Tracking Bar */}
      <div className="w-full bg-zinc-900 h-0.5 rounded-full overflow-hidden mt-4">
        <motion.div
          className="h-full bg-linear-to-r from-violet-500 to-cyan-400"
          animate={{ width: `${((stepIdx + 1) / TRACE_STEPS.length) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
