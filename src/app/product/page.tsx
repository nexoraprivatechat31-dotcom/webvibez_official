"use client";

import React, { useState, useRef } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import {
  Video,
  Shield,
  FileCheck2,
  CreditCard,
  MessageSquare,
  Building2,
  Check,
  ArrowRight,
  Sparkles,
  Smartphone,
  Laptop,
  Monitor,
  Eye,
  Sliders,
  CheckCircle2,
  Layers,
  Award,
  TrendingUp,
  Star,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Bell,
  HardDriveDownload,
  BarChart3,
  Palette,
  MapPin,
  Users2,
  Filter,
  Cpu,
  Database,
  Server,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Coins,
  ExternalLink,
  Code2,
} from "lucide-react";

export default function ProductPage() {
  const [filter, setFilter] = useState<"all" | "academics" | "security" | "growth" | "admin">("all");
  const [activeSubsystem, setActiveSubsystem] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const subsystemTrackRef = useRef<HTMLDivElement>(null);

  // 11 Core Subsystems
  const subsystems = [
    {
      number: "01",
      category: "academics",
      categoryLabel: "Academics & Streaming",
      name: "Ultra-Low Latency Live Class Engine",
      lead: "Deliver crisp 1080p interactive lectures to 100,000+ simultaneous students with sub-second delay, live polls, and doubts queue.",
      specs: [
        "Multi-bitrate adaptive HLS streaming for seamless 3G/4G playback",
        "Integrated real-time live poll and student engagement tracker",
        "Encrypted live chat with faculty moderation and profanity filters",
        "Automatic cloud recording archiving to course folders immediately after class",
      ],
      metric: "< 1.2s Latency",
      color: "#0066FF",
      icon: <Video className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "02",
      category: "security",
      categoryLabel: "Hardware Security",
      name: "Hardware DRM & Dynamic Watermark Security",
      lead: "Stop piracy before it starts with hardware-level screen recording blackouts and moving student watermark overlays.",
      specs: [
        "Dynamic floating overlay of student's phone number, IP, and dynamic timestamp",
        "Native Android FLAG_SECURE & Apple AVFoundation FairPlay screen capture block",
        "Rooted / Jailbroken device detection with instant session lockdown",
        "Strict 1-Device hardware binding preventing credential sharing among friends",
      ],
      metric: "Zero Leakage",
      color: "#8B00FF",
      icon: <ShieldCheck className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "03",
      category: "academics",
      categoryLabel: "CBT Testing Core",
      name: "NTA / JEE / NEET CBT Online Test Simulator",
      lead: "Exact simulation of major competitive entrance exams with section navigation, question palette, and instantaneous percentile ranks.",
      specs: [
        "Single-choice, multi-correct, matrix match, and integer type questions",
        "Comprehensive diagnostic report: accuracy, subject-wise weakness, speed analysis",
        "Automated batch percentile rankings generated in 0.2 seconds",
        "Anti-cheating window blur detector and background app lock during exams",
      ],
      metric: "0.2s Evaluation",
      color: "#059669",
      icon: <FileCheck2 className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "04",
      category: "growth",
      categoryLabel: "Revenue & Billing",
      name: "Automated Fee Collection & WhatsApp Alerts",
      lead: "Zero-commission payment integration directly into your bank account with automated WhatsApp payment links and receipts.",
      specs: [
        "Instant 1-click UPI, credit/debit card, netbanking, and EMI collection",
        "Automated WhatsApp payment due alerts sent 3 days before due date",
        "Instant GST-compliant tax invoice generation and digital receipt downloads",
        "100% direct settlement to your institutional bank account with zero middleman fee",
      ],
      metric: "+42% On-Time Fees",
      color: "#0284C7",
      icon: <CreditCard className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "05",
      category: "growth",
      categoryLabel: "E-Commerce & Store",
      name: "In-App E-Commerce & Digital Course Store",
      lead: "Sell video courses, test series, printed study material, and recorded batch bundles directly from your branded mobile app.",
      specs: [
        "Flexible batch validity models: lifetime access, monthly subscription, or exam-end",
        "Discount coupon code engine with dynamic expiration and referral tracking",
        "Instant unlock of video syllabus, study PDFs, and tests upon UPI confirmation",
        "Upsell notifications sent to existing free-tier students to boost conversions",
      ],
      metric: "Direct In-App Sales",
      color: "#D97706",
      icon: <Zap className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "06",
      category: "academics",
      categoryLabel: "Offline Vault",
      name: "Encrypted Offline Video & PDF Vault",
      lead: "Allow students to download study videos and handwritten notes for offline revision without risk of file sharing or external copying.",
      specs: [
        "AES-256 encrypted local sandbox storage unreadable by third-party file managers",
        "Download expiration policies (e.g. valid for 30 days or active course duration)",
        "Watermark persistence on offline encrypted video streams",
        "Smart local storage caching with zero internet required for playback",
      ],
      metric: "AES-256 Encrypted",
      color: "#059669",
      icon: <HardDriveDownload className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "07",
      category: "admin",
      categoryLabel: "Smart Attendance",
      name: "Smart Attendance & Bio-Metric Sync",
      lead: "Automate student presence tracking via in-app QR scans, RFID cards, or teacher one-tap roll calls with instant SMS/WhatsApp alerts.",
      specs: [
        "Instant WhatsApp alert to parents when student enters or misses class",
        "Monthly attendance percentage tracking with automated defaulter alerts",
        "Seamless integration with biometric fingerprint and RFID hardware",
        "Daily attendance logs exportable to Excel and government portals in 1-click",
      ],
      metric: "Instant Parent Alert",
      color: "#DB2777",
      icon: <Users className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "08",
      category: "growth",
      categoryLabel: "Push CRM Engine",
      name: "High-Open-Rate Targeted Push Notification Engine",
      lead: "Send personalized, rich multimedia alerts to specific batches, inactive students, or exam candidates with 98%+ delivery rates.",
      specs: [
        "Deep-linking push notifications that open exact live classes, tests, or invoices",
        "Scheduled automated morning reminders for live batch schedules",
        "Segmentation by student batch, branch, course interest, or fee payment status",
        "Apple APNs and Google FCM dual-gateway routing for instant sub-second delivery",
      ],
      metric: "98% Open Rate",
      color: "#0066FF",
      icon: <Bell className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "09",
      category: "admin",
      categoryLabel: "Role Hierarchy",
      name: "Multi-Tier Staff, Faculty & Role Manager",
      lead: "Empower teachers, center managers, accountants, and evaluators with granular permission trees and zero administrative clutter.",
      specs: [
        "7 Pre-configured enterprise roles: SuperAdmin, Manager, Teacher, Evaluator, Billing",
        "Faculty lecture scheduling portal with timetable conflict auto-detection",
        "Teacher evaluation dashboard for manual descriptive exam marks entry",
        "Full audit log trail tracking every student edit, fee refund, and grade update",
      ],
      metric: "7 Enterprise Tiers",
      color: "#7C3AED",
      icon: <Users2 className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "10",
      category: "admin",
      categoryLabel: "Executive ERP",
      name: "Executive Telemetry & Multi-Branch Hub",
      lead: "Command center for institutional leaders to monitor live revenue, batch attendance, exam rankings, and operational bottlenecks across all branches.",
      specs: [
        "Consolidated cross-campus analytics with 1-click branch switching",
        "Real-time financial collection telemetry with daily and monthly run-rate graphs",
        "Student retention curves, churn early-warning alerts, and dropout predictors",
        "Automated weekly PDF operational reports delivered to director's email",
      ],
      metric: "Multi-Branch Command",
      color: "#059669",
      icon: <BarChart3 className="w-5 h-5 text-white stroke-[2.4]" />,
    },
    {
      number: "11",
      category: "growth",
      categoryLabel: "100% Whitelabel",
      name: "100% White-Labeled Mobile Brand Identity",
      lead: "Your app name, your logo, your custom color scheme on the Google Play Store and Apple App Store. Zero WebVibez branding visible to students.",
      specs: [
        "Published under your institute's official Apple Developer and Google Play account",
        "Custom splash screen, app launcher icon, and branded notification badges",
        "Bespoke brand typography, button radius, and custom light/dark theme schemes",
        "Full brand prestige and student loyalty with direct institutional pride",
      ],
      metric: "100% Whitelabel",
      color: "#F59E0B",
      icon: <Palette className="w-5 h-5 text-white stroke-[2.4]" />,
    },
  ];


  const filteredSubsystems =
    filter === "all"
      ? subsystems
      : subsystems.filter((s) => s.category === filter);

  // Scroll Subsystems Track
  const scrollToSubsystem = (index: number) => {
    setActiveSubsystem(index);
    if (!subsystemTrackRef.current) return;
    const cardWidth = 460;
    subsystemTrackRef.current.scrollTo({
      left: index * (cardWidth + 24),
      behavior: "smooth",
    });
  };

  const handlePrevSubsystem = () => {
    const nextIdx = Math.max(0, activeSubsystem - 1);
    scrollToSubsystem(nextIdx);
  };

  const handleNextSubsystem = () => {
    const nextIdx = Math.min(filteredSubsystems.length - 1, activeSubsystem + 1);
    scrollToSubsystem(nextIdx);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 sm:space-y-24">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / PRODUCT SHOWCASE &middot; ENTERPRISE ECOSYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
            Complete Product Ecosystem &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
              Platform Modules
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Explore our end-to-end white-labeled mobile applications, 11 hardened platform subsystems, real-time testing engines, and anti-piracy DRM solutions.
          </p>
        </div>

        {/* Global Impact Telemetry */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Active Enrolled Learners", value: "400,000+", icon: <Users className="w-4 h-4 text-[#0066FF]" /> },
            { label: "Production System Uptime", value: "99.99%", icon: <TrendingUp className="w-4 h-4 text-[#00E5A3]" /> },
            { label: "Direct Bank Settlements", value: "100%", icon: <ShieldCheck className="w-4 h-4 text-[#38BDF8]" /> },
            { label: "Average App Store Rating", value: "4.9 / 5.0", icon: <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-white/10 text-center space-y-1.5 shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.05] mx-auto flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 1: SIDE-BY-SIDE SPATIAL 11 INTEGRATED SUBSYSTEMS HORIZON */}
        {/* ========================================================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center justify-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>02 / PLATFORM SPECIFICATIONS &middot; 11 HARDENED SUBSYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              The 11 Integrated Subsystems of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
                WebVibez Platform
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans max-w-2xl mx-auto">
              Every subsystem is engineered as a hardened microservice designed to operate independently or harmoniously within your branded application.
            </p>
          </div>

          {/* Filter Controls & Navigation Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-white/10">
            {/* Filter Category Chips */}
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              {[
                { id: "all", label: "All 11 Subsystems" },
                { id: "academics", label: "Academics & CBT Tests" },
                { id: "security", label: "Security & DRM" },
                { id: "growth", label: "Revenue & Growth CRM" },
                { id: "admin", label: "Multi-Branch Admin" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setFilter(btn.id as any);
                    setActiveSubsystem(0);
                    if (subsystemTrackRef.current) subsystemTrackRef.current.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === btn.id
                      ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white shadow-md shadow-[#0066FF]/25 scale-105"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Quick Step Pills (SYS 01 to SYS 11) & Navigation Arrows */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
                {filteredSubsystems.map((sub, idx) => (
                  <button
                    key={sub.number}
                    onClick={() => scrollToSubsystem(idx)}
                    className={`px-2 py-0.5 rounded-lg text-[10.5px] font-mono font-bold transition-all cursor-pointer ${
                      activeSubsystem === idx
                        ? "bg-white dark:bg-[#0D1424] text-[#0066FF] dark:text-[#38BDF8] shadow-sm"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {sub.number}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSubsystem}
                  disabled={activeSubsystem === 0}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1424] text-slate-700 dark:text-slate-200 transition-all ${
                    activeSubsystem === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:border-[#0066FF] cursor-pointer shadow-sm"
                  }`}
                  aria-label="Previous Subsystem"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSubsystem}
                  disabled={activeSubsystem === filteredSubsystems.length - 1}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1424] text-slate-700 dark:text-slate-200 transition-all ${
                    activeSubsystem === filteredSubsystems.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:border-[#0066FF] cursor-pointer shadow-sm"
                  }`}
                  aria-label="Next Subsystem"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================================= */}
          {/* SIDE-BY-SIDE HORIZONTAL SPATIAL DECK (11 SUBSYSTEMS) */}
          {/* ========================================================================================= */}
          <div
            ref={subsystemTrackRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-3 snap-x snap-mandatory scroll-smooth no-scrollbar select-none"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredSubsystems.map((item, idx) => {
              const isSelected = activeSubsystem === idx;
              return (
                <div
                  key={item.number}
                  onClick={() => setActiveSubsystem(idx)}
                  className={`snap-center shrink-0 w-[88vw] sm:w-[440px] lg:w-[480px] xl:w-[500px] p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-[#0D1424] border-[#0066FF] shadow-2xl scale-[1.01]"
                      : "bg-white/85 dark:bg-[#0D1424]/80 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-md"
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                    boxShadow: isSelected
                      ? `0 20px 45px -10px ${item.color}30, 0 0 20px -5px ${item.color}20`
                      : undefined,
                  }}
                >
                  <div className="space-y-4">
                    {/* Top Row: SYS Badge + Category & Metric */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          SYS {item.number}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-slate-500 dark:text-slate-400">
                          // {item.categoryLabel}
                        </span>
                      </div>

                      <span
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10"
                        style={{ color: item.color }}
                      >
                        {item.metric}
                      </span>
                    </div>

                    {/* Subsystem Title & Icon */}
                    <div className="flex items-start gap-3.5 pt-1">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg relative overflow-hidden transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${item.color} 0%, #080C14 140%)`,
                          border: `1.5px solid ${item.color}70`,
                          boxShadow: `0 8px 24px -4px ${item.color}50, inset 0 1px 2px rgba(255,255,255,0.45)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                        <div className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed mt-1.5">
                          {item.lead}
                        </p>
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
                      <div className="text-[10.5px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                        Architectural Specifications
                      </div>
                      <ul className="space-y-2">
                        {item.specs.map((spec, sIdx) => (
                          <li
                            key={sIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed"
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              style={{ color: item.color }}
                            />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                      Hardened Microservice
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold hover:underline transition-all"
                      style={{ color: item.color }}
                    >
                      <span>Request technical blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">
                SYS {filteredSubsystems[activeSubsystem]?.number || "01"} / SYS 11
              </span>
              <span>&middot;</span>
              <span className="hidden sm:inline text-slate-700 dark:text-slate-300 font-medium">
                {filteredSubsystems[activeSubsystem]?.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
              <span>Scroll horizontally or click arrows to explore side-by-side</span>
            </div>
          </div>

          {/* Global Architecture Benchmarks Strip */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#090D14] border border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>LATENCY BENCHMARKS</span>
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Sub-100ms API Response
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Global CDN edge acceleration across Mumbai, Singapore, and Frankfurt nodes ensures zero screen lag for students.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-[#8B00FF] flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>ISOLATED DATABASES</span>
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                100% Tenant Isolation
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Your institutional records, questions, and student phone numbers are partitioned in dedicated encrypted database schemas.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-[#00E5A3] flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>ZERO LOCK-IN</span>
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Instant 1-Click Data Export
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Full data sovereignty. Export all student records, CBT exam archives, and GST fee logs into standard CSV/JSON anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 3: Premier Architectural Comparison Battle Arena */}
        {/* ========================================================================================= */}
        {(() => {
          const comparisonCriteria = [
            {
              id: "branding",
              number: "01",
              title: "Branding & Identity",
              category: "Brand Sovereignty",
              impactMetric: "100% Brand Recall",
              icon: Palette,
              generic: {
                title: "Generic Mixed Tools (Zoom + Drive + Forms)",
                mainPoint: "Third-party marketplace logos, zero student brand loyalty",
                detail: "Students view your academy as just another link. Competitor courses and 3rd-party marketplace branding distract your enrolled students.",
                badge: "Zero Brand Retention",
              },
              webvibez: {
                title: "WebVibez Dedicated App & Software Platform",
                mainPoint: "100% Your Academy Logo, Icon, Splash & Color Palette",
                detail: "Dedicated native Android & iOS mobile applications published under your institution's developer account with custom domain and custom splash screen.",
                badge: "100% White-Labeled & Sovereign",
              },
            },
            {
              id: "security",
              number: "02",
              title: "Content Security & DRM",
              category: "Anti-Piracy Shield",
              impactMetric: "Zero Leakage Guarantee",
              icon: Lock,
              generic: {
                title: "Generic Mixed Tools (Zoom + Drive + Forms)",
                mainPoint: "Video links easily leaked via Telegram & screen recording",
                detail: "Unencrypted Zoom links, unprotected cloud recordings, and easily downloadable Google Drive folders allow unauthorized sharing across student groups.",
                badge: "High Content Piracy Risk",
              },
              webvibez: {
                title: "WebVibez Dedicated App & Software Platform",
                mainPoint: "Hardware DRM black-screen protection + dynamic student watermark",
                detail: "Hardware-enforced Widevine L1 screen capture blackout. Dynamic floating watermark displays student mobile number, IP address, and timestamp in real-time.",
                badge: "Hardened DRM & Leak Traceability",
              },
            },
            {
              id: "fees",
              number: "03",
              title: "Fee Collection Friction",
              category: "Automated Cash Flow",
              impactMetric: "+42% On-Time Fees",
              icon: CreditCard,
              generic: {
                title: "Generic Mixed Tools (Zoom + Drive + Forms)",
                mainPoint: "Manual UPI screenshots and manual ledger entry",
                detail: "Admin staff spends 15+ hours weekly matching fake or delayed UPI screenshots, manual Excel bookkeeping, and awkward manual payment reminder calls.",
                badge: "Manual Ledger Friction & Errors",
              },
              webvibez: {
                title: "WebVibez Dedicated App & Software Platform",
                mainPoint: "1-Click in-app UPI, automated receipt & WhatsApp reminder alerts",
                detail: "Direct in-app UPI & gateway settlements straight to your bank account, automated GST-compliant invoice generation, and automated WhatsApp alert triggers.",
                badge: "1-Click Direct Bank Settlements",
              },
            },
            {
              id: "testing",
              number: "04",
              title: "Test Evaluation Speed",
              category: "Academic Analytics",
              impactMetric: "0.2s Evaluation Speed",
              icon: FileCheck2,
              generic: {
                title: "Generic Mixed Tools (Zoom + Drive + Forms)",
                mainPoint: "Manual paper grading taking 3 to 7 days",
                detail: "Faculty manually grades physical OMR sheets or basic Google Forms with zero diagnostic depth. Results are delayed by days, dampening student momentum.",
                badge: "3 to 7 Days Evaluation Lag",
              },
              webvibez: {
                title: "WebVibez Dedicated App & Software Platform",
                mainPoint: "Instant 0.2s computerized grading & deep diagnostic reports",
                detail: "Instant NTA / JEE / NEET computerized grading with percentile ranking, negative marking validation, and deep AI topic weakness radar charts.",
                badge: "Instant 0.2s Diagnostic Insights",
              },
            },
            {
              id: "data",
              number: "05",
              title: "Direct Data Ownership",
              category: "Enterprise Privacy",
              impactMetric: "100% Private Isolation",
              icon: Database,
              generic: {
                title: "Generic Mixed Tools (Zoom + Drive + Forms)",
                mainPoint: "Student data held on shared external platforms",
                detail: "Marketplace aggregators own and monetize your student contact records, often retargeting competitor coaching batches directly to your students.",
                badge: "Shared Cloud & Poaching Threat",
              },
              webvibez: {
                title: "WebVibez Dedicated App & Software Platform",
                mainPoint: "100% Private dedicated database owned exclusively by your institution",
                detail: "Dedicated isolated PostgreSQL / MongoDB database cluster. Your academy retains 100% legal ownership, export access, and total student data privacy.",
                badge: "100% Sovereign Data Ownership",
              },
            },
          ];

          return (
            <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-white/10 space-y-10 shadow-2xl relative overflow-hidden">
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5A3]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03 / STRATEGIC ARCHITECTURE · PLATFORM SOVEREIGNTY</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                  Why Premier Institutes Choose WebVibez
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Compare the costs, fragmentation, and technical vulnerabilities of generic marketplace tools vs your own dedicated software application.
                </p>
              </div>

              {/* Head-to-Head Arena Overview Pills (Visual battle banner) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {/* Generic Column Pill */}
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                        Generic Mixed Tools Stack
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                        Zoom + Google Drive + Forms + WhatsApp
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[10px] font-mono px-2.5 py-1 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 font-bold">
                    High Risk &amp; Friction
                  </span>
                </div>

                {/* WebVibez Column Pill */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-gradient-to-r dark:from-[#0066FF]/10 dark:via-[#00E5A3]/10 dark:to-transparent border border-emerald-300 dark:border-[#00E5A3]/40 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-[#00E5A3]/20 dark:text-[#00E5A3] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-emerald-800 dark:text-[#38BDF8] uppercase tracking-wide flex items-center gap-2">
                        <span>WebVibez Dedicated Platform</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#00E5A3] animate-pulse" />
                      </div>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300 font-sans font-medium">
                        100% White-Labeled Native OS &amp; Isolated Cloud
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-[#00E5A3]/20 dark:text-[#00E5A3] border border-emerald-300 dark:border-[#00E5A3]/40 font-bold">
                    Enterprise Turnkey
                  </span>
                </div>
              </div>

              {/* Comparison Cards Stack */}
              <div className="space-y-4 relative z-10">
                {comparisonCriteria.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/10 hover:border-[#0066FF]/40 dark:hover:border-[#00E5A3]/40 transition-all duration-300 shadow-sm space-y-4 group"
                    >
                      {/* Row Header: Category & Metric */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                            {item.number}
                          </span>
                          <div className="w-6 h-6 rounded-lg bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                            · {item.category}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-[#00E5A3]/10 dark:text-[#00E5A3] dark:border-[#00E5A3]/30 text-[10px] font-mono font-bold">
                          <Sparkles className="w-3 h-3 text-emerald-600 dark:text-[#00E5A3]" />
                          <span>{item.impactMetric}</span>
                        </div>
                      </div>

                      {/* Two Column Comparative Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left: Generic Mixed Tools */}
                        <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-500/20 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-700 dark:text-rose-400">
                                <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                                <span>Generic Mixed Stack</span>
                              </div>
                              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
                                {item.generic.badge}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 font-sans leading-snug">
                              {item.generic.mainPoint}
                            </p>
                            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                              {item.generic.detail}
                            </p>
                          </div>
                        </div>

                        {/* Right: WebVibez Dedicated Platform */}
                        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-gradient-to-br dark:from-[#0066FF]/15 dark:via-[#00E5A3]/10 dark:to-transparent border border-emerald-300 dark:border-[#00E5A3]/40 flex flex-col justify-between space-y-3 shadow-sm dark:shadow-[0_0_15px_-3px_rgba(0,229,163,0.08)]">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-[#38BDF8]">
                                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-[#00E5A3]" />
                                <span>WebVibez Dedicated App &amp; OS</span>
                              </div>
                              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-[#00E5A3]/20 dark:text-[#00E5A3] dark:border-[#00E5A3]/30">
                                {item.webvibez.badge}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans leading-snug">
                              {item.webvibez.mainPoint}
                            </p>
                            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                              {item.webvibez.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom ROI & Institutional Value Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10 relative z-10">
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5 text-center sm:text-left shadow-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[#0066FF] dark:text-[#38BDF8]">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase">15+ Staff Hours Saved Weekly</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Zero manual UPI screenshot checks, no ledger entries, and automated 0.2s computerized test evaluations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5 text-center sm:text-left shadow-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 dark:text-[#00E5A3]">
                    <Coins className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3]" />
                    <span className="text-xs font-mono font-bold uppercase text-emerald-800 dark:text-[#00E5A3]">0% Marketplace Commission</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    100% course fee collections settle directly into your own bank account with automated GST invoicing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1.5 text-center sm:text-left shadow-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[#7C3AED] dark:text-[#A78BFA]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase">100% Sovereign Security</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Dedicated database isolation, zero competitor student poaching, and hardware DRM black-screen protection.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ========================================================================================= */}
        {/* SECTION 5: Bottom CTA */}
        {/* ========================================================================================= */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Ready to deploy your customized software platform?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto font-sans">
            Join 400,000+ students and premier institutions who rely on WebVibez Software Developer every day. Live turnkey production delivery in 7 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-sm font-semibold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition"
            >
              <span>Request Customized Platform Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Consultation / Request Demo Modal */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
