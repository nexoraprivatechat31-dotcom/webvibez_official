"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Users,
  Bell,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Send,
  Search,
  Download,
  Filter,
  Layers,
  Radio,
  Clock,
  Sparkles
} from "lucide-react";

interface DashboardShowcaseProps {
  onOpenConsultation: () => void;
}

export default function DashboardShowcase({ onOpenConsultation }: DashboardShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"finance" | "exams" | "attendance" | "whatsapp">("finance");
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <section
      id="dashboards"
      className="relative w-full py-24 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div
        className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(139,0,255,0.04) 40%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
              <span>07 / EXPERIENCE &middot; INSTITUTIONAL COMMAND</span>
            </div>
            <h2
              className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-[1.08] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              }}
            >
              Desktop command centers.
              <br />
              <span className="text-gradient-azure">For directors & leadership.</span>
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-[#94A3B8] max-w-md leading-relaxed font-sans">
            While students enjoy their native mobile app, your administrative team controls admissions, fee collections, online exams, and attendance from a lightning-fast web dashboard.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: "finance", label: "Financial Terminal & UPI", icon: DollarSign },
            { id: "exams", label: "NTA Examination Center", icon: BarChart3 },
            { id: "attendance", label: "Biometric & RFID Radar", icon: Radio },
            { id: "whatsapp", label: "Automated Parent Dispatch", icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 scale-[1.02]"
                    : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified macOS / Windows Desktop Command Center Frame */}
        <div className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080C14]/95 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Window Chrome Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold pl-2 hidden sm:inline-block">
                WebVibez Institutional OS // Command Center v4.2
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                POSTGRES REPLICATION &middot; 12ms LATENCY
              </span>
            </div>
          </div>

          {/* Main Dashboard Interactive Workspace */}
          <div className="p-6 sm:p-8">
            {activeTab === "finance" && (
              <div className="space-y-6">
                {/* 4 Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "This Month Collections", val: "₹18,42,500", change: "+14.2% vs last month", color: "#0066FF", icon: DollarSign },
                    { label: "Active Enrolled Students", val: "1,248", change: "98.7% active in app", color: "#7C3AED", icon: Users },
                    { label: "Upcoming Fee Dues", val: "₹2,15,000", change: "WhatsApp notices queued", color: "#F59E0B", icon: Bell },
                    { label: "On-Time Payment Rate", val: "94.6%", change: "+8.5% with UPI links", color: "#10B981", icon: TrendingUp },
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5"
                      >
                        <div className="flex items-center justify-between text-slate-600 text-xs mb-2 font-mono">
                          <span>{card.label}</span>
                          <Icon className="w-4 h-4" style={{ color: card.color }} />
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
                          {card.val}
                        </div>
                        <div className="text-[11px] font-mono mt-1 font-semibold" style={{ color: card.color }}>
                          {card.change}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Visual Revenue SVG Chart & Live Transactions Table */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: SVG Revenue Curve */}
                  <div className="lg:col-span-7 p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                          Fee Inflow Trajectory
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">Automated UPI + Cash + Cheque Reconciliation</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        +₹2.4L Today
                      </span>
                    </div>

                    {/* Clean SVG Area Chart */}
                    <div className="w-full h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Horizontal Grid lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeOpacity="0.06" />
                        <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" strokeOpacity="0.06" />
                        <line x1="0" y1="90" x2="500" y2="90" stroke="currentColor" strokeOpacity="0.06" />
                        
                        {/* Area */}
                        <path
                          d="M 0,100 Q 80,85 140,55 T 280,45 T 400,20 T 500,10 L 500,120 L 0,120 Z"
                          fill="url(#chartGrad)"
                        />
                        {/* Line */}
                        <path
                          d="M 0,100 Q 80,85 140,55 T 280,45 T 400,20 T 500,10"
                          fill="none"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Peak Point */}
                        <circle cx="400" cy="20" r="4" fill="#38BDF8" stroke="#0066FF" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
                      <span>Week 01 (₹3.2L)</span>
                      <span>Week 02 (₹4.8L)</span>
                      <span>Week 03 (₹5.1L)</span>
                      <span className="text-[#0066FF] font-bold">Week 04 (₹5.3L)</span>
                    </div>
                  </div>

                  {/* Right: Live Settlements Stream */}
                  <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-col justify-between">
                    <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-3 flex items-center justify-between">
                      <span>Instant UPI Settlements</span>
                      <span className="text-[10px] text-[#0066FF] font-normal">Real-Time Webhook</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { name: "Aarav Sharma", batch: "Class 12 JEE", amt: "₹15,000", app: "GPay", time: "2m ago" },
                        { name: "Priya Patel", batch: "Class 11 NEET", amt: "₹18,500", app: "PhonePe", time: "8m ago" },
                        { name: "Rohan Varma", batch: "Class 10 Found.", amt: "₹8,000", app: "Paytm", time: "14m ago" },
                      ].map((tx, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{tx.name}</div>
                            <div className="text-[10px] text-slate-400">{tx.batch} &middot; {tx.app}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-emerald-500">{tx.amt}</div>
                            <div className="text-[10px] text-slate-400">{tx.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={onOpenConsultation}
                      className="mt-3 w-full py-2 px-3 rounded-lg bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] hover:bg-[#0066FF] hover:text-white transition-colors text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Automated Fee Gateway</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Live Online Test</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">JEE Advanced Full Mock #04</div>
                    <div className="text-xs font-mono text-emerald-500 mt-2">● 482 Students Concurrently Submitting</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Batch Accuracy Leader</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Organic Chemistry & Calculus</div>
                    <div className="text-xs font-mono text-[#0066FF] mt-2">Average Batch Score: 248 / 300</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Automated Ranking</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">NTA Percentile Mapping</div>
                    <div className="text-xs font-mono text-purple-500 mt-2">Negative Mark Audit: 1.2% Low</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-3">
                    Top Mock Test Percentile Leaders
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    {[
                      { rank: "AIR 01", name: "Tanmay Deshmukh", score: "294/300", perc: "99.98 %ile", tag: "NEET Elite" },
                      { rank: "AIR 02", name: "Ananya Iyer", score: "290/300", perc: "99.85 %ile", tag: "JEE Advanced" },
                      { rank: "AIR 03", name: "Kabir Mehta", score: "286/300", perc: "99.72 %ile", tag: "JEE Advanced" },
                    ].map((st, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#0066FF] text-[10px]">{st.rank}</span>
                          <div className="font-bold text-slate-900 dark:text-white">{st.name}</div>
                          <div className="text-[10px] text-slate-400">{st.tag}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-500">{st.score}</div>
                          <div className="text-[10px] text-purple-400 font-bold">{st.perc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Today's In-Center Attendance</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">98.4%</div>
                    <div className="text-xs font-mono text-emerald-500 mt-1">1,228 / 1,248 Verified Punches</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Biometric Gates Active</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">6 Gates Online</div>
                    <div className="text-xs font-mono text-[#0066FF] mt-1">RFID + Face ID + NFC</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="text-xs font-mono text-slate-400 uppercase">Parent WhatsApp Notices</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,228 Sent</div>
                    <div className="text-xs font-mono text-purple-500 mt-1">100% Instant Delivery</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-3">
                    Live Biometric Gate Stream
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { name: "Devansh Joshi", gate: "Main Turnstile #02", method: "RFID Card", time: "08:14:22 AM", status: "Parent WhatsApp Alert Sent" },
                      { name: "Meera Nair", gate: "Lab Terminal #01", method: "Face ID Biometric", time: "08:14:05 AM", status: "Parent WhatsApp Alert Sent" },
                      { name: "Aditya Roy", gate: "Main Turnstile #01", method: "Mobile App QR", time: "08:13:48 AM", status: "Parent WhatsApp Alert Sent" },
                    ].map((entry, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-bold text-slate-900 dark:text-white">{entry.name}</span>
                          <span className="text-slate-400">({entry.gate} via {entry.method})</span>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <span className="text-[#0066FF]">{entry.status}</span>
                          <span className="text-slate-400">{entry.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "whatsapp" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/5 to-transparent border border-[#0066FF]/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#0066FF] uppercase mb-1">
                      Official Meta Cloud API Engine
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
                      One-Click Batch WhatsApp Result Broadcast
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
                      Dispatch customized student PDF report cards, test analytics, fee receipts, and performance graphs directly to parents on WhatsApp with zero manual work.
                    </p>
                  </div>

                  <button
                    onClick={handleDispatch}
                    className="py-3 px-6 rounded-xl bg-[#0066FF] hover:bg-[#7C3AED] text-white font-mono font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-lg shadow-[#0066FF]/25 cursor-pointer whitespace-nowrap"
                  >
                    {dispatched ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Dispatched to 1,248 Parents!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Batch Results Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
