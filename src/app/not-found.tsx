"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles, PhoneCall, Layers } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[#0066FF]/30 selection:text-[#FFFFFF] overflow-x-hidden">
      <Navbar onOpenConsultation={() => (window.location.href = "/contact")} />

      <main className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32 relative z-10 text-center">
        {/* Ambient radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, #0066FF 0%, #8B00FF 60%, transparent 80%)",
          }}
        />

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/20 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ERROR 404</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            The requested URL does not exist on WebVibez Software Developer. It may have been moved, renamed, or is temporarily unavailable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs font-semibold shadow-lg shadow-[#0066FF]/25 hover:brightness-110 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs font-semibold border border-[var(--border-subtle)] hover:bg-slate-200 dark:hover:bg-white/10 transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Services</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs font-semibold border border-[var(--border-subtle)] hover:bg-slate-200 dark:hover:bg-white/10 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
