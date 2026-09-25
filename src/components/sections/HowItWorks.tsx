"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  CheckCircle2,
  Check,
  Server,
  Database,
  Shield,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  Lock,
  Cloud,
  Rocket,
  Terminal,
} from "lucide-react";

interface HowItWorksProps {
  onOpenConsultation: () => void;
}

export default function HowItWorks({ onOpenConsultation }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  const steps = [
    {
      step: "01",
      day: "DAY 01",
      title: "Tell us what you need",
      subtitle: "Requirements & Architecture Blueprint",
      desc: "Share your coaching centre's identity, target courses (JEE, NEET, UPSC, K-12, Commerce), batch structures, and custom feature wishlist.",
    },
    {
      step: "02",
      day: "DAYS 02–07",
      title: "We build your platform",
      subtitle: "Engineering Build & Customization",
      desc: "Our engineering team compiles your production-grade mobile app (Android & iOS) and web portal, styled precisely with your institute's logo, colors, and curriculum.",
    },
    {
      step: "03",
      day: "DAY 08 & BEYOND",
      title: "Launch your coaching app",
      subtitle: "Production Release & 24/7 VIP Support",
      desc: "Go live to hundreds or thousands of students with zero server maintenance hassle. We handle cloud scaling, security patches, and ongoing tech support.",
    },
  ];

  const handlePrevStep = useCallback(() => {
    setActiveStep((prev) => (prev > 0 ? ((prev - 1) as 0 | 1 | 2) : 2));
  }, []);

  const handleNextStep = useCallback(() => {
    setActiveStep((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : 0));
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative w-full pt-16 pb-16 md:pt-32 md:pb-32 bg-[var(--ink)] text-[var(--text-primary)] transition-colors duration-300 overflow-x-hidden border-t border-[var(--border-subtle)]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.08) 0%, rgba(139,0,255,0.05) 50%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* 1. Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>07 / DEPLOYMENT · STREAMLINED ONBOARDING</span>
            </div>

            <h2
              className="font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight text-2xl sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Live on student phones{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#A855F7]">
                in seven days.
              </span>
            </h2>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
            We eliminate the standard 6-month software development cycle. Our dedicated coaching engineers deploy your fully custom branded platform in 3 streamlined steps.
          </p>
        </div>

        {/* 2. Structured 3-Step Rectangular Dashboard Workspace */}
        <div className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080C14]/95 backdrop-blur-2xl shadow-xl overflow-hidden">
          
          {/* Step Selector Tabs (Rectangular Bar with Step Arrows) */}
          <div className="flex flex-col lg:flex-row items-stretch border-b border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
              {steps.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStep(idx as 0 | 1 | 2)}
                    className={`p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer relative ${
                      isActive
                        ? "bg-white dark:bg-[#0D121F] text-slate-900 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]" />
                    )}
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          isActive
                            ? "bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20"
                            : "bg-slate-200/60 dark:bg-white/[0.05] text-slate-400"
                        }`}
                      >
                        {item.day}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                        STEP {item.step}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold font-display tracking-tight">
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Arrow Controls in Step Tab Bar (Visible on all devices) */}
            <div className="flex items-center justify-between lg:justify-center gap-2 px-4 py-2.5 lg:py-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/10 shrink-0 bg-slate-100/60 dark:bg-white/[0.01]">
              <span className="text-[11px] font-mono font-bold text-slate-600 lg:hidden">
                STEP 0{activeStep + 1} OF 03
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="p-2 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 hover:border-[#0066FF] text-slate-700 dark:text-slate-200 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous Step"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono font-bold px-2 text-slate-700 dark:text-slate-300 select-none">
                  0{activeStep + 1} / 03
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="p-2 rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 hover:border-[#0066FF] text-slate-700 dark:text-slate-200 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next Step"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Step Active Content Workspace */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* STEP 01 */}
            {activeStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8]">
                      // DAY 01 SCOPING
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                      Tell us what you need
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      Share your coaching centre's identity, target courses (JEE, NEET, UPSC, K-12, Commerce), batch structures, and custom feature wishlist.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase text-[#0066FF] dark:text-[#38BDF8] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Custom Platform Architecture & UI Blueprint</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-sans text-slate-700 dark:text-slate-300 pt-1">
                      <span className="px-2 py-1 rounded bg-white dark:bg-white/[0.05] font-mono text-[11px]">Requirements</span>
                      <ArrowRight className="w-3 h-3 text-[#0066FF] shrink-0" />
                      <span className="px-2 py-1 rounded bg-white dark:bg-white/[0.05] font-mono text-[11px]">Architecture</span>
                      <ArrowRight className="w-3 h-3 text-[#0066FF] shrink-0" />
                      <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20 font-mono text-[11px]">
                        UI Blueprint
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: Institute Identity */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Institute Identity
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#8B00FF] p-0.5 flex items-center justify-center relative overflow-hidden">
                        <Image
                          src="/images/square-image.jpg"
                          alt="WebVibez client institute brand identity"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                          Apex Premier Academy
                        </div>
                        <div className="text-[10px] text-emerald-500 font-mono font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Identity Verified
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Curriculum */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Curriculum & Target Exams
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["JEE Main & Adv", "NEET-UG", "UPSC Civil", "K-12", "Commerce"].map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 3: Batch Structure */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Batch Hierarchy
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                      {["Batch 11-A", "Batch 11-B", "Batch 12-A", "Batch 12-B", "Foundation", "Elite"].map((b) => (
                        <div key={b} className="p-1.5 rounded bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 font-semibold text-slate-700 dark:text-slate-300">
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Feature Wishlist */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Platform Feature Wishlist
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-sans">
                      {["Attendance & QR", "CBT Mock Tests", "Instant Results", "1-Click UPI Fees", "Homework Vault", "Push Alerts"].map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A3] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 02 */}
            {activeStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8B00FF] dark:text-[#A855F7]">
                      // DAYS 02–07 ENGINEERING
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                      We build your platform
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      Our engineering team deploys your production-grade mobile app (Android & iOS) and web portal, styled precisely with your institute's logo, colors, and curriculum.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>BUILD STATUS: STAGING BUILDS READY (99.8%)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-[#8B00FF] uppercase">Private Staging</div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>Android / iOS</span>
                        <Check className="w-3.5 h-3.5 text-[#00E5A3]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-[#0066FF] uppercase">Admin Control</div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>Users, Fees, Tests</span>
                        <Check className="w-3.5 h-3.5 text-[#00E5A3]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Android App", sub: "Kotlin / Compose", icon: <Smartphone className="w-4 h-4 text-[#0066FF]" /> },
                      { name: "iOS App", sub: "Swift / SwiftUI", icon: <Smartphone className="w-4 h-4 text-[#8B00FF]" /> },
                      { name: "Web Portal", sub: "Next.js SSR", icon: <Globe className="w-4 h-4 text-[#00E5A3]" /> },
                      { name: "Admin Panel", sub: "Role-Based ERP", icon: <Layers className="w-4 h-4 text-[#38BDF8]" /> },
                      { name: "Backend API", sub: "Node / GraphQL", icon: <Server className="w-4 h-4 text-[#F59E0B]" /> },
                      { name: "DRM Shield", sub: "Hardware Crypto", icon: <Lock className="w-4 h-4 text-[#EC4899]" /> },
                    ].map((node) => (
                      <div key={node.name} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1 shadow-sm">
                        <div className="flex items-center gap-2">
                          {node.icon}
                          <div className="text-xs font-bold text-slate-900 dark:text-white font-display">{node.name}</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono pl-6">{node.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 font-mono text-[10px] space-y-1.5 border border-white/10">
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3 h-3" /> [STAGE 1] Theme Tokens Compiled: Apex Navy #0B192C & Emerald Accent
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3 h-3" /> [STAGE 2] DRM Encrypted Video Transcoding Pipeline Active
                    </div>
                    <div className="text-sky-400 flex items-center gap-1.5">
                      <Terminal className="w-3 h-3" /> [STAGE 3] Direct UPI Razorpay Webhook Verified (HTTP 200)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 03 */}
            {activeStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5A3]">
                      // DAY 08 & BEYOND
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                      Launch your coaching app
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      Go live to hundreds or thousands of students with zero server maintenance hassle. We handle cloud scaling, security patches, and ongoing tech support.
                    </p>
                  </div>

                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/25 cursor-pointer"
                  >
                    <span>Request Production Deployment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-4">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                      Official App Store Deployment
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 text-center text-[10px] font-mono font-bold">
                      <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] text-emerald-500 border border-emerald-500/20 flex items-center justify-center gap-1.5">
                        <span>ANDROID</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] text-emerald-500 border border-emerald-500/20 flex items-center justify-center gap-1.5">
                        <span>iOS</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] text-emerald-500 border border-emerald-500/20 flex items-center justify-center gap-1.5">
                        <span>WEB PORTAL</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-sans text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/5">
                      <span className="font-semibold">Dedicated Account Manager</span>
                      <span className="text-[11px] font-mono text-[#0066FF] dark:text-[#38BDF8] font-bold">
                        24/7 VIP Escalation SLA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Step Bottom Navigation Controls */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                <span>Phase {activeStep + 1} of 3: <strong className="text-slate-800 dark:text-white">{steps[activeStep].day}</strong></span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0066FF] text-slate-700 dark:text-slate-200 font-semibold cursor-pointer active:scale-95 transition-all text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0055D4] text-white font-bold cursor-pointer active:scale-95 transition-all text-xs shadow-xs"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ZERO INFRASTRUCTURE MANAGEMENT (Abstract Technical Cloud Stack) */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-[11px] font-mono tracking-[0.22em] text-[#00E5A3] uppercase font-bold flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>// ARCHITECTURE · ZERO INFRASTRUCTURE MANAGEMENT</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              You build your institute.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#A855F7]">
                We handle the infrastructure.
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              AWS scaling, database backups, and security compliance — all fully maintained by WebVibez Software Developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1: Cloud Scaling */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1018] border border-[var(--border-subtle)] space-y-3 shadow-sm hover:border-[#0066FF]/40 transition">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Elastic Cloud Scaling
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Kubernetes container clusters auto-scale from 10 to 100,000+ concurrent students without streaming lag or connection timeouts.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#0066FF] dark:text-[#38BDF8] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>99.98% SLA UPTIME GUARANTEE</span>
              </div>
            </div>

            {/* Pillar 2: Database Backups */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1018] border border-[var(--border-subtle)] space-y-3 shadow-sm hover:border-[#8B00FF]/40 transition">
              <div className="w-10 h-10 rounded-xl bg-[#8B00FF]/10 flex items-center justify-center text-[#8B00FF]">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Hourly Geo-Redundant Backups
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Automated hourly cryptographic snapshots of all student attendance records, test logs, and financial invoices replicated across multiple data centers.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#8B00FF] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>AES-256 REST & TRANSIT ENCRYPTED</span>
              </div>
            </div>

            {/* Pillar 3: Security & Monitoring */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1018] border border-[var(--border-subtle)] space-y-3 shadow-sm hover:border-[#00E5A3]/40 transition">
              <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 flex items-center justify-center text-[#00E5A3]">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                24/7 Threat Mitigation & DRM
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Continuous DDoS shielding, dynamic moving watermark injections, and hardware screen recording blackouts keeping your intellectual property safe.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#00E5A3] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>ZERO-LEAKAGE PIRACY SHIELD</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FINAL CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0066FF]/15 via-[#7C3AED]/12 to-transparent border border-[#0066FF]/35 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center justify-center gap-2">
              <Rocket className="w-3.5 h-3.5" />
              <span>// READY TO BUILD?</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Start Step 01 Today
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Tell us what you need. We'll take care of everything from architecture to production launch in 7 days.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenConsultation}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] hover:from-[#1A75FF] hover:to-[#9D1AFF] text-white text-xs font-semibold shadow-xl shadow-[#0066FF]/30 hover:shadow-[#8B00FF]/40 transition-all duration-300 active:scale-98 cursor-pointer"
            >
              <span>Book Strategy Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] text-slate-800 dark:text-white text-xs font-semibold border border-[var(--border-subtle)] transition-all cursor-pointer"
            >
              <span>Explore Ecosystem</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
