"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react";

export default function DisclaimerPage() {
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

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>LEGAL // REGULATORY DISCLAIMER &amp; FAIR USAGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Legal Disclaimer &amp; Fair Use
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Last Updated: March 2025 &middot; WebVibez Software Developer &middot; Gujarat, India
          </p>
        </div>

        {/* Highlight Note */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/20 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Technology Provider Notice:</strong> WebVibez Software Developer acts exclusively as an independent software development studio and technology infrastructure provider. We do not provide academic accreditation, exam board certifications, or direct educational tutoring.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              1. Third-Party App Store Approvals
            </h2>
            <p>
              While WebVibez assists in preparing, signing, and submitting custom white-labeled mobile applications to the Apple App Store and Google Play Store, final approval and publishing timelines are determined solely by Apple Inc. and Google LLC respectively.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              2. Intellectual Property of Client Content
            </h2>
            <p>
              All academic video lectures, test papers, study notes, student databases, and institutional trademarks uploaded to client applications are the sole responsibility and intellectual property of the client institution. WebVibez assumes no liability for copyright infringements arising from client-uploaded curriculum materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              3. Payment Gateways &amp; Banking Regulations
            </h2>
            <p>
              Payment collection features integrate with certified third-party payment aggregator APIs (e.g., Razorpay, Cashfree, PhonePe, Stripe). WebVibez is not a financial institution or banking entity and never holds or escrows client funds. All payout settlements and chargeback disputes are governed by the respective gateway's merchant agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              4. Fair Usage &amp; High-Concurrency Bandwidth
            </h2>
            <p>
              Client software deployments are provisioned for elastic scale. However, malicious usage, DDoS attempts, unapproved automated scraping, or distribution of unauthorized content is strictly prohibited and grounds for immediate termination of cloud access.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-500">
              For legal inquiries or statutory notifications, contact our legal counsel at <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold">webvibezsoftdev@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
}
