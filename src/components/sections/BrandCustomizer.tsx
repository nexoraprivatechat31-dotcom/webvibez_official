"use client";

import React, { useState } from "react";
import { BRAND_VARIANTS } from "@/lib/data";
import {
  Palette,
  Bell,
  FileCheck,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  setBrandThemeVariant,
  setActiveScreenModule,
} from "@/lib/scrollPhysicsState";
import { useFocusDepth, getFocusDepthStyles } from "@/lib/useFocusDepth";

interface BrandCustomizerProps {
  onOpenConsultation: () => void;
}

export default function BrandCustomizer({ onOpenConsultation }: BrandCustomizerProps) {
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(2);
  const currentBrand = BRAND_VARIANTS[selectedBrandIndex];
  const { phoneFocusIntensity, phoneSideX } = useFocusDepth();

  // Phone is on the LEFT bay in Brand Customizer
  const { phoneStyles: phoneBayStyles, textStyles: brandDetailStyles } = getFocusDepthStyles(
    phoneFocusIntensity,
    phoneSideX,
    "left"
  );

  const handleSelectBrand = (idx: number) => {
    setSelectedBrandIndex(idx);
    const brand = BRAND_VARIANTS[idx];
    setBrandThemeVariant(brand.id);
    setActiveScreenModule(0);
  };

  const customizationPillars = [
    {
      icon: <Smartphone className="w-4 h-4 text-[#5B8CFF]" />,
      title: "App Icon & App Name",
      desc: "Your institute's official logo on Google Play & Apple App Store. Zero mention of third-party vendors.",
    },
    {
      icon: <Palette className="w-4 h-4 text-[#8B7CFF]" />,
      title: "Brand Color Palette",
      desc: "Pixel-perfect adaptation of your coaching centre's crest colors, gradients, and dark/light modes.",
    },
    {
      icon: <Bell className="w-4 h-4 text-[#FF9A6B]" />,
      title: "Branded SMS & Sender ID",
      desc: "Parents receive SMS from your verified institute handle (e.g. VK-APEXAC).",
    },
    {
      icon: <FileCheck className="w-4 h-4 text-[#72D7B0]" />,
      title: "Content Watermarking",
      desc: "Every PDF, test paper, and study module stamped with student roll numbers.",
    },
  ];

  // Stage accent colors
  const stageAccents = ["#A9B0BA", "#5B8CFF", "#FF9A6B"];

  return (
    <section
      id="brand"
      className="relative w-full py-16 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 700px 600px at 60% 40%, ${currentBrand.primaryAccent}0C 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div
            className="flex items-center gap-2 mb-3 sm:mb-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="w-6 h-[1px]" style={{ background: `${currentBrand.primaryAccent}80` }} />
            <span
              className="text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 font-bold"
              style={{ color: currentBrand.primaryAccent, fontFamily: "var(--font-mono)" }}
            >
              100% Whitelabel Identity
            </span>
          </div>
          <h2
            className="font-bold text-slate-900 dark:text-[#F4F1EA] leading-[1.08] tracking-tight mb-3 sm:mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4.5vw, 4.0rem)",
            }}
          >
            Not another generic
            <br />
            education app.
          </h2>
          <p
            className="text-slate-600 dark:text-[#A9B0BA] leading-relaxed max-w-[52ch] text-xs sm:text-base font-sans"
          >
            Your coaching centre gets a digital experience built around your brand — creating instant credibility with students, parents, and alumni.
          </p>
        </div>

        {/* Stage selector — typographic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {BRAND_VARIANTS.map((brand, idx) => {
            const isSelected = idx === selectedBrandIndex;
            const accent = stageAccents[idx];
            return (
              <button
                key={brand.id}
                onClick={() => handleSelectBrand(idx)}
                className={`text-left p-5 sm:p-7 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer active:scale-95 select-none ${
                  isSelected
                    ? "border-[#0066FF]/40 surface-card shadow-2xl scale-[1.01]"
                    : "border-[var(--border-subtle)] hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-100/50 dark:hover:bg-white/[0.025]"
                }`}
              >
                {/* Accent top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                  style={{ backgroundColor: accent }}
                />

                <div className="mb-6">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 mb-3 block"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Stage 0{idx + 1}
                  </span>
                  <h3
                    className="text-xl font-bold text-slate-900 dark:text-[#F4F1EA] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {brand.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{brand.subtitle}</p>
                </div>

                <span
                  className="inline-flex items-center text-[11px] px-2.5 py-1 rounded-full border font-semibold transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    backgroundColor: `${accent}12`,
                    color: accent,
                    borderColor: `${accent}30`,
                  }}
                >
                  {brand.statusText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Split showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: 3D phone space — Hidden on mobile */}
          <div
            className="hidden lg:block lg:col-span-5 lg:h-[620px] w-full relative pointer-events-none"
            style={phoneBayStyles}
          />

          {/* Right: Brand details */}
          <div className="lg:col-span-7 flex flex-col gap-6" style={brandDetailStyles}>
            <div>
              <span
                className="text-[11px] uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8] font-bold"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Transformation Impact
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F4F1EA] mt-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {currentBrand.tagline}
              </h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm mt-2 leading-relaxed font-sans">
                {currentBrand.description}
              </p>
            </div>

            {/* Feature characteristics — horizontal rules */}
            <div
              className="py-4 border-y border-[var(--border-subtle)] space-y-3"
            >
              {currentBrand.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 transition-colors duration-500"
                    style={{ color: currentBrand.primaryAccent }}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Customization pillars — 2 col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customizationPillars.map((pillar, i) => (
                <div key={i}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] surface-card shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    {pillar.icon}
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onOpenConsultation}
              className="btn-primary self-start"
            >
              <span>Customize For My Centre</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
