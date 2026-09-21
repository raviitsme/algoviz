"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { TreeNode } from "@/app/types/visualizer";

interface MergeSortTreeCanvasProps {
  treeData: TreeNode | null;
  activeNodeID?: string;
}

interface LineProps {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function MergeSortTreeCanvas({
  treeData,
  activeNodeID,
}: MergeSortTreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [lines, setLines] = useState<LineProps[]>([]);
  const updateLines = () => {
    if (!containerRef.current || !treeData) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: LineProps[] = [];

    const traverse = (node: TreeNode) => {
      const parentEl = nodeRefs.current.get(node.id);

      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const parentX = parentRect.left + parentRect.width / 2 - containerRect.left;
        const parentY = parentRect.bottom - containerRect.top;

        if (node.left) {
          const leftEl = nodeRefs.current.get(node.left.id);
          if (leftEl) {
            const leftRec = leftEl.getBoundingClientRect();
            newLines.push({
              id: `${node.id} -> ${node.left.id}`,
              x1: parentX,
              y1: parentY,
              x2: leftRec.left + leftRec.width / 2 - containerRect.left,
              y2: leftRec.top - containerRect.top,
            });
          }
          traverse(node.left);
        }
        if (node.right) {
          const rightEl = nodeRefs.current.get(node.right.id);
          if (rightEl) {
            const rightRec = rightEl.getBoundingClientRect();
            newLines.push({
              id: `${node.id} -> ${node.right.id}`,
              x1: parentX,
              y1: parentY,
              x2: rightRec.left + rightRec.width / 2 - containerRect.left,
              y2: rightRec.top - containerRect.top,
            });
          }
          traverse(node.right);
        }
      }
    };
    traverse(treeData);
    setLines(newLines);
  };

  useLayoutEffect(() => {
    updateLines();
  }, [treeData]);

  useEffect(() => {
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [treeData]);

  if (!treeData) return null;

  const renderTree = (node: TreeNode) => {
    const isActive = node.id === activeNodeID;

    let statusStyle = "bg-[#0d1117] border-slate-700 text-slate-300";
    if (node.status === "split") {
      statusStyle = "bg-amber-500/10 border-amber-500/50 text-amber-300";
    } else if (node.status === "merging") {
      statusStyle = "bg-indigo-500/10 border-indigo-500/50 text-indigo-300";
    } else if (node.status === "sorted") {
      statusStyle = "bg-emerald-500/10 border-emerald-500/50 text-emerald-300";
    }

    return (
      <div key={node.id} className="flex flex-col items-center mx-2 my-3">
        {/* Node UI */}
        <motion.div
          ref={(el) => {
            if (el) nodeRefs.current.set(node.id, el);
            else nodeRefs.current.delete(node.id);
          }}
          animate={{ scale: isActive ? 1.15 : 1 }}
          transition={{ duration: 0.2 }}
          className={`px-3 py-1.5 rounded-lg border flex gap-1 shadow-md z-10 transition-colors ${statusStyle} ${
            isActive
              ? "ring-2 ring-emerald-400 shadow-emerald-500/20 shadow-lg"
              : ""
          }`}
        >
          {node.array.map((val, idx) => (
            <span key={idx} className="text-xs font-mono font-bold px-0.5">
              {val}
            </span>
          ))}
        </motion.div>

        {/* Children Container */}
        {(node.left || node.right) && (
          <div className="flex gap-4 mt-6">
            {node.left && renderTree(node.left)}
            {node.right && renderTree(node.right)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex justify-center items-start overflow-auto no-scrollbar p-6 bg-[#080811] rounded-2xl border border-white/10"
    >
      {/* Dynamic SVG Connector Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {lines.map((line) => {
          const controlY = (line.y1 + line.y2) / 2;
          const pathData = `M ${line.x1} ${line.y1} C ${line.x1} ${controlY}, ${line.x2} ${controlY}, ${line.x2} ${line.y2}`;

          return (
            <motion.path
              key={line.id}
              d={pathData}
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </svg>

      {/* Render Tree Hierarchy */}
      {renderTree(treeData)}
    </div>
  );
}
