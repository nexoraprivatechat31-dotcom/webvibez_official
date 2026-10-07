"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import ProjectCostEstimator from "@/components/ui/ProjectCostEstimator";
import {
  Smartphone,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  DollarSign,
  Clock,
  Server,
  Headphones,
  Layers,
  ShoppingBag,
  Truck,
  GraduationCap,
  Store,
} from "lucide-react";

export default function MobileAppsOnRentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const rentalCategories = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#0066FF]" />,
      title: "Coaching & Institute Apps",
      desc: "Live lecture streaming, DRM video protection, CBT mock tests, student attendance, and automated WhatsApp fee reminders on a yearly subscription.",
      tags: ["DRM Video", "CBT Exams", "Fee Receipts"],
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-[#8B00FF]" />,
      title: "E-Commerce & Retail Apps",
      desc: "Instant UPI payments, cart management, push notifications, customer order tracking, and GST invoice generation for retail businesses.",
      tags: ["Instant UPI", "Order Tracking", "Catalog Sync"],
    },
    {
      icon: <Truck className="w-6 h-6 text-[#00E5A3]" />,
      title: "Delivery & Logistics Apps",
      desc: "Live GPS driver tracking, route optimization, customer order alerts, and multi-vendor delivery management on 1-year rental terms.",
      tags: ["Live GPS", "Driver App", "Vendor Panel"],
    },
    {
      icon: <Store className="w-6 h-6 text-[#38BDF8]" />,
      title: "Custom SaaS & Business Portals",
      desc: "Turnkey CRM, field service reporting, inventory tracking, and employee management apps white-labeled under your brand name.",
      tags: ["Role Access", "Real-Time DB", "Export Reports"],
    },
  ];

  const comparisonRows = [
    {
      feature: "Upfront Development Cost",
      scratch: "₹1,50,000 – ₹3,50,000+",
      rental: "₹0 Upfront (Low Annual Fee)",
      winner: "rental",
    },
    {
      feature: "Time to Launch (Go-Live)",
      scratch: "3 to 6 Months",
      rental: "Just 5 to 7 Days",
      winner: "rental",
    },
    {
      feature: "Play Store / App Store Publishing",
      scratch: "Extra Setup Hassle & Delays",
      rental: "Included & Managed by WebVibez",
      winner: "rental",
    },
    {
      feature: "Cloud Server & Database Hosting",
      scratch: "₹2,000 – ₹6,000 / month extra",
      rental: "Included Free in 1-Year Plan",
      winner: "rental",
    },
    {
      feature: "Bug Fixes, Security & OS Updates",
      scratch: "Charged Hourly or Monthly AMC",
      rental: "100% Free 24/7 Developer Support",
      winner: "rental",
    },
    {
      feature: "Business Risk",
      scratch: "High Financial Exposure",
      rental: "Zero Risk & Predictable ROI",
      winner: "rental",
    },
  ];

  const faqs = [
    {
      q: "What is included in the 1-Year Mobile App Rental package?",
      a: "The package includes 100% white-label Android & iOS mobile apps customized with your brand logo, name, and color theme. It also includes Google Play Store publishing, dedicated cloud server hosting, database backups, bug fixes, OS compatibility updates, and 24/7 technical developer support throughout the 1-year period.",
    },
    {
      q: "Can I renew the app rental after the 1st year?",
      a: "Yes! At the end of the 1-year subscription, you can easily renew the rental plan at the same affordable rate to continue receiving managed cloud hosting, feature upgrades, and technical support. You can also opt for a permanent source-code buyout if your business expands.",
    },
    {
      q: "How fast can my business app go live?",
      a: "Because the core architecture and backend microservices are pre-tested and production-ready, we can configure your branding, catalog/curriculum, payment gateways, and launch your mobile app on the Google Play Store in just 5 to 7 business days.",
    },
    {
      q: "Will the app have my own business branding or WebVibez branding?",
      a: "The mobile app is 100% white-labeled under YOUR brand. Your students, customers, or clients will only see your company name, logo, and identity everywhere inside the app and on the app store.",
    },
    {
      q: "Do you offer app rental services outside Ahmedabad?",
      a: "Yes. WebVibez serves clients across Gujarat (Surat, Vadodara, Rajkot), pan-India, and global clients in the US, UK, and Middle East with seamless remote onboarding and 24/7 SLA developer support.",
    },
  ];

  return (
    <PageWrapper>
      <div className="relative w-full pt-32 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(0,102,255,0.2) 0%, rgba(139,0,255,0.1) 40%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Hero Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TURNKEY APP SUBSCRIPTION // 1-YEAR RENTAL MODEL</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get Readymade Mobile Apps on <br />
              <span className="text-gradient-azure">1-Year Rental Subscription</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Why spend lakhs building an app from scratch? Rent custom-branded, native-performance iOS & Android mobile apps with zero development hassle, free cloud servers, and 24/7 developer support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary !rounded-xl px-8 py-3.5 text-xs font-mono uppercase font-bold tracking-wider w-full sm:w-auto"
              >
                <span>Book a Live Demo & Pricing</span>
                <ArrowRight className="w-4 h-4 ml-2 inline-block" />
              </button>
              <a
                href="#comparison"
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0066FF] hover:border-[#0066FF]/40 transition-colors w-full sm:w-auto"
              >
                Compare Scratch vs. Rent
              </a>
            </div>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/[0.08] text-center">
              <DollarSign className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">70% Cost</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Saved vs Custom Coding</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/[0.08] text-center">
              <Clock className="w-8 h-8 text-[#0066FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">5–7 Days</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Guaranteed Play Store Launch</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/[0.08] text-center">
              <Server className="w-8 h-8 text-[#8B00FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">100% Free</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cloud Servers & Backups</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/[0.08] text-center">
              <Headphones className="w-8 h-8 text-[#38BDF8] mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">24/7 SLA</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dedicated Developer Support</p>
            </div>
          </div>

          {/* App Categories Available on Rent */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Choose Your Industry Rental App
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Pre-tested, rock-solid applications ready for instant deployment under your brand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rentalCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-[#0066FF]/40 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center mb-5">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {cat.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
                    >
                      <span>Rent This App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Section: Scratch vs. 1-Year Rental */}
          <div id="comparison" className="mb-24 pt-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Custom Scratch Coding vs. 1-Year App Rental
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                See why forward-thinking institutions and businesses choose the WebVibez subscription model.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-800/50">
                    <th className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Feature / Deliverable</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-500 dark:text-slate-400">Traditional Agency Coding</th>
                    <th className="p-4 sm:p-5 font-bold text-[#0066FF] dark:text-[#38BDF8]">WebVibez 1-Year Rental Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-slate-900 dark:text-white">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">{row.scratch}</td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{row.rental}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Cost Estimator Embed */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Estimate Your App & Rental Cost
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Calculate an instant projection for features, store deployment, and timeline.
              </p>
            </div>
            <ProjectCostEstimator />
          </div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                App Rental FAQs
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Frequently asked questions regarding our 1-year app leasing terms.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Lead Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-[#0066FF] to-purple-600 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Ready to launch your mobile app in 7 days?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Connect directly with our Ahmedabad development team. Get a customized live demo for your business.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-mono uppercase font-bold tracking-wider transition-transform hover:scale-105 shadow-md whitespace-nowrap"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 ml-2 inline-block text-[#0066FF]" />
            </button>
          </div>
        </div>
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
