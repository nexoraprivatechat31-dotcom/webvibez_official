"use client";

import React, { useEffect, useState } from "react";
import { scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";
import { Users, Smartphone, Zap, Server, Database, Monitor, ArrowRight, ShieldCheck, Activity } from "lucide-react";

interface ProductArchitectureProps {
  onOpenConsultation: () => void;
}

const ARCHITECTURE_NODES = [
  {
    step: "01",
    title: "Students & Parents",
    subtitle: "End-User Layer",
    icon: Users,
    detail: "Over 50,000+ daily active student sessions",
    tech: "Biometric & Push Sync",
    color: "#0066FF",
  },
  {
    step: "02",
    title: "Branded Mobile Apps",
    subtitle: "Client Application",
    icon: Smartphone,
    detail: "Native Swift & Kotlin with offline SQLite caching",
    tech: "iOS & Android",
    color: "#7C3AED",
  },
  {
    step: "03",
    title: "API Gateway & Edge",
    subtitle: "Traffic & Security",
    icon: Zap,
    detail: "Cloudflare enterprise CDN & DDoS mitigation",
    tech: "< 24ms Response",
    color: "#8B00FF",
  },
  {
    step: "04",
    title: "Distributed Backend",
    subtitle: "Microservices Core",
    icon: Server,
    detail: "High-concurrency cluster for exams & attendance",
    tech: "Docker & K8s",
    color: "#00E5A3",
  },
  {
    step: "05",
    title: "Database & DRM Vault",
    subtitle: "Persistence Layer",
    icon: Database,
    detail: "PostgreSQL ACID compliance + encrypted S3 storage",
    tech: "AES-256 Encryption",
    color: "#F59E0B",
  },
  {
    step: "06",
    title: "Admin Command Center",
    subtitle: "Leadership Portal",
    icon: Monitor,
    detail: "Real-time fee reconciliation & institutional analytics",
    tech: "Executive Control",
    color: "#38BDF8",
  },
];

export default function ProductArchitecture({ onOpenConsultation }: ProductArchitectureProps) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section
      id="architecture"
      className="relative w-full py-28 md:py-36 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
              <span>06 / SCALE &middot; TECHNICAL TOPOLOGY</span>
            </div>
            <h2
              className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-[1.08] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
              }}
            >
              Enterprise data-flow.
              <br />
              <span className="text-gradient-azure">Zero single point of failure.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-xl w-fit">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              System Health: 99.98% High Availability
            </span>
          </div>
        </div>

        {/* Crisp Glassmorphic Topology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {ARCHITECTURE_NODES.map((node, i) => {
            const IconComp = node.icon;
            const isHovered = hoveredNode === i;

            return (
              <div
                key={node.step}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between bg-white/70 dark:bg-[#080D1A]/75 backdrop-blur-2xl shadow-xl shadow-[#0066FF]/5 hover:shadow-2xl hover:shadow-[#0066FF]/15 hover:-translate-y-1 ${
                  isHovered
                    ? "border-[#0066FF]/60 dark:border-[#0066FF]/60"
                    : "border-slate-200/80 dark:border-white/10"
                }`}
              >
                {/* Node Accent Top Light Line */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] rounded-full transition-opacity duration-300"
                  style={{
                    backgroundColor: node.color,
                    opacity: isHovered ? 1 : 0.45,
                    boxShadow: isHovered ? `0 0 12px ${node.color}` : "none",
                  }}
                />

                <div>
                  {/* Top Bar: Step + Tech Label */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-mono text-xs tracking-widest font-extrabold flex items-center gap-1.5"
                      style={{ color: node.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                      {node.step} // NODE
                    </span>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5">
                      {node.tech}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${node.color}18`,
                        borderColor: `${node.color}35`,
                        color: node.color,
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-300 font-bold">
                        {node.subtitle}
                      </div>
                      <h3
                        className="text-lg font-bold text-slate-900 dark:text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {node.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed mt-2 font-sans font-medium">
                    {node.detail}
                  </p>
                </div>

                {/* Connection Status Footprint */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-semibold">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: node.color }}
                    />
                    Connected &amp; Active
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-[10px] border border-slate-200 dark:border-white/10">
                    256-bit SSL
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Security Banner */}
        <div className="mt-12 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#080D1A]/70 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-200 font-sans leading-relaxed font-medium">
              <span className="font-bold text-slate-900 dark:text-white">Strict Data Sovereignty:</span> Your student data, questions, and fee revenue are 100% owned by your institution. Never shared or mined.
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#8B00FF] hover:brightness-110 transition shadow-md shadow-[#0066FF]/20 shrink-0 cursor-pointer"
          >
            <span>Request Security Whitepaper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
