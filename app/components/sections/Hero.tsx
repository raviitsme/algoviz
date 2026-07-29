"use client";

import { ArrowRight, Terminal } from "lucide-react";
import IDE from "../IDE/IDE";
import CustomButton from "../UI/Button";
import Link from "next/link";

const SAMPLE_CODE_LINES = [
  { text: "void bubbleSort(int arr[], int n) {" },
  { text: "  for (int i = 0; i < n - 1; i++) {" },
  { text: "    for (int j = 0; j < n - i - 1; j++) {" },
  { text: "      if (arr[j] > arr[j + 1]) {" },
  { text: "        swap(&arr[j], &arr[j + 1]);" },
  { text: "      }" },
  { text: "    }" },
  { text: "  }" },
  { text: "}" },
];

export default function Hero() {
  return (
    // 🛠️ Structural: Uses bg-transparent and adjusts min-height to factor in the floating navbar offset
    <section
      id="home"
      className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-4 py-12 sm:px-8 lg:px-12 xl:px-16 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* LEFT CONTENT CONTAINER */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border text-[0.8rem] border-emerald-500/20 bg-emerald-950/30 px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold tracking-wide text-emerald-300">
                SYSTEMS ONLINE
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 font-black tracking-tight text-center lg:text-left">
              {/* Visualize */}
              <span className="block text-[clamp(2.25rem,4vw,4.5rem)] leading-none text-white">
                Visualize
              </span>

              {/* Algorithms */}
              <span className="mt-2 block bg-linear-to-r bg-[linear-gradient(90deg,#34d399_0%,#818cf8_25%,#d946ef_50%,#818cf8_75%,#34d399_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2.75rem,8vw,5.5rem)] leading-tight text-transparent animate-text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,.25)]">
                Algorithms
              </span>

              {/* Step by Step */}
              <span className="mt-3 block text-[clamp(1.75rem,3.5vw,3.5rem)] leading-tight text-zinc-300">
                Step by Step
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-[clamp(0.85rem,2.5vw,1.05rem)] leading-relaxed text-zinc-400 lg:mx-0 text-left">
              Learn Data Structures through beautiful algorithm visualizations,
              recursion tracing, memory mapping, execution timelines and
              interactive code playback.
              <br />
              <br />
              Build intuition for{" "}
              <span className="font-bold text-emerald-400">C</span>
              <span className="mx-2 text-zinc-600">•</span>
              <span className="font-bold text-indigo-400">C++</span> with
              production-quality animations.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {/* Launch Visualizer (Gradient Variant with matching theme) */}
              <Link href="/playground">
                <CustomButton variant="gradient">
                  Launch Visualizer
                  <ArrowRight className="h-4 w-4 text-indigo-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fuchsia-400" />
                </CustomButton>
              </Link>

              {/* Browse Algorithms (Outline Variant) */}
              <CustomButton variant="outline">Browse Algorithms</CustomButton>
            </div>
          </div>

          {/* RIGHT IDE COMPONENT VIEWPORT */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
              {/* Contextual Card Glow Effect targeting the theme spectrum */}
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-linear-to-r from-emerald-500/10 via-indigo-500/10 to-fuchsia-500/10 blur-[100px]" />
              <div className="absolute inset-0 -z-20 scale-105 rounded-[2rem] border border-zinc-800/60" />
              <div className="relative transition duration-500">
                <IDE
                  codeLines={SAMPLE_CODE_LINES}
                  initialArray={[12, 45, 23, 89]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
