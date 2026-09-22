"use client";

import React from "react";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

interface CTASectionProps {
  onOpenConsultation: () => void;
}

export default function CTASection({ onOpenConsultation }: CTASectionProps) {
  return (
    <section className="relative w-full py-36 md:py-52 overflow-hidden border-t border-[var(--border-subtle)] text-center bg-transparent transition-colors duration-300">

      {/* Massive Azure atmospheric glow from below */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(91,140,255,0.12) 0%, rgba(139,124,255,0.06) 40%, transparent 70%)" }} />

      {/* Fine grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />


      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Editorial Section Label */}
        <div className="mb-8">
          <span
            className="text-[11px] tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            08 / DEPLOYMENT · LIVE IN 7 DAYS
          </span>
        </div>

        {/* Cinematic headline — three-line statement */}
        <div className="mb-8">
          <h2
            className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-[1.04] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
            }}
          >
            Your campus.
            <br />
            <span className="text-gradient-azure">Your brand.</span>
            <br />
            Your app.
          </h2>
        </div>

        {/* Supporting text — minimal */}
        <p
          className="text-slate-600 dark:text-[#94A3B8] mb-12 mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            maxWidth: "44ch",
            lineHeight: 1.7,
          }}
        >
          <span className="text-slate-900 dark:text-white font-semibold">We Build Digital Experiences That Drive Real Results.</span> Let&apos;s build your custom branded mobile app together.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenConsultation}
            className="btn-primary w-full sm:w-auto justify-center"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", fontSize: "1rem" }}
          >
            <span>Build My App</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="btn-ghost w-full sm:w-auto justify-center flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#72D7B0]" />
            <span>Talk to WebVibez Software Developer</span>
          </button>
        </div>

        {/* Trust indicators — thin bottom line */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-white/[0.08] pt-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#72D7B0]" />
            <span>100% White-Labeled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF]" />
            <span>iOS & Android</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
            <span>Dedicated Technical Lead</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9A6B]" />
            <span>7-Day Deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
