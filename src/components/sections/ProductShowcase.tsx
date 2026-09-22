"use client";

import React, { useState, useEffect } from "react";
import { SHOWCASE_SCREENS } from "@/lib/data";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import {
  scrollPhysicsState,
  setActiveScreenModule,
  subscribePhysicsState,
} from "@/lib/scrollPhysicsState";
import { useFocusDepth, getFocusDepthStyles } from "@/lib/useFocusDepth";

interface ProductShowcaseProps {
  onOpenConsultation: () => void;
}

export default function ProductShowcase({ onOpenConsultation }: ProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { phoneFocusIntensity, phoneSideX } = useFocusDepth();

  // Phone is on RIGHT bay in Product Showcase section
  const { phoneStyles: phoneBayStyles, textStyles: detailStyles } = getFocusDepthStyles(
    phoneFocusIntensity,
    phoneSideX,
    "right"
  );

  const currentScreen = SHOWCASE_SCREENS[activeIndex];

  const handleSelectModule = (idx: number) => {
    setActiveIndex(idx);
    setActiveScreenModule(idx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SHOWCASE_SCREENS.length;
    setActiveIndex(nextIdx);
    setActiveScreenModule(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SHOWCASE_SCREENS.length) % SHOWCASE_SCREENS.length;
    setActiveIndex(prevIdx);
    setActiveScreenModule(prevIdx);
  };

  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      const targetIdx = scrollPhysicsState.targetScreenIndex;
      if (targetIdx >= 0 && targetIdx < SHOWCASE_SCREENS.length) {
        setActiveIndex(targetIdx);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section
      id="product"
      className="relative w-full py-24 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Accent glow centered behind phone stage */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] rounded-full pointer-events-none transition-all duration-1000 opacity-50"
        style={{ background: `radial-gradient(ellipse, ${currentScreen.accentColor}20 0%, transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section header */}
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>03 / PRODUCT &middot; THE ENZOCHAT ECOSYSTEM</span>
          </div>
          <h2
            className="font-bold text-slate-900 dark:text-[#F4F1EA] leading-[1.06] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
          >
            Every screen engineered<br />for modern communication excellence.
          </h2>
          <p className="text-slate-600 dark:text-[#A9B0BA] leading-relaxed max-w-[56ch]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.9rem, 1.3vw, 1rem)" }}>
            Hover over any module or use the arrow controls to explore EnzoChat&apos;s 8 core subsystems in real-time 3D.
          </p>
        </div>

        {/* 2-COLUMN LAYOUT: Details & Module Selector LEFT | Phone Stage RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT (col 1–7): Interactive Navigation & Module Showcase */}
          <div
            className="lg:col-span-7 flex flex-col gap-5"
            style={detailStyles}
          >
            {/* Top Control Bar: Left/Right Arrow Navigation HUD */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm bg-white/80 dark:bg-white/[0.04]">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-[#A9B0BA] hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                  aria-label="Previous module"
                  title="Previous module"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-bold tracking-widest px-2.5 font-mono select-none">
                  <span className="text-[#0066FF] dark:text-[#38BDF8] text-sm">{currentScreen.number}</span>{" "}
                  <span className="text-slate-400 dark:text-[#64748B]">/ 08</span>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-[#A9B0BA] hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                  aria-label="Next module"
                  title="Next module"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span
                className="text-xs font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-lg transition-colors duration-300"
                style={{
                  backgroundColor: `${currentScreen.accentColor}15`,
                  color: currentScreen.accentColor,
                  border: `1px solid ${currentScreen.accentColor}30`,
                }}
              >
                // {currentScreen.badge || "Live Engine"}
              </span>
            </div>

            {/* Interactive Module List Tabs with Hover-to-Change + Left Accent Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SHOWCASE_SCREENS.map((screen, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={screen.id}
                    onClick={() => handleSelectModule(idx)}
                    onMouseEnter={() => handleSelectModule(idx)}
                    className={`group relative text-left py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer select-none border text-xs font-mono flex items-center gap-2.5 overflow-hidden ${
                      isCurrent
                        ? "bg-slate-200/90 dark:bg-white/[0.12] border-slate-300 dark:border-white/30 text-slate-900 dark:text-white font-bold shadow-sm"
                        : "border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-50/50 dark:bg-white/[0.03] hover:bg-slate-100/70 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Left active border indicator bar */}
                    {isCurrent && (
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300"
                        style={{ backgroundColor: screen.accentColor }}
                      />
                    )}

                    <span
                      className="font-bold text-[11px] shrink-0"
                      style={{ color: isCurrent ? screen.accentColor : undefined }}
                    >
                      {screen.number}
                    </span>

                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-transform duration-200 ${
                        isCurrent ? "scale-110 shadow-sm" : "opacity-40 group-hover:opacity-80"
                      }`}
                      style={{ backgroundColor: screen.accentColor }}
                    />

                    <span className="truncate font-sans font-medium text-xs">
                      {screen.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Details Card */}
            <div
              key={currentScreen.id}
              className="p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#090D17]/70 backdrop-blur-2xl shadow-xl space-y-5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider text-white"
                    style={{ backgroundColor: currentScreen.accentColor }}
                  >
                    Module {currentScreen.number} &middot; {currentScreen.badge}
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight"
                >
                  {currentScreen.title}
                </h3>
                <p
                  className="font-semibold text-xs sm:text-sm font-mono mt-1"
                  style={{ color: currentScreen.accentColor }}
                >
                  {currentScreen.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans mt-3 font-medium">
                  {currentScreen.description}
                </p>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-300 font-bold">
                  // Core Capabilities
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {currentScreen.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium font-sans">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${currentScreen.accentColor}20` }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: currentScreen.accentColor }} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric + CTA Bar */}
              <div className="p-3.5 rounded-2xl flex items-center justify-between border border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.03] pt-3">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-300 font-bold">
                    {currentScreen.stats.label}
                  </div>
                  <div className="text-xl font-bold font-mono"
                    style={{ color: currentScreen.accentColor }}>
                    {currentScreen.stats.value}
                  </div>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#8B00FF] hover:brightness-110 transition shadow-md shadow-[#0066FF]/20 cursor-pointer"
                >
                  <span>{currentScreen.ctaText || "Explore Module"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT (col 8–12): Phone Stage Anchor — 3D Canvas renders BIG phone here */}
          <div
            className="lg:col-span-5 h-[480px] sm:h-[560px] lg:h-[660px] relative pointer-events-none sticky top-24"
            style={phoneBayStyles}
          />
        </div>
      </div>
    </section>
  );
}


