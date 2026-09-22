"use client";

import React, { useState } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  MessageSquare,
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  PhoneOff,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock,
  BellRing,
  CreditCard,
  QrCode,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  X,
  Smartphone,
  ChevronRight,
  Flame,
  Layers,
  Award,
  Check,
} from "lucide-react";
import { useFocusDepth, getFocusDepthStyles } from "@/lib/useFocusDepth";

interface ProblemSectionProps {
  onOpenConsultation: () => void;
}

interface PitfallItem {
  id: string;
  category: string;
  stepNumber: string;
  title: string;
  quote: string;
  stat: string;
  impact: string;
  icon: any;
  accentColor: string;
  bgGlow: string;
  solution: {
    title: string;
    description: string;
    feature: string;
    metric: string;
  };
}

const PITFALL_ITEMS: PitfallItem[] = [
  {
    id: "whatsapp",
    category: "Communication Chaos",
    stepNumber: "01",
    title: "Lost WhatsApp Threads",
    quote: '"Sir, please re-send the Physics Chapter 4 PDF!"',
    stat: "14+ chaotic groups per batch",
    impact: "Drowned announcements & zero archive searchability",
    icon: WhatsAppIcon as any,
    accentColor: "#25D366",
    bgGlow: "rgba(244, 63, 94, 0.12)",
    solution: {
      title: "Batch-Gated Channel Feeds",
      description: "Dedicated subject folders, searchable PDF repository, and official broadcast alerts with 100% read tracking.",
      feature: "Encrypted Subject Vaults",
      metric: "Zero lost study materials",
    },
  },
  {
    id: "excel",
    category: "Financial Discrepancy",
    stepNumber: "02",
    title: "Broken Excel Spreadsheets",
    quote: "Formula error on row 412 • Unpaid fee?",
    stat: "Manual data entry errors",
    impact: "Untracked dues, bad debts & delayed fee reconciliation",
    icon: FileSpreadsheet,
    accentColor: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.12)",
    solution: {
      title: "1-Tap UPI Auto-Reconciliation",
      description: "Automated payment gateways with real-time ledger sync, instant GST receipts, and auto-settled accounts.",
      feature: "Automated Ledger Sync",
      metric: "100% error-free accounts",
    },
  },
  {
    id: "paper",
    category: "Operational Blind Spot",
    stepNumber: "03",
    title: "Paper Attendance Registers",
    quote: "Torn pages • Unverified student presence",
    stat: "No proof for concerned parents",
    impact: "Proxy attendance, disputes & lack of parent transparency",
    icon: FileText,
    accentColor: "#EA580C",
    bgGlow: "rgba(234, 88, 12, 0.12)",
    solution: {
      title: "Biometric & QR Gate System",
      description: "Instant roll call with automated SMS/WhatsApp alerts sent to parents the exact second a student checks in.",
      feature: "Real-Time Parent Alerts",
      metric: "99.8% verified presence",
    },
  },
  {
    id: "test-portals",
    category: "Student Abandonment",
    stepNumber: "04",
    title: "Separate Test Websites",
    quote: "Another login ID & password forgotten",
    stat: "Poor test attempt rate",
    impact: "Friction-heavy external logins leading to 45% exam drop-off",
    icon: AlertTriangle,
    accentColor: "#E11D48",
    bgGlow: "rgba(225, 29, 72, 0.12)",
    solution: {
      title: "Integrated NTA-Grade Engine",
      description: "National testing agency grade exam engine built right inside your app with instant percentile rank cards.",
      feature: "Native Exam Engine",
      metric: "92%+ test turnout rate",
    },
  },
  {
    id: "fee-followups",
    category: "Cashflow Delay",
    stepNumber: "05",
    title: "Awkward Fee Calls",
    quote: '"Hello ma\'am, pending fees for last 2 months..."',
    stat: "Delayed cash flow & bad debts",
    impact: "Staff burnout, delayed tutor salaries & embarrassing follow-ups",
    icon: PhoneOff,
    accentColor: "#D97706",
    bgGlow: "rgba(217, 119, 6, 0.12)",
    solution: {
      title: "Automated WhatsApp Invoicing",
      description: "Polite automated payment reminders with direct UPI pay buttons and instant installment schedules.",
      feature: "Zero-Human Fee Bot",
      metric: "4x faster fee recovery",
    },
  },
  {
    id: "piracy",
    category: "Intellectual Property Theft",
    stepNumber: "06",
    title: "Curriculum Piracy",
    quote: "Proprietary study material forwarded freely",
    stat: "Zero copyright protection",
    impact: "Your hard-earned study notes leaked to competitor institutes",
    icon: ShieldAlert,
    accentColor: "#DC2626",
    bgGlow: "rgba(220, 38, 38, 0.12)",
    solution: {
      title: "Dynamic Student Watermarking (DRM)",
      description: "Screen capture blocking with dynamic roll number watermarks stamped across every lecture and document.",
      feature: "Military-Grade DRM",
      metric: "0% material leakage",
    },
  },
];

