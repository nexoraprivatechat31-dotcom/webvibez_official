"use client";

import React from "react";

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "SOFTWARE DEVELOPMENT",
  "WEBSITE DEVELOPMENT",
  "MOBILE APP DEVELOPMENT (iOS & ANDROID)",
  "DIGITAL SOLUTIONS",
  "ADMIN PANELS & DASHBOARDS",
  "CLOUD & BACKEND SOLUTIONS",
  "MAINTENANCE & 24/7 SUPPORT",
  "BUILD SMART. SCALE FAST.",
  "100% CUSTOM WHITELABEL IDENTITY",
  "NATIVE DIGITAL CAMPUS OS",
];

export default function MarqueeTicker({
  items = DEFAULT_ITEMS,
  className = "",
}: MarqueeTickerProps) {
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full py-3.5 overflow-hidden border-y border-[var(--border-subtle)] select-none z-10 glass-panel backdrop-blur-xl ${className}`}
    >
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10">
            <span
              className="text-[11px] font-bold tracking-[0.22em] text-[#94A3B8] hover:text-[#FFFFFF] transition-colors uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item}
            </span>
            {/* Alternating Electric Blue / Violet separator dot */}
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: idx % 2 === 0 ? "#0066FF" : "#8B00FF",
                boxShadow: `0 0 6px ${idx % 2 === 0 ? "#0066FF" : "#8B00FF"}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
