"use client";

import React, { useState } from "react";
import {
  Calculator,
  Smartphone,
  Globe,
  Database,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageSquare,
  Clock,
} from "lucide-react";

interface ProjectCostEstimatorProps {
  defaultCategory?: "coaching" | "mobile" | "web" | "custom";
}

export default function ProjectCostEstimator({
  defaultCategory = "coaching",
}: ProjectCostEstimatorProps) {
  const [selectedService, setSelectedService] = useState<
    "coaching" | "mobile" | "web" | "custom"
  >(defaultCategory);

  const [platforms, setPlatforms] = useState<{ [key: string]: boolean }>({
    android: true,
    ios: false,
    adminPanel: true,
    whatsappAlerts: true,
    paymentGateway: true,
  });

  const [scale, setScale] = useState<"starter" | "growth" | "enterprise">("growth");

  const services = [
    {
      id: "coaching",
      name: "Coaching Class App",
      icon: <GraduationCap className="w-5 h-5 text-[#0066FF]" />,
      basePrice: 14999,
      baseTimeline: "10–14 Days",
      desc: "White-labeled student app, tests, fees & secure classes",
    },
    {
      id: "mobile",
      name: "Custom Mobile App",
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      basePrice: 24999,
      baseTimeline: "14–21 Days",
      desc: "React Native iOS & Android cross-platform app",
    },
    {
      id: "web",
      name: "Next.js Web Platform",
      icon: <Globe className="w-5 h-5 text-emerald-500" />,
      basePrice: 11999,
      baseTimeline: "7–12 Days",
      desc: "Ultra-fast modern business website with CMS",
    },
    {
      id: "custom",
      name: "Business ERP / SaaS",
      icon: <Database className="w-5 h-5 text-amber-500" />,
      basePrice: 34999,
      baseTimeline: "20–30 Days",
      desc: "Custom cloud workflow & billing automation",
    },
  ];

  const currentServiceObj = services.find((s) => s.id === selectedService) || services[0];

  const platformOptions = [
    { id: "android", label: "Android Mobile App", cost: 0 },
    { id: "ios", label: "Apple iOS App", cost: 8000 },
    { id: "adminPanel", label: "Super Admin Web Dashboard", cost: 4000 },
    { id: "whatsappAlerts", label: "Automated WhatsApp Alerts", cost: 2500 },
    { id: "paymentGateway", label: "UPI & Instant Fee Gateway", cost: 1500 },
  ];

  const togglePlatform = (id: string) => {
    setPlatforms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate Investment Range
  let calculatedBase = currentServiceObj.basePrice;
  if (platforms.ios) calculatedBase += 8000;
  if (platforms.adminPanel && selectedService !== "coaching") calculatedBase += 4000;
  if (platforms.whatsappAlerts) calculatedBase += 2500;
  if (platforms.paymentGateway) calculatedBase += 1500;

  if (scale === "growth") calculatedBase = Math.round(calculatedBase * 1.25);
  if (scale === "enterprise") calculatedBase = Math.round(calculatedBase * 1.6);

  const priceMin = Math.round(calculatedBase / 1000) * 1000;
  const priceMax = Math.round((calculatedBase * 1.35) / 1000) * 1000;

  // WhatsApp Message
  const selectedPlatformsList = platformOptions
    .filter((p) => platforms[p.id])
    .map((p) => p.label)
    .join(", ");

  const waText = encodeURIComponent(
    `Hi WebVibez! 👋\n\nI used your Cost Estimator for:\n📌 Service: ${currentServiceObj.name}\n📱 Modules: ${selectedPlatformsList}\n👥 Scale: ${scale.toUpperCase()}\n💰 Estimated Budget: ₹${priceMin.toLocaleString("en-IN")} - ₹${priceMax.toLocaleString("en-IN")}\n\nPlease share an official proposal and live app demo.`
  );

  const waUrl = `https://wa.me/919213615531?text=${waText}`;

  return (
    <div className="relative my-16 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0A101D] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 dark:bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 dark:border-[#0066FF]/40 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Project Pricing Calculator
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Estimate Your Software &amp; App Development Cost
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Select your requirements to calculate an instant budget estimation and receive a verified technical proposal on WhatsApp.
          </p>
        </div>

        {/* Step 1: Select Service */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[11px] font-bold">1</span>
            Select Solution Type:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedService === s.id
                    ? "bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border-[#0066FF] dark:border-[#0066FF] shadow-lg shadow-[#0066FF]/15 ring-2 ring-[#0066FF]/50"
                    : "bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 shadow-sm">{s.icon}</div>
                  {selectedService === s.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{s.name}</h4>
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Modules & Platforms */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[11px] font-bold">2</span>
            Required Modules &amp; Integrations:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {platformOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => togglePlatform(opt.id)}
                className={`px-4 py-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  platforms[opt.id]
                    ? "bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border-[#0066FF] dark:border-[#0066FF] text-slate-900 dark:text-white shadow-sm ring-1 ring-[#0066FF]/50"
                    : "bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] transition-colors ${
                      platforms[opt.id] ? "bg-[#0066FF] text-white font-black" : "border-2 border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800"
                    }`}
                  >
                    {platforms[opt.id] && "✓"}
                  </span>
                  <span className="font-semibold text-xs text-slate-900 dark:text-white">{opt.label}</span>
                </span>
                {opt.cost > 0 && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                    platforms[opt.id]
                      ? "bg-[#0066FF]/15 dark:bg-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] font-bold"
                      : "bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-medium"
                  }`}>
                    +₹{opt.cost.toLocaleString("en-IN")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Scale */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[11px] font-bold">3</span>
            User / Student Capacity:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "starter", label: "Starter", desc: "Up to 250 Users" },
              { id: "growth", label: "Growth", desc: "250 - 1,500 Users" },
              { id: "enterprise", label: "Enterprise", desc: "1,500+ Concurrent" },
            ].map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setScale(sc.id as any)}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  scale === sc.id
                    ? "bg-[#0066FF]/10 dark:bg-[#0066FF]/25 border-[#0066FF] dark:border-[#0066FF] text-slate-900 dark:text-white ring-2 ring-[#0066FF]/50 shadow-md shadow-[#0066FF]/15 font-bold"
                    : "bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <p className={`text-xs font-bold ${scale === sc.id ? "text-[#0066FF] dark:text-[#38BDF8]" : "text-slate-900 dark:text-white"}`}>{sc.label}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-sans">{sc.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 dark:from-[#0B1528] dark:via-[#0F1C36] dark:to-[#14122B] border border-blue-200 dark:border-blue-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold font-mono text-[#0066FF] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Estimated Investment Range
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              ₹{priceMin.toLocaleString("en-IN")} – ₹{priceMax.toLocaleString("en-IN")}
              <span className="text-xs font-medium text-slate-500 dark:text-slate-300 font-sans ml-2">(One-time / Transparent)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Est. Delivery: <b className="text-slate-900 dark:text-white">{currentServiceObj.baseTimeline}</b>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-900 dark:text-white font-semibold">100% White-Labeled Ownership</span>
              </span>
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/25 transition-all active:scale-95 duration-200 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Get Live Demo &amp; Quote on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
