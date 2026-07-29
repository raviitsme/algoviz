// "use client";

// import React, { useEffect, useState } from "react";

// export default function CustomCursor() {
//   const [position, setPosition] = useState({ x: -100, y: -100 });
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", moveCursor);

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (
//         target.tagName === "BUTTON" ||
//         target.tagName === "A" ||
//         target.closest("button") ||
//         target.closest("a")
//       ) {
//         setIsHovered(true);
//       } else {
//         setIsHovered(false);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseOver);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("mouseover", handleMouseOver);
//     };
//   }, []);

//   return (
//     <>
//       <style jsx global>
//         {`
//           html,
//           body,
//           button,
//           a {
//             cursor: none !important;
//           }
//         `}
//       </style>

//       <div
//         className={`pointer-events-none fixed z-100 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-transform duration-75 ease-out ${isHovered ? "scale-[4]" : "scale-100"}`}
//         style={{ left: `${position.x}px`, top: `${position.y}px` }}
//       />

//       {/* 2. Outer Gradient Glow Ring */}
//       <div
//         className={`pointer-events-none fixed z-100 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-all duration-300 ease-out ${
//         //   isHovered 
//         //     ? "h-10 w-10 border-fuchsia-500 bg-fuchsia-500/10 scale-110 shadow-[0_0_20px_rgba(217,70,239,0.3)]" 
//         //     : "h-6 w-6 border-indigo-500/50 bg-indigo-500/5"
//         isHovered 
//             ? "h-12 w-12 scale-110 bg-white/10" 
//             : "h-7 w-7 bg-transparent"
//         }`}
//         style={{ 
//           left: `${position.x}px`, 
//           top: `${position.y}px`,
//         }}
//       />
//     </>
//   );
// }