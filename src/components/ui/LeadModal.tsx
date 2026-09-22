"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  X,
  CheckCircle2,
  Smartphone,
  Globe,
  Video,
  ShieldCheck,
  FileText,
  CreditCard,
  Download,
  Users,
  Bell,
  Phone,
  Check,
  GraduationCap,
  Award,
  Building,
  BookOpen,
  Code,
  Languages,
  Copy,
  Layers,
  Clock,
  Send,
} from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Configuration State
  const [platform, setPlatform] = useState("Android + iOS Native App + Admin Web");
  const [category, setCategory] = useState("JEE / NEET Coaching");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Anti-Screen Recording & Watermark",
    "Live Classes with Real-Time Chat",
    "Online CBT Test Series & OMR Analysis",
    "0% Commission UPI Fee Payment Gateway",
  ]);
  const [students, setStudents] = useState("200 to 500 Students");
  const [timeline, setTimeline] = useState("Ready in 7 Days (Fast-Track)");

  // Contact State
  const [contactData, setContactData] = useState({
    name: "",
    instituteName: "",
    phone: "",
    city: "",
    email: "",
    notes: "",
  });

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Platform Editions
  const platforms = [
    {
      id: "app-admin",
      title: "Android + iOS Native App + Admin Web",
      badge: "Most Popular",
      desc: "Published on your Google Play Store & Apple App Store accounts with full web admin control.",
      icon: Smartphone,
      color: "#0066FF",
    },
    {
      id: "full-suite",
      title: "All-in-One Coaching Ecosystem",
      badge: "Complete Suite",
      desc: "Student apps, Web portal for laptop study, Teacher portal, Parent login & fee management.",
      icon: Globe,
      color: "#00E5A3",
    },
    {
      id: "live-test",
      title: "Live Class & CBT Examination Portal",
      badge: "Exam Focused",
      desc: "Ultra-low latency live classes, doubt resolution engine & NTA-pattern test series.",
      icon: Video,
      color: "#7C3AED",
    },
    {
      id: "enterprise",
      title: "Custom Multi-Branch Enterprise Architecture",
      badge: "Multi-Branch",
      desc: "Dedicated cloud cluster, multi-branch faculty roles, custom ERP sync & white-label APIs.",
      icon: Layers,
      color: "#F59E0B",
    },
  ];

  // Coaching Categories
  const categories = [
    { label: "JEE / NEET Coaching", icon: GraduationCap },
    { label: "UPSC / GPSC / Govt Exams", icon: Award },
    { label: "Commerce / CA / CS", icon: Building },
    { label: "School & Tuition (Class 6-12)", icon: BookOpen },
    { label: "Coding / IT & Tech Training", icon: Code },
    { label: "Spoken English / IELTS / Other", icon: Languages },
  ];

  // Core Features
  const featuresList = [
    {
      id: "security",
      label: "Anti-Screen Recording & Watermark",
      desc: "Hardware black-screen protection against piracy & dynamic student phone watermark.",
      icon: ShieldCheck,
    },
    {
      id: "live",
      label: "Live Classes with Real-Time Chat",
      desc: "Conduct interactive live video lectures directly in-app with student Q&A.",
      icon: Video,
    },
    {
      id: "test",
      label: "Online CBT Test Series & OMR Analysis",
      desc: "NTA-pattern online tests with negative marking, instant scorecards & AIR rank list.",
      icon: FileText,
    },
    {
      id: "payment",
      label: "0% Commission UPI Fee Payment Gateway",
      desc: "Direct student fee settlement to your bank account via UPI, QR code & cards.",
      icon: CreditCard,
    },
    {
      id: "offline",
      label: "Encrypted Offline Video Downloads",
      desc: "Students can download lectures inside the secure app container to study without internet.",
      icon: Download,
    },
    {
      id: "notes",
      label: "Study Material & PDF Notes",
      desc: "Upload DPPs, assignments and eBooks stamped with student roll numbers.",
      icon: BookOpen,
    },
    {
      id: "alerts",
      label: "Notice Board & Attendance SMS",
      desc: "Send instant announcements, test notifications and absent alerts to parents.",
      icon: Bell,
    },
    {
      id: "faculty",
      label: "Multiple Faculty & Staff Logins",
      desc: "Granular access controls for subject teachers, counselors and accountants.",
      icon: Users,
    },
  ];

  const studentRanges = [
    "Under 200 Students",
    "200 to 500 Students",
    "500 to 1,500 Students",
    "1,500+ Students (Multi-Branch)",
  ];

  const timelineOptions = [
    "Ready in 7 Days (Fast-Track)",
    "Within 15 Days",
    "Standard Rollout (30 Days)",
  ];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const getWhatsAppUrl = () => {
    const text =
      `*Hello WebVibez Software Developer Team,*\n\n` +
      `I would like to get a live demo and quote for our custom coaching app:\n\n` +
      `👤 *Director / Name:* ${contactData.name || "Director"}\n` +
      `🏛️ *Coaching Name:* ${contactData.instituteName || "Our Coaching Institute"}\n` +
      `📍 *City:* ${contactData.city || "Gujarat / India"}\n` +
      `📱 *WhatsApp:* ${contactData.phone || "Not specified"}\n` +
      `✉️ *Email:* ${contactData.email || "Not specified"}\n\n` +
      `📦 *Selected Platform:* ${platform}\n` +
      `🎯 *Coaching Stream:* ${category}\n` +
      `👥 *Student Scale:* ${students}\n` +
      `⏱️ *Target Launch:* ${timeline}\n\n` +
      `⚡ *Configured Features (${selectedFeatures.length}):*\n` +
      selectedFeatures.map((f, i) => `${i + 1}. ${f}`).join("\n") +
      (contactData.notes ? `\n\n📝 *Notes:* ${contactData.notes}` : "") +
      `\n\nPlease share the interactive demo APK and pricing.`;

    return `https://wa.me/919213615531?text=${encodeURIComponent(text)}`;
  };

  const copyBlueprint = () => {
    const text =
      `WEBVIBEZ CUSTOM APP BLUEPRINT\n` +
      `Director: ${contactData.name || "Director"}\n` +
      `Institute: ${contactData.instituteName || "Coaching Academy"}\n` +
      `Platform: ${platform}\n` +
      `Stream: ${category}\n` +
      `Students: ${students}\n` +
      `Features:\n` +
      selectedFeatures.map((f) => `- ${f}`).join("\n") +
      `\nLaunch: ${timeline}\nContact: +91 92136 15531`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 dark:bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-5xl lg:max-w-6xl max-h-[92vh] overflow-hidden flex flex-col rounded-[2rem] bg-white dark:bg-[#070A12] border border-slate-200/90 dark:border-white/10 shadow-2xl text-slate-900 dark:text-white transition-all"
      >
        
        {/* Top Gradient Glow Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3] shrink-0" />

        {/* Ambient Subtle Radial Glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0066FF]/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#7C3AED]/08 rounded-full blur-3xl pointer-events-none" />

        {/* ── MODAL HEADER (Generous Padding) ── */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between gap-4 shrink-0 bg-white/95 dark:bg-[#070A12]/95 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-2xl overflow-hidden p-0.5 bg-white/[0.08] border border-slate-200 dark:border-white/[0.15] flex items-center justify-center shadow-lg shadow-[#0066FF]/20 shrink-0">
              <img
                src="/images/square-image.jpg"
                alt="WebVibez Software Developer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-xl sm:text-2xl font-display tracking-tight text-slate-900 dark:text-white">
                  Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">Vibez</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-[#00E5A3] border border-emerald-500/25 text-xs font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Custom App Studio
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                Build your custom branded mobile app &bull; 100% White-Labeled &bull; 0% Commission
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Ready in 7 Days</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 sm:p-3 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-90 cursor-pointer shadow-xs"
              aria-label="Close modal"
              title="Close (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!submitted ? (
          /* ── 2-COLUMN DESKTOP SPLIT BODY (Generous Breathing Room) ── */
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 relative z-10 custom-scrollbar overscroll-contain"
          >
            
            {/* ── LEFT PANE: CONFIGURATOR (7 Cols with Spacious Padding) ── */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/[0.08]">
              
              {/* 1. Platform Edition */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#0066FF] text-white flex items-center justify-center text-[11px] font-bold">1</span>
                    <span>Platform Edition</span>
                  </label>
                  <span className="text-xs text-slate-400 font-sans">Select one</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {platforms.map((p) => {
                    const isSelected = platform === p.title;
                    const Icon = p.icon;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPlatform(p.title)}
                        className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                          isSelected
                            ? "bg-blue-50/70 dark:bg-white/[0.08] border-[#0066FF] ring-2 ring-[#0066FF]/30 shadow-md shadow-[#0066FF]/10"
                            : "bg-white dark:bg-white/[0.02] border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0066FF]" />
                        )}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                            style={{ backgroundColor: p.color }}
                          >
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 uppercase">
                            {p.badge}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                            {p.title}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Coaching Stream Category */}
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#7C3AED] text-white flex items-center justify-center text-[11px] font-bold">2</span>
                  <span>Coaching Stream &amp; Exam Category</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {categories.map((cat) => {
                    const isSelected = category === cat.label;
                    const CatIcon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.label}
                        onClick={() => setCategory(cat.label)}
                        className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-[#7C3AED]/15 border-[#7C3AED] text-[#7C3AED] dark:text-[#C4B5FD] font-bold ring-1 ring-[#7C3AED]/40 shadow-xs"
                            : "bg-white dark:bg-white/[0.02] border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                        }`}
                      >
                        <CatIcon className="w-4 h-4 shrink-0 text-[#7C3AED]" />
                        <span className="text-xs sm:text-sm font-display font-semibold truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Features & Security Modules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#00E5A3] text-slate-950 flex items-center justify-center text-[11px] font-bold">3</span>
                    <span>Essential Modules &amp; Capabilities</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#00E5A3]">
                    {selectedFeatures.length} Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {featuresList.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.label);
                    const FeatIcon = feat.icon;
                    return (
                      <button
                        type="button"
                        key={feat.id}
                        onClick={() => toggleFeature(feat.label)}
                        className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? "bg-slate-50 dark:bg-white/[0.06] border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-xs"
                            : "bg-white dark:bg-white/[0.02] border-slate-200/90 dark:border-white/10 hover:border-slate-300 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-emerald-500 text-white font-bold"
                              : "border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-1.5">
                            <FeatIcon className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                            <span className="truncate">{feat.label}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Student Enrollment & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                    Active Student Enrollment
                  </label>
                  <select
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#0066FF]"
                  >
                    {studentRanges.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-[#070A12]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                    Target Deployment Speed
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#0066FF]"
                  >
                    {timelineOptions.map((t) => (
                      <option key={t} value={t} className="bg-white dark:bg-[#070A12]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANE: LIVE BLUEPRINT & WHATSAPP CTA (5 Cols with Spacious Layout) ── */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-slate-50/90 dark:bg-[#060910] flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                {/* Live App Blueprint Card (Spacious Internal Padding) */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/10 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#8B00FF] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        WV
                      </div>
                      <div>
                        <div className="text-sm font-bold font-display text-slate-900 dark:text-white">
                          {contactData.instituteName || "Your Coaching Academy"}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Branded Mobile App Blueprint
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-[#00E5A3] font-mono font-bold text-[11px]">
                      100% Whitelabel
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm font-mono">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Edition:</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate max-w-[170px]">
                        {platform.split("+")[0]}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Stream:</span>
                      <span className="font-bold text-[#7C3AED] dark:text-[#C4B5FD]">
                        {category}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Scale:</span>
                      <span className="font-bold text-[#0066FF] dark:text-[#38BDF8]">
                        {students}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Turnaround:</span>
                      <span className="font-bold text-emerald-600 dark:text-[#00E5A3]">
                        {timeline.split("(")[0]}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08]">
                      <div className="text-xs text-slate-400 mb-2">Active Features:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFeatures.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.06] text-[11px] text-slate-700 dark:text-slate-300"
                          >
                            {f.split(" ")[0]} {f.split(" ")[1]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Director Quick Contact Inputs (Spacious Padding) */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
                    Where Should We Send Your Prototype?
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="Your Name (e.g. Rajesh Patel)"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] shadow-2xs"
                    />

                    <input
                      type="text"
                      required
                      value={contactData.instituteName}
                      onChange={(e) => setContactData({ ...contactData, instituteName: e.target.value })}
                      placeholder="Academy Name (e.g. Apex Classes)"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] shadow-2xs"
                    />

                    <input
                      type="tel"
                      required
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="WhatsApp No. (e.g. 98765 43210)"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] shadow-2xs"
                    />

                    <input
                      type="text"
                      value={contactData.city}
                      onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
                      placeholder="City (e.g. Surat, Gujarat)"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#0C111E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] shadow-2xs"
                    />
                  </div>

                  {/* Primary Direct WhatsApp Action Button (Grand & Bold) */}
                  <div className="pt-2 space-y-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98"
                    >
                      <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 shrink-0" />
                      <span>Get Live Demo on WhatsApp</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-xl bg-slate-200/80 dark:bg-white/[0.08] hover:bg-slate-300 dark:hover:bg-white/[0.14] text-slate-800 dark:text-white text-xs sm:text-sm font-semibold font-sans transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#0066FF]" />
                      <span>Or Submit Intake Form</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Direct Hotline Footer */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0066FF]" />
                  Call: <strong className="text-slate-900 dark:text-white">+91 92136 15531</strong>
                </span>
                <span className="text-emerald-600 dark:text-[#00E5A3] font-bold">
                  ● Architect Online
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ── SUBMISSION CONFIRMATION SCREEN (Generous Padding) ── */
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto p-8 sm:p-12 lg:p-16 space-y-7 text-center relative z-10 animate-in fade-in duration-300 custom-scrollbar overscroll-contain"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 animate-in zoom-in-75 duration-300" />
            </div>

            <div className="space-y-2.5 max-w-md mx-auto">
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
                Request Stored Successfully!
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                Thank you, <strong className="text-slate-900 dark:text-white">{contactData.name || "Director"}</strong>. Our lead software architect will review your specifications for{" "}
                <strong className="text-slate-900 dark:text-white">{contactData.instituteName || "your coaching academy"}</strong> and message your demo APK via WhatsApp.
              </p>
            </div>

            {/* Structured Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 max-w-md mx-auto text-left space-y-2.5 text-xs sm:text-sm font-mono">
              <div className="text-slate-400 text-xs uppercase font-bold">Selected Blueprint:</div>
              <div className="font-bold text-slate-900 dark:text-white">{platform}</div>
              <div className="text-slate-600 dark:text-slate-300">
                {category} &bull; {selectedFeatures.length} Modules &bull; {students}
              </div>
            </div>

            {/* Direct Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
                <span>Open Instant WhatsApp Chat</span>
              </a>

              <button
                type="button"
                onClick={copyBlueprint}
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Spec"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
