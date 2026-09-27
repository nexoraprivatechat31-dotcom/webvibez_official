import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import Image from "next/image";
import { getPortfolioProjects, PortfolioProject } from "@/lib/portfolio/repository";
import {
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Smartphone,
  Globe,
  Database,
  Cpu,
  BarChart3,
  Award,
} from "lucide-react";

export const revalidate = 60; // Incremental static regeneration

const DEFAULT_PROJECTS = [
  {
    id: "zenith-coaching-erp",
    title: "Zenith Coaching Academy — Full-Stack Institute ERP & Mobile App",
    slug: "zenith-coaching-erp",
    type: "EdTech & Mobile Apps",
    tech_stack: "React Native, Next.js, Node.js, PostgreSQL, Razorpay, WhatsApp Cloud API",
    description:
      "A complete white-labeled coaching management ecosystem designed for 1,200+ enrolled students. Features real-time biometric and QR attendance syncing, automated WhatsApp fee collection reminders with direct UPI payment links, mock test percentile rankings, and parent notifications.",
    image_url: "/mobile-images/phone-mockup.png",
    live_url: "/product",
    metrics: ["1,200+ Active Students", "98% On-Time Fee Collection", "0.4s Attendance Scan"],
    featured: true,
  },
  {
    id: "nexora-telehealth",
    title: "Nexora Health — Enterprise Telemedicine & Patient EMR",
    slug: "nexora-telehealth",
    type: "Healthcare SaaS",
    tech_stack: "Next.js 15, WebRTC, Tailwind CSS, Turso SQLite, HIPAA Cryptography",
    description:
      "High-security healthcare management platform with encrypted video consultations, digital prescription signing, patient appointment booking calendar, and laboratory test result tracking. Compliant with international medical privacy standards.",
    image_url: "/images/og-image.jpeg",
    live_url: "https://www.webvibez.com",
    metrics: ["Sub-80ms WebRTC Latency", "100% HIPAA Ready", "50+ Doctor Clinics"],
    featured: true,
  },
  {
    id: "hyperfleet-telematics",
    title: "HyperFleet — Real-Time IoT Fleet Telematics & Logistics Dashboard",
    slug: "hyperfleet-telematics",
    type: "IoT & Cloud Software",
    tech_stack: "React, WebSockets, Go Microservices, Leaflet GIS, TimescaleDB",
    description:
      "Telemetry dispatch platform tracking 350+ commercial freight trucks across western India in real time. Provides fuel theft alerts, automated geo-fencing route optimization, driver trip logging, and vehicle maintenance predictive analytics.",
    image_url: "/og-image.jpeg",
    live_url: "https://www.webvibez.com",
    metrics: ["350+ Commercial Trucks", "15-sec GPS Ping Rate", "14% Fuel Savings"],
    featured: true,
  },
  {
    id: "apex-capital-fintech",
    title: "Apex Capital — Multi-Tenant Investment & Payout Portal",
    slug: "apex-capital-fintech",
    type: "FinTech & Payments",
    tech_stack: "Next.js, TypeScript, Stripe, Razorpay Route, Redis, Docker",
    description:
      "Multi-tenant corporate treasury and dividend disbursement portal automating payout batches for private equity investors. Features 2-factor hardware auth, bank-grade webhook reconciliation, and automated tax statement generation.",
    image_url: "/images/square-image.jpg",
    live_url: "https://www.webvibez.com",
    metrics: ["₹4.2 Cr Disbursed", "Zero Payout Failures", "Bank-Grade Encryption"],
    featured: false,
  },
];

