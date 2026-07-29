"use client";

import React, { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode; // Button ka text aur icons handle karne ke liye
  variant?: "gradient" | "outline"; // Theme match karne ke do options
  className?: string; // Koi bhi extra tailwind classes handle karne ke liye
  onClick?: () => void; // Click function handle karne ke liye
}

export default function CustomButton({
  children,
  variant = "gradient",
  className = "",
  onClick,
}: CustomButtonProps) {
  // 1. PRIMARY GRADIENT ANIMATED STYLE
  if (variant === "gradient") {
    return (
      <button
        onClick={onClick}
        className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl p-px transition-all duration-500 hover:-translate-y-1 active:scale-95 cursor-pointer ${className}`}
      >
        {/* 1. BACK DROP BLURRED GLOW (Hover par button ke peeche ek sasta mesh-glow banega) */}
        <span className="absolute inset-0 bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 animate-text-gradient" />

        {/* 2. LIVE BORDER STROKE */}
        <span className="absolute inset-0 bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-text-gradient" />

        {/* 3. BUTTON INNER BODY (Glassmorphism + Dynamic Radial Highlights) */}
        <span
          className="relative flex items-center justify-center gap-2 w-full h-full rounded-[11px] bg-zinc-950/95 px-8 py-3.5 text-sm font-black tracking-wide text-zinc-200 transition-all duration-500 
        group-hover:bg-zinc-900/40 
        group-hover:text-white 
        backdrop-blur-xl 
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.4)] 
        group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_0_30px_rgba(129,140,248,0.2),0_0_50px_rgba(217,70,239,0.15)]"
        >
          {/* Shine Overlay Reflex Effect */}
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {children}
        </span>
      </button>
    );
  }

  // 2. SECONDARY MATTE OUTLINE STYLE
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-zinc-800 active:scale-95 bg-zinc-900/30 px-8 py-4 text-sm font-semibold text-zinc-400 backdrop-blur-xl transition duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-200 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
