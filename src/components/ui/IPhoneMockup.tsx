"use client";

import React from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  CreditCard,
  QrCode,
  Smartphone,
  ExternalLink,
  Receipt,
  Check,
  Sparkles,
  Lock,
  MessageSquare,
} from "lucide-react";

interface IPhoneMockupProps {
  screenType?: "fee-collection" | "image" | "custom";
  imageSrc?: string;
  customContent?: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export default function IPhoneMockup({
  screenType = "fee-collection",
  imageSrc,
  customContent,
  className = "",
  accentColor = "#0066FF",
}: IPhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[290px] sm:max-w-[310px] select-none ${className}`}
    >
      {/* Outer Titanium Chassis */}
      <div className="relative rounded-[48px] p-[10px] bg-gradient-to-b from-[#B8B2A8] via-[#8C877E] to-[#6E6A63] dark:from-[#3E4249] dark:via-[#26282D] dark:to-[#17191C] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_35px_rgba(0,102,255,0.15)] ring-1 ring-white/30 dark:ring-white/10">
        
        {/* Left Side Buttons (Action Button + Volume) */}
        <div className="absolute -left-[3px] top-[95px] w-[3px] h-[22px] bg-[#8C877E] dark:bg-[#34373C] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[130px] w-[3px] h-[38px] bg-[#8C877E] dark:bg-[#34373C] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[178px] w-[3px] h-[38px] bg-[#8C877E] dark:bg-[#34373C] rounded-l-sm" />

        {/* Right Side Buttons (Power + Camera Control) */}
        <div className="absolute -right-[3px] top-[140px] w-[3px] h-[55px] bg-[#8C877E] dark:bg-[#34373C] rounded-r-sm" />
        <div className="absolute -right-[3px] top-[240px] w-[3px] h-[32px] bg-[#757169] dark:bg-[#282A2E] rounded-r-sm opacity-80" />

        {/* Inner OLED Display Bezel */}
        <div className="relative rounded-[40px] overflow-hidden bg-black aspect-[9/19.5] border-[3.5px] border-black shadow-inner flex flex-col justify-between">
          
          {/* Subtle Diagonal Screen Reflection Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-30" />

          {/* iOS Top Bar with Dynamic Island */}
          <div className="relative z-20 pt-2 px-6 flex items-center justify-between text-white text-[11px] font-medium tracking-tight">
            <span className="font-semibold text-[11px]">9:41</span>

            {/* Dynamic Island Capsule */}
            <div className="w-[82px] h-[20px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
            </div>

            {/* Status Icons: 5G & Battery */}
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="font-mono text-[9px] text-white/80">5G</span>
              <div className="w-4 h-2 rounded-[3px] border border-white/80 p-[0.5px] flex items-center">
                <div className="w-full h-full bg-white rounded-[1.5px]" />
              </div>
            </div>
          </div>

          {/* Screen Content Body */}
          <div
            className={`relative z-10 flex-1 overflow-hidden text-white font-sans scrollbar-none flex flex-col ${
              screenType === "image" ? "p-0" : "overflow-y-auto px-3.5 pt-2 pb-2"
            }`}
          >
            {screenType === "fee-collection" && (
              <div className="flex flex-col space-y-2.5">
                {/* Institute & Student Header */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#8B00FF] p-[1px] shrink-0 shadow-sm">
                      <img
                        src="/images/square-image.jpg"
                        alt="Institute Logo"
                        className="w-full h-full object-cover rounded-[7px]"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white leading-tight">
                        Apex Academy
                      </div>
                      <div className="text-[9px] text-white/60 font-mono">
                        Aarav Patel · JEE-2025
                      </div>
                    </div>
                  </div>
                  <span className="text-[8.5px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    ● ACTIVE
                  </span>
                </div>

                {/* Main Outstanding Tuition Fee Card */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0C1222] via-[#0F172A] to-[#1E1B4B] border border-white/10 shadow-lg relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#38BDF8] font-bold">
                        Tuition Installment Due
                      </span>
                      <div className="text-2xl font-black tracking-tight text-white mt-0.5">
                        ₹14,500
                      </div>
                    </div>
                    <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Due in 3 Days
                    </span>
                  </div>

                  <div className="text-[9px] text-white/70 mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono">
                    <span>Batch: Target JEE Adv (Term 2)</span>
                    <span className="text-emerald-400">GST Included</span>
                  </div>
                </div>

                {/* Automated WhatsApp Reminder Alert */}
                <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-2.5 h-2.5 text-emerald-400" />
                  </div>
                  <div className="text-[8.5px] text-emerald-200 leading-tight">
                    <span className="font-bold text-emerald-400">WhatsApp Alert Active:</span> Parent
                    received automated 1-click pay link on +91 98765-XXXXX.
                  </div>
                </div>

                {/* 1-Click Instant UPI Options */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-white/60 font-semibold flex items-center justify-between">
                    <span>Instant UPI Checkout</span>
                    <span className="text-[8px] text-[#38BDF8]">0% Surcharge</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {[
                      { name: "GPay", color: "bg-[#4285F4]/20 border-[#4285F4]/40" },
                      { name: "PhonePe", color: "bg-[#5F259F]/20 border-[#5F259F]/40" },
                      { name: "Paytm", color: "bg-[#00BAF2]/20 border-[#00BAF2]/40" },
                      { name: "BHIM", color: "bg-[#00897B]/20 border-[#00897B]/40" },
                    ].map((upi, i) => (
                      <div
                        key={i}
                        className={`py-1 px-1 rounded-lg border ${upi.color} flex flex-col items-center justify-center`}
                      >
                        <span className="text-[8px] font-bold text-white">{upi.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1-Tap UPI Pay Trigger */}
                <button className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00E5A3] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#0066FF]/30 active:scale-95 transition">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay with GPay / PhonePe / Paytm</span>
                </button>

                {/* Instant GST Invoice Box */}
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Receipt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9.5px] font-bold text-white">
                        GST Receipt #WV-2025-084
                      </div>
                      <div className="text-[8px] text-white/50 font-mono">
                        Instant PDF · 18% Tax Compliant
                      </div>
                    </div>
                  </div>
                  <button className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white/90">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {screenType === "image" && imageSrc && (
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={imageSrc}
                  alt="App Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {screenType === "custom" && customContent}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="relative z-20 pb-2 pt-1 flex justify-center">
            <div className="w-28 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
