"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  Check,
  Calculator,
  MessageSquare,
  HelpCircle,
  Smartphone,
  Sliders,
  Award,
  Layers,
  LayoutDashboard,
  Video,
  Globe,
  Coins,
  Building2,
  Flame,
  Radio,
  Clock,
  Shield,
  FileCode,
} from "lucide-react";

export interface StudentPricingCalculatorProps {
  onOpenConsultation?: () => void;
  standalone?: boolean;
}

interface PlanConfig {
  id: string;
  name: string;
  shortName: string;
  categoryLabel: string;
  basePrice: number;
  badge?: string;
  tagline: string;
  accentColor: string;
  icon: any;
  subsystems: string[];
  features: string[];
  tech: string[];
}

const PLANS: PlanConfig[] = [
  {
    id: "simple-app",
    name: "Simple App",
    shortName: "Simple App",
    categoryLabel: "3 Native Apps",
    basePrice: 9000,
    tagline: "Dedicated iOS & Android Mobile Apps for Students, Teachers & Admins",
    accentColor: "#0066FF",
    icon: Smartphone,
    subsystems: ["Student App", "Teacher App", "Admin App"],
    features: [
      "White-labeled Android & iOS builds",
      "Student batch & attendance roster",
      "Study notes & PDF document vault",
      "Instant broadcast push notifications",
    ],
    tech: ["React Native", "Expo", "Firebase", "iOS", "Android"],
  },
  {
    id: "app-admin",
    name: "App + Admin Panel",
    shortName: "App + Admin",
    categoryLabel: "Apps + Web ERP",
    basePrice: 14000,
    badge: "MOST POPULAR",
    tagline: "Mobile Apps with a Complete Web Management & Accounting Portal",
    accentColor: "#059669",
    icon: LayoutDashboard,
    subsystems: ["3 Mobile Apps", "Web Admin Portal"],
    features: [
      "All 3 Mobile Apps Included",
      "Full Web Management Console",
      "Automated Fee Ledgers & Dues",
      "Attendance & Test Marks Logs",
    ],
    tech: ["Next.js", "PostgreSQL", "React Native", "Node.js"],
  },
  {
    id: "live-app",
    name: "Live Lecture App",
    shortName: "Live Lecture",
    categoryLabel: "1080p Live Studio",
    basePrice: 20000,
    badge: "LIVE STREAM",
    tagline: "Ultra-Low Latency Live HD Online Classes & Doubt Interaction",
    accentColor: "#7C3AED",
    icon: Video,
    subsystems: ["3 Mobile Apps", "Live HD Studio", "Web Admin"],
    features: [
      "1080p Ultra-Low Latency Streaming",
      "Live Student Doubt Chat & Polls",
      "Screen Sharing & Interactive Board",
      "Auto-Archived Class Recordings",
    ],
    tech: ["WebRTC", "HLS Stream", "OBS Studio", "Postgres"],
  },
  {
    id: "complete-solution",
    name: "Complete Suite (App + Web + Live)",
    shortName: "Complete Suite",
    categoryLabel: "Full Ecosystem",
    basePrice: 25000,
    badge: "ALL-IN-ONE",
    tagline: "Complete Digital Campus: Mobile Apps + Coaching Website + Live Studio",
    accentColor: "#D97706",
    icon: Globe,
    subsystems: ["3 Mobile Apps", "Coaching Website", "Live Studio", "Web Admin"],
    features: [
      "All Mobile Apps + Live Studio",
      "Custom Coaching Website & Domain",
      "Online Inquiries & Admissions CRM",
      "Hardware-Grade Anti-Piracy DRM",
    ],
    tech: ["Widevine DRM", "Next.js", "FairPlay", "AWS S3"],
  },
];

const PRESETS = [100, 250, 500, 750, 1200, 2000];

