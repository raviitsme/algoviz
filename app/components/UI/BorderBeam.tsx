"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export default function BorderBeam({
  className,
  size = 280,
  duration = 5,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
    >
      {/* Border */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/10" />

      {/* Animated Beam */}
      <motion.div
        className="absolute left-0 top-0 h-[300%] w-16"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(34,211,238,.9), rgba(59,130,246,.9), transparent)",
          filter: "blur(12px)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Glow */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-cyan-400/10" />

      {/* Mask */}
      <div
        className="absolute inset-[1px] rounded-[inherit] bg-zinc-950"
        style={{
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </div>
  );
}