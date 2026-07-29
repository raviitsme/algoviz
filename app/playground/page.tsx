"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

interface LogEvent {
    type : string;
    var_name : string;
    value : string;
};

interface VariableState {
    name : string;
    value : string;
    isHighlighted : boolean;
}

export default function VisualizerPlayground() {
    const [executionLog, setExecutionLog] = useState<LogEvent[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [status, setStatus] = useState<string>("Loading runtime enviroment...");
    const [variables, setVariables] = useState<Record<string, VariableState>>({});

    useEffect(() => {
        fetch('/log.json')
        .then((res) => res.json())
        .then((data : LogEvent[]) => {
            setExecutionLog(data);
            setStatus("Runtime trace loaded! Click forward to execute.");
        })
        .catch((e) => {
            console.error(e);
            setStatus("Error : log file cannot be found in public folder!");
        });
    }, []);
    
    const stepFwd = () => {
        if(currentStep >= executionLog.length) {
            setStatus("Program execution completed!");
            return;
        }

        const event = executionLog[currentStep];
        setVariables((prev) => {
            const reset = { ...prev };
            Object.keys(reset).forEach((key) => {
                reset[key] = { ...reset[key], isHighlighted : true }
            })
            return reset;
        });

        if(event.type === "program_started") {
            setStatus("Program execution initiated!");
        } else if(event.type === "variable_created" || event.type === "variable_updated") {
            setStatus(`Memory write : ${event.var_name} = ${event.value}`);
            setVariables((prev) => ({
                ...prev,
                [event.var_name] :  {
                    name : event.var_name,
                    value : event.value,
                    isHighlighted : true
                },
            })) 
        } else if(event.type === "program_finished") {
            setStatus("Execution finished successfully!");
        }
        setCurrentStep((prev) => prev + 1);
    }
    return (
    <main className="min-h-screen bg-[#020204] text-white p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">
              AlgoViz RVE Playground
            </h1>
            <p className="text-xs text-zinc-500">Execution Sandbox Runtime</p>
          </div>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Landing Page
          </Link>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center mb-6">
          <button
            onClick={stepFwd}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-md transition-all active:scale-95 text-sm"
          >
            Step Forward
          </button>
          <span className="text-zinc-400 text-xs">
            Event {currentStep} / {executionLog.length}
          </span>
        </div>

        {/* Console Log */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg mb-8">
          <p className="text-emerald-400 text-sm font-mono">&gt; {status}</p>
        </div>

        {/* Memory Grid */}
        <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-3 font-semibold">
          Active Stack / Memory Registers
        </h2>
        <div className="flex flex-wrap gap-4 min-h-35 p-6 bg-zinc-950/60 border border-zinc-800/80 rounded-xl backdrop-blur-sm">
          {Object.keys(variables).length === 0 ? (
            <span className="text-zinc-600 text-sm self-center">
              Memory unallocated. Step forward to allocate variables.
            </span>
          ) : (
            Object.values(variables).map((v) => (
              <div
                key={v.name}
                className={`w-32 p-4 rounded-lg border text-center transition-all duration-300 ${
                  v.isHighlighted
                    ? "bg-emerald-500/10 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-105"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                <div className="text-xs text-zinc-500 font-bold mb-1">
                  {v.name}
                </div>
                <div className="text-2xl font-bold text-white">{v.value}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}