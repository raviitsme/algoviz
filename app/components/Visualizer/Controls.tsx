"use client";

import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Shuffle,
  Sliders,
} from "lucide-react";

interface ControlProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onRandomize: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  canStepForward: boolean;
  canStepBackward: boolean;
}

export default function Controls({
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onRandomize,
  speed,
  onSpeedChange,
  canStepForward,
  canStepBackward,
}: ControlProps) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[#080811] rounded-xl border border-white/10 font-mono">
      {/* PLAYBACK CONTROL BUTTONS */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="size-4" />
        </button>

        <button
          onClick={onStepBackward}
          disabled={!canStepBackward || isPlaying}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 transition cursor-pointer disabled:cursor-not-allowed"
          title="Step Backward"
        >
          <SkipBack className="size-4" />
        </button>

        <button
          onClick={onPlayPause}
          className="size-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-black" />
          ) : (
            <Play className="size-4 fill-black ml-0.5" />
          )}
        </button>

        <button
          onClick={onStepForward}
          disabled={!canStepForward || isPlaying}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 transition cursor-pointer disabled:cursor-not-allowed"
          title="Step Forward"
        >
          <SkipForward className="size-4" />
        </button>
      </div>

      {/* SPEED SLIDER & RANDOMIZE */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <Sliders className="size-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Speed:</span>
          <input
            type="range"
            min="50"
            max="450"
            step="25"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="accent-emerald-400 cursor-pointer w-20"
          />
        </div>

        <button
          onClick={onRandomize}
          disabled={isPlaying}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Shuffle className="size-3.5" />
          Randomize
        </button>
      </div>
    </div>
  );
}
