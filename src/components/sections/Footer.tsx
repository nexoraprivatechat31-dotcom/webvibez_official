"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("webvibezsoftdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const serviceLinks = [
    { name: "Website Development", href: "/services/website-development" },
    { name: "Mobile App Development", href: "/services/mobile-app-development" },
    { name: "Custom Software Development", href: "/services/custom-software-development" },
    { name: "Coaching Class Management App", href: "/services/coaching-class-management-app" },
    { name: "All Software Services", href: "/services" },
  ];

  const mainNavigation = [
    { name: "Home", href: "/" },
    { name: "Products & Features", href: "/product" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "About WebVibez", href: "/about" },
    { name: "Contact & Consult", href: "/contact" },
  ];

  const legalPolicies = [
    { name: "Terms of Service & Use", href: "/terms" },
    { name: "Privacy & Data Protection", href: "/privacy" },
    { name: "Refund & Cancellation Policy", href: "/refund-policy" },
    { name: "Client Service Agreement (SLA)", href: "/agreements" },
    { name: "Security Architecture", href: "/security" },
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
        
        {/* MAIN 4-COLUMN DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-10 pb-12 border-b border-slate-300/70 dark:border-white/[0.08]">
          
          {/* COLUMN 1 (col 1–5): Brand & Direct Studio Desk */}
          <div className="lg:col-span-4 space-y-5 pr-0 lg:pr-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 w-fit group">
              <div className="h-13 w-13 sm:h-14 sm:w-14 rounded-2xl overflow-hidden p-0.5 bg-white dark:bg-white/[0.08] border border-slate-200/90 dark:border-white/18 flex items-center justify-center shadow-md shadow-[#0066FF]/15 group-hover:border-[#0066FF] group-hover:scale-105 transition-all duration-300 shrink-0 relative">
                <Image
                  src="/images/square-image.jpg"
                  alt="WebVibez Software Developer"
                  fill
                  className="object-cover rounded-xl"
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
              <strong className="text-slate-900 dark:text-white font-semibold">Build Smart. Scale Fast.</strong> Founded and engineered by <strong className="text-slate-900 dark:text-white font-semibold">Rudram Joshi</strong> (Founder &amp; Lead Developer). We engineer high-performance mobile applications, custom web platforms, and complete management software for coaching institutes, businesses, and startups.
            </p>

            {/* Direct Connect Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5">
              <a
                href="https://wa.me/919213615531?text=Hi%20WebVibez%20Software%20Developer,%20I%20want%20to%20build%20a%20custom%20app/software"
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
                  href="tel:+919213615531"
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8] shrink-0" />
                  <span>+91 92136 15531</span>
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
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a href="https://www.linkedin.com/company/webvibez-software-devlopers/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0077b5] dark:bg-white/[0.06] dark:hover:bg-[#0077b5] flex items-center justify-center text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/webvibez_softdev?stkn=amd6a3B4MDF4bzJy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#E1306C] dark:bg-white/[0.06] dark:hover:bg-[#E1306C] flex items-center justify-center text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://x.com/Rudram9524" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-900 dark:bg-white/[0.06] dark:hover:bg-white flex items-center justify-center text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-slate-900 transition-all shadow-sm">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/19k7jWKD2H/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1877F2] dark:bg-white/[0.06] dark:hover:bg-[#1877F2] flex items-center justify-center text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (col 5–7): Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-slate-900 dark:text-white font-extrabold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
              <span>Core Services</span>
            </div>
            <ul className="space-y-3 text-[14px] sm:text-[14.5px]">
              {serviceLinks.map((item, idx) => (
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

          {/* COLUMN 3 (col 8–9): Main Navigation Pages */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-slate-900 dark:text-white font-extrabold flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
              <span>Explore</span>
            </div>
            <ul className="space-y-3 text-[14px] sm:text-[14.5px]">
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

          {/* COLUMN 4 (col 10–12): Policies & Compliance */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-widest text-slate-900 dark:text-white font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Compliance</span>
            </div>
            <ul className="space-y-3 text-[14px] sm:text-[14.5px]">
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
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              &copy; {new Date().getFullYear()}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              WebVibez <span className="font-semibold text-slate-700 dark:text-slate-300">Software Developer</span>.
            </span>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">Founded &amp; Led by Rudram Joshi</span>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
            <span className="text-slate-600 dark:text-slate-400">All rights reserved.</span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700 select-none">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
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
          </div>
        </div>

      </div>
    </footer>
  );
}
