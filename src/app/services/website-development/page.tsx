"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import {
  Globe,
  Zap,
  Smartphone,
  ShieldCheck,
  Search,
  Code2,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Layout,
} from "lucide-react";

export default function WebsiteDevelopmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const capabilities = [
    {
      icon: <Globe className="w-5 h-5 text-[#0066FF]" />,
      title: "High-Performance Next.js Websites",
      desc: "Fast static and server-rendered web experiences optimized for rapid load times, smooth transitions, and high visitor engagement.",
      features: [
        "App Router and Turbopack modern architecture",
        "Edge-cached content delivery and static optimization",
        "Dynamic OpenGraph social cards for WhatsApp, LinkedIn & X",
      ],
    },
    {
      icon: <Search className="w-5 h-5 text-[#8B00FF]" />,
      title: "Technical SEO & Search Crawlability",
      desc: "Clean semantic HTML hierarchy, structured schema.org data, automated sitemaps, and optimized metadata for search discovery.",
      features: [
        "Automated sitemap.xml & robots.txt generation",
        "Unique canonical URLs preventing duplicate indexation",
        "Semantic HTML5 landmarks and accessible navigational structure",
      ],
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#00E5A3]" />,
      title: "Mobile-First Responsive Engineering",
      desc: "Carefully tested layouts across small mobile screens, tablets, and desktop displays with fluid typography and touch targets.",
      features: [
        "Tailored responsive layouts (320px, 390px, 768px, 1440px+)",
        "Zero horizontal overflow with smooth touch interaction",
        "Modern WebP image pipelines for quick visual loading",
      ],
    },
    {
      icon: <Layout className="w-5 h-5 text-[#38BDF8]" />,
      title: "Conversion-Focused UI/UX Design",
      desc: "Structured layouts, intuitive call-to-actions, and clear information hierarchy designed to convert visitors into direct inquiries.",
      features: [
        "Clean brand typography, color palettes, and component tokens",
        "Direct inquiry forms and WhatsApp contact integrations",
        "Light and dark mode compatibility with instant toggle",
      ],
    },
  ];

  const faqs = [
    {
      q: "What types of websites does WebVibez develop?",
      a: "WebVibez develops custom business websites, corporate portals, educational platforms, and custom web applications tailored to client requirements in Ahmedabad and across India.",
    },
    {
      q: "What technologies are used for website development?",
      a: "We primarily build websites using Next.js, React, TypeScript, and modern CSS architecture, ensuring fast load times, clean code, and search engine crawlability.",
    },
    {
      q: "How long does a website development project take?",
      a: "Standard business websites and corporate web portals are typically completed and launched in 7 to 14 days, depending on content availability and custom feature requirements.",
    },
    {
      q: "Does WebVibez provide post-launch support and maintenance?",
      a: "Yes. We offer ongoing maintenance, technical updates, domain and SSL setup, and performance monitoring to ensure your website remains secure and up-to-date.",
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-[#0066FF] transition">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#0066FF] transition">Services</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Website Development</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase border border-[#0066FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Website Development Company &bull; Ahmedabad, Gujarat</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Website Development Company in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
              Ahmedabad
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
            WebVibez engineers modern Next.js websites, corporate portals, and responsive business web applications built for speed, search discovery, and clear customer conversion.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer"
            >
              Discuss Your Website Project
            </button>
            <a
              href="https://wa.me/919213615531?text=Hi%20WebVibez!%20I%20want%20to%20discuss%20a%20website%20development%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold uppercase tracking-wider hover:border-[#0066FF] transition"
            >
              WhatsApp Direct (+91 92136 15531)
            </a>
          </div>
        </div>

        {/* Engineering Capabilities Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase tracking-widest">
              // WEB ENGINEERING CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Built for Search Discovery &amp; High User Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  {cap.desc}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {cap.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer-Intent FAQs */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase tracking-widest">
              // FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Website Development FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1424] overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold font-display text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-600 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed border-t border-slate-100 dark:border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Ready to build your business website?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans max-w-xl mx-auto">
            Discuss your design and functional requirements with WebVibez engineers in Ahmedabad.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
