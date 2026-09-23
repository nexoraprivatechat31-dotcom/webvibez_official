"use client";

import React, { useEffect, useState } from "react";
import { scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";

const CHAPTERS = [
  { id: "01", title: "Flagship Mobile" },
  { id: "02", title: "Institute Chaos" },
  { id: "03", title: "Live Showroom" },
  { id: "04", title: "11 Core Systems" },
  { id: "05", title: "Agency Services" },
  { id: "06", title: "Architecture" },
  { id: "07", title: "Launch in 7 Days" },
];

const CHAPTER_THRESHOLDS = [0.06, 0.20, 0.38, 0.52, 0.65, 0.76, 1.0];

export default function ScrollProgressHUD() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const chapterRef = React.useRef(0);

  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      const p = scrollPhysicsState.scrollProgress;
      if (trackRef.current) {
        trackRef.current.style.height = `${Math.max(6, p * 100)}%`;
      }

      let idx = 0;
      for (let i = 0; i < CHAPTER_THRESHOLDS.length; i++) {
        if (p <= CHAPTER_THRESHOLDS[i]) {
          idx = i;
          break;
        }
      }
      const safeIdx = Math.min(CHAPTERS.length - 1, idx);
      if (safeIdx !== chapterRef.current) {
        chapterRef.current = safeIdx;
        setActiveChapterIndex(safeIdx);
      }
    });

    return () => unsubscribe();
  }, []);

  const safeIndex = Math.max(0, Math.min(CHAPTERS.length - 1, activeChapterIndex || 0));
  const activeChapter = CHAPTERS[safeIndex] || CHAPTERS[0];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none">
      {/* Chapter Number Badge */}
      <div className="flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#0066FF] font-bold">
          CHAPTER
        </span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="font-mono text-lg font-extrabold text-slate-900 dark:text-white transition-all duration-300">
            {activeChapter.id}
          </span>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            / 07
          </span>
        </div>
      </div>

      {/* Vertical Track with Electric Glow Head */}
      <div className="w-[2px] h-28 bg-slate-200 dark:bg-white/10 rounded-full relative overflow-hidden">
        <div
          ref={trackRef}
          className="w-full bg-gradient-to-b from-[#0066FF] via-[#7C3AED] to-[#A855F7] rounded-full will-change-[height]"
          style={{ height: "6%" }}
        />
      </div>

      {/* Chapter Title Tooltip rotated vertically */}
      <div
        className="text-[10px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase whitespace-nowrap transition-all duration-300"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {activeChapter.title}
      </div>
    </div>
  );
}
