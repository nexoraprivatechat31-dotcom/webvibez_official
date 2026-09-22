"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Layers,
  Video,
  Globe,
  ArrowRight,
  Zap,
  Users,
  Check,
  MessageSquare,
  FileCode,
  Award,
  Building2,
  Copy,
  CheckCheck,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Headphones,
  Calendar,
  Code2,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    solutionType: "App + Admin Panel",
    studentVolume: "Up to 750 (Included)",
    timeline: "7-Day Fast Track",
    message: "",
  });

  const solutionOptions = [
    {
      id: "mobile-app",
      label: "Mobile App (iOS & Android)",
      desc: "Branded Student, Teacher & Admin native apps",
      icon: Smartphone,
      color: "#0066FF",
      tag: "TIER 01",
    },
    {
      id: "app-admin",
      label: "App + Admin Panel",
      desc: "Native apps + complete web management ERP",
      icon: Layers,
      color: "#059669",
      tag: "MOST POPULAR",
    },
    {
      id: "live-studio",
      label: "Live Lecture Platform",
      desc: "1080p live streaming & encrypted doubt chat",
      icon: Video,
      color: "#7C3AED",
      tag: "LIVE STREAM",
    },
    {
      id: "academy-suite",
      label: "Complete Academy Suite",
      desc: "App + Website + Live Stream + Web ERP",
      icon: Globe,
      color: "#D97706",
      tag: "FLAGSHIP",
    },
    {
      id: "bespoke-enterprise",
      label: "Custom Enterprise Bespoke",
      desc: "Tailored architecture, custom APIs & dedicated servers",
      icon: Building2,
      color: "#8B00FF",
      tag: "BESPOKE",
    },
  ];

  const studentOptions = [
    "50 - 200 Students",
    "200 - 500 Students",
    "Up to 750 (Included)",
    "750 - 2,500 Students",
    "2,500+ Multi-Campus",
  ];

  const timelineOptions = [
    "7-Day Fast Track",
    "Within 2-3 Weeks",
    "Within 1-2 Months",
    "Exploring / Research",
  ];

  const faqs = [
    {
      q: "How fast will a senior software architect respond to my inquiry?",
      a: "Our engineering SLA guarantees a response within 2 business hours. If you reach out via our VIP WhatsApp bridge during business hours (9am - 8pm IST), a senior architect will typically respond within 15 minutes.",
    },
    {
      q: "Can we schedule a live Zoom demonstration of the coaching apps and admin portal?",
      a: "Yes! Once we receive your initial scoping details, our lead engineer will share an interactive demo link or schedule a 1-on-1 live Zoom walkthrough customized to your institute's batch structure.",
    },
    {
      q: "Is our existing student roster and curriculum protected under an NDA?",
      a: "Absolutely. All technical blueprints, student phone numbers, fees data, and video archives are protected under a strict mutual Non-Disclosure Agreement (NDA) before data ingestion begins.",
    },
    {
      q: "What technical assets do we need to provide for the 7-day launch?",
      a: "Only 4 basic items: (1) Your institute logo & colors, (2) Razorpay/PhonePe merchant keys for direct UPI settlement, (3) Batch & subject list, and (4) Google Play/Apple Developer account access.",
    },
  ];

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const createWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi WebVibez Software Developer,\n\nName: ${formData.name || "Institute Director"}\nInstitute: ${formData.organization || "Coaching Center"}\nPhone: ${formData.phone || "Not provided"}\nEmail: ${formData.email || "Not provided"}\nSolution: ${formData.solutionType}\nStudents: ${formData.studentVolume}\nTimeline: ${formData.timeline}\nNotes: ${formData.message || "I would like to discuss building my app."}`
    );
    return `https://wa.me/919213615331?text=${text}`;
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        {/* ========================================================================================= */}
        {/* SECTION 1: Spatial Header */}
        {/* ========================================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / ENGAGE &middot; DIRECT ENGINEERING CHANNELS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
            Let&apos;s Architect Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">
              Next Digital Platform
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Connect directly with WebVibez Software Developer architects. We will analyze your operational flow and provide an exact technical blueprint with timeline and fixed pricing.
          </p>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 2: Clean Inline Quality Assurance & SLA Bar */}
        {/* ========================================================================================= */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-center backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
            <Clock className="w-4 h-4 text-[#0066FF] shrink-0" />
            <span>Response SLA: &lt; 2 Hours</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] shrink-0" />
            <span>100% Strict Mutual NDA</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
            <Zap className="w-4 h-4 text-[#7C3AED] shrink-0" />
            <span>7-Day Fast-Track Deployment</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
            <Award className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>0% Commission Trap</span>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 3: Main Spatial Contact Grid */}
        {/* ========================================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Guarantees (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels Bento Box */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-2xl backdrop-blur-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#0066FF] dark:text-[#38BDF8] font-bold tracking-wider block">
                  // INSTANT CONNECT
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Direct Engineering Channels
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  Reach our engineering studio directly without waiting on call centers or ticket queues.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* VIP WhatsApp Channel */}
                <a
                  href="https://wa.me/919213615331?text=Hi%20WebVibez%20Software%20Developer,%20I%20would%20like%20to%20consult%20about%20building%20an%20app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/[0.08] dark:bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500 shadow-sm transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#25D366] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-xs" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-emerald-800 dark:text-[#00E5A3] flex items-center gap-2">
                        <span>VIP WhatsApp Bridge</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        +91 92136 15331
                      </div>
                      <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-sans">
                        Chat directly with lead architect
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] group-hover:translate-x-1 transition-transform shrink-0" />
                </a>


                {/* Direct Official Email with Copy Button */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 hover:border-[#7C3AED]/60 shadow-sm transition-all duration-200 group">
                  <a
                    href="mailto:webvibezsoftdev@gmail.com"
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold text-[#7C3AED] dark:text-[#A78BFA]">
                        Official Engineering Email
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        webvibezsoftdev@gmail.com
                      </div>
                      <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-sans">
                        Technical proposals &amp; scopes
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("webvibezsoftdev@gmail.com", "email")}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#7C3AED] hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <CheckCheck className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Response SLA Card */}
                <div className="p-4 rounded-2xl bg-amber-500/[0.06] dark:bg-amber-500/[0.08] border border-amber-500/25 flex items-center gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                      Response SLA Commitment
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Guaranteed within 2 Business Hours
                    </div>
                    <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-sans">
                      Direct senior software architect review
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA & IP Commitment Box */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-emerald-500/30 shadow-xl space-y-2 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-[#00E5A3]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3]" />
                <span>CONFIDENTIALITY &amp; IP GUARANTEE</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                All project discussions, proprietary curricula details, and institutional student rosters are protected under strict Non-Disclosure Agreements (NDAs).
              </p>
            </div>

            {/* Core Architecture Engine Specifications Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 shadow-xl space-y-3.5 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8]">
                  <Code2 className="w-4 h-4" />
                  <span>CORE ARCHITECTURE ENGINE</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#00E5A3] border border-emerald-500/20">
                  PRODUCTION READY
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Architecture:</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-[11.5px]">Next.js 16 + React Native</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Security:</span>
                  <strong className="text-emerald-800 dark:text-[#00E5A3] font-mono text-[11.5px]">Hardware DRM Widevine L1</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Performance:</span>
                  <strong className="text-[#7C3AED] dark:text-[#A78BFA] font-mono text-[11.5px]">60 FPS Native UI Engine</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Streaming:</span>
                  <strong className="text-[#0066FF] dark:text-[#38BDF8] font-mono text-[11.5px]">&lt; 1.2s Sub-second Latency</strong>
                </div>
              </div>
            </div>

            {/* Studio Engineering Location */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-[#080C16] border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8]">
                <MapPin className="w-4 h-4" />
                <span>ENGINEERING STUDIO &amp; LABS</span>
              </div>
              <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                WebVibez Software Developer
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Gujarat &bull; New Delhi &bull; Pan-India Cloud Deployments
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Scoping Workspace (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 shadow-2xl space-y-6 backdrop-blur-xl">
            {formSubmitted ? (
              <div className="text-center py-10 sm:py-16 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-[#00E5A3] border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/15">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-[#00E5A3] uppercase tracking-wider">
                    // SCOPING INTAKE RECEIVED
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                    Consultation Request Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you, <strong className="text-slate-900 dark:text-white">{formData.name || "Director"}</strong>. Our lead software architect has received your scoping specifications for <strong className="text-slate-900 dark:text-white">{formData.organization || "your institution"}</strong> and will respond within 2 hours.
                  </p>
                </div>

                {/* Configuration Summary Pill */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
                  <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                    Captured Blueprint Specs:
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20">
                      {formData.solutionType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#00E5A3] border border-emerald-500/20">
                      {formData.studentVolume}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#A78BFA] border border-[#7C3AED]/20">
                      {formData.timeline}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-700/25 transition cursor-pointer w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open VIP WhatsApp Bridge Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer w-full sm:w-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#0066FF] dark:text-[#38BDF8] font-bold tracking-wider">
                    // TECHNICAL BLUEPRINT INTAKE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                    Configure your coaching ecosystem below for an exact scope blueprint and guaranteed quote.
                  </p>
                </div>

                {/* 1. Solution Type Selector Cards */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center justify-between">
                    <span>1. Required Platform Solution *</span>
                    <span className="text-[10px] font-normal text-slate-400">Click to select</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {solutionOptions.map((opt) => {
                      const isSelected = formData.solutionType === opt.label;
                      const OptIcon = opt.icon;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setFormData({ ...formData, solutionType: opt.label })}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-[#0066FF]/10 dark:bg-[#0066FF]/15 border-[#0066FF] text-[#0066FF] dark:text-[#38BDF8] shadow-sm ring-1 ring-[#0066FF]/30"
                              : "bg-slate-50/80 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/10 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                              style={{ backgroundColor: opt.color }}
                            >
                              <OptIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold font-display truncate">{opt.label}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans truncate">{opt.desc}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8] shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Contact Details Inputs */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs sm:text-sm text-slate-900 dark:text-white transition placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                        Academy / Institute Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Premier Academy"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs sm:text-sm text-slate-900 dark:text-white transition placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs sm:text-sm text-slate-900 dark:text-white transition placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. director@academy.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs sm:text-sm text-slate-900 dark:text-white transition placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Student Volume Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                    2. Enrolled Student Volume
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {studentOptions.map((st) => {
                      const isSelected = formData.studentVolume === st;
                      return (
                        <button
                          type="button"
                          key={st}
                          onClick={() => setFormData({ ...formData, studentVolume: st })}
                          className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-[#00E5A3] font-bold shadow-xs"
                              : "bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Timeline Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                    3. Target Deployment Speed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineOptions.map((tl) => {
                      const isSelected = formData.timeline === tl;
                      return (
                        <button
                          type="button"
                          key={tl}
                          onClick={() => setFormData({ ...formData, timeline: tl })}
                          className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#7C3AED]/15 border border-[#7C3AED]/40 text-[#7C3AED] dark:text-[#A78BFA] font-bold shadow-xs"
                              : "bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          {tl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Additional Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans">
                    Additional Requirements / Curricula Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about specific target exams (IIT-JEE, NEET, UPSC, K-12), current software pain points, or custom integrations needed..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs sm:text-sm text-slate-900 dark:text-white transition resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* Submit & Instant WhatsApp Buttons */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#8B00FF] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Technical Consultation Request</span>
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Prefer direct chat?{" "}
                      <a
                        href={createWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 dark:text-[#00E5A3] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Launch Direct WhatsApp Bridge</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 4: Frequently Asked Contact & Consultation Questions */}
        {/* ========================================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#070B16] border border-slate-200 dark:border-white/10 space-y-6 sm:space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/30 text-[11px] font-mono uppercase font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>// FAQ &middot; ARCHITECTURE CONSULTATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
              Key questions about scoping sessions, data confidentiality, and launch timelines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0C1222] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <div className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${isOpen ? "bg-[#0066FF] text-white border-[#0066FF] rotate-180" : "bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
