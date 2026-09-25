"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  KeyRound,
  FileCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function SecurityPage() {
  const securityPillars = [
    {
      icon: <EyeOff className="w-6 h-6 text-[#0066FF]" />,
      title: "Anti-Screen Capture & Hardware DRM",
      description:
        "Native Android `FLAG_SECURE` and Apple AVFoundation FairPlay protocols cause third-party screen recording utilities, screen casting cables, and screenshots to render as a pitch-black frame.",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#8B00FF]" />,
      title: "Dynamic Student Watermarking Overlay",
      description:
        "Every video lecture, PDF note, and mock exam dynamically displays a semi-transparent, moving watermark with the student's registered mobile number, IP address, and dynamic timestamp.",
    },
    {
      icon: <KeyRound className="w-6 h-6 text-[#00E5A3]" />,
      title: "Strict 1-Device Binding",
      description:
        "Student accounts are bound to a single physical hardware device identifier. Any login attempt from a secondary phone or emulator instantly terminates previous sessions and triggers a security alert.",
    },
    {
      icon: <Server className="w-6 h-6 text-[#38BDF8]" />,
      title: "Isolated Tenant Database Architecture",
      description:
        "Each academy operates with isolated database schemas or dedicated PostgreSQL clusters. No cross-tenant data leakage is physically possible at the infrastructure layer.",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#F59E0B]" />,
      title: "Hourly Geo-Redundant Backups",
      description:
        "Automated snapshots are captured every 60 minutes, encrypted with AES-256 keys, and replicated across geographically separated cloud data centers with a 15-minute RPO guarantee.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#EC4899]" />,
      title: "DDoS Mitigation & Cloudflare Edge",
      description:
        "Enterprise-grade Layer 3/4 and Layer 7 DDoS mitigation shields your examination and live class servers against malicious traffic spikes and unauthorized bot scrapers.",
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0066FF] dark:text-[#38BDF8] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>01 / INFRASTRUCTURE · ZERO-TRUST SECURITY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Enterprise{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#A855F7]">
              Security
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            How WebVibez Software Developer safeguards institutional intellectual property, proprietary curriculum videos, and sensitive student records.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0C1018] border border-[var(--border-subtle)] space-y-3 shadow-sm hover:border-[#0066FF]/40 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Certifications Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#090D14] border border-[var(--border-subtle)] space-y-6 text-center">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Security Compliance Standards
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "ISO 27001 Certified Infrastructure",
              "SOC 2 Type II Aligned",
              "PCI-DSS Level 1 Merchant Ready",
              "GDPR & Data Protection Compliant",
              "OWASP Top 10 Hardened",
            ].map((cert, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white dark:bg-[#0E131D] text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 border border-[var(--border-subtle)] shadow-sm inline-flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{cert}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-sm font-semibold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer"
          >
            <span>Request Security Whitepaper</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
