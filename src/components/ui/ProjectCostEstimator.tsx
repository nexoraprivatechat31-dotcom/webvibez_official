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
      desc: "White-labeled student app, tests, fees & DRM classes",
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
    <div className="relative my-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-black border border-slate-800 shadow-2xl overflow-hidden text-white">
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Project Pricing Calculator
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Estimate Your Software & App Development Cost
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Select your requirements to calculate an instant budget estimation and receive a verified technical proposal on WhatsApp.
          </p>
        </div>

        {/* Step 1: Select Service */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            1. Select Solution Type:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedService === s.id
                    ? "bg-[#0066FF]/15 border-[#0066FF] shadow-lg shadow-[#0066FF]/20"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/[0.08]">{s.icon}</div>
                  {selectedService === s.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">{s.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Modules & Platforms */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            2. Required Modules & Integrations:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {platformOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => togglePlatform(opt.id)}
                className={`px-4 py-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  platforms[opt.id]
                    ? "bg-white/10 border-white/30 text-white"
                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                      platforms[opt.id] ? "bg-[#0066FF] text-white" : "border border-slate-600"
                    }`}
                  >
                    {platforms[opt.id] && "✓"}
                  </span>
                  {opt.label}
                </span>
                {opt.cost > 0 && (
                  <span className="text-[10px] text-slate-500 font-mono">+₹{opt.cost.toLocaleString()}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Scale */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            3. User / Student Capacity:
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
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  scale === sc.id
                    ? "bg-[#0066FF]/20 border-[#0066FF] text-white font-bold"
                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                }`}
              >
                <p className="text-xs font-bold">{sc.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{sc.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Estimated Investment Range
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              ₹{priceMin.toLocaleString("en-IN")} – ₹{priceMax.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-slate-400 font-sans ml-2">(One-time / Transparent)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Est. Delivery: <b>{currentServiceObj.baseTimeline}</b>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% White-Labeled Ownership
              </span>
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/25 transition-all active:scale-95 duration-200 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Get Live Demo & Quote on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
