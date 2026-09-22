"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import {
  Smartphone,
  Video,
  FileCheck2,
  CreditCard,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export default function CoachingClassManagementAppPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const capabilities = [
    {
      icon: <Video className="w-5 h-5 text-[#0066FF]" />,
      title: "Interactive Live Classes & Video DRM",
      desc: "Live classes with hardware-enforced screen capture blackout and dynamic floating watermarks to prevent video leaks.",
      features: [
        "Adaptive bitrate live streaming with real-time doubts queue",
        "Anti-piracy screen blackout preventing unauthorized recording",
        "Encrypted offline video downloads with zero file export",
      ],
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-[#8B00FF]" />,
      title: "CBT Online Exam Simulator",
      desc: "Instant computerized test evaluations with percentile rankings, negative marking validation, and diagnostic radar charts.",
      features: [
        "Computerized examination interface matching standard national testing patterns",
        "Anti-cheating window blur detector and app lock during exams",
        "Subject-wise accuracy and weak-topic diagnostic reports",
      ],
    },
    {
      icon: <CreditCard className="w-5 h-5 text-[#00E5A3]" />,
      title: "Automated Fee Invoicing & Reminders",
      desc: "Direct bank settlements with zero marketplace commissions, automated WhatsApp fee due reminders, and digital GST receipts.",
      features: [
        "1-Click in-app UPI, card, and netbanking fee payments",
        "Automated WhatsApp payment reminder alerts sent to parents",
        "Digital tax invoice generation and payment tracking",
      ],
    },
    {
      icon: <Users className="w-5 h-5 text-[#38BDF8]" />,
      title: "Attendance Sync & Multi-Campus Management",
      desc: "Student presence tracking via in-app QR or biometric hardware, teacher roll calls, and cross-branch analytics.",
      features: [
        "Automated parent notification upon student check-in",
        "Role-based access trees for faculty, managers, and accountants",
        "Executive operational dashboard monitoring branch performance",
      ],
    },
  ];

  const faqs = [
    {
      q: "What features are included in the coaching class management app?",
      a: "The platform includes student records, biometric/QR attendance, live lecture streaming, encrypted offline study notes, CBT online test series, and automated fee collections.",
    },
    {
      q: "How does the app protect video lectures from being leaked?",
      a: "We implement hardware-enforced DRM that blacks out screen recorders on mobile devices, combined with real-time floating student watermarks showing user phone number and dynamic timestamp.",
    },
    {
      q: "Is the application published under our institute's name?",
      a: "Yes. The mobile app is fully white-labeled and published under your institute's official Google Play and Apple Developer accounts.",
    },
    {
      q: "Can parents monitor their child's attendance and test scores?",
      a: "Yes. Parents can log in or receive automated WhatsApp notifications for daily attendance, test scorecards, and upcoming fee dues.",
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
          <span className="text-slate-900 dark:text-white font-bold">Coaching Class App</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold tracking-wider uppercase border border-[#0066FF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coaching Class Management App Development &bull; Ahmedabad, Gujarat</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            Coaching Class Management App Development in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
              Ahmedabad
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-3xl">
            Empower your coaching academy with a dedicated mobile application: hardware DRM anti-piracy video lectures, CBT mock exam engine, biometric attendance sync, and automated UPI fee collection.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer"
            >
              Request Coaching App Demo
            </button>
            <a
              href="https://wa.me/919213615531?text=Hi%20WebVibez!%20I%20want%20to%20see%20a%20live%20demo%20of%20the%20coaching%20class%20management%20app."
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
              // INSTITUTE CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              The Academic &amp; Administrative Operating System
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
              Coaching App FAQs
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
            Ready to launch your coaching academy app?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans max-w-xl mx-auto">
            Schedule a customized platform walkthrough with WebVibez engineers in Ahmedabad.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition cursor-pointer inline-flex items-center gap-2"
          >
            <span>Request Coaching App Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
