"use client";

import React, { useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  ArrowUp,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  Check,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("webvibezsoftdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const mainNavigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Products & Features", href: "/product" },
    { name: "How It Works (7-Day Fast Track)", href: "/how-it-works" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "About WebVibez", href: "/about" },
    { name: "Contact & Consult", href: "/contact" },
  ];

  const legalPolicies = [
    { name: "Terms of Service & Use", href: "/terms" },
    { name: "Privacy & Data Protection", href: "/privacy" },
    { name: "Refund & Cancellation Policy", href: "/refund-policy" },
    { name: "Client Service Agreement (SLA)", href: "/agreements" },
    { name: "Security", href: "/security" },
    { name: "Legal Disclaimer & Fair Use", href: "/disclaimer" },
  ];

  return (
    <footer className="relative w-full bg-[#F8FAFC] dark:bg-[#060913] text-slate-800 dark:text-slate-200 border-t border-slate-300/80 dark:border-white/[0.08] font-sans transition-colors duration-300 overflow-hidden">
      
      {/* Top radiant multi-color accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent shadow-[0_0_20px_rgba(0,102,255,0.8)]" />

      {/* Ambient lighting mesh */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#0066FF]/[0.06] dark:bg-[#0066FF]/[0.10] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[#8B00FF]/[0.05] dark:bg-[#8B00FF]/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-10 sm:pb-12 relative z-10">
        
        {/* MAIN 3-COLUMN DIRECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-12 border-b border-slate-300/70 dark:border-white/[0.08]">
          
          {/* COLUMN 1 (col 1–6): Brand & Direct Studio Desk */}
          <div className="lg:col-span-6 space-y-5 pr-0 lg:pr-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 w-fit group">
              <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/18 flex items-center justify-center shadow-lg group-hover:border-[#0066FF] group-hover:scale-105 transition-all duration-300">
                <img
                  src="/images/square-image.jpg"
                  alt="WebVibez Software Developer"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl sm:text-[26px] text-slate-900 dark:text-white font-display tracking-tight leading-tight">
                  Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">Vibez</span>
                </span>
                <span className="text-[10.5px] sm:text-[11.5px] uppercase font-mono tracking-[0.18em] text-[#0066FF] dark:text-[#38BDF8] font-bold">
                  Software Developer
                </span>
              </div>
            </Link>

            {/* Studio Bio */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed max-w-lg">
              <strong className="text-slate-900 dark:text-white font-semibold">Build Smart. Scale Fast.</strong> We engineer high-performance mobile applications, custom web platforms, and complete management software for coaching institutes, businesses, and startups.
            </p>

            {/* Direct Connect Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5">
              <a
                href="https://wa.me/919213615331?text=Hi%20WebVibez%20Software%20Developer,%20I%20want%20to%20build%20a%20custom%20app/software"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm shadow-lg shadow-[#25D366]/25 border border-emerald-400/40 transition-all active:scale-95 text-center cursor-pointer group"
              >
                <WhatsAppIcon className="w-5 h-5 text-slate-950 transition-transform group-hover:scale-110 shrink-0" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2.5 px-4.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.14] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs sm:text-sm font-mono transition-all active:scale-95 text-center cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
                    <span>webvibezsoftdev@gmail.com</span>
                  </>
                )}
              </button>
            </div>

            {/* Studio Contact Details */}
            <div className="space-y-2 text-xs sm:text-[13px] font-mono pt-2 text-slate-600 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="tel:+919213615331"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                  <span>+91 92136 15331</span>
                </a>
                <a
                  href="mailto:webvibezsoftdev@gmail.com"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                  <span>webvibezsoftdev@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                <span>Ahmedabad, Gujarat, India &middot; Delivering Worldwide</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11.5px] sm:text-xs">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:30 PM IST (Response SLA &lt; 2h)</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (col 7–9): Main Navigation Pages */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-slate-900 dark:text-white font-extrabold flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
              <span>Main Pages</span>
            </div>
            <ul className="space-y-3 text-[14.5px] sm:text-[15px]">
              {mainNavigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-white font-medium transition-all flex items-center gap-2.5 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#0066FF] group-hover:scale-125 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 (col 10–12): Policies */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-slate-900 dark:text-white font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Policies</span>
            </div>
            <ul className="space-y-3 text-[14.5px] sm:text-[15px]">
              {legalPolicies.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all flex items-center gap-2.5 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-500 group-hover:scale-125 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM UTILITY & QUICK LEGAL BAR */}
        <div className="pt-8 flex flex-col xl:flex-row items-center justify-between gap-5 text-xs sm:text-[13.5px] font-mono border-t border-slate-200/70 dark:border-white/[0.06] mt-2">
          
          {/* Left: Copyright & Agency Credential */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 sm:gap-2.5 text-center xl:text-left">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              &copy; {new Date().getFullYear()}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              WebVibez <span className="font-semibold text-slate-700 dark:text-slate-300">Software Developer</span>.
            </span>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span className="text-slate-600 dark:text-slate-400">All rights reserved.</span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700 select-none">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span>Engineered with precision in Gujarat, India</span>
              <svg className="w-3.5 h-2.5 rounded-[1px] inline-block shrink-0 shadow-xs border border-slate-300/60 dark:border-white/10" viewBox="0 0 900 600" aria-label="India">
                <rect width="900" height="200" fill="#FF9933" />
                <rect y="200" width="900" height="200" fill="#FFFFFF" />
                <rect y="400" width="900" height="200" fill="#138808" />
                <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="16" />
                <circle cx="450" cy="300" r="16" fill="#000080" />
              </svg>
            </span>
          </div>

          {/* Right: Policy Links & Circular Top Button */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs sm:text-[13px]">
            <Link
              href="/terms"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <Link
              href="/privacy"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <Link
              href="/refund-policy"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Refund Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <Link
              href="/agreements"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Client SLA
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <Link
              href="/security"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Security
            </Link>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <Link
              href="/disclaimer"
              className="text-slate-600 dark:text-slate-400 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors"
            >
              Disclaimer
            </Link>

            {/* Circular Rounded Floating Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.16] border border-slate-300/80 dark:border-white/12 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-lg active:scale-90 ml-2 group"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
