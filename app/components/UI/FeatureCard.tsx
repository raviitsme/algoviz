"use client";

import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  accentColor?: "emerald" | "indigo" | "fuchsia";
}

export default function FeatureCard({
  title,
  description,
  accentColor = "emerald",
}: FeatureCardProps) {
  
  // Mapping color configurations to match the exact tailwind classes from your Hero text gradient
  const colorMap = {
    emerald: {
      border: "border-emerald-500/15",
      bg: "bg-emerald-950/10",
      text: "text-emerald-400",
      glow: "group-hover:border-emerald-500/40",
    },
    indigo: {
      border: "border-indigo-500/15",
      bg: "bg-indigo-950/10",
      text: "text-indigo-400",
      glow: "group-hover:border-indigo-500/40",
    },
    fuchsia: {
      border: "border-fuchsia-500/15",
      bg: "bg-fuchsia-950/10",
      text: "text-fuchsia-400",
      glow: "group-hover:border-fuchsia-500/40",
    },
  };

  const activeColors = colorMap[accentColor] || colorMap.emerald;

  return (
    <div className={`w-full relative overflow-hidden rounded-xl border ${activeColors.border} ${activeColors.bg} bg-zinc-900/30 backdrop-blur-md p-8 flex flex-col justify-center transition-all duration-300 ${activeColors.glow} hover:shadow-[0_0_30px_rgba(255,255,255,0.01)]`}>
      {/* Subtle top-left light flare accent inside the container matrix */}
      <div className="absolute top-0 left-0 w-24 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      
      <h3 className="text-xl font-bold tracking-tight text-zinc-100 mb-3 transition-colors duration-200">
        {title}
      </h3>
      
      <p className="text-sm leading-relaxed text-zinc-400 font-normal">
        {description}
      </p>

      {/* Interactive indicator tracking dot bottom right */}
      <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span className={`text-xs font-mono tracking-wider ${activeColors.text}`}>
          // READY
        </span>
      </div>
    </div>
  );
}