const UNIFIED_SOLUTIONS = [
  {
    icon: BellRing,
    accentColor: "#0066FF",
    title: "Targeted Broadcasts & Vault",
    desc: "Replace chaotic WhatsApp groups with batch-gated channels, lecture schedules, and cloud-indexed PDFs.",
    badge: "Replaces WhatsApp",
  },
  {
    icon: CreditCard,
    accentColor: "#00E5A3",
    title: "Instant UPI Fee Invoicing",
    desc: "Automated fee schedules with 1-tap WhatsApp UPI payment links, instant GST receipts, and auto-ledgers.",
    badge: "Replaces Spreadsheets",
  },
  {
    icon: QrCode,
    accentColor: "#38BDF8",
    title: "Smart Attendance & SMS Alerts",
    desc: "RFID/QR check-in that automatically sends arrival SMS to parents and flags unexcused absences.",
    badge: "Replaces Registers",
  },
  {
    icon: Sparkles,
    accentColor: "#8B00FF",
    title: "Integrated NTA-Grade Tests",
    desc: "JEE/NEET pattern mock tests with anti-cheat proctoring, instant solution keys, and batch rank lists.",
    badge: "Replaces 3rd Party Portals",
  },
  {
    icon: Lock,
    accentColor: "#FF9A6B",
    title: "DRM Anti-Piracy Watermarking",
    desc: "Hardware-accelerated content protection with student name and roll watermarked across all files.",
    badge: "Protects Curriculum",
  },
  {
    icon: TrendingUp,
    accentColor: "#00D4FF",
    title: "Executive Admin Dashboard",
    desc: "Real-time birds-eye control over admissions, teacher performance, fee collections, and student progress.",
    badge: "Complete Institute OS",
  },
];

