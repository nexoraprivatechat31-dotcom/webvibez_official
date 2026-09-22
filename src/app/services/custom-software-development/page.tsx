"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  Globe,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export default function CustomSoftwareDevelopmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const capabilities = [
    {
      icon: <Server className="w-5 h-5 text-[#0066FF]" />,
      title: "Enterprise ERP & Workflow Automation",
      desc: "Tailored business logic engines that eliminate paper bottlenecks, automate multi-branch reporting, and streamline operations.",
      features: [
        "Multi-campus role management and permission trees",
        "Automated accounting and GST invoice dispatch",
        "Real-time operational inventory and attendance tracking",
      ],
    },
    {
      icon: <Database className="w-5 h-5 text-[#8B00FF]" />,
      title: "Scalable SaaS & Cloud Architecture",
      desc: "Multi-tenant and isolated database architectures built for high concurrency, zero downtime, and responsive edge queries.",
      features: [
        "PostgreSQL and Redis caching architectures",
        "Tenant isolation for client data sovereignty",
        "Auto-scaling cloud infrastructure deployments",
      ],
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#00E5A3]" />,
      title: "Custom APIs & System Integrations",
      desc: "REST & GraphQL microservices bridging accounting tools, biometric hardware, and payment gateways.",
      features: [
        "WhatsApp Business API and SMS gateway routing",
        "Hardware biometric and RFID clock-in integration",
        "UPI and payment gateway settlement webhooks",
      ],
    },
    {
      icon: <Lock className="w-5 h-5 text-[#38BDF8]" />,
      title: "Content Security & DRM Architecture",
      desc: "Enterprise AES-256 data encryption, role-based access controls, and screen capture prevention safeguards.",
      features: [
        "Hardware Widevine L1 & FairPlay DRM compliance",
        "Dynamic floating user watermark overlays",
        "Rooted and jailbroken device anomaly handling",
      ],
    },
  ];

  const faqs = [
    {
      q: "Does WebVibez build custom software for specific business workflows?",
      a: "Yes. WebVibez specializes in designing and engineering custom software, internal tools, ERP platforms, and customer-facing portals tailored to client specifications.",
    },
    {
      q: "Do clients retain ownership of the custom software source code?",
      a: "Yes. We execute complete Intellectual Property (IP) assignments, granting your business full ownership of all custom codebase and database schemas upon delivery.",
    },
    {
      q: "What technologies are used for custom software development?",
      a: "We build on modern, proven stacks including Next.js, Node.js, TypeScript, PostgreSQL, Redis, and cloud providers like AWS and Cloudflare.",
    },
    {
      q: "How does WebVibez ensure software security and data privacy?",
      a: "We implement AES-256 data encryption, isolated database schemas, zero-trust token authentication, and strict compliance with Indian DPDP data sovereignty standards.",
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#0066FF] transition">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#0066FF] transition">Services</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">Custom Software</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase border border-[#0066FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Software Engineering &bull; Ahmedabad, Gujarat</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Custom Software Development Company in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
              Ahmedabad
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
            We architect tailored enterprise software, scalable SaaS applications, automated ERP workflows, and secure cloud microservices engineered for business sovereignty and high reliability.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer"
            >
              Discuss Your Software Requirements
            </button>
            <a
              href="https://wa.me/919213615531?text=Hi%20WebVibez!%20I%20want%20to%20discuss%20a%20custom%20software%20project."
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
              // ARCHITECTURAL CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Engineered for Speed, Reliability &amp; Sovereignty
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
              Custom Software FAQs
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
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
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
            Ready to engineer your custom software system?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans max-w-xl mx-auto">
            Schedule a technical discovery session with WebVibez senior software engineers in Ahmedabad.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Technical Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
