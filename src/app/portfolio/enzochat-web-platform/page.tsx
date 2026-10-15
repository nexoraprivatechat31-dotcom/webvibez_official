import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ENZOCHAT_ECOSYSTEM_MODULES } from "@/lib/data";
import {
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Lock,
  Cpu,
  Zap,
  Globe,
  Radio,
  Sparkles,
  Server,
  Activity,
  Terminal,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "EnzoChat Case Study — Real-Time Encrypted Web Messaging Platform | WebVibez",
  description:
    "Engineering case study of EnzoChat: high-performance private web messaging platform built with Next.js, Fastify, sub-12ms WebSockets, zero-knowledge AES-256-GCM encryption, and 60 FPS virtualization.",
  alternates: {
    canonical: "https://www.webvibez.com/portfolio/enzochat-web-platform",
  },
  openGraph: {
    title: "EnzoChat Case Study — Real-Time Encrypted Web Platform | WebVibez",
    description:
      "Deep-dive technical breakdown of EnzoChat: sub-12ms WebSocket gateway, zero-knowledge encryption, and high-frequency real-time messaging architecture.",
    url: "https://www.webvibez.com/portfolio/enzochat-web-platform",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.webvibez.com/images/enzochat-desktop.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "EnzoChat Architecture and Engineering Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EnzoChat Case Study — Real-Time Encrypted Web Platform | WebVibez",
    description:
      "Deep-dive technical breakdown of EnzoChat: sub-12ms WebSocket gateway, zero-knowledge encryption, and high-frequency messaging architecture.",
    images: ["https://www.webvibez.com/images/enzochat-desktop.png"],
  },
};

const caseStudyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.webvibez.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://www.webvibez.com/portfolio",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "EnzoChat Case Study",
          "item": "https://www.webvibez.com/portfolio/enzochat-web-platform",
        },
      ],
    },
    {
      "@type": "TechArticle",
      "headline": "EnzoChat Case Study: High-Performance Real-Time Encrypted Messaging Architecture",
      "description": "An architectural breakdown of the EnzoChat private messaging platform, covering zero-knowledge encryption, low-latency WebSockets, and state virtualization.",
      "url": "https://www.webvibez.com/portfolio/enzochat-web-platform",
      "datePublished": "2026-03-01T00:00:00.000Z",
      "dateModified": "2026-10-15T00:00:00.000Z",
      "author": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
      "publisher": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "EnzoChat Web Platform",
      "operatingSystem": "Web, iOS, Android",
      "applicationCategory": "CommunicationApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
      },
    },
  ],
};

const TECH_SPECS = [
  { category: "Frontend Framework", detail: "Next.js 15 (App Router), React 19, TypeScript" },
  { category: "Real-Time Gateway", detail: "Fastify HTTP/2, Raw WebSockets with Heartbeat Ping/Pong" },
  { category: "Security & Cryptography", detail: "WebCrypto API, AES-256-GCM, Ephemeral Session Ratchets" },
  { category: "State Virtualization", detail: "Shopify FlashList, Zustand Store, MMKV Persistent Outbox" },
  { category: "Media & Streaming", detail: "WebRTC Peer Connections, Adaptive Bitrate, Native Audio Routing" },
  { category: "Network Latency", detail: "Sub-12ms Internal WebSocket Relay Latency" },
  { category: "Privacy Guarantee", detail: "Zero-Knowledge Architecture, Blind Relay Nodes, No Plaintext Storage" },
];

