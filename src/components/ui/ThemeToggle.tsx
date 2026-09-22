"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("webvibez-theme") as "dark" | "light" | null;
    if (savedTheme === "dark") {
      setTheme("dark");
      applyTheme("dark");
    } else {
      setTheme("light");
      applyTheme("light");
    }
  }, []);

  const applyTheme = (newTheme: "dark" | "light") => {
    const root = document.documentElement;
    if (newTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("webvibez-theme", nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-[68px] h-[34px] rounded-full bg-slate-200/80 border border-slate-300 dark:bg-white/[0.06] dark:border-white/[0.1] animate-pulse" />
    );
  }

  const isLight = theme === "light";

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleTheme}
        className={`relative flex items-center justify-between p-1 rounded-full border transition-all duration-300 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] active:scale-90 ${
          isLight
            ? "bg-slate-200/90 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_2px_12px_rgba(245,158,11,0.2)] hover:border-amber-400"
            : "bg-[#0B0F17]/95 border-white/[0.16] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_2px_14px_rgba(0,102,255,0.25)] hover:border-[#8B00FF]/60"
        }`}
        style={{
          width: "68px",
          height: "34px",
        }}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        title={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        {/* Background Icons Track */}
        <div className="w-full flex items-center justify-between px-1.5 pointer-events-none z-0">
          {/* Sun icon on left */}
          <div className="flex items-center justify-center w-5 h-5">
            <Sun
              className={`w-3.5 h-3.5 transition-all duration-400 ${
                isLight
                  ? "text-amber-500 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)] rotate-0"
                  : "text-slate-500 scale-85 opacity-40 -rotate-45 group-hover:opacity-70"
              }`}
            />
          </div>

          {/* Moon icon on right */}
          <div className="flex items-center justify-center w-5 h-5">
            <Moon
              className={`w-3.5 h-3.5 transition-all duration-400 ${
                !isLight
                  ? "text-[#A855F7] scale-100 opacity-100 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] rotate-0"
                  : "text-slate-400 scale-85 opacity-40 rotate-45 group-hover:opacity-70"
              }`}
            />
          </div>
        </div>

        {/* Sliding Tactile Knob (GPU translate3d + Spring Easing) */}
        <div
          className="absolute top-[3px] left-[3px] rounded-full flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 will-change-transform"
          style={{
            width: "26px",
            height: "26px",
            transform: isLight ? "translate3d(0px, 0, 0)" : "translate3d(34px, 0, 0)",
            background: isLight
              ? "linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 100%)"
              : "linear-gradient(135deg, #0066FF 0%, #8B00FF 100%)",
            boxShadow: isLight
              ? "0 2px 8px rgba(0,0,0,0.12), 0 0 12px rgba(245,158,11,0.4)"
              : "0 2px 10px rgba(0,102,255,0.7), 0 0 16px rgba(139,0,255,0.6)",
            border: isLight
              ? "1.5px solid rgba(245, 158, 11, 0.5)"
              : "1.5px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          {isLight ? (
            <Sun className="w-3.5 h-3.5 text-amber-600 transition-transform duration-500 rotate-0 group-hover:rotate-90" />
          ) : (
            <Sparkles className="w-3 h-3 text-white transition-transform duration-500 scale-100 group-hover:rotate-45" />
          )}
        </div>
      </button>
    </div>
  );
}