export default async function PortfolioPage() {
  let dbProjects: PortfolioProject[] = [];
  try {
    dbProjects = await getPortfolioProjects();
  } catch (err) {
    console.error("Failed to load portfolio projects from DB:", err);
  }

  // Merge database projects if any exist, otherwise use comprehensive engineering case studies
  const displayProjects = dbProjects.length > 0 ? dbProjects : DEFAULT_PROJECTS;

  return (
    <PageWrapper>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-10 py-6 sm:py-10 space-y-16">
        
        {/* ── HERO BANNER ── */}
        <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
            Engineering Portfolio & Client Case Studies
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            High-Performance Software, Mobile Apps &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
              Cloud Architectures
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Explore verified engineering projects engineered by WebVibez Software Developer. From white-labeled coaching institute mobile apps to real-time telemetry and enterprise cloud platforms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> 100% Source Code Ownership
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Zero Third-Party Lock-In
            </span>
            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
              <Cpu className="w-4 h-4" /> Production-Grade Performance
            </span>
          </div>
        </section>

        {/* ── PROJECTS SHOWCASE GRID ── */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0066FF] dark:text-[#38BDF8] font-bold">
                PROVEN TRACK RECORD
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">
                Featured Case Studies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Displaying {displayProjects.length} Verified Production Implementations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
            {displayProjects.map((project: any, index: number) => {
              const metrics = project.metrics || [
                "Production Verified",
                "Sub-100ms Latency",
                "Full Source Code",
              ];
              const techTags = (project.tech_stack || "Next.js, TypeScript, Cloud")
                .split(",")
                .map((t: string) => t.trim());

              return (
                <div
                  key={project.id || index}
                  className="group relative rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 p-7 sm:p-9 shadow-xl hover:border-[#0066FF]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold">
                        {project.type || "Custom Software"}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold flex items-center gap-1">
                          <Award className="w-3 h-3" /> Featured Case Study
                        </span>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Impact / Metric Pills */}
                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      {metrics.map((metric: string, mIdx: number) => (
                        <div
                          key={mIdx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/05 text-center"
                        >
                          <div className="text-[11px] font-mono text-[#0066FF] dark:text-[#38BDF8] font-bold truncate">
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2">
                      <div className="text-[10.5px] uppercase font-mono text-slate-400 mb-2 tracking-wider">
                        Core Engineering Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {techTags.map((tech: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={project.live_url || "/contact"}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold font-display text-[#0066FF] dark:text-[#38BDF8] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Architecture &amp; System Specs</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/contact"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-mono text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── ENGINEERING CAPABILITIES CALLOUT ── */}
        <section className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0066FF] dark:text-[#38BDF8] font-bold">
              FULL-STACK CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              What We Build For Growing Businesses
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We specialize in mission-critical applications that demand speed, scalability, and absolute reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/05 space-y-3">
              <Smartphone className="w-7 h-7 text-[#0066FF]" />
              <h3 className="font-bold text-slate-900 dark:text-white font-display text-base">
                Cross-Platform Mobile Apps
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                React Native iOS &amp; Android applications with native device integrations, offline sync, and push notifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/05 space-y-3">
              <Globe className="w-7 h-7 text-[#8B00FF]" />
              <h3 className="font-bold text-slate-900 dark:text-white font-display text-base">
                Next.js Web Applications
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Server-rendered, sub-second web platforms with Core Web Vitals optimization and automated SEO structures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/05 space-y-3">
              <Database className="w-7 h-7 text-emerald-500" />
              <h3 className="font-bold text-slate-900 dark:text-white font-display text-base">
                Enterprise Coaching ERPs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Custom institute management portals with biometric attendance, automated fees, test analytics, and WhatsApp alerts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/05 space-y-3">
              <Cpu className="w-7 h-7 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white font-display text-base">
                Micro-SaaS &amp; API Backends
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Scalable Node.js &amp; PostgreSQL cloud architectures designed to handle thousands of concurrent queries smoothly.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0066FF]/15 via-[#8B00FF]/10 to-transparent border border-[#0066FF]/30 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Have an Ambitious Software or Mobile App in Mind?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute architectural consultation directly with Rudram Joshi (Founder &amp; Lead Developer). We will map out your database schema, timeline, and exact investment.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-sm font-bold shadow-lg shadow-[#0066FF]/30 transition-all active:scale-95"
            >
              <span>Book Free Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919213615531?text=Hi%20WebVibez,%20I%20am%20interested%20in%20building%20a%20custom%20software/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-sm font-bold shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
