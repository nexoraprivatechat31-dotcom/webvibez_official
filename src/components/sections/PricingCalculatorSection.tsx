"use client";

import React from "react";
import StudentPricingCalculator from "@/components/ui/StudentPricingCalculator";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PricingCalculatorSectionProps {
  onOpenConsultation: () => void;
}

export default function PricingCalculatorSection({
  onOpenConsultation,
}: PricingCalculatorSectionProps) {
  return (
    <section
      id="pricing-calculator"
      className="relative w-full py-20 sm:py-28 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.12) 0%, rgba(0,229,163,0.06) 40%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTITUTE CAPACITY &amp; PRICING METER</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white"
          >
            Transparent Pricing for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">
              Every Batch Size
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Drag the meter to your coaching student capacity. Zero commission fees, zero surprise server bills, and all mobile apps included.
          </p>
        </div>

        {/* Embedded Interactive Student Pricing Meter */}
        <StudentPricingCalculator
          standalone={true}
          onOpenConsultation={onOpenConsultation}
        />

        {/* Bottom Link to Full Pricing & Matrix */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>All 4 Standard Plans include up to 750 students with ₹0 extra charges.</span>
          </div>

          <Link
            href="/pricing"
            className="text-[#0066FF] dark:text-[#38BDF8] hover:underline font-bold inline-flex items-center gap-1.5"
          >
            <span>View Full Pricing Page &amp; Feature Comparison Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
