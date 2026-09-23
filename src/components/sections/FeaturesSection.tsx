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
    });
    return () => unsubscribe();
  }, []);

  const handleSelectFeature = (idx: number) => {
    setSelectedFeatureIndex(idx);
  };

  const activeFeature = FEATURES_LIST[selectedFeatureIndex];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full py-16 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >

      {/* Ambient Radial Lighting */}
      <div
        className="absolute right-[-10%] top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div
            className="flex items-center gap-2 mb-3 sm:mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold"
          >
            <span>04 / ARCHITECTURE &middot; 11 CORE SYSTEMS</span>
          </div>
          <h2
            className="font-bold text-slate-900 dark:text-[#F4F1EA] leading-[1.08] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4.5vw, 4.2rem)",
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

        {/* Side-by-Side 3-Column Grid: [ 11-System List ] [ Spec HUD Card ] [ 3D Phone Stage Anchor ] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* COLUMN 1 (lg:col-span-4): 11 Core Systems List */}
          <div className="lg:col-span-4 flex flex-col space-y-1">
            {FEATURES_LIST.map((feat, idx) => {
              const isSelected = idx === selectedFeatureIndex;

              return (
                <button
                  key={feat.id}
                  onClick={() => handleSelectFeature(idx)}
                  onMouseEnter={() => handleSelectFeature(idx)}
                  className={`group relative flex items-center justify-between py-3.5 px-3.5 sm:px-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-[#0B0F19] border-[#0066FF]/40 shadow-xl shadow-[#0066FF]/10 scale-[1.01]"
                      : "bg-transparent border-transparent hover:border-slate-200 dark:hover:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Active Indicator Pillar */}
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-[4px] bg-gradient-to-b from-[#0066FF] to-[#8B00FF] rounded-r-full shadow-[0_0_12px_#0066FF]" />
                  )}

                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
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
                          ? "text-slate-900 dark:text-white text-sm sm:text-base translate-x-1"
                          : "text-slate-700 dark:text-slate-200 text-xs sm:text-sm group-hover:text-slate-900 dark:group-hover:text-white font-semibold"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feat.name}
                    </span>
                  </div>

                  {/* Right: Category Label & Link Arrow */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-widest uppercase font-semibold text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {feat.category}
                    </span>
                    <ArrowUpRight
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
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

          {/* COLUMN 2 (lg:col-span-5): Active Feature Spec HUD Detail Box (Placed SIDE-BY-SIDE!) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-3">
            {/* System Status Banner */}
            <div className="w-full flex items-center justify-between px-2 text-[10.5px] font-mono text-slate-500 dark:text-slate-300">
              <span className="tracking-[0.2em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] dark:bg-[#38BDF8] animate-pulse" />
                SYSTEM 04 // SYS {String(selectedFeatureIndex + 1).padStart(2, "0")}
              </span>
              <span className="tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
                ● 100% PRODUCTION READY
              </span>
            </div>

            {/* Frosted Glass Spec HUD Card */}
            <div className="w-full p-5 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl shadow-2xl shadow-[#0066FF]/10 relative overflow-hidden space-y-5">
              
              {/* Header: Category + Feature Name */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <span className="text-[10.5px] uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8] font-mono font-bold block">
                    {activeFeature.category} Architecture
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold mt-1 text-slate-900 dark:text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {activeFeature.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF]/15 to-[#8B00FF]/15 border border-[#0066FF]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#0066FF]" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-sans">
                {activeFeature.short} {activeFeature.details}
              </p>

              {/* Core Capabilities */}
              <div className="space-y-2.5">
                {activeFeature.id === "fees" ? (
                  <>
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0066FF]/10 to-[#8B00FF]/10 border border-[#0066FF]/20 flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[9.5px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-semibold">
                          On-Time Fee Collection Rate
                        </div>
                        <div className="text-xl font-black text-[#0066FF] dark:text-[#38BDF8] font-display">
                          91.4%
                        </div>
                      </div>
                      <span className="text-[10.5px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
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
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Real-time instant synchronization across iOS, Android &amp; Web</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
                      <Shield className="w-4 h-4 text-[#0066FF] shrink-0" />
                      <span>End-to-end encrypted student records with role-based security</span>
                    </div>
                  </>
                )}
              </div>

              {/* Multi-Role Access Matrix */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { role: "Students", access: "Full App" },
                  { role: "Parents", access: "SMS/Portal" },
                  { role: "Faculty", access: "Web/Tablet" },
                  { role: "Admin", access: "Command Center" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl border border-slate-200/90 dark:border-white/10 text-center bg-slate-50/80 dark:bg-white/[0.03]"
                  >
                    <div className="text-[9.5px] text-slate-600 dark:text-slate-300 font-mono font-bold">
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#8B00FF] text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Deploy {activeFeature.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COLUMN 3 (lg:col-span-3): Pure Unobstructed 3D Phone Stage Anchor (Right Bay) */}
          <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-24 items-center justify-center min-h-[580px] pointer-events-none relative" />

        </div>
      </div>
    </section>
  );
}