export default function ProblemSection({ onOpenConsultation }: ProblemSectionProps) {
  const [activeTab, setActiveTab] = useState<"chaos" | "unified">("chaos");
  const [selectedPitfall, setSelectedPitfall] = useState<PitfallItem | null>(null);

  const { phoneFocusIntensity, phoneSideX } = useFocusDepth();

  // Phone is on LEFT bay in the Problem section
  const { phoneStyles: phoneBayStyles, textStyles: contentStyles } = getFocusDepthStyles(
    phoneFocusIntensity,
    phoneSideX,
    "left"
  );

  return (
    <section
      id="problem"
      className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background ambient lighting — subtle spatial glows, adhering strictly to AGENTS.md clean background rule */}
      <div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[500px] rounded-full pointer-events-none opacity-40 dark:opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(244,63,94,0.12) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none opacity-30 dark:opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0,102,255,0.10) 0%, rgba(139,0,255,0.05) 50%, transparent 70%)",
        }}
      />

      {/* Subtle fine technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* 2-Column Split: Left = Dedicated 3D Phone Bay, Right = Redesigned Content & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Dedicated 3D iPhone Stage Anchor (Clean Whitespace, No Floating Chips) */}
          <div
            className="lg:col-span-5 h-[460px] sm:h-[560px] lg:h-[720px] w-full relative pointer-events-none order-2 lg:order-1"
            style={phoneBayStyles}
          />

          {/* RIGHT: Master Headline, Segmented Mode Switch & Cards */}
          <div
            className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2 space-y-6"
            style={contentStyles}
          >
            {/* Top Super Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[11px] tracking-[0.16em] text-rose-600 dark:text-rose-400 uppercase font-mono font-bold">
                01 / REALITY CHECK &middot; THE FRAGMENTATION PROBLEM
              </span>
            </div>

            {/* Master Heading */}
            <h2
              className="font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.2vw, 3.75rem)",
              }}
            >
              Your coaching centre deserves more than{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 font-extrabold">
                WhatsApp
              </span>{" "}
              and spreadsheets.
            </h2>

            {/* Explanatory Paragraph */}
            <p className="text-slate-600 dark:text-slate-300 max-w-[54ch] leading-relaxed font-sans text-sm sm:text-base">
              Right now your institute runs on disjointed tools &mdash; lost PDFs in chat groups, torn attendance registers, and manual fee follow-ups that erode student trust.
            </p>

            {/* SEGMENTED SWITCH: Daily Chaos vs WebVibez Unified OS (Services HUD Style) */}
            <div
              className="w-full sm:w-auto p-1.5 rounded-2xl flex items-center gap-1.5 bg-white/90 dark:bg-[#0D1424]/90 border border-slate-200/90 dark:border-white/10 shadow-md backdrop-blur-xl"
              role="tablist"
              aria-label="Reality comparison mode"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "chaos"}
                onClick={() => {
                  setActiveTab("chaos");
                  setSelectedPitfall(null);
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "chaos"
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-102"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>The 6 Daily Pitfalls</span>
                <span
                  className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    activeTab === "chaos"
                      ? "bg-white/20 text-white"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  Fragmented
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "unified"}
                onClick={() => {
                  setActiveTab("unified");
                  setSelectedPitfall(null);
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "unified"
                    ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white shadow-md shadow-[#0066FF]/30 scale-102"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>WebVibez Unified OS</span>
                <span
                  className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    activeTab === "unified"
                      ? "bg-white/20 text-white"
                      : "bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8]"
                  }`}
                >
                  1 Solution
                </span>
              </button>
            </div>

            {/* TAB 1: THE 6 DAILY PITFALLS GRID (Services Bento Card Layout) */}
            {activeTab === "chaos" && (
              <div className="w-full space-y-4 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                  {PITFALL_ITEMS.map((item) => {
                    const isSelected = selectedPitfall?.id === item.id;
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPitfall(isSelected ? null : item)}
                        className={`group relative p-5 rounded-3xl border transition-all duration-300 cursor-pointer select-none text-left backdrop-blur-xl ${
                          isSelected
                            ? "bg-white dark:bg-[#0D1424] shadow-xl ring-2 ring-rose-400/30"
                            : "bg-white/95 dark:bg-[#0D1424]/90 border-slate-200/90 dark:border-white/10 hover:border-rose-400/60 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        }`}
                        style={{
                          borderColor: isSelected ? item.accentColor : undefined,
                          boxShadow: isSelected
                            ? `0 15px 35px -8px ${item.accentColor}30, 0 0 15px -4px ${item.accentColor}20`
                            : undefined,
                        }}
                      >
                        {/* Header: Icon & Category (Services Style) */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/20 shrink-0"
                              style={{ backgroundColor: item.accentColor }}
                            >
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <span
                                className="text-[10px] font-mono font-bold tracking-wider uppercase block"
                                style={{ color: item.accentColor }}
                              >
                                // {item.category}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                                PITFALL {item.stepNumber}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 group-hover:text-rose-500 transition-colors">
                            {isSelected ? "Close ↑" : "Fix →"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 font-display">
                          {item.title}
                        </h3>

                        {/* Simulated Quote / Fragmented Artifact */}
                        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 mb-3">
                          <p className="text-xs font-mono text-rose-700 dark:text-rose-300 italic font-medium leading-snug">
                            {item.quote}
                          </p>
                        </div>

                        {/* Stat & Impact Footer */}
                        <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-100 dark:border-white/5">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: item.accentColor }}
                            />
                            <span>{item.stat}</span>
                          </div>
                        </div>

                        {/* Inline Solution Drawer (When Clicked) */}
                        {isSelected && (
                          <div className="mt-4 pt-3.5 border-t border-rose-200 dark:border-rose-500/30 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] mb-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>WebVibez Antidote: {item.solution.feature}</span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-200 font-sans leading-relaxed mb-2.5">
                              {item.solution.description}
                            </p>
                            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-emerald-800 dark:text-[#00E5A3] bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00E5A3]" />
                              <span>{item.solution.metric}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Subtext CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <p>Tap any pitfall above to reveal the automated WebVibez remedy.</p>
                  <button
                    onClick={() => setActiveTab("unified")}
                    className="text-[#0066FF] dark:text-[#38BDF8] hover:underline font-mono font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Switch to Unified View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: WEBVIBEZ UNIFIED OS VIEW (Services Master Bento Card) */}
            {activeTab === "unified" && (
              <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-[#0066FF]/40 shadow-2xl backdrop-blur-2xl animate-in fade-in duration-300 relative overflow-hidden space-y-6">
                {/* Header inside unified card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase tracking-wider">
                        // 01 / UNIFIED OS &middot; ZERO FRAGMENTATION
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                        The Unified Coaching Operating System
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={onOpenConsultation}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-bold font-sans shadow-lg shadow-[#0066FF]/30 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Unify Your Coaching App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 6 Unified Superpowers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {UNIFIED_SOLUTIONS.map((sol, index) => {
                    const SolIcon = sol.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-[#0066FF]/40 transition-all duration-200 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs border border-white/20 shrink-0"
                              style={{ backgroundColor: sol.accentColor }}
                            >
                              <SolIcon className="w-4 h-4" />
                            </div>
                            <span
                              className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase"
                              style={{
                                color: sol.accentColor,
                                backgroundColor: `${sol.accentColor}15`,
                                borderColor: `${sol.accentColor}30`,
                              }}
                            >
                              {sol.badge}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                            {sol.title}
                          </h4>
                          <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                            {sol.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom stats ribbon (Services Specs Style) */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-[#00E5A3] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3]" />
                    <span>Live in 7 Days on Play Store &amp; iOS</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>100% White-Labeled</span>
                    <span>&bull;</span>
                    <span>Zero Data Leaks</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action Hint */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>
                Want a personalized walkthrough for your coaching institute?{" "}
                <button
                  onClick={onOpenConsultation}
                  className="text-[#0066FF] dark:text-[#38BDF8] font-bold hover:underline cursor-pointer"
                >
                  Schedule an Architecture Call &rarr;
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
