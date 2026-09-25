"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  Check,
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Rocket,
  UploadCloud,
  Palette,
  CreditCard,
  Database,
  Smartphone,
  Server,
  Lock,
  MessageSquare,
  Users,
  Award,
  Shield,
  FileCheck2,
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [modalOpen, setModalOpen] = useState(false);
  
  // Drag / Swipe State
  const touchStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const mobilePillsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (mobilePillsContainerRef.current) {
      const activeBtn = mobilePillsContainerRef.current.children[activeDay] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeDay]);

  // The 7 Days Rapid Launch Lifecycle
  const days = [
    {
      day: "DAY 01",
      shortTitle: "Discovery & Scope",
      title: "Discovery & Technical Scoping",
      lead: "We gather your brand guidelines, domain, curricula, and specific operational rules to create a signed architecture blueprint.",
      icon: <Layers className="w-5 h-5 text-[#0066FF]" />,
      color: "#0066FF",
      duration: "Within 24 Hours",
      milestone: "Signed Technical Scope Document",
      deliverables: [
        "Dedicated Slack / WhatsApp VIP engineering bridge initiated",
        "Collection of high-resolution logos, brand hex palette, and certificates",
        "Course hierarchy & batch structure mapping",
        "Payment gateway credentials & banking settlement setup",
      ],
      deliverableDetails: [
        { label: "Bridge", value: "WhatsApp / Slack VIP Room Active" },
        { label: "Assets", value: "Vector Logos & Hex Tokens Verified" },
        { label: "Structure", value: "Batches, Subjects & Fees Mapped" },
        { label: "Banking", value: "Direct UPI & PG Keys Configured" },
      ],
    },
    {
      day: "DAY 02",
      shortTitle: "Brand Customization",
      title: "Brand Customization & Theme Engine",
      lead: "We compile your custom iOS & Android builds with bespoke visual styling, splash screens, and custom typography.",
      icon: <Palette className="w-5 h-5 text-[#7C3AED]" />,
      color: "#7C3AED",
      duration: "Day 2 Completed",
      milestone: "Design & UI Approval",
      deliverables: [
        "Compilation of iOS & Android launcher icons, splash screen, and color theme",
        "Interactive Figma preview link shared with your leadership for review",
        "Custom app naming and metadata configuration for store listings",
        "Web admin dashboard customized with your institutional badge",
      ],
      deliverableDetails: [
        { label: "Mobile Builds", value: "Custom Launcher & Splash Rendered" },
        { label: "Figma Link", value: "Interactive Prototype Shared" },
        { label: "Store Metadata", value: "Titles, Descriptions & Screenshots" },
        { label: "Admin Portal", value: "Branded Web Dashboard Live" },
      ],
    },
    {
      day: "DAY 03",
      shortTitle: "Cloud Infrastructure",
      title: "Cloud Infrastructure & Database Isolation",
      lead: "We provision your private, encrypted cloud database and CDN edge nodes for high-speed video streaming.",
      icon: <UploadCloud className="w-5 h-5 text-[#00E5A3]" />,
      color: "#00E5A3",
      duration: "Day 3 Completed",
      milestone: "Dedicated Cloud Provisioned",
      deliverables: [
        "Dedicated PostgreSQL database cluster with automated hourly snapshots",
        "AWS S3 & Cloudflare encrypted storage buckets configured for video & PDFs",
        "Custom domain SSL certificate issued (e.g., learn.yourinstitute.com)",
        "Hardware DRM license keys and encryption tokens generated",
      ],
      deliverableDetails: [
        { label: "Database", value: "Private Isolated PostgreSQL Cluster" },
        { label: "Cloud Storage", value: "Encrypted AWS S3 & Cloudflare CDN" },
        { label: "SSL & DNS", value: "Custom Domain TLS 1.3 Certified" },
        { label: "Security", value: "Widevine L1 DRM Tokens Issued" },
      ],
    },
    {
      day: "DAY 04",
      shortTitle: "Data Migration",
      title: "Data Migration & Content Setup",
      lead: "Our engineers import your existing student rosters, video archives, test series, and question banks.",
      icon: <Zap className="w-5 h-5 text-[#38BDF8]" />,
      color: "#38BDF8",
      duration: "Day 4 Completed",
      milestone: "Existing Data 100% Ingested",
      deliverables: [
        "Bulk CSV import of existing student profiles, phone numbers, and batch tags",
        "Upload and DRM-transcoding of existing recorded lectures",
        "Migration of question banks into the computerized CBT exam simulator",
        "Staff & faculty logins created with defined role permissions",
      ],
      deliverableDetails: [
        { label: "Student Roster", value: "Bulk Ingestion with Zero Duplicates" },
        { label: "Video Transcode", value: "Multi-bitrate HLS DRM Encoded" },
        { label: "Question Bank", value: "CBT Mock Tests Configured" },
        { label: "Staff Logins", value: "Faculty & Admin RBAC Setup" },
      ],
    },
    {
      day: "DAY 05",
      shortTitle: "Quality Assurance",
      title: "Quality Assurance & Penetration Testing",
      lead: "Rigorous stress testing of live streams, payment webhooks, and DRM screen capture blackout protections.",
      icon: <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />,
      color: "#F59E0B",
      duration: "Day 5 Completed",
      milestone: "Zero Vulnerability Sign-off",
      deliverables: [
        "End-to-end test UPI payment transactions and auto-generated invoices verified",
        "Screen recorder and screenshot blackout tests on Android & iOS",
        "Stress test on CBT mock exam submission with 5,000 simulated users",
        "Audio/video streaming latency benchmarked on low-speed 4G connections",
      ],
      deliverableDetails: [
        { label: "UPI Testing", value: "100% Direct Settlement Verified" },
        { label: "Anti-Piracy", value: "100% Screen Recorder Blackout Pass" },
        { label: "Load Testing", value: "5,000+ Concurrent Students Benchmarked" },
        { label: "Latency", value: "< 1.2s Sub-second Stream Lag" },
      ],
    },
    {
      day: "DAY 06",
      shortTitle: "App Store Submission",
      title: "App Store & Google Play Submission",
      lead: "We submit your production APK / IPA binaries to Google Play Store and Apple App Store.",
      icon: <Smartphone className="w-5 h-5 text-[#EC4899]" />,
      color: "#EC4899",
      duration: "Day 6 Completed",
      milestone: "Store Review In Flight",
      deliverables: [
        "Production release build signed with your institutional developer keystore",
        "App Store review screenshots and promotional graphics prepared",
        "Submission to Google Play Console and Apple App Store Connect",
        "Private direct-download APK link provisioned for immediate student onboarding",
      ],
      deliverableDetails: [
        { label: "Keystore Sign", value: "Institutional Keystore Certified" },
        { label: "Store Graphics", value: "High-Res Feature Graphics Uploaded" },
        { label: "Submission", value: "Google & Apple Review Underway" },
        { label: "Instant APK", value: "Direct Onboarding Link Ready" },
      ],
    },
    {
      day: "DAY 07",
      shortTitle: "Production Launch",
      title: "Production Launch & Staff Training",
      lead: "Your platform goes live! We conduct hands-on training for your faculty, teachers, and admins.",
      icon: <Rocket className="w-5 h-5 text-[#10B981]" />,
      color: "#10B981",
      duration: "Day 7 — LIVE IN PRODUCTION",
      milestone: "Full Operations Live",
      deliverables: [
        "Live 90-minute Zoom workshop training your teachers and reception staff",
        "Student onboarding guide & video tutorials formatted with your logo",
        "Official launch broadcast notification sent to all enrolled students",
        "Handoff to 24/7 dedicated engineering support with guaranteed SLA",
      ],
      deliverableDetails: [
        { label: "Faculty Clinic", value: "90-Min Hands-On Live Training" },
        { label: "Student Guide", value: "Branded PDF & Video Manuals" },
        { label: "Broadcast", value: "WhatsApp & SMS Announcement Sent" },
        { label: "SLA Support", value: "24/7 Dedicated Architect Hotline" },
      ],
    },
  ];

  const totalDays = days.length;
  const current = days[activeDay];

  const handlePrevDay = useCallback(() => {
    setDirection("prev");
    setActiveDay((prev) => (prev > 0 ? prev - 1 : totalDays - 1));
  }, [totalDays]);

  const handleNextDay = useCallback(() => {
    setDirection("next");
    setActiveDay((prev) => (prev < totalDays - 1 ? prev + 1 : 0));
  }, [totalDays]);

  const handleSelectDay = (idx: number) => {
    setDirection(idx >= activeDay ? "next" : "prev");
    setActiveDay(idx);
  };

  // Keyboard navigation support with input guard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevDay();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextDay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevDay, handleNextDay]);

  // Touch Swipe & Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      setDragOffset(e.touches[0].clientX - touchStartX.current);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (dragOffset > 50) {
        handlePrevDay();
      } else if (dragOffset < -50) {
        handleNextDay();
      }
    }
    touchStartX.current = null;
    setDragOffset(0);
  };

  // 4 Required Assets from Institute
  const prerequisites = [
    {
      number: "01",
      title: "Brand Assets",
      desc: "Your academy logo (PNG or SVG) and primary color preferences.",
      icon: Palette,
      color: "#0066FF",
      detail: "High-resolution vector or transparent PNG logo, app name, and accent color codes.",
    },
    {
      number: "02",
      title: "Payment Account",
      desc: "Razorpay, Cashfree, or PhonePe merchant account details for direct settlements.",
      icon: CreditCard,
      color: "#00E5A3",
      detail: "Merchant API keys for direct in-app UPI, card, and net-banking settlements.",
    },
    {
      number: "03",
      title: "Course Structure",
      desc: "List of courses, subjects, fees, and batch schedules.",
      icon: FileCheck2,
      color: "#7C3AED",
      detail: "Curricula breakdown, batch names, fee structures, and existing lecture recordings.",
    },
    {
      number: "04",
      title: "Developer Accounts",
      desc: "Google Play Console ($25 one-time) & Apple Developer ($99/year) if publishing under your account.",
      icon: Smartphone,
      color: "#F59E0B",
      detail: "Developer console access to publish apps under your official academy organization.",
    },
  ];

  const prevIdx = activeDay > 0 ? activeDay - 1 : totalDays - 1;
  const nextIdx = activeDay < totalDays - 1 ? activeDay + 1 : 0;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* ========================================================================================= */}
        {/* SECTION 1: Header */}
        {/* ========================================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>01 / TIMELINE · 7-DAY RAPID LAUNCH BLUEPRINT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            From Agreement to Live Production in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">
              Exactly 7 Days
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            No endless 6-month development delays. We operate an industrialized software deployment pipeline that launches your fully branded ecosystem in 7 business days.
          </p>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 2: Interactive 7-Day Timeline Selector Bar with Full Left/Right Controls */}
        {/* ========================================================================================= */}
        <div className="space-y-6">
          
          {/* Top Scrubbing Bar with Left & Right Arrow HUD Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400">
                Phase Progress:
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20 text-xs font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                <span>{current.day} / 07</span>
                <span>&middot;</span>
                <span className="hidden md:inline font-sans">{current.shortTitle}</span>
              </div>
            </div>

            {/* Top Quick Arrow Step Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-600 hidden md:inline-flex items-center gap-1">
                <MousePointerClick className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Click pills or use arrows &larr; &rarr;</span>
              </span>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-xs">
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                  aria-label="Previous Day"
                  title="Previous Day (Arrow Left)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono font-bold px-2 text-slate-800 dark:text-slate-200 select-none">
                  0{activeDay + 1} <span className="text-slate-400">/ 07</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextDay}
                  className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                  aria-label="Next Day"
                  title="Next Day (Arrow Right)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Swipeable Day Selection Pills (<640px) */}
          <div
            ref={mobilePillsContainerRef}
            className="flex sm:hidden overflow-x-auto pb-2 scrollbar-none snap-x gap-2.5 px-0.5"
          >
            {days.map((d, idx) => {
              const isSelected = activeDay === idx;
              return (
                <button
                  key={`mob-${d.day}`}
                  type="button"
                  onClick={() => handleSelectDay(idx)}
                  className={`min-w-[138px] shrink-0 snap-start p-3 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? "bg-white dark:bg-[#0E1526] border-[#0066FF] dark:border-[#38BDF8] shadow-lg shadow-[#0066FF]/15 ring-2 ring-[#0066FF]/30"
                      : "bg-white/70 dark:bg-[#080D1A]/70 border-slate-200/80 dark:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                        isSelected
                          ? "bg-[#0066FF]/15 text-[#0066FF] dark:text-[#38BDF8]"
                          : "bg-slate-100 dark:bg-white/5 text-slate-400"
                      }`}
                    >
                      {d.day}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  </div>

                  <div className="text-xs font-bold font-display text-slate-800 dark:text-white line-clamp-1 mt-1">
                    {d.shortTitle}
                  </div>

                  <div className="w-full mt-2 h-1 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${((idx + 1) / 7) * 100}%`,
                        backgroundColor: isSelected ? d.color : "#94A3B8",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tablet & Desktop Day Selection Pills Grid (>=640px) */}
          <div ref={pillsContainerRef} className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2.5 lg:gap-3">
            {days.map((d, idx) => {
              const isSelected = activeDay === idx;
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => handleSelectDay(idx)}
                  className={`p-3 lg:p-3.5 rounded-2xl border text-center transition-all duration-300 relative group cursor-pointer flex flex-col justify-between items-center select-none ${
                    isSelected
                      ? "bg-white dark:bg-[#0E1526] border-[#0066FF] dark:border-[#38BDF8] shadow-xl shadow-[#0066FF]/15 scale-102 ring-2 ring-[#0066FF]/30"
                      : "bg-white/70 dark:bg-[#080D1A]/70 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                        isSelected
                          ? "bg-[#0066FF]/15 text-[#0066FF] dark:text-[#38BDF8]"
                          : "bg-slate-100 dark:bg-white/5 text-slate-400"
                      }`}
                    >
                      {d.day}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  </div>

                  <div className="text-xs font-bold font-display text-slate-800 dark:text-white line-clamp-1 mt-1 text-left w-full">
                    {d.shortTitle}
                  </div>

                  <div className="w-full mt-2 h-1 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${((idx + 1) / 7) * 100}%`,
                        backgroundColor: isSelected ? d.color : "#94A3B8",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Day Spotlight Card with Floating Left & Right Navigation Arrows */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#090E1C]/95 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6 sm:space-y-8 overflow-hidden backdrop-blur-xl group"
          >
            {/* Subtle ambient lighting */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
              style={{ backgroundColor: current.color }}
            />

            {/* Floating Left Navigation Arrow on Card (Desktop only, never clashes on mobile/tablet) */}
            <button
              type="button"
              onClick={handlePrevDay}
              className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/95 dark:bg-[#0D1424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-white shadow-xl hover:scale-110 hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer group/btn"
              aria-label="Previous Day"
              title={`Previous: ${days[prevIdx].day} · ${days[prevIdx].shortTitle}`}
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
            </button>

            {/* Floating Right Navigation Arrow on Card (Desktop only) */}
            <button
              type="button"
              onClick={handleNextDay}
              className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-white/95 dark:bg-[#0D1424]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-white shadow-xl hover:scale-110 hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer group/btn"
              aria-label="Next Day"
              title={`Next: ${days[nextIdx].day} · ${days[nextIdx].shortTitle}`}
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
            </button>

            {/* Header of Active Day */}
            <div
              key={`header-${current.day}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-100 dark:border-white/10 relative z-10 animate-in fade-in duration-300"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/20 transition-all duration-500"
                  style={{ backgroundColor: `${current.color}15`, color: current.color }}
                >
                  {current.icon}
                </div>
                <div>
                  <div
                    className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                    style={{ color: current.color }}
                  >
                    {current.day} · PHASE {activeDay + 1} OF 7
                  </div>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                    {current.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between sm:justify-end w-full sm:w-auto">
                {/* Mobile / Tablet Quick Arrows inside card header */}
                <div className="flex xl:hidden items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shadow-xs">
                  <button
                    type="button"
                    onClick={handlePrevDay}
                    className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                    aria-label="Previous Day"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono font-bold px-2 text-slate-700 dark:text-slate-300 select-none">
                    {activeDay + 1} / 7
                  </span>
                  <button
                    type="button"
                    onClick={handleNextDay}
                    className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#0066FF] active:scale-90 transition-all cursor-pointer"
                    aria-label="Next Day"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-[#00E5A3] border border-emerald-500/30 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{current.milestone}</span>
                </div>
              </div>
            </div>

            {/* Lead Narrative */}
            <p
              key={`lead-${current.day}`}
              className="text-xs sm:text-base text-slate-700 dark:text-slate-200 font-sans leading-relaxed relative z-10 max-w-4xl animate-in fade-in duration-300"
            >
              {current.lead}
            </p>

            {/* 4 Concrete Deliverables Grid */}
            <div key={`deliv-${current.day}`} className="space-y-3 sm:space-y-4 relative z-10 animate-in fade-in duration-300">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
                <span>Day Deliverables &amp; Verification Checklist</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {current.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 flex items-start gap-3 hover:border-[#0066FF]/40 transition-all duration-200 shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#00E5A3]/20 text-[#00E5A3] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 font-sans leading-snug">
                        {item}
                      </p>
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 dark:text-slate-600">
                        {current.deliverableDetails[i]?.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeframe & Navigation Control Bar */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 relative z-10">
              <div className="flex items-center gap-2 font-mono font-medium">
                <Clock className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Execution Timeframe: <strong className="text-slate-800 dark:text-white">{current.duration}</strong>
                </span>
              </div>

              {/* Bottom Action Left / Right Buttons with Target Day Names */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0066FF] hover:bg-slate-100 dark:hover:bg-white/[0.05] font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0" />
                  <span>
                    Previous <span className="hidden md:inline">({days[prevIdx].day} · {days[prevIdx].shortTitle})</span>
                    <span className="md:hidden">({days[prevIdx].day})</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleNextDay}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0066FF]/20 hover:brightness-110 transition-all cursor-pointer active:scale-95 group"
                >
                  <span>
                    Next <span className="hidden md:inline">({days[nextIdx].day} · {days[nextIdx].shortTitle})</span>
                    <span className="md:hidden">({days[nextIdx].day})</span>
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 3: What We Need From You (The 4 Basic Assets) */}
        {/* ========================================================================================= */}
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-white/10 space-y-6 sm:space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] border border-[#00E5A3]/30 text-[11px] font-mono uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// PREREQUISITES · ZERO COMPLICATION</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              What We Need From You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              To guarantee your 7-day delivery SLA, you only need to provide 4 basic assets. Our team handles all server provisioning, coding, builds, and store releases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {prerequisites.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/10 hover:border-[#0066FF]/40 dark:hover:border-[#00E5A3]/40 transition-all duration-300 shadow-sm hover:shadow-xl space-y-3 sm:space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      {item.number}
                    </span>
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-600 font-sans leading-relaxed pt-1 border-t border-slate-100 dark:border-white/5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 4: Institutional SLA Guarantee Deck */}
        {/* ========================================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 space-y-2 text-left shadow-sm">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center mb-2 sm:mb-3">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
              100% On-Time Delivery Guarantee
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Industrialized release pipelines ensure your platform launches in 7 days or we credit back your deployment fee.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 space-y-2 text-left shadow-sm">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00E5A3]/10 text-[#00E5A3] flex items-center justify-center mb-2 sm:mb-3">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
              VIP WhatsApp Engineering Bridge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Direct real-time channel with your senior software architects throughout the 7-day sprint and beyond.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 space-y-2 text-left shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] flex items-center justify-center mb-2 sm:mb-3">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
              Zero Downtime Student Transition
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Seamlessly migrate from Zoom/Drive without missing a single live class or disrupting academic timetables.
            </p>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 5: Bottom CTA */}
        {/* ========================================================================================= */}
        <div className="text-center p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 space-y-5 sm:space-y-6 shadow-2xl">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Ready to start Day 01 this week?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            Reserve your deployment slot with our engineering team today and be fully live in production in exactly 7 business days.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition cursor-pointer w-full sm:w-auto"
            >
              <span>Book Day 01 Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="https://wa.me/919213615531?text=Hi%20WebVibez%20Software%20Developer,%20I%20want%20to%20start%20the%207-day%20launch%20blueprint"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.1] transition cursor-pointer w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Chat on WhatsApp (+91 92136 15531)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
