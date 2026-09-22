"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setVisible(scrollY > 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const unsubscribe = subscribePhysicsState(() => {
      const p = scrollPhysicsState.scrollProgress;
      if (p > 0.03) {
        setVisible(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  if (!visible) return null;

  // Circumference for progress ring (radius = 18)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] pointer-events-auto select-none animate-in fade-in zoom-in-90 duration-300">
      <button
        onClick={handleScrollToTop}
        type="button"
        className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-2xl border-2 border-slate-300/80 dark:border-white/20 text-slate-800 dark:text-white shadow-2xl shadow-[#0066FF]/25 hover:shadow-[#0066FF]/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        {/* Subtle Circular SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 44 44"
        >
          {/* Background circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200/80 dark:stroke-white/10 fill-none"
            strokeWidth="2"
          />
          {/* Active progress accent ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-[#0066FF] dark:stroke-[#38BDF8] fill-none transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Up Icon with subtle hover lift */}
        <ArrowUp className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-transform duration-300 group-hover:-translate-y-1 relative z-10 stroke-[2.3]" />
      </button>
    </div>
  );
}
