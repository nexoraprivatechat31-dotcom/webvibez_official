"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0066FF] dark:text-[#38BDF8] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>LEGAL // AGREEMENT & SERVICE LEVEL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Effective Date: March 2025 • WebVibez Software Developer
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              1. Platform License & Whitelabel Grant
            </h2>
            <p>
              WebVibez Software Developer grants the client institution a dedicated, non-exclusive, world-wide operational license to utilize the compiled application binaries, administrative control panels, and cloud APIs under their sovereign trademark, logo, and identity during the active subscription period.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              2. Production Uptime Service Level Agreement (SLA)
            </h2>
            <p>
              We guarantee a <strong>99.9% Core Production Availability</strong> for all live streaming endpoints, exam submission engines, and database APIs. Scheduled maintenance windows are announced at least 72 hours in advance and executed during minimal traffic hours (01:00 AM – 04:00 AM IST).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              3. Client Intellectual Property & Curriculum Ownership
            </h2>
            <p>
              The client maintains exclusive ownership of all uploaded video content, test questions, branding assets, student contact lists, and fee records. WebVibez makes no claim to any client intellectual property.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              4. Fee Settlements & Payment Gateway Neutrality
            </h2>
            <p>
              Client tuition fees are routed directly into the client's merchant account. WebVibez is never an intermediary recipient of student tuition fees. All recurring platform license fees are invoiced monthly or annually with GST compliant invoices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              5. Termination & Data Portability Guarantee
            </h2>
            <p>
              Either party may terminate the subscription with 30 days written notice. Upon termination, WebVibez will furnish a complete cryptographic data export of all student rosters, examination records, and fee history, ensuring zero operational lock-in.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-500">
              For legal inquiries regarding our terms, reach us at <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold">webvibezsoftdev@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