export default function StudentPricingCalculator({
  onOpenConsultation,
  standalone = false,
}: StudentPricingCalculatorProps) {
  const [students, setStudents] = useState<number>(450);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("app-admin");

  const currentPlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlanId) || PLANS[1],
    [selectedPlanId]
  );

  // Dynamic calculations based on active student strength
  const {
    basePrice,
    extraStudentCost,
    totalAnnualCost,
    costPerStudentMonth,
    costPerStudentDay,
    annualSavings,
    isIncludedCap,
    gaugePercentage,
  } = useMemo(() => {
    const base = currentPlan.basePrice;
    let extra = 0;

    // Up to 750 students: ₹0 extra surcharge
    if (students > 750) {
      extra = (students - 750) * 15;
    }

    const total = base + extra;
    const perStudentMonth = total / (students * 12);
    const perStudentDay = total / (students * 365);

    // Realistic aggregator comparison (3-5% commission or ₹30/student/mo)
    const totalFeesCollected = students * 12000;
    const competitorCost = Math.max(students * 350, totalFeesCollected * 0.04);
    const savings = Math.max(0, competitorCost - total);

    const gauge = Math.min(100, (students / 750) * 100);

    return {
      basePrice: base,
      extraStudentCost: extra,
      totalAnnualCost: total,
      costPerStudentMonth: perStudentMonth,
      costPerStudentDay: perStudentDay,
      annualSavings: savings,
      isIncludedCap: students <= 750,
      gaugePercentage: gauge,
    };
  }, [students, currentPlan]);

  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 shadow-2xl overflow-hidden space-y-8 backdrop-blur-xl">
      {/* Ambient Radial Spotlight matching selected plan */}
      <div
        className="absolute w-[500px] h-[320px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20 -top-20 -right-20"
        style={{
          background: `radial-gradient(circle, ${currentPlan.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* TOP HUD: Section Header & Service Stepper Pills */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10 relative z-10">
        <div className="space-y-1">
          <div className="text-[11px] font-mono tracking-[0.2em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / CALCULATOR &middot; INTERACTIVE STUDENT INVESTMENT METER</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Calculate Investment for Your Exact Batch Size
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Slide to your active enrolled students. Every standard plan supports up to 750 students with ₹0 extra surcharge.
          </p>
        </div>

        {/* Live Zero Commission Chip */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-[#00E5A3] flex items-center justify-center font-bold">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold font-display text-emerald-800 dark:text-[#00E5A3]">
              0% Platform Commission
            </div>
            <div className="text-[10.5px] font-mono text-emerald-700 dark:text-emerald-400">
              100% Fees Go Directly To Your Bank
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Slider & Plan Selection (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider Control Unit (Services-Style Glass Bento Card) */}
          <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0066FF]" />
                <span>Your Active Enrolled Students:</span>
              </label>
              <div className="flex items-baseline gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-white/15 shadow-sm">
                <span className="text-xl sm:text-2xl font-black font-display text-[#0066FF] dark:text-[#38BDF8]">
                  {students.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  Students
                </span>
              </div>
            </div>

            {/* Range Input Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min={50}
                max={3000}
                step={25}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#0066FF] focus:outline-none"
              />

              <div className="flex justify-between text-[10.5px] font-mono font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <span>50 Students</span>
                <span
                  className={`font-bold flex items-center gap-1 ${
                    students <= 750
                      ? "text-emerald-700 dark:text-[#00E5A3]"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>750 Included Cap</span>
                </span>
                <span>3,000+ Scale</span>
              </div>
            </div>

            {/* Quick Preset Selector Buttons */}
            <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-white/5">
              <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Quick Select Student Strength:
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => {
                  const isSelected = students === preset;
                  const isCap = preset === 750;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setStudents(preset)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white shadow-md shadow-[#0066FF]/25 scale-102"
                          : isCap
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-[#00E5A3] border border-emerald-500/30 hover:border-emerald-400"
                          : "bg-white dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#0066FF]/40"
                      }`}
                    >
                      {preset} Students {isCap && " (Included Cap)"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Plan Selector Cards (4 Options, Services Page Style) */}
          <div className="space-y-3">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Target Software Tier:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PLANS.map((plan, idx) => {
                const isSelected = plan.id === selectedPlanId;
                const PlanIcon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-white dark:bg-[#0D1424] shadow-xl scale-[1.01]"
                        : "bg-white/80 dark:bg-[#0A0E1A] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                    style={{
                      borderColor: isSelected ? plan.accentColor : undefined,
                      boxShadow: isSelected
                        ? `0 12px 30px -8px ${plan.accentColor}30, 0 0 15px -4px ${plan.accentColor}20`
                        : undefined,
                    }}
                  >
                    <div className="space-y-3">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm border border-white/20 shrink-0"
                            style={{ backgroundColor: plan.accentColor }}
                          >
                            <PlanIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 block font-bold">
                              // {plan.categoryLabel}
                            </span>
                            <h4 className="text-xs font-bold font-display text-slate-900 dark:text-white">
                              {plan.name}
                            </h4>
                          </div>
                        </div>

                        {plan.badge && (
                          <span
                            className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full"
                            style={{
                              color: plan.accentColor,
                              backgroundColor: `${plan.accentColor}15`,
                              border: `1px solid ${plan.accentColor}30`,
                            }}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans line-clamp-2">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200/60 dark:border-white/5">
                      <span className="text-sm sm:text-base font-extrabold font-display text-slate-900 dark:text-white">
                        ₹{plan.basePrice.toLocaleString("en-IN")}
                        <span className="text-[10px] font-mono text-slate-500 font-normal">
                          /yr
                        </span>
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                          isSelected
                            ? "text-white"
                            : "border border-slate-300 dark:border-white/20"
                        }`}
                        style={{
                          backgroundColor: isSelected ? plan.accentColor : undefined,
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Terminal Cost Breakdown (Services Coverflow Card Style) */}
        <div
          className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 text-slate-900 dark:text-white border shadow-2xl space-y-6 relative overflow-hidden"
          style={{
            borderColor: currentPlan.accentColor,
            boxShadow: `0 20px 50px -10px ${currentPlan.accentColor}30, 0 0 25px -5px ${currentPlan.accentColor}20`,
          }}
        >
          {/* Card Top: Icon + Category Badge + IN FOCUS Live Radar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 shrink-0"
                style={{ backgroundColor: currentPlan.accentColor }}
              >
                <currentPlan.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest font-bold uppercase text-slate-500 dark:text-slate-400">
                  // {currentPlan.categoryLabel}
                </span>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white">
                  COST TERMINAL
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-[#00E5A3] text-[10px] sm:text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CONFIGURED</span>
            </div>
          </div>

          {/* Title & Batch Size */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {currentPlan.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
              Configured for {students.toLocaleString("en-IN")} active enrolled students
            </p>
          </div>

          {/* Breakdown Rows (Services Specs Style) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Annual Platform Base (up to 750):</span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{basePrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <span>Extra Student Surcharge:</span>
                {isIncludedCap && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-[#00E5A3] font-bold">
                    CAP INCLUDED
                  </span>
                )}
              </div>
              <span
                className={`font-bold ${
                  extraStudentCost === 0
                    ? "text-emerald-700 dark:text-[#00E5A3]"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {extraStudentCost === 0
                  ? "₹0 / FREE"
                  : `+₹${extraStudentCost.toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-baseline justify-between">
              <span className="text-slate-900 dark:text-slate-200 font-sans font-bold text-sm">
                Total Annual Investment:
              </span>
              <div className="text-right">
                <span
                  className="text-2xl sm:text-3xl font-black font-display"
                  style={{ color: currentPlan.accentColor }}
                >
                  ₹{totalAnnualCost.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  / year + GST
                </span>
              </div>
            </div>
          </div>

          {/* Micro Unit Cost Metrics (Per Student / Month & Day) */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                Per Student / Month
              </div>
              <div className="text-lg font-bold font-display text-[#0066FF] dark:text-[#38BDF8]">
                ₹{costPerStudentMonth.toFixed(2)}
              </div>
              <div className="text-[9.5px] text-slate-500 dark:text-slate-400">
                Less than a tea cup
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-0.5">
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                Per Student / Day
              </div>
              <div className="text-lg font-bold font-display text-emerald-800 dark:text-[#00E5A3]">
                ₹{costPerStudentDay.toFixed(2)}
              </div>
              <div className="text-[9.5px] text-slate-500 dark:text-slate-400">
                Near zero operational cost
              </div>
            </div>
          </div>

          {/* Savings vs Marketplace Aggregators */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-[#00E5A3]">
              <TrendingUp className="w-4 h-4" />
              <span>Commission Trap Savings:</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Compared to aggregators charging 4% tuition commission, WebVibez saves you approx.{" "}
              <strong className="text-slate-900 dark:text-white font-bold">
                ₹{Math.round(annualSavings).toLocaleString("en-IN")} / year
              </strong>.
            </p>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={onOpenConsultation}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold font-sans shadow-lg shadow-[#0066FF]/30 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lock In Plan for {students.toLocaleString("en-IN")} Students</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
