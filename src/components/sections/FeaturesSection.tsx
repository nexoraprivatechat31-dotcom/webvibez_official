"use client";

import React, { useState, useEffect, useRef } from "react";
import { FEATURES_LIST } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { selectFeatureApp, scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";

interface FeaturesSectionProps {
  onOpenConsultation: () => void;
}

export default function FeaturesSection({ onOpenConsultation }: FeaturesSectionProps) {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      setScrollProgress(scrollPhysicsState.scrollProgress);

      // Map progress in features range (~0.52 to 0.72) to active row index
      const p = scrollPhysicsState.scrollProgress;
      if (p >= 0.50 && p <= 0.76) {
        const localT = (p - 0.50) / 0.26;
        const autoIdx = Math.min(
          FEATURES_LIST.length - 1,
          Math.max(0, Math.floor(localT * FEATURES_LIST.length))
        );
        setSelectedFeatureIndex(autoIdx);
        selectFeatureApp(autoIdx);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSelectFeature = (idx: number) => {
    setSelectedFeatureIndex(idx);
    selectFeatureApp(idx);
  };

  const activeFeature = FEATURES_LIST[selectedFeatureIndex];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full py-28 md:py-36 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >

      {/* Ambient Radial Lighting */}
      <div
        className="absolute right-[-10%] top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div
            className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold"
          >
            <span>04 / ARCHITECTURE &middot; 11 CORE SYSTEMS</span>
          </div>
          <h2
            className="font-bold text-slate-900 dark:text-[#F4F1EA] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
            }}
          >
            11 core systems.
            <br />
            <span className="text-gradient-azure">One unified digital campus.</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-[#94A3B8] mt-4 max-w-2xl leading-relaxed">
            Every subsystem is engineered specifically for premier coaching institutes — eliminating third-party app chaos and putting attendance, tests, results, and fee collection into a single high-performance white-labeled mobile app.
          </p>
        </div>

        {/* Main Split: Full-width Horizontal Feature List Left, Telemetry HUD Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT: Full-width horizontal feature list */}
          <div className="lg:col-span-7 flex flex-col space-y-1">
            {FEATURES_LIST.map((feat, idx) => {
              const isSelected = idx === selectedFeatureIndex;
              // Alternating horizontal shift driven by scroll
              const dir = idx % 2 === 0 ? 1 : -1;
              const rowShift = dir * ((scrollProgress - 0.5) * 45);

              return (
                <button
                  key={feat.id}
                  onClick={() => handleSelectFeature(idx)}
                  onMouseEnter={() => handleSelectFeature(idx)}
                  className={`group relative flex items-center justify-between py-4 px-4 sm:px-6 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-[#0B0F19] border-[#0066FF]/40 shadow-xl shadow-[#0066FF]/10 scale-[1.01]"
                      : "bg-transparent border-transparent hover:border-slate-200 dark:hover:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    transform: `translate3d(${rowShift}px, 0, 0)`,
                  }}
                >
                  {/* Active Indicator Pillar */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-[4px] bg-gradient-to-b from-[#0066FF] to-[#8B00FF] rounded-r-full shadow-[0_0_12px_#0066FF]" />
                  )}

                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Monospace Animated Numeral */}
                    <span
                      className={`shrink-0 text-xs sm:text-sm font-mono tracking-widest transition-colors ${
                        isSelected
                          ? "text-[#0066FF] dark:text-[#38BDF8] font-black"
                          : "text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Feature Title */}
                    <span
                      className={`font-bold tracking-tight truncate transition-all duration-200 ${
                        isSelected
                          ? "text-slate-900 dark:text-white text-base sm:text-xl translate-x-1"
                          : "text-slate-700 dark:text-slate-200 text-sm sm:text-lg group-hover:text-slate-900 dark:group-hover:text-white font-semibold"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feat.name}
                    </span>
                  </div>

                  {/* Right: Clean Category Label & Link Arrow */}
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {feat.category}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isSelected
                          ? "text-[#0066FF] dark:text-[#38BDF8] opacity-100 translate-x-0.5 -translate-y-0.5"
                          : "text-slate-400 opacity-0 group-hover:opacity-70"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Phone Stage Anchor Above + Floating Telemetry HUD Below */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col items-center">
            
            {/* 3D Phone Stage Anchor - Extra generous height to push the box far below the phone */}
            <div className="w-full h-[460px] sm:h-[500px] lg:h-[540px] relative pointer-events-none mb-4" />

            {/* System Status Banner */}
            <div className="w-full flex items-center justify-between px-2 mb-3 text-[10px] font-mono text-slate-500 dark:text-slate-300">
              <span className="tracking-[0.2em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] dark:bg-[#38BDF8] animate-pulse" />
                SYSTEM 04 // SYS {String(selectedFeatureIndex + 1).padStart(2, "0")}
              </span>
              <span className="tracking-widest uppercase text-emerald-500 dark:text-emerald-400 font-bold">
                ● 100% PRODUCTION READY
              </span>
            </div>

            {/* Frosted Glass Spec HUD (Positioned Cleanly Below Phone) */}
            <div className="w-full p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl shadow-2xl shadow-[#0066FF]/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/10 mb-3.5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8] font-mono font-bold block">
                    {activeFeature.category} Architecture
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold mt-1 text-slate-900 dark:text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {activeFeature.name}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF]/15 to-[#8B00FF]/15 border border-[#0066FF]/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#0066FF]" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed mb-5 font-sans">
                {activeFeature.short} {activeFeature.details}
              </p>

              {/* Subsystem Specifications / Core Capabilities */}
              <div className="space-y-2 mb-5">
                {activeFeature.id === "fees" ? (
                  <>
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0066FF]/10 to-[#8B00FF]/10 border border-[#0066FF]/20 flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[9.5px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-semibold">
                          On-Time Fee Collection Rate
                        </div>
                        <div className="text-xl font-black text-[#0066FF] dark:text-[#38BDF8] font-display">
                          91.4%
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
                        ● 1-CLICK UPI
                      </span>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 font-mono mb-2">
                      Core Capabilities
                    </div>
                    {[
                      "Automated UPI & Card Payment Gateways",
                      "Scheduled WhatsApp Payment Reminders",
                      "GST Invoices & Installment Tracking",
                    ].map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-100 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Real-time instant synchronization across iOS, Android & Web</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-100 font-medium">
                      <Shield className="w-4 h-4 text-[#0066FF] shrink-0" />
                      <span>End-to-end encrypted student records with role-based security</span>
                    </div>
                  </>
                )}
              </div>

              {/* Multi-Role Access Matrix */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { role: "Students", access: "Full App" },
                  { role: "Parents", access: "SMS/Portal" },
                  { role: "Faculty", access: "Web/Tablet" },
                  { role: "Admin", access: "Command Center" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 text-center bg-slate-50/80 dark:bg-white/[0.03]"
                  >
                    <div className="text-[9px] text-slate-600 dark:text-slate-300 font-mono font-bold">
                      {item.role}
                    </div>
                    <div className="text-[11px] font-bold text-[#0066FF] dark:text-[#38BDF8] font-mono mt-0.5">
                      {item.access}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenConsultation}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#8B00FF] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Deploy {activeFeature.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
