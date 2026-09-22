"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { RefreshCcw, ArrowLeft, ShieldCheck, Mail, HelpCircle, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
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
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>LEGAL // CLIENT TRUST &amp; FINANCIAL POLICIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Effective Date: March 2025 &middot; WebVibez Software Developer &middot; Gujarat, India
          </p>
        </div>

        {/* Summary Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-500/[0.08] to-purple-500/[0.08] border border-blue-500/20 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Transparent 7-Day Pre-Deployment Guarantee</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              We stand behind our engineering milestones. If we fail to deliver agreed development milestones during initial setup, you are entitled to a full milestone fee refund.
            </p>
          </div>
          <a
            href="mailto:webvibezsoftdev@gmail.com"
            className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold whitespace-nowrap transition-all shadow-md shadow-blue-500/20"
          >
            Contact Billing
          </a>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">01.</span> Scope of Services
            </h2>
            <p>
              WebVibez Software Developer provides custom software development, mobile application engineering (iOS and Android), software-as-a-service (SaaS) white-label licenses, and cloud hosting administration. All services are governed by formal milestone schedules outlined in client project statements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">02.</span> Turnkey Deployment &amp; Initial Milestone Refunds
            </h2>
            <p>
              For new software projects and coaching institute white-label onboarding:
            </p>
            <ul className="space-y-2 pl-4 border-l-2 border-[#0066FF]/30">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Pre-Production Stage:</strong> If a client requests cancellation before compilation of custom mobile APK/IPA builds and database provisioning, 100% of the milestone deposit is refunded within 5-7 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Post-Compilation &amp; Store Submission:</strong> Third-party fees incurred for Apple Developer Program or Google Play Console registrations, custom domains, or SMS gateway top-ups are non-refundable once activated.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">03.</span> Recurring Subscriptions &amp; Maintenance SLAs
            </h2>
            <p>
              Monthly or annual cloud maintenance, server hosting, and SLA support subscriptions can be cancelled at any time by providing written notification to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[#0066FF] dark:text-[#38BDF8] font-mono text-xs">webvibezsoftdev@gmail.com</code> at least 15 days prior to the next billing cycle.
            </p>
            <p>
              Upon cancellation, all services remain active until the end of the paid billing period. No retroactive prorated refunds are issued for partially used subscription months.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">04.</span> Student Tuition &amp; End-User Fee Isolation
            </h2>
            <p>
              WebVibez Software Developer does not collect, hold, or escrow tuition fees or examination fees paid by students/parents to coaching institutions. All tuition payments flow directly into the institution's merchant accounts (Razorpay, PhonePe, Stripe, Cashfree, etc.). Any refund requests from students or guardians must be resolved directly by the institution under their own enrollment bylaws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">05.</span> Refund Request Procedure
            </h2>
            <p>
              To initiate a formal refund review:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Submit an email to <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold">webvibezsoftdev@gmail.com</a> with your Account ID, Invoice Number, and Project Title.</li>
              <li>Our finance desk evaluates technical milestones within 2 business days.</li>
              <li>Approved refunds are processed via the original payment method (NEFT / RTGS / UPI / Card) within 5 to 7 banking days.</li>
            </ol>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#8B00FF]" />
              <span>Questions &amp; Billing Support</span>
            </h2>
            <p>
              For any clarification regarding invoices, payments, or custom service agreements, reach out directly to our finance desk at <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] font-bold underline">webvibezsoftdev@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
}
