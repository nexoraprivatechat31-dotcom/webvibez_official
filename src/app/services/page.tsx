"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import SpatialServicesExperience from "@/components/sections/SpatialServicesExperience";
import {
  Compass,
  Palette,
  Code2,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  Zap,
  Lock,
  Clock,
  FileCode,
  Award,
} from "lucide-react";

export default function ServicesPage() {
  const lifecyclePhases = [
    {
      step: "01",
      tag: "DISCOVERY · 48H",
      title: "Architectural Discovery",
      subtitle: "Requirements, Schemas & Blueprint",
      color: "#0066FF",
      gradient: "from-[#0066FF]/20 via-[#6366F1]/10 to-transparent",
      icon: <Compass className="w-5 h-5 text-white" />,
      desc: "We analyze your business flow, database schema, student load telemetry, and compliance requirements to build a comprehensive technical blueprint.",
      deliverables: [
        "Database ERD & Multi-Tenant Schema Map",
        "System Architecture & API Contract Spec",
        "Fixed Timeline & Milestone Guarantee",
      ],
      artifact: "Architecture Specification Spec",
    },
    {
      step: "02",
      tag: "DESIGN · 60 FPS",
      title: "Sprint Prototyping",
      subtitle: "Interactive Figma & UX Systems",
      color: "#8B00FF",
      gradient: "from-[#8B00FF]/20 via-[#A855F7]/10 to-transparent",
      icon: <Palette className="w-5 h-5 text-white" />,
      desc: "Interactive Figma designs, design system tokens, responsive UI components, and functional proof-of-concept validation with zero layout shift.",
      deliverables: [
        "Clickable iOS, Android & Web Prototypes",
        "Custom Crest, Typography & Theme Tokens",
        "Micro-Animation & Interaction Guidelines",
      ],
      artifact: "Interactive Figma System",
    },
    {
      step: "03",
      tag: "VELOCITY · SPRINT",
      title: "High-Velocity Build",
      subtitle: "Clean TypeScript & Hardened Code",
      color: "#00E5A3",
      gradient: "from-[#00E5A3]/20 via-[#0066FF]/10 to-transparent",
      icon: <Code2 className="w-5 h-5 text-white" />,
      desc: "Clean, typed TypeScript codebase with test-driven validation, native hardware DRM encryption, and automated CI/CD pipeline builds.",
      deliverables: [
        "Strict TypeScript 5 Clean Architecture",
        "Hardware DRM & Anti-Piracy Protection",
        "Automated CI/CD & Unit Test Coverage",
      ],
      artifact: "Production TypeScript Codebase",
    },
    {
      step: "04",
      tag: "LAUNCH · DAY 7+",
      title: "Deployment & Growth",
      subtitle: "Stores Release & 24/7 SLA Uptime",
      color: "#38BDF8",
      gradient: "from-[#38BDF8]/20 via-[#00E5A3]/10 to-transparent",
      icon: <Rocket className="w-5 h-5 text-white" />,
      desc: "App Store & Play Store release under your official brand, DNS edge acceleration, stress testing, and ongoing round-the-clock SLA maintenance.",
      deliverables: [
        "Apple App Store & Google Play Publishing",
        "Global CDN Edge & Cloudflare DDoS Shield",
        "Dedicated Senior Engineer Hotline & SLA",
      ],
      artifact: "Live Production Release",
    },
  ];

  return (
    <PageWrapper>
      <div className="w-full space-y-16 sm:space-y-24 pb-16">
        
        {/* SPATIAL SERVICES SHOWCASE: Cinematic 3D Spatial Deck */}
        <SpatialServicesExperience />

        {/* ========================================================================================= */}
        {/* CORE SPECIALIZED PRACTICES & DEEP-DIVE HUBS (INTERNAL LINKING & COMMERCIAL DESTINATIONS) */}
        {/* ========================================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 / SPECIALIZED PRACTICES · DEDICATED DOMAINS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                Explore Dedicated Service Practices
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
                Explore our full engineering capabilities, technical architectures, and project deliverables across our primary service divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Website Development",
                  href: "/services/website-development",
                  badge: "NEXT.JS & REACT",
                  color: "#0066FF",
                  desc: "High-performance business websites, web applications, and digital platforms engineered with Next.js, TypeScript, and modern SEO architecture.",
                  highlights: ["SEO & Core Web Vitals Ready", "Responsive UI/UX Systems", "CMS & API Integration", "Global Edge CDN Deployment"],
                },
                {
                  title: "Mobile App Development",
                  href: "/services/mobile-app-development",
                  badge: "REACT NATIVE & NATIVE",
                  color: "#00E5A3",
                  desc: "Cross-platform iOS and Android mobile applications engineered with React Native, hardware-level security, offline sync, and store publishing.",
                  highlights: ["iOS & Android Native Performance", "App Store & Play Store Publishing", "Push Notifications & Real-Time Sync", "Offline SQLite Architecture"],
                },
                {
                  title: "Custom Software Development",
                  href: "/services/custom-software-development",
                  badge: "ENTERPRISE & SAAS",
                  color: "#8B00FF",
                  desc: "Tailored enterprise software, SaaS platforms, ERP systems, and cloud architectures built around your exact business operational workflows.",
                  highlights: ["Modular Microservices", "Role-Based Access Control (RBAC)", "Custom API & CRM Integration", "PostgreSQL / Redis High Concurrency"],
                },
                {
                  title: "Coaching Class Management App",
                  href: "/services/coaching-class-management-app",
                  badge: "EDUCATION SOFTWARE",
                  color: "#38BDF8",
                  desc: "End-to-end coaching institute management applications with hardware DRM video protection, computerized mock test engines, and automated fees tracking.",
                  highlights: ["Screen Recording Blackout (DRM)", "CBT Mock Test Simulator", "Live Attendance & QR Tracking", "Automated Fee Invoicing & Reminders"],
                },
              ].map((practice) => (
                <Link
                  key={practice.href}
                  href={practice.href}
                  className="group relative p-7 rounded-3xl bg-white dark:bg-[#0A0E1A] border border-slate-200/80 dark:border-white/10 hover:border-[#0066FF]/60 dark:hover:border-[#38BDF8]/60 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          color: practice.color,
                          backgroundColor: `${practice.color}15`,
                        }}
                      >
                        {practice.badge}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                      {practice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {practice.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="grid grid-cols-2 gap-2">
                      {practice.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11.5px] text-slate-700 dark:text-slate-300 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* DEVELOPMENT METHODOLOGY: 4-PHASE LIFECYCLE (CLEAN & UNCLUTTERED ARCHITECTURE) */}
        {/* ========================================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>03 / METHODOLOGY · 4-PHASE LIFECYCLE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                The WebVibez Engineering Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
                From requirement discovery to multi-platform deployment under a unified quality guarantee and fixed timeline.
              </p>
            </div>

            {/* 4 Clean, Breathable Phase Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lifecyclePhases.map((phase) => (
                <div
                  key={phase.step}
                  className="group relative p-7 rounded-3xl bg-white dark:bg-[#0A0E1A] border border-slate-200/80 dark:border-white/10 hover:border-[#0066FF]/50 dark:hover:border-[#00E5A3]/40 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between space-y-6"
                >
                  {/* Top Step Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${phase.color} 0%, #0A0E1A 140%)`,
                            border: `1.5px solid ${phase.color}50`,
                          }}
                        >
                          {phase.icon}
                        </div>
                        <span className="text-2xl sm:text-3xl font-extrabold font-display text-slate-300 dark:text-white/20 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                          {phase.step}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          color: phase.color,
                          backgroundColor: `${phase.color}15`,
                        }}
                      >
                        {phase.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                        {phase.title}
                      </h3>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {phase.subtitle}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>

                  {/* Clean Deliverable Bullets */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Key Deliverables
                    </div>
                    <ul className="space-y-2">
                      {phase.deliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans leading-tight"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: phase.color }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500 block truncate">
                        // {phase.artifact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Inline Quality Assurance Bar (No Heavy Cluttered Boxes) */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-around gap-4 text-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
                <FileCode className="w-4 h-4 text-[#0066FF]" />
                <span>100% Source Code Transfer</span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
                <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                <span>Milestone Refund Guarantee</span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
                <Clock className="w-4 h-4 text-[#00E5A3]" />
                <span>Dedicated Lead Architect (&lt; 2h SLA)</span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
                <Award className="w-4 h-4 text-[#38BDF8]" />
                <span>99.99% Production Uptime</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================================= */}
        {/* BOTTOM CTA CARD */}
        {/* ========================================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 space-y-6 shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              Have a custom software or mobile app project in mind?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
              Talk directly to our lead software architects to evaluate technical feasibility, tech stack recommendations, and an exact timeline quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-sm font-semibold shadow-lg shadow-[#0066FF]/30 hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Free Project Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/product"
                className="px-8 py-3.5 rounded-xl bg-white dark:bg-white/[0.06] text-slate-900 dark:text-white text-sm font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.1] transition cursor-pointer"
              >
                Explore Products &amp; Deployments
              </Link>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
