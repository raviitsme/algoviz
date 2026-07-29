"use client";

import { useEffect, useState, useRef } from "react";
import {
  Sparkles,
  Terminal,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Safe dropdown hover delay handling
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  // Structured resource nodes
  const resourceLinks = [
    { name: "Algorithms", desc: "Core sorting & tree mechanics", id : "algorithms", href : "#algorithms" },
    { name: "Visualizer", desc: "Interactive canvas environment", id: "visualizer", href : "#visualizer" },
    { name: "Playground", desc: "Custom code input terminal", id: "playground", href : "#playground" },
    { name: "Docs", desc: "API framework specifications", id: "docs", href : "#docs" },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 font-code transition-all duration-300">
      <div
        className={`
          relative mx-auto overflow-visible transition-all duration-500
          ${scrolled ? "max-w-5xl scale-[0.98]" : "max-w-7xl"}
        `}
      >
        {/* BORDER EDGE RENDER TRACE */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500 via-indigo-500 to-fuchsia-500" />

        {/* BACKGROUND SLATE */}
        <div className="absolute inset-px rounded-2xl bg-zinc-950/90 backdrop-blur-2xl" />

        {/* RADIAL LIQUID SPECTRUM GLOW */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500/10 via-indigo-500/10 to-fuchsia-500/10 blur-2xl" />

        {/* CONTAINER INTERACTION FRAME */}
        <nav className="relative z-10 px-5 py-2.5 md:px-7 md:py-3">
          <div className="flex items-center justify-between">
            {/* 🚀 BRAND VIEWPORT CORE */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <Sparkles className="h-4 w-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              <h1 className="text-lg font-black tracking-tight md:text-xl select-none">
                <span className="text-white">Algo</span>
                <span className="bg-linear-to-r from-emerald-400 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Viz
                </span>
              </h1>
            </div>

            {/* 🗺️ STRATEGIC DESKTOP NAVIGATION MATRIX */}
            <div className="hidden lg:flex items-center gap-7 text-xs font-medium">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer text-zinc-400 transition-colors hover:text-white"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior : "smooth" })
                }}
                className="cursor-pointer text-zinc-400 transition-colors hover:text-white"
              >
                Features
              </a>

              {/* DROPDOWN ANCHOR MODULE */}
              <div
                className="relative py-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 cursor-pointer text-zinc-400 transition-colors hover:text-white outline-none">
                  Resources
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-indigo-400" : ""}`}
                  />
                </button>

                {/* PREMIUM GLOW FLOATING DROPDOWN PANEL */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-zinc-800 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-2xl"
                    >
                      <div className="absolute inset-0 -z-10 bg-linear-to-br from-emerald-500/5 via-transparent to-fuchsia-500/5 rounded-xl pointer-events-none" />
                      <div className="flex flex-col gap-0.5">
                        {resourceLinks.map((item, idx) => (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(`${item.id}`)?.scrollIntoView({ behavior: "smooth" })
                            }}
                            href={`${item.href}`}
                            key={idx}
                            className="group/item flex flex-col p-2.5 rounded-lg hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800/30 transition-all text-left cursor-pointer"
                          >
                            <span className="text-xs font-bold text-zinc-300 group-hover/item:text-emerald-400 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 mt-0.5 tracking-wide font-sans">
                              {item.desc}
                            </span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 🎬 INTUITIVE DESKTOP DYNAMIC CTA */}
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              animate={{ width: hovered ? 140 : 36 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex relative h-9 items-center justify-center overflow-hidden rounded-xl cursor-pointer border border-zinc-800 bg-zinc-900 hover:border-fuchsia-500/40"
            >
              <AnimatePresence mode="wait">
                {!hovered ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="absolute"
                  >
                    <Terminal className="h-4 w-4 text-fuchsia-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span className="text-xs font-semibold text-white">
                      Start App
                    </span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-3 w-3 text-fuchsia-400" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* 📱 HARDWARE-STYLE MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 cursor-pointer"
            >
              {menuOpen ? (
                <X className="h-4 w-4 text-white" />
              ) : (
                <Menu className="h-4 w-4 text-white" />
              )}
            </button>
          </div>

          {/* 📱 ADAPTIVE MOBILE MENU SYSTEM */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-3 rounded-xl border border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-3.5 text-sm">
                  <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="text-left text-zinc-300 hover:text-white"
                  >
                    <span className="text-fuchsia-400/70 mr-1.5">&gt;</span>{" "}
                    Home
                  </a>
                  <a
                    href="#features"
                    onClick={() => setMenuOpen(false)}
                    className="text-left text-zinc-300 hover:text-white"
                  >
                    <span className="text-fuchsia-400/70 mr-1.5">&gt;</span>{" "}
                    Features
                  </a>

                  {/* Category Section Label */}
                  <div className="h-px w-full bg-zinc-800/60 my-0.5" />
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-1">
                    Resources Deck
                  </span>

                  {resourceLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="flex flex-col pl-3 text-left"
                    >
                      <span className="text-zinc-300 hover:text-white text-xs font-semibold">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 mt-0.5 font-sans">
                        {item.desc}
                      </span>
                    </a>
                  ))}

                  <button className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-fuchsia-500/30 bg-zinc-900 py-2.5 font-semibold text-white text-xs cursor-pointer">
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5 text-fuchsia-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
