"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Sparkles,
  ArrowRight,
  Code2,
  ShieldCheck,
  Zap,
  Users2,
  Globe2,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Layers,
  Server,
  Database,
  Smartphone,
  Check,
  Award,
  Terminal,
  Clock,
  MessageSquare,
  Shield,
  Activity,
  Flame,
  Radio,
  Eye,
  CheckCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // The 4 Core Architectural Engine Specifications
  const coreSpecs = [
    {
      label: "Architecture",
      spec: "Next.js 16 + React Native",
      badge: "DUAL-PLATFORM CORE",
      desc: "Full-stack server-side rendered institutional web portals integrated seamlessly with cross-platform native iOS & Android client applications.",
      icon: Code2,
      color: "#0066FF",
      stat: "v16.0 Turbopack",
      subdetails: ["Turbopack SSR Admin Panel", "React Native Fabric Engine", "Unified TypeScript Monorepo"],
    },
    {
      label: "Security",
      spec: "Hardware DRM & Anti-Piracy",
      badge: "CONTENT PROTECTION",
      desc: "Hardware-level screen blackout, dynamic student watermarking, and secure tokenized media stream encryption.",
      icon: Lock,
      color: "#00E5A3",
      stat: "Hardware DRM Protected",
      subdetails: ["Hardware Screen Recording Block", "Dynamic Moving Watermarks", "Encrypted Stream Delivery"],
    },
    {
      label: "Performance",
      spec: "60 FPS Native UI Engine",
      badge: "FLUID INTERACTION",
      desc: "Native thread UI rendering delivering butter-smooth 60 frames per second animations and sub-50ms touch response even on budget smartphones.",
      icon: Zap,
      color: "#7C3AED",
      stat: "60 FPS Constant",
      subdetails: ["Hardware-Accelerated Canvas", "Zero-Jank Gesture Navigation", "< 50ms Touch Response"],
    },
    {
      label: "Streaming",
      spec: "< 1.2s Sub-second Latency",
      badge: "ULTRA-LOW DELAY",
      desc: "Industrial-grade adaptive bitrate HLS video distribution network delivering crystal-clear 1080p live lectures with instant doubt interaction.",
      icon: Radio,
      color: "#38BDF8",
      stat: "< 1.2s Glass-to-Glass",
      subdetails: ["Adaptive Multi-Bitrate HLS", "Real-Time Encrypted Doubt Chat", "99.98% Edge CDN Uptime"],
    },
  ];

  // Running Marquee Items (Right to Left Tech & Milestone Stream)
  const tickerItems = [
    { label: "Architecture", value: "Next.js 16 + React Native", icon: Code2, color: "#0066FF" },
    { label: "Security", value: "Hardware DRM Anti-Piracy", icon: Lock, color: "#00E5A3" },
    { label: "Performance", value: "Optimized 60 FPS Native UI", icon: Zap, color: "#7C3AED" },
    { label: "Streaming", value: "Low-Latency HLS Video", icon: Activity, color: "#38BDF8" },
    { label: "Isolation", value: "Dedicated Database Instances", icon: Database, color: "#F59E0B" },
    { label: "Delivery", value: "Rapid Sprint Deployment", icon: Clock, color: "#10B981" },
    { label: "Pricing", value: "Predictable Flat Rates", icon: HeartHandshake, color: "#EC4899" },
    { label: "Scale", value: "Scalable Cloud Architecture", icon: Users2, color: "#0066FF" },
  ];

  // 4 Foundational Pillars with 3D Tilt capabilities
  const pillars = [
    {
      number: "01",
      title: "Direct Account Publishing",
      badge: "Brand Identity",
      desc: "Your app is published directly under your own Google Play & Apple developer accounts with full source code ownership.",
      icon: Smartphone,
      color: "#0066FF",
      stat: "100% White-Labeled",
    },
    {
      number: "02",
      title: "Direct Payment Settlement",
      badge: "Transparent Model",
      desc: "Direct in-app payment gateway integrations (Razorpay, Cashfree, UPI) settling student payments straight into your institute bank account.",
      icon: HeartHandshake,
      color: "#00E5A3",
      stat: "Direct UPI / PG",
    },
    {
      number: "03",
      title: "Structured Rapid Delivery",
      badge: "Agile Sprints",
      desc: "Our modular architecture and automated CI/CD build pipelines deliver fast turnaround on production iOS, Android & web releases.",
      icon: Zap,
      color: "#7C3AED",
      stat: "Agile Delivery",
    },
    {
      number: "04",
      title: "Hardware Content Security",
      badge: "Anti-Piracy Shield",
      desc: "Hardware-level screen blackout protection and dynamic floating student watermarks safeguard course lectures and test papers.",
      icon: ShieldCheck,
      color: "#F59E0B",
      stat: "Content Protected",
    },
  ];

  // Engineering Principles Stack
  const principles = [
    {
      title: "Pure Typed TypeScript Core",
      detail: "Zero loose JavaScript. 100% strict type safety prevents runtime crashes across thousands of concurrent student devices.",
      icon: Terminal,
    },
    {
      title: "60 FPS Fluid UI Architecture",
      detail: "Hardware-accelerated rendering transitions ensuring butter-smooth scrolling even on budget Android smartphones.",
      icon: Cpu,
    },
    {
      title: "Isolated Database Clusters",
      detail: "Every institution gets private encrypted tables and isolated database instances. Never co-mingled with competitor data.",
      icon: Database,
    },
    {
      title: "Sub-Second CBT Grading Engine",
      detail: "Computerized examination algorithms calculate complex percentile rankings and negative markings in under 0.2 seconds.",
      icon: Activity,
    },
  ];

  return (
    <PageWrapper>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        
        {/* ========================================================================================= */}
        {/* SECTION 1: Hero Header */}
        {/* ========================================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / ABOUT &middot; DIGITAL PRODUCT &amp; SOFTWARE STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
            We Build Software That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">
              Empowers Leaders
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            WebVibez Software Developer is an industrialized software engineering studio. We build sovereign iOS/Android applications, live classroom streaming engines, and institutional operating systems for forward-thinking academies.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              <span>Build Your Custom App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.1] transition cursor-pointer"
            >
              <span>View Transparent Plans</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 2: Continuous Running Telemetry Marquee */}
        {/* ========================================================================================= */}
        <div className="relative w-full overflow-hidden py-3.5 border-y border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex gap-4 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max">
            {[...tickerItems, ...tickerItems].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0B101E] border border-slate-200/70 dark:border-white/10 shadow-sm"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-600 font-semibold">
                      {item.label}:
                    </span>
                    <span className="text-xs font-bold font-sans text-slate-800 dark:text-slate-200">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 3: THE 4 CORE ARCHITECTURAL ENGINE SPECIFICATIONS (BENTO GRID) */}
        {/* ========================================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/30 text-[11px] font-mono uppercase font-bold">
              <Code2 className="w-3.5 h-3.5" />
              <span>// 02 / CORE ENGINE ARCHITECTURE &middot; TECHNICAL SPECS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Engineered for Speed, DRM Security &amp; Infinite Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-xl mx-auto">
              Our software platform is built from the ground up on modern industrial technologies with zero reliance on generic templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {coreSpecs.map((item, idx) => {
              const SpecIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0A0F1E]/95 border border-slate-200/90 dark:border-white/10 shadow-xl hover:shadow-2xl hover:border-[#0066FF]/40 dark:hover:border-[#00E5A3]/40 transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group backdrop-blur-xl"
                >
                  {/* Ambient Glow */}
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                          style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                          <SpecIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10.5px] font-mono font-bold uppercase text-slate-400 dark:text-slate-600">
                            {item.label}
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 dark:text-white">
                            {item.spec}
                          </h3>
                        </div>
                      </div>

                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase border"
                        style={{
                          backgroundColor: `${item.color}15`,
                          borderColor: `${item.color}30`,
                          color: item.color,
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="space-y-2 pt-2">
                      {item.subdetails.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2 text-xs font-sans text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0"
                            style={{ color: item.color }}
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono relative z-10">
                    <span className="text-slate-400 dark:text-slate-600">Verified Metric:</span>
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.stat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 4: Mission & Engineering Philosophy Interactive Split */}
        {/* ========================================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Mission Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-white/10 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#0066FF]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center shadow-md">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] uppercase border border-[#0066FF]/20">
                  Institutional Freedom
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Our Core Mission
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                To liberate educational academies, coaching institutes, and growth enterprises from clunky, fragmented third-party software and commission-charging marketplace platforms. We engineer sovereign, 100% white-labeled software that builds lasting institutional equity.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#0066FF] dark:text-[#38BDF8] font-bold relative z-10">
              <span>// BUILD SMART. SCALE FAST.</span>
              <span className="text-slate-400 font-normal">100% White-Label</span>
            </div>
          </div>

          {/* Engineering Philosophy Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-white/10 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#7C3AED]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] uppercase border border-[#7C3AED]/20">
                  Zero Vulnerability
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Our Engineering Philosophy
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                We believe that software should be blazing-fast, beautiful to use, and uncompromisingly secure. We write strictly-typed TypeScript, engineer 60 FPS mobile interfaces, and enforce hardware DRM encryption so your intellectual property and student roster stay completely protected.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#7C3AED] dark:text-[#A78BFA] font-bold relative z-10">
              <span>// ZERO COMPROMISE ON SECURITY.</span>
              <span className="text-slate-400 font-normal">Hardened DRM</span>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 5: The 4 Foundational Pillars */}
        {/* ========================================================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066FF] dark:text-[#38BDF8]">
              // ARCHITECTURAL ADVANTAGES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              The 4 Pillars of WebVibez
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
              Why leading educators, top coaching centers, and ambitious institutions choose us over generic marketplace tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-white/10 hover:border-[#0066FF]/50 dark:hover:border-[#00E5A3]/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        {pillar.number}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-600">
                      {pillar.badge}
                    </span>
                    <span
                      className="text-[11px] font-mono font-bold"
                      style={{ color: pillar.color }}
                    >
                      {pillar.stat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 5.5: Leadership & Founder Spotlight — Rudram Joshi */}
        {/* ========================================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-[#0066FF]/5 dark:from-[#0B101E] dark:via-[#0C1222] dark:to-[#0066FF]/10 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Avatar & Badge Card */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-5">
              <div className="relative group">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-[#0066FF] via-[#7C3AED] to-[#00E5A3] p-1 shadow-2xl shadow-[#0066FF]/25 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/images/square-image.jpg"
                    alt="Rudram Joshi - Founder & Lead Developer at WebVibez"
                    className="w-full h-full object-cover rounded-[22px] bg-slate-100 dark:bg-slate-900"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono text-[11px] font-extrabold shadow-md flex items-center gap-1.5 border-2 border-white dark:border-[#0B101E]">
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                  <span>ACTIVE DESK</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Leadership &amp; Engineering Direction</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                  Rudram Joshi
                </h3>
                <p className="text-sm font-mono font-bold text-[#0066FF] dark:text-[#38BDF8]">
                  Founder &amp; Lead Developer
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>

              {/* Direct Founder Channels */}
              <div className="flex flex-wrap gap-2.5 w-full pt-1">
                <a
                  href="https://wa.me/919213615531?text=Hi%20Rudram%20Joshi%20(WebVibez%20Founder),%20I%20would%20like%20to%20consult%20about%20building%20an%20app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>WhatsApp Rudram</span>
                </a>
                <a
                  href="mailto:webvibezsoftdev@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-mono text-xs hover:border-[#0066FF] transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
                  <span>Email Desk</span>
                </a>
              </div>
            </div>

            {/* Founder Story & Core Engineering Pillars */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                  &ldquo;We don&apos;t just write code — we architect scalable software assets that empower institutes to own their digital destiny.&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Founded and led by <strong className="text-slate-900 dark:text-white">Rudram Joshi</strong>, WebVibez Software Developer was established with a singular focus: delivering zero-compromise, 100% white-labeled mobile apps and custom enterprise platforms without SaaS commission traps.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Rudram directly oversees the engineering roadmap, architecture design, DRM anti-piracy hardening, and rapid 7-day deployment cycles for every client partner.
                </p>
              </div>

              {/* Founder Technical Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070B16] border border-slate-200/80 dark:border-white/10 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase">
                    Full-Stack Core
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Next.js 16 &amp; React Native
                  </div>
                  <div className="text-[10.5px] text-slate-600 dark:text-slate-400">
                    60 FPS native rendering
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070B16] border border-slate-200/80 dark:border-white/10 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-[#00E5A3] uppercase">
                    Security Lead
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Hardware DRM &amp; IP Protection
                  </div>
                  <div className="text-[10.5px] text-slate-600 dark:text-slate-400">
                    Zero screenshot piracy
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070B16] border border-slate-200/80 dark:border-white/10 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-[#7C3AED] dark:text-[#A78BFA] uppercase">
                    Execution
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    7-Day Fast Track
                  </div>
                  <div className="text-[10.5px] text-slate-600 dark:text-slate-400">
                    Direct developer oversight
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 6: Engineering Principles Grid */}
        {/* ========================================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-white/10 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] border border-[#00E5A3]/30 text-[11px] font-mono uppercase font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>TECHNICAL STANDARDS &amp; CODE INTEGRITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Built on Modern Industry Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
              We never use legacy CMS plugins, low-code wrappers, or outdated PHP templates. We build strictly with high-throughput modern stacks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((pr, idx) => {
              const IconComp = pr.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200/80 dark:border-white/10 flex items-start gap-4 hover:border-[#0066FF]/40 transition-all shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                      {pr.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {pr.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stack Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center pt-2">
            {[
              { name: "Next.js 16", role: "Web App & SSR" },
              { name: "React Native", role: "iOS & Android" },
              { name: "TypeScript", role: "Type-Safe Logic" },
              { name: "PostgreSQL", role: "Relational DB" },
              { name: "AWS Cloud", role: "Scalable Infra" },
              { name: "Docker & K8s", role: "Microservices" },
            ].map((tech, tIdx) => (
              <div
                key={tIdx}
                className="p-3.5 rounded-xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 space-y-0.5"
              >
                <div className="text-xs font-bold font-display text-slate-900 dark:text-white">
                  {tech.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 7: Bottom Action CTA */}
        {/* ========================================================================================= */}
        <div className="text-center p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Ready to partner with WebVibez Software Developer?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            Let&apos;s discuss how our custom software solutions can automate your operations and scale your revenue. Production delivery in 7 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition cursor-pointer w-full sm:w-auto"
            >
              <span>Build Your Coaching App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="https://wa.me/919213615531?text=Hi%20WebVibez%20Software%20Developer,%20I%20would%20like%20to%20consult%20about%20building%20an%20app"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.1] transition cursor-pointer w-full sm:w-auto"
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
