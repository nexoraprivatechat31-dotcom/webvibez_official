"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { openPhoneApp, returnToHomeScreen, scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";
import { useFocusDepth, getFocusDepthStyles } from "@/lib/useFocusDepth";

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export default function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  const [scrollP, setScrollP] = useState(0);
  const { phoneFocusIntensity, phoneSideX } = useFocusDepth();

  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      setScrollP(scrollPhysicsState.scrollProgress);
    });
    return () => unsubscribe();
  }, []);

  // Left column translates horizontally away to the left (←) as user scrolls
  const heroTextShiftX = -(scrollP * 480);
  const heroTextOpacity = Math.max(0, 1 - scrollP * 5.2);
  // Badge scroll choreography: gentle upward lift and subtle fading so hero headline takes primary focus
  const badgeShiftY = -(scrollP * 40);
  const badgeScrollOpacity = Math.max(0, 1 - scrollP * 6.5);

  // Focus Depth System: Text is always sharp and clear
  const { textStyles: focusTextStyles } = getFocusDepthStyles(phoneFocusIntensity, phoneSideX, "right");

  const totalScale = 1.0;
  const totalOpacity = Math.max(0, 1 - scrollP * 3.5);

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 md:pt-32 md:pb-20 flex flex-col justify-between overflow-hidden bg-radial-hero">

      {/* Fine grid — very subtle */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />

      {/* Azure radial ambient — off-center, right */}
      <div className="absolute top-[15%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(91,140,255,0.09) 0%, transparent 70%)" }} />

      {/* Iris ambient — lower left */}
      <div className="absolute bottom-[20%] left-[0%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,124,255,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[75vh]">

          {/* Left Column: Editorial Typography with Focus-Depth Horizontal Departure */}
          <div
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left will-change-transform"
            style={{
              transform: `translate3d(${heroTextShiftX}px, 0, 0)`,
              opacity: totalOpacity,
            }}
          >

            {/* Pure Editorial Eyebrow — Zero Capsules, Zero Pill Borders */}
            <div
              className="reveal-up reveal-up-1 mb-8 flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono select-none"
              style={{
                transform: `translate3d(0, ${badgeShiftY}px, 0)`,
                opacity: badgeScrollOpacity,
              }}
            >
              <span className="font-extrabold text-[12px] sm:text-[13px] tracking-[0.18em] text-slate-900 dark:text-white uppercase font-sans">
                WEBVIBEZ
              </span>
              <span className="w-4 h-[1px] bg-slate-300 dark:bg-white/20" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.24em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
                SOFTWARE DEVELOPMENT / DIGITAL STUDIO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>

            {/* Hero headline — Space Grotesk, very large */}
            <div className="mb-6 overflow-hidden">
              <h1
                className="reveal-up reveal-up-2 leading-[1.06] font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
                }}
              >
                Custom Digital Solutions{" "}
                <br />
                <span className="text-gradient-azure">
                  That Drive Real Growth.
                </span>
              </h1>
            </div>

            {/* Supporting copy — Manrope */}
            <p
              className="reveal-up reveal-up-3 text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-[48ch] mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              }}
            >
              WebVibez builds custom mobile apps, websites, web platforms and coaching-class management software for high-growth institutions.
            </p>

            {/* Editorial Capabilities Strip — Pure Typography, No Floating Pills */}
            <div className="reveal-up reveal-up-3 mb-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold tracking-wider uppercase text-[11px]">
                WHAT WE BUILD //
              </span>
              <span className="text-slate-700 dark:text-slate-300">Mobile Applications</span>
              <span className="text-slate-300 dark:text-white/20">&middot;</span>
              <span className="text-slate-700 dark:text-slate-300">Web Platforms</span>
              <span className="text-slate-300 dark:text-white/20">&middot;</span>
              <span className="text-slate-700 dark:text-slate-300">Custom Software</span>
              <span className="text-slate-300 dark:text-white/20">&middot;</span>
              <span className="text-slate-700 dark:text-slate-300">Coaching Platforms</span>
            </div>

            {/* Restrained CTAs: 1 Primary + 1 Secondary Text Link */}
            <div className="reveal-up reveal-up-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenConsultation}
                className="btn-primary group !rounded-xl px-7 py-3 text-xs font-mono uppercase font-bold tracking-wider"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#product"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors py-2.5 px-3"
              >
                <span>Explore our work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Metrics row — clean, JetBrains Mono */}
            <div
              className="reveal-up reveal-up-5 pt-7 grid grid-cols-3 gap-6 sm:gap-10 border-t border-slate-200/80 dark:border-white/[0.08] w-full max-w-sm"
            >
              <div>
                <div
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  100%
                </div>
                <div
                  className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Your Brand
                </div>
              </div>
              <div>
                <div
                  className="text-xl sm:text-2xl font-bold text-[#0066FF] dark:text-[#38BDF8] tracking-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  7 Days
                </div>
                <div
                  className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Deployment
                </div>
              </div>
              <div>
                <div
                  className="text-xl sm:text-2xl font-bold text-[#7C3AED] dark:text-[#A855F7] tracking-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  24/7
                </div>
                <div
                  className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1 uppercase tracking-wider font-semibold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Live SLA
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Phone anchor — floating UI badges orbit */}
          <div className="lg:col-span-6 xl:col-span-7 h-[480px] sm:h-[580px] lg:h-[700px] w-full relative flex items-center justify-center pointer-events-none">



          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 text-center pb-2">
        <a
          href="#problem"
          className="inline-flex flex-col items-center gap-1.5 text-[#4A5568] hover:text-[#A9B0BA] transition-colors"
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
