"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants for smooth, non-distracting staggered entrances
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const footerLinks = {
    platform: [
      { label: "Playground", href: "#" },
      { label: "Visualizations", href: "#" },
      { label: "Algorithms", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Report Issues", href: "#" },
      { label: "Contact", href: "#" },
    ],
    connect: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "Discord", href: "#", badge: "Coming Soon" },
      { label: "Email", href: "mailto:contact@algoviz.com" },
    ],
  };

  return (
    <footer className="relative w-full min-h-[85vh] bg-transparent flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-24 font-sans antialiased overflow-hidden select-none">
      
      {/* 🌌 BACKGROUND DETAILS & ENGINEERING GRAPHICS (OPACITY < 5%) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen select-none">
        {/* Subtle Coordinate Crosshair Markers */}
        <div className="absolute top-12 left-12 font-mono text-[9px] text-zinc-400 tracking-wider">
          LOC_0x7FFF81 // GRID_ACTIVE
        </div>
        <div className="absolute top-1/3 right-24 font-mono text-[9px] text-zinc-500 text-right">
          SYS_MEM_PTR [0.002s]<br />
          NODE_ID // 4096_ALGO
        </div>
        <div className="absolute bottom-1/3 left-20 font-mono text-[9px] text-zinc-500">
          EXEC_ID: FFF-2026-NEXUS
        </div>
        
        {/* Architectural Grid Intersections Using Native SVGs */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-cross" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 60 55 L 60 65 M 55 60 L 65 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-cross)" />
        </svg>

        {/* Slow Breathing Ambient Vector Particles */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-125 h-125 rounded-full bg-indigo-500/5 blur-3xl"
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER ONE: MASSIVE EDITORIAL STATEMENT (~50vh) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={{ whileInView: { transition: { staggerChildren: 0.15 } } }}
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center justify-center py-12 md:py-16"
      >
        {/* Tiny Industrial Tracking Label */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
          End of Transmission // AlgoViz
        </motion.div>

        {/* Giant Hero Editorial Statement */}
        <motion.h2 
          variants={fadeInUp}
          className="text-white font-extralight tracking-tight text-[clamp(2.5rem,6vw,5rem)] leading-[1.08] max-w-4xl"
        >
          Every Great Engineer <br className="hidden sm:inline" />
          Starts With{" "}
          <span className="font-normal text-transparent bg-clip-text bg-linear-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-size-[200%_auto] animate-[gradient_8s_linear_infinite]">
            Curiosity
          </span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-0.75 h-[0.8em] bg-cyan-400 ml-2 translate-y-1"
          />
        </motion.h2>

        {/* Philosophical Supporting Slogan Text */}
        <motion.p 
          variants={fadeInUp}
          className="text-zinc-500 text-sm md:text-base font-light tracking-wide max-w-xl mt-6 leading-relaxed"
        >
          "The next algorithm you understand could change the way you solve every problem after it."
        </motion.p>

        {/* Premium Core Action CTAs Trigger Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 font-mono text-xs"
        >
          {/* Primary Action Button */}
          <a href="#" className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-zinc-100 text-zinc-950 font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
            <span className="absolute inset-0 w-full h-full bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            Launch AlgoViz
          </a>
          
          {/* Secondary Action Button */}
          <a href="#" className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-zinc-900/40 border border-zinc-800 text-zinc-300 font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:text-white active:translate-y-0 backdrop-blur-sm">
            Explore Algorithms
          </a>
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER TWO: INTERACTIVE LINK DIRECTORY GRID */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full max-w-7xl mx-auto mt-20">
        <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800/60 to-transparent" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8 py-16 text-sm font-light">
          
          {/* Column One: Brand Philosophy Pitch */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold text-base tracking-tight text-zinc-100 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              AlgoViz
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-60">
              Interactive algorithm visualization platform designed to transform cold syntax into fluid intuition.
            </p>
          </div>

          {/* Column Two: Platform Routes */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Platform</span>
            <ul className="flex flex-col gap-2.5 text-zinc-400 text-xs">
              {footerLinks.platform.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group relative inline-block transition-colors duration-200 hover:text-zinc-100">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500/60 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Three: Resources Documentation */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Resources</span>
            <ul className="flex flex-col gap-2.5 text-zinc-400 text-xs">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group relative inline-block transition-colors duration-200 hover:text-zinc-100">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500/60 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column Four: Social Channels Network */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Connect</span>
            <ul className="flex flex-col gap-2.5 text-zinc-400 text-xs">
              {footerLinks.connect.map((link, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <a href={link.href} className="group relative inline-block transition-colors duration-200 hover:text-zinc-100">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500/60 transition-all duration-300 group-hover:w-full" />
                  </a>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-500 scale-90">
                      {link.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER THREE: LEGAL COMPLIANCE & AUTHORCREDITS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full h-px bg-zinc-900/60 mb-6" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 font-mono text-[11px] text-zinc-500">
          
          {/* Left Block Legal Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
            <span className="text-zinc-400 font-medium">© {currentYear} AlgoViz.</span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              Built with curiosity
              <span className="text-emerald-500/80 animate-pulse">■</span>
            </span>
          </div>

          {/* Center Block Tech Stack Specs */}
          <div className="flex items-center gap-2 flex-wrap text-zinc-600">
            <span>Made using</span>
            {["Next.js", "React", "Tailwind CSS", "Framer Motion"].map((tech, idx) => (
              <span key={idx} className="text-zinc-400 hover:text-cyan-400/80 transition-colors duration-200 cursor-default">
                {tech}
                {idx < 3 && <span className="text-zinc-600 ml-2">/</span>}
              </span>
            ))}
          </div>

          {/* Right Block Developer Signature */}
          <div className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <a 
              href="#" 
              className="text-zinc-300 font-bold tracking-wide hover:text-white transition-colors duration-200 border-b border-zinc-800 hover:border-zinc-500 pb-0.5"
            >
              Ravi Mohan
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}