export default function EnzoChatCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <PageWrapper>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-10 py-6 sm:py-12 space-y-16">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
              EnzoChat Case Study
            </span>
          </div>

          {/* Hero Section */}
          <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0066FF]/10 dark:bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#8B00FF]/10 dark:bg-[#8B00FF]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Engineering Case Study &middot; Web Application
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                EnzoChat: Enterprise Encrypted{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
                  Private Messaging Platform
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
                A high-performance, zero-knowledge encrypted messaging platform engineered for ultra-low latency communication, ephemeral media sharing, campus community isolation, and secure voice/video calling.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://enzochat.webvibez.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#8B00FF] hover:brightness-110 shadow-lg shadow-[#0066FF]/25 transition cursor-pointer"
                >
                  <span>Launch Live EnzoChat Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 transition"
                >
                  <span>Discuss Custom App Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* High-Level Telemetry Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <div className="text-[10.5px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">
                    WebSocket Latency
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#0066FF] dark:text-[#38BDF8] mt-0.5">
                    &lt; 12ms
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <div className="text-[10.5px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">
                    Encryption
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                    AES-256-GCM
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <div className="text-[10.5px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">
                    Rendering Speed
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                    60 FPS Locked
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                  <div className="text-[10.5px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">
                    Data Architecture
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                    Zero-Knowledge
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Screenshots & Visual UI Showcase */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8]">
                // Production User Interface
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Engineered for Visual Clarity and Sub-Second Interactions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-md">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/enzochat-desktop.png"
                    alt="EnzoChat Desktop Interface"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">Desktop Command Matrix</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Multi-channel conversation layout with persistent WebSocket stream.</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-md">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/enzochat-features.png"
                    alt="EnzoChat Features & Protocol"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">Interactive Modules & Media</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ephemeral visual stories, polls, and dynamic multimedia rendering.</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-md">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/enzochat-mobile.png"
                    alt="EnzoChat Mobile Viewport"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">Responsive Mobile Experience</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Touch-optimized 60 FPS scrolling and instant offline message queuing.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Architectural Pillars */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8]">
                // Core Engineering Pillars
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                How EnzoChat Achieves Real-Time Performance and Absolute Privacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Raw WebSockets + Fastify Gateway
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Unlike traditional HTTP polling or bloated protocol wrappers, EnzoChat relies on lightweight binary WebSocket frames multiplexed across Fastify gateway nodes. Connection heartbeats maintain active channels with intelligent exponential reconnect backoffs.
                </p>
                <div className="text-xs font-mono text-[#0066FF] dark:text-[#38BDF8] font-semibold">
                  Sub-12ms internal delivery
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Zero-Knowledge End-to-End Encryption
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  All messages and media payloads are encrypted client-side using standard AES-256-GCM before transmission. Encryption keys remain solely in client device memory. Relay servers act as blind message forwarders with zero access to plaintext content.
                </p>
                <div className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                  Client-side WebCrypto standard
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Virtualization &amp; Persistent Outbox
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Feed virtualization ensures smooth 60 FPS scrolling regardless of channel history depth. An offline outbox powered by persistent local storage queues outbound communications during network drops and syncs immediately upon reconnection.
                </p>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Zero frame drops on long threads
                </div>
              </div>
            </div>
          </section>

          {/* Complete 8 Subsystems Breakdown */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8]">
                // Complete Subsystem Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                The 8 Core Functional Modules of EnzoChat
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
                Every screen in the EnzoChat platform is an independently resilient module engineered for maximum responsiveness and dedicated purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ENZOCHAT_ECOSYSTEM_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8]">
                      Module {mod.moduleNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      {mod.title}
                    </h3>
                    <div className="text-xs font-mono font-semibold text-[#0066FF] dark:text-[#38BDF8] mt-1">
                      {mod.subtitle}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {mod.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                    <div className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
                      Core Features:
                    </div>
                    {mod.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{mod.metricLabel}:</span>
                    <span className="font-bold text-[#0066FF] dark:text-[#38BDF8]">{mod.metricValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Specifications Matrix */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8]">
                // System Specifications
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Technical Stack &amp; Protocol Architecture
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0C1222] overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-white/10">
                {TECH_SPECS.map((spec, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white sm:w-1/3">
                      {spec.category}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono sm:w-2/3">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Banner */}
          <section className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0066FF]/10 via-purple-600/10 to-transparent border border-[#0066FF]/30 text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
              Ready to Engineer Your Next Real-Time Application?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              WebVibez architects custom web platforms, mobile applications, and real-time WebSocket systems tailored to enterprise scalability and strict data isolation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://enzochat.webvibez.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0066FF] hover:bg-[#0052cc] transition shadow-md shadow-[#0066FF]/20"
              >
                <span>Visit Live EnzoChat Web Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-900 dark:text-white bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 hover:bg-slate-100 transition"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </PageWrapper>
    </>
  );
}
