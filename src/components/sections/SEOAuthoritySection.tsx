"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, Smartphone, Database, Layers } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "Why choose WebVibez as your software development company in Ahmedabad?",
    a: "WebVibez is recognized among top development companies in Ahmedabad for engineering custom software, high-performance Next.js websites, and scalable mobile apps. We provide full-lifecycle software engineering—from UI/UX wireframing and cloud architecture to post-launch SLA maintenance—delivering robust solutions for businesses across Gujarat and worldwide.",
    keywords: ["software development company ahmedabad", "development companies in ahmedabad", "custom software"],
  },
  {
    q: "What makes our coaching class management software & ERP unique?",
    a: "Our cloud based coaching institute management software empowers educational institutes, coaching centers, and private tutors to manage class schedules, biometric attendance, student test results, and automated UPI fee management in one unified platform. We also offer turnkey educational app development services with hardware-level DRM video encryption.",
    keywords: ["coaching class management software", "coaching institute management software", "coaching erp software", "fee management", "class schedules"],
  },
  {
    q: "How does the 1-Year Mobile App Rental / Subscription model work?",
    a: "Instead of paying huge upfront development costs (₹1.5L – ₹3L), businesses can rent ready-made white-label iOS and Android mobile apps for a predictable 1-year subscription fee. This package includes custom branding, Google Play Store publishing, cloud server hosting, automated backups, and 24/7 technical support.",
    keywords: ["mobile app development company ahmedabad", "app on rent", "educational app development services"],
  },
  {
    q: "Do you build custom websites and web applications for global clients?",
    a: "Yes. While our primary development office is in Ahmedabad, we engineer custom web applications and full-stack software solutions for startups and enterprise clients worldwide. Every website is built with Next.js, TypeScript, and modern SEO architecture to ensure top Core Web Vitals scores and rapid search indexing.",
    keywords: ["website development company ahmedabad", "custom software development company ahmedabad"],
  },
];

export default function SEOAuthoritySection({
  onOpenConsultation,
}: {
  onOpenConsultation: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-20 md:py-28 bg-[var(--surface-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>INDUSTRY EXPERTISE // AHMEDABAD & GLOBAL</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Engineering Scalable Software & <br />
            <span className="text-gradient-azure">Cloud Management Systems</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            As a full-suite software development company in Ahmedabad, WebVibez combines enterprise architecture with agile execution. Whether you need custom cloud ERP software, modern Next.js websites, or an education app development company for your coaching center, we deliver production-ready software designed for performance.
          </p>
        </div>

        {/* 3-Pillar Solution Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-[#0066FF]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0066FF] flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Website & Web App Development
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Ranked among forward-thinking website development companies in Ahmedabad, we build lightning-fast web applications with Next.js App Router, SSR caching, and high-conversion UI/UX workflows.
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Next.js & React Full-Stack</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero-Latency API Integration</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-[#8B00FF]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#8B00FF] flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Mobile App Development & Rental
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Expert React Native mobile app development company in Ahmedabad. We build native iOS and Android apps, plus flexible 1-year rental subscription models for growing businesses.
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cross-Platform iOS & Android</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Yearly App Lease & Support</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-6">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Coaching ERP & Institute Software
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Comprehensive cloud based coaching class management software and institute ERP that simplifies fee management, class schedules, attendance tracking, and CBT mock exam simulations.
            </p>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Automated Fee & UPI Receipts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>DRM Protected Video Lectures</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Structured FAQ & Knowledge Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently Asked Questions
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Clear answers about our development lifecycle, app subscriptions, and coaching software solutions.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-slate-900 dark:text-white hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0066FF]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.04]">
                      <p>{faq.a}</p>
                      <div className="mt-3 flex flex-wrap gap-2 pt-2">
                        {faq.keywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA bar */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-transparent border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Have a project or need an app on rent?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Speak directly with our engineering team in Ahmedabad for a transparent roadmap.
              </p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="btn-primary !rounded-xl px-6 py-2.5 text-xs font-mono uppercase font-bold tracking-wider whitespace-nowrap"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 inline-block" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
