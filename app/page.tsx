"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import LiveCodingExperience from "./components/sections/LiveCodingExperience";
import AlgorithmLibrary from "./components/sections/AlgorithmLibrary";
import PlaygroundShowcase from "./components/sections/PlaygroundShowcase";
import Footer from "./components/UI/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-code bg-[#020204] text-white selection:bg-emerald-500 isolate">
      <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#020204]">
        <div
          className="absolute rounded-full"
          style={{
            top: "-20%",
            left: "-15%",
            width: "900px",
            height: "900px",
            filter: "blur(150px)",
            opacity: 0.65,
            background:
              "radial-gradient(circle at center, rgba(16, 185, 129, 0.45) 0%, rgba(16, 185, 129, 0.05) 60%, transparent 100%)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            top: "15%",
            right: "-10%",
            width: "950px",
            height: "950px",
            filter: "blur(160px)",
            opacity: 0.3,
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.38) 0%, rgba(99, 102, 241, 0.03) 55%, transparent 100%)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            top: "45%",
            left: "-10%",
            width: "850px",
            height: "850px",
            filter: "blur(140px)",
            opacity: 0.25,
            background:
              "radial-gradient(circle at center, rgba(217, 70, 239, 0.28) 0%, rgba(217, 70, 239, 0.02) 60%, transparent 100%)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            bottom: "-15%",
            right: "5%",
            width: "900px",
            height: "900px",
            filter: "blur(180px)",
            opacity: 0.45,
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, rgba(217, 70, 239, 0.1) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* 📐 THE COMPILER GRAPH MESH (Sharp 64px Grid Lines) */}
      <div
        className="pointer-events-none fixed inset-0 -z-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 30%, black 40%, rgba(0,0,0,0.3) 75%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, black 40%, rgba(0,0,0,0.3) 75%, transparent 100%)",
        }}
      />

      {/* ⛓️ SUB-PIXEL CIRCUIT MESH (16px Ultra-Fine Dot Overlay for Premium Texture) */}
      <div
        className="pointer-events-none fixed inset-0 -z-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* ⚡ THE SPECTRUM SPLITTER BORDER (Laser Top Accent Line running under the navbar) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(16, 185, 129, 0.3) 20%, rgba(99, 102, 241, 0.4) 50%, rgba(217, 70, 239, 0.3) 80%, transparent)",
        }}
      />

      {/* 🎭 VIGNETTE DEPTH FILTER MATTE */}
      <div
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(2,2,4,0.7) 100%)",
        }}
      />

      {/* ===================================================== */}
      {/* 🚀 LAYOUT SYSTEM RUNTIME */}
      {/* ===================================================== */}
      <Navbar />

      <div className="pt-24 md:pt-28 relative z-10">
        <Hero />

        {/* Sleek Spectrum Horizontal Intermission Rule */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(63,63,70,0.1), rgba(99,102,241,0.2) 50%, rgba(63,63,70,0.1))",
            }}
          />
        </div>

        <Features />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(63,63,70,0.1), rgba(99,102,241,0.2) 50%, rgba(63,63,70,0.1))",
            }}
          />
        </div>

        <LiveCodingExperience />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(63,63,70,0.1), rgba(99,102,241,0.2) 50%, rgba(63,63,70,0.1))",
            }}
          />
        </div>

        <AlgorithmLibrary />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(63,63,70,0.1), rgba(99,102,241,0.2) 50%, rgba(63,63,70,0.1))",
            }}
          />
        </div>

        <PlaygroundShowcase />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(63,63,70,0.1), rgba(99,102,241,0.2) 50%, rgba(63,63,70,0.1))",
            }}
          />
        </div>

        <Footer/>
      </div>
    </main>
  );
}
