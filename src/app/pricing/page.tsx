"use client";

import React, { useState, useRef, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import LeadModal from "@/components/ui/LeadModal";
import StudentPricingCalculator from "@/components/ui/StudentPricingCalculator";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Check,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
  Zap,
  Smartphone,
  LayoutDashboard,
  Video,
  Globe,
  CheckCircle2,
  X,
  Users,
  ShieldCheck,
  Award,
  Layers,
  PhoneCall,
  Clock,
  Palette,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  CreditCard,
  Lock,
  Rocket,
  FileText,
  RefreshCw,
  Sliders,
  Server,
  Headphones,
  TrendingUp,
  AlertTriangle,
  Coins,
  ShieldAlert,
  Database,
  Building2,
  BarChart3,
  CheckCheck,
  Laptop,
  FileCode,
} from "lucide-react";

interface PlanItem {
  id: string;
  name: string;
  categoryLabel: string;
  tierNumber: string;
  price: string;
  rawPrice: number;
  period: string;
  popular?: boolean;
  badge?: string;
  tagline: string;
  accentColor: string;
  icon: any;
  subsystems: { name: string; icon: any }[];
  features: string[];
  techStack: string[];
  ctaText: string;
}

function InteractivePricingCard({
  plan,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: {
  plan: PlanItem;
  isHovered: boolean;
  anyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: x * 4, y: -y * 4 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    onHoverEnd();
  };

  const handleMouseEnter = () => {
    onHoverStart();
  };

  const isDimmed = anyHovered && !isHovered;
  const PlanIcon = plan.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px) scale(1.02)`
          : isDimmed
          ? `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(0.99)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        opacity: isDimmed ? 0.88 : 1,
        borderColor: isHovered || plan.popular ? plan.accentColor : undefined,
        boxShadow: isHovered || plan.popular
          ? `0 20px 50px -10px ${plan.accentColor}35, 0 0 25px -5px ${plan.accentColor}20, inset 0 1px 0 rgba(255,255,255,0.4)`
          : undefined,
      }}
      className={`relative p-7 sm:p-8 rounded-3xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 h-full ${
        plan.popular
          ? "bg-white dark:bg-[#0D1424] border-2 shadow-2xl z-20 ring-1 ring-[#0066FF]/20"
          : "bg-white/95 dark:bg-[#0A0E1A]/95 border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-lg z-10"
      }`}
    >
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Card Top: Icon + Category Badge + IN FOCUS / Popular Radar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20 shrink-0"
              style={{ backgroundColor: plan.accentColor }}
            >
              <PlanIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest font-bold uppercase text-slate-500 dark:text-slate-400 block">
                // {plan.categoryLabel}
              </span>
              <div className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-slate-200">
                {plan.tierNumber}
              </div>
            </div>
          </div>

          {plan.popular ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-[#00E5A3] text-[10px] sm:text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MOST POPULAR</span>
            </div>
          ) : plan.badge ? (
            <span
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{
                color: plan.accentColor,
                backgroundColor: `${plan.accentColor}15`,
                border: `1px solid ${plan.accentColor}30`,
              }}
            >
              {plan.badge}
            </span>
          ) : null}
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1 pt-1">
          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed min-h-[34px]">
            {plan.tagline}
          </p>
        </div>

        {/* Pricing Box (Services Specs Block) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {plan.price}
            </span>
            <sup
              className="text-xs font-bold -top-2"
              style={{ color: plan.accentColor }}
            >
              *
            </sup>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
              {plan.period}
            </span>
          </div>
          <div className="text-[11px] font-mono text-emerald-800 dark:text-[#00E5A3] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-[#00E5A3]" />
            <span>Up to 750 students included • ₹0 extra</span>
          </div>
        </div>

        {/* Included Ecosystem Chips */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Included Ecosystem:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plan.subsystems.map((sub, sIdx) => {
              const SubIcon = sub.icon;
              return (
                <span
                  key={sIdx}
                  className="text-[10.5px] font-mono px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-bold"
                  style={{
                    color: plan.accentColor,
                    backgroundColor: `${plan.accentColor}12`,
                    borderColor: `${plan.accentColor}30`,
                  }}
                >
                  <SubIcon className="w-3 h-3 shrink-0" />
                  <span>{sub.name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Core Capabilities List (Services-Style Feature Divider in 2 Cols) */}
        <div className="space-y-2.5 py-3 border-y border-slate-200/80 dark:border-white/10 my-2 flex-1">
          <div className="text-[10px] font-bold font-mono uppercase text-slate-400">
            Key Capabilities
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {plan.features.map((f, fIdx) => (
              <li
                key={fIdx}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-sans leading-tight"
              >
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  style={{ color: plan.accentColor }}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Footer Pills */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {plan.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-5">
        <button
          onClick={onSelect}
          className={`w-full py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm font-bold font-sans transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 ${
            plan.popular
              ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white shadow-[#0066FF]/30 hover:brightness-110"
              : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-[#0066FF] dark:hover:bg-[#38BDF8] dark:hover:text-slate-900"
          }`}
        >
          <span>{plan.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface FAQItem {
  id: string;
  category: "all" | "limits" | "payments" | "apps" | "deployment";
  categoryLabel: string;
  badge?: string;
  question: string;
  answer: string;
  highlights: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "limits",
    categoryLabel: "Student Limits & Plans",
    badge: "3 APPS INCLUDED",
    question: "Are all three mobile apps (Student, Teacher, Admin) included in every plan?",
    answer:
      "Yes! Every standard WebVibez plan (Simple App, App + Admin, Live Lecture, and Complete Suite) includes all three native mobile apps: Student App, Teacher App, and Admin Mobile App. Your entire teaching staff, parents, and students stay synchronized with batch-specific roles and privileges.",
    highlights: [
      "Student Mobile App (iOS & Android)",
      "Teacher Portal & Attendance App",
      "Admin Mobile Management App",
    ],
  },
  {
    id: "faq-2",
    category: "limits",
    categoryLabel: "Student Limits & Plans",
    badge: "750 CAP INCLUDED",
    question: "Is there any extra fee per student within the 750 student limit?",
    answer:
      "None at all. All four standard plans support up to 750 active enrolled students with zero extra student charges. What you see is what you pay annually — no monthly license surprises or student bandwidth throttles.",
    highlights: [
      "Up to 750 Active Students Included",
      "₹0 Surcharge / Student",
      "Transparent Annual Fixed Cost",
    ],
  },
  {
    id: "faq-3",
    category: "limits",
    categoryLabel: "Student Limits & Plans",
    badge: "CLOUD SCALE",
    question: "What if our institute has more than 750 students or multiple branches?",
    answer:
      "If your coaching class grows between 750 and 2,500 students, you can easily scale on transparent cloud capacity at just ₹15/additional student/year. For institutes with 2,500+ students or multi-branch campuses, our Enterprise Engineering team provisions dedicated cloud instances with custom branch isolation and bespoke SLAs.",
    highlights: [
      "Scales smoothly to 2,500+ students",
      "Multi-Branch Campus Hierarchy",
      "Dedicated Isolated Cloud DB",
    ],
  },
  {
    id: "faq-4",
    category: "limits",
    categoryLabel: "Student Limits & Plans",
    badge: "INSTANT UPGRADE",
    question: "Can I upgrade my plan as my coaching institute grows?",
    answer:
      "Yes, you can upgrade anytime (e.g. from Simple App to App + Admin, Live Lecture, or Complete Solution) by paying only the pro-rated price difference. Your student rosters, batch history, and test logs transition seamlessly with zero downtime.",
    highlights: [
      "Pro-rated instant upgrades",
      "Zero data loss",
      "Instant feature activation",
    ],
  },
  {
    id: "faq-5",
    category: "payments",
    categoryLabel: "Payments & 0% Commission",
    badge: "0% COMMISSION",
    question: "Do you take any percentage commission on course fees or tuition collected?",
    answer:
      "Never. WebVibez operates strictly on an independent software license model and takes 0% commission on your revenues. 100% of student fee payments route directly into your coaching institute's own bank account through your UPI or payment gateway.",
    highlights: [
      "0% Platform Commission",
      "100% Direct to Your Bank",
      "Zero Revenue Share",
    ],
  },
  {
    id: "faq-6",
    category: "payments",
    categoryLabel: "Payments & 0% Commission",
    badge: "AUTO GST RECEIPTS",
    question: "How does automated fee collection and receipt generation work?",
    answer:
      "The system automatically schedules polite WhatsApp payment reminders with 1-tap UPI payment links before fee due dates. Once parents pay, instant GST-compliant receipts with your institute logo and serial number are automatically generated and logged to the ledger.",
    highlights: [
      "1-Tap UPI Pay Links via WhatsApp",
      "Instant Automated GST Receipts",
      "Real-Time Ledger Reconciliation",
    ],
  },
  {
    id: "faq-7",
    category: "payments",
    categoryLabel: "Payments & 0% Commission",
    badge: "INSTALLMENTS",
    question: "Can we set up custom installment plans and offline cash payments?",
    answer:
      "Yes! You can configure multi-part installment schedules (e.g. monthly, quarterly, or customized fee structures). Cash or offline cheque payments can also be marked in 1 tap by your reception desk with automated instant SMS receipt confirmation.",
    highlights: [
      "Custom installment schedules",
      "1-Tap offline cash receipts",
      "Automated SMS receipt triggers",
    ],
  },
  {
    id: "faq-8",
    category: "apps",
    categoryLabel: "App Capabilities & DRM",
    badge: "MILITARY DRM",
    question: "Is our study material, video lectures, and PDF notes protected from piracy?",
    answer:
      "Yes! We implement military-grade DRM content protection. It features dynamic student roll-number and name watermarks stamped across all video lectures and PDF documents, along with hardware-accelerated screen capture and recording blocks.",
    highlights: [
      "Dynamic Roll-Number Watermarks",
      "Screen Recording & Capture Blocking",
      "Zero Unauthorized File Forwarding",
    ],
  },
  {
    id: "faq-9",
    category: "apps",
    categoryLabel: "App Capabilities & DRM",
    badge: "1080P HD STREAM",
    question: "How does the Live Lecture system work in the Live App and Complete Solution?",
    answer:
      "Faculty can broadcast live classes in crisp 1080p HD directly from their laptop or mobile teaching studio. Students attend live inside your branded mobile app with interactive real-time doubt chat, polls, and automatic recording archives for revision.",
    highlights: [
      "1080p HD Ultra-Low Latency Streaming",
      "Interactive Student Live Doubt Chat",
      "Auto-Archived Class Recordings",
    ],
  },
  {
    id: "faq-10",
    category: "apps",
    categoryLabel: "App Capabilities & DRM",
    badge: "CUSTOM DOMAIN",
    question: "Do we get our own coaching website and custom domain with the Complete Suite?",
    answer:
      "Yes! The Complete Solution includes a high-speed, modern, SEO-optimized coaching website (e.g., youracademy.com or portal.yourinstitute.in) connected directly to your mobile app database for online admissions, inquiries, and demo bookings.",
    highlights: [
      "Custom Domain Integration",
      "Online Inquiry & Demo Lead Engine",
      "Synced with Mobile App Database",
    ],
  },
  {
    id: "faq-11",
    category: "deployment",
    categoryLabel: "7-Day Deployment & Migration",
    badge: "7 DAYS FAST TRACK",
    question: "How long does it take to launch our custom branded mobile app on Play Store & iOS?",
    answer:
      "Your fully whitelabeled mobile apps are prepared, tested, and submitted within 7 business days. We configure your custom institute logo, brand colors, splash screen, and initial batch structure ready for onboarding.",
    highlights: [
      "Live in 7 Business Days",
      "Custom Logo & Color Crest",
      "Google Play Store & App Store Ready",
    ],
  },
  {
    id: "faq-12",
    category: "deployment",
    categoryLabel: "7-Day Deployment & Migration",
    badge: "FREE MIGRATION",
    question: "Can you migrate our existing student data from Excel spreadsheets or another coaching app?",
    answer:
      "Yes! We provide 1-click CSV import tools, and our technical onboarding team will help migrate your existing student rosters, batch schedules, faculty contacts, and fee ledgers free of charge.",
    highlights: [
      "Free Technical Data Migration",
      "1-Click Excel / CSV Import",
      "Dedicated Onboarding Engineer",
    ],
  },
  {
    id: "faq-13",
    category: "deployment",
    categoryLabel: "7-Day Deployment & Migration",
    badge: "NO HIDDEN CHARGES",
    question: "Are there any hidden setup fees, server maintenance charges, or annual hosting surprise bills?",
    answer:
      "Zero hidden fees. Your annual plan covers high-performance cloud hosting, standard database backups, SSL certificates, bug fixes, and continuous Android/iOS OS compatibility updates throughout the year.",
    highlights: [
      "Zero Hidden Setup Fees",
      "High-Performance Cloud Hosting Included",
      "Continuous OS & Security Patches",
    ],
  },
];

function PricingFaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(
    new Set(["faq-1", "faq-2", "faq-5"])
  );

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "limits", label: "Student Limits & Plans" },
    { id: "payments", label: "0% Commission & Payments" },
    { id: "apps", label: "App Features & DRM Security" },
    { id: "deployment", label: "7-Day Launch & Migration" },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.badge && faq.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Scroll Container (Services Stepper Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar p-1.5 rounded-2xl bg-white/80 dark:bg-[#0D1424]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-md">
          {categories.map((cat, cIdx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white font-bold shadow-md shadow-[#0066FF]/25 scale-102"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative shrink-0 sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0066FF] transition shadow-xs"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#0D1424] border border-slate-200 dark:border-white/10 text-xs text-slate-500 font-mono">
            No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search or WhatsApp us directly.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-[#0D1424] border-[#0066FF]/50 dark:border-[#0066FF]/50 shadow-lg ring-1 ring-[#0066FF]/15"
                    : "bg-white/80 dark:bg-[#0A0E1A]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] dark:text-[#38BDF8]">
                        // {faq.categoryLabel}
                      </span>
                      {faq.badge && (
                        <span className="text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-[#00E5A3] border border-emerald-500/30">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h4>
                  </div>

                  <div
                    className={`p-1.5 rounded-xl border transition-transform duration-200 shrink-0 mt-1 ${
                      isOpen
                        ? "bg-[#0066FF] text-white border-[#0066FF] rotate-180"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 space-y-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>

                    {/* Highlight Chips */}
                    {faq.highlights && faq.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {faq.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00E5A3] shrink-0" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 4 Standard WebVibez Pricing Plans (Services Page Architecture)
  const plans: PlanItem[] = [
    {
      id: "simple-app",
      name: "Simple App",
      categoryLabel: "3 Native Apps",
      tierNumber: "TIER 01",
      price: "₹9,000",
      rawPrice: 9000,
      period: "/ year",
      tagline: "Dedicated iOS & Android Mobile Apps for Students, Teachers & Admins.",
      accentColor: "#0066FF",
      icon: Smartphone,
      subsystems: [
        { name: "Student App", icon: Smartphone },
        { name: "Teacher App", icon: Users },
        { name: "Admin App", icon: Shield },
      ],
      features: [
        "Android & iOS Mobile Apps",
        "Student Directory & Batches",
        "Study Notes & Material Vault",
        "Broadcast Push Notifications",
        "Up to 750 Students Included",
      ],
      techStack: ["React Native", "Expo", "Firebase", "Android", "iOS"],
      ctaText: "Get Started",
    },
    {
      id: "app-admin",
      name: "App + Admin Panel",
      categoryLabel: "Apps + Web ERP",
      tierNumber: "TIER 02",
      price: "₹14,000",
      rawPrice: 14000,
      period: "/ year",
      popular: true,
      badge: "MOST POPULAR",
      tagline: "Mobile apps with a complete web management portal & financial ledger.",
      accentColor: "#059669",
      icon: LayoutDashboard,
      subsystems: [
        { name: "3 Mobile Apps", icon: Smartphone },
        { name: "Web Admin Panel", icon: LayoutDashboard },
      ],
      features: [
        "All 3 Mobile Apps Included",
        "Complete Web Admin Panel",
        "Automated Fee Ledgers & Dues",
        "Attendance & Test Marks Logs",
        "Up to 750 Students Included",
      ],
      techStack: ["Next.js", "PostgreSQL", "React Native", "Node.js"],
      ctaText: "Get Started",
    },
    {
      id: "live-app",
      name: "Live Lecture App",
      categoryLabel: "1080p Live Studio",
      tierNumber: "TIER 03",
      price: "₹20,000",
      rawPrice: 20000,
      period: "/ year",
      badge: "LIVE STREAM",
      tagline: "Live online teaching & interactive doubts inside your own branded app.",
      accentColor: "#7C3AED",
      icon: Video,
      subsystems: [
        { name: "3 Mobile Apps", icon: Smartphone },
        { name: "Live HD Studio", icon: Video },
        { name: "Web Admin", icon: LayoutDashboard },
      ],
      features: [
        "1080p HD In-App Live Streaming",
        "Live Student Doubt Chat & Polls",
        "Screen Sharing & Whiteboard",
        "Auto-Archived Class Recordings",
        "Up to 750 Students Included",
      ],
      techStack: ["WebRTC", "HLS Stream", "PostgreSQL", "OBS Studio"],
      ctaText: "Get Started",
    },
    {
      id: "complete-solution",
      name: "Complete Suite (App + Web + Live)",
      categoryLabel: "Full Ecosystem",
      tierNumber: "TIER 04",
      price: "₹25,000",
      rawPrice: 25000,
      period: "/ year",
      badge: "ALL-IN-ONE",
      tagline: "Complete digital ecosystem: Mobile Apps + Coaching Website + Live Studio.",
      accentColor: "#D97706",
      icon: Globe,
      subsystems: [
        { name: "3 Mobile Apps", icon: Smartphone },
        { name: "Coaching Website", icon: Globe },
        { name: "Live Studio", icon: Video },
        { name: "Web Admin", icon: LayoutDashboard },
      ],
      features: [
        "All 3 Mobile Apps + Live Studio",
        "Custom Coaching Website & Domain",
        "Online Inquiries & Lead Capture",
        "Hardware Anti-Piracy DRM",
        "Up to 750 Students Included",
      ],
      techStack: ["Widevine DRM", "Next.js", "FairPlay", "AWS S3"],
      ctaText: "Get Started",
    },
  ];

  // Compact Comparison Matrix Rows
  const matrixRows = [
    {
      feature: "Student Mobile App (Android & iOS)",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Teacher Mobile App",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Admin Mobile App",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Complete Web Admin Panel",
      simple: false,
      appAdmin: true,
      liveApp: false,
      complete: true,
      custom: true,
    },
    {
      feature: "Live Lecture & Streaming System",
      simple: false,
      appAdmin: false,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Institute Coaching Website",
      simple: false,
      appAdmin: false,
      liveApp: false,
      complete: true,
      custom: true,
    },
    {
      feature: "Up to 750 Students (No Extra Charge)",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Push Notifications & Announcements",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Hardware DRM Screen Protection",
      simple: true,
      appAdmin: true,
      liveApp: true,
      complete: true,
      custom: true,
    },
    {
      feature: "Custom Workflows, Integrations & APIs",
      simple: false,
      appAdmin: false,
      liveApp: false,
      complete: false,
      custom: true,
    },
  ];

  return (
    <PageWrapper>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* ========================================================================================= */}
        {/* SECTION 1: Header (Services Page Spatial HUD Style) */}
        {/* ========================================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / INVESTMENT &middot; ANNUAL PLATFORM LICENSES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
            Simple, Transparent Pricing.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#00E5A3]">
              Up to 750 Students Included.
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Flat predictable annual packages for coaching institutes with zero per-student commission traps. All standard plans include Admin App, Teacher App, and Student App with zero extra student charges up to 750 students.
          </p>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              "0% Marketplace Commission",
              "100% White-Labeled Native Apps",
              "T+1 Bank Settlements",
              "7-Day Turnkey Delivery",
            ].map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-[#00E5A3]" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 2: 4 Main Interactive 3D Pricing Cards (2x2 Spatial Deck Layout - AT THE VERY TOP) */}
        {/* ========================================================================================= */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Section Sub-Header */}
          <div className="text-center space-y-2 pb-2">
            <div className="text-[11px] font-mono tracking-widest text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
              // 02 / EDITIONS &middot; COMPLETE SUITE BREAKDOWN
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Choose Your Institutional Software Edition
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-xl mx-auto">
              All 4 tiers include Student App, Teacher App, and Admin App with up to 750 active students and 0% commission.
            </p>
          </div>

          {/* 2x2 Grid of Spacious Spatial Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {plans.map((plan) => (
              <InteractivePricingCard
                key={plan.id}
                plan={plan}
                isHovered={hoveredCard === plan.id}
                anyHovered={hoveredCard !== null}
                onHoverStart={() => setHoveredCard(plan.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onSelect={() => setModalOpen(true)}
              />
            ))}
          </div>

          {/* Minor footnote */}
          <div className="text-center text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            * All listed prices are annual platform license subscriptions supporting up to 750 active students with standard maintenance and updates. Applicable taxes extra.
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 2.5: Prominent 750 Student Policy Notice Banner (BELOW 2x2 CARDS) */}
        {/* ========================================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl max-w-6xl mx-auto">
          {/* Ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-[#00E5A3] text-xs font-mono font-bold uppercase tracking-wide border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#00E5A3]" />
                <span>UP TO 750 STUDENTS &mdash; INCLUDED</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white">
                All listed plans support up to 750 active students with zero extra student charge.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-2xl">
                No hidden per-student commissions, no surprise monthly server bills. The displayed price is the complete annual cost for your institution.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 shrink-0 text-center w-full md:w-auto">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="text-xl sm:text-2xl font-black font-display text-[#0066FF] dark:text-[#38BDF8]">
                  ₹0
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Commission
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="text-xl sm:text-2xl font-black font-display text-emerald-800 dark:text-[#00E5A3]">
                  750
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Students Cap
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="text-xl sm:text-2xl font-black font-display text-[#7C3AED] dark:text-[#A78BFA]">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  Your Bank Direct
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 3: Interactive Student Pricing Meter (BELOW GUARANTEE BANNER) */}
        {/* ========================================================================================= */}
        <StudentPricingCalculator
          standalone={false}
          onOpenConsultation={() => setModalOpen(true)}
        />

        {/* ========================================================================================= */}
        {/* SECTION 4: Marketplace Aggregator Commission Battle Arena (Services Split Bento) */}
        {/* ========================================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 space-y-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-[#00E5A3] text-xs font-mono font-bold uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5" />
              <span>04 / STRATEGY &middot; COMMISSION SAVINGS COMPARISON</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Why Premier Institutes Choose WebVibez Flat License
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
              Compare marketplace commission aggregators versus your own sovereign platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generic Aggregators Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-200 dark:border-rose-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-md">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold block">
                        // CLASSPLUS / TEACHMINT / 3RD PARTY
                      </span>
                      <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                        Marketplace Aggregator Model
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-500/30">
                    HIGH COMMISSION
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-700 dark:text-rose-400">3% to 5% Commission Trap:</strong> An institute collecting ₹50L/yr loses ₹1.5L to ₹2.5L annually in commission fees alone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-700 dark:text-rose-400">Zero Student Brand Recall:</strong> Your students see third-party marketplace logos, aggregator branding, and competitor course promotions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-700 dark:text-rose-400">Shared Cloud Databases:</strong> Student contact records reside on shared platforms vulnerable to poaching and advertising.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-100/60 dark:bg-rose-950/40 text-xs font-mono text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20 font-bold">
                Annual Loss on ₹50L Batch: -₹2,00,000+ in commissions
              </div>
            </div>

            {/* WebVibez Dedicated Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#059669] text-white flex items-center justify-center font-bold shadow-md">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-[#00E5A3] font-bold block">
                        // 100% WHITELABEL · SOVEREIGN OS
                      </span>
                      <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                        WebVibez Sovereign Platform
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-[#00E5A3] font-bold border border-emerald-500/30">
                    0% COMMISSION
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-emerald-800 dark:text-[#00E5A3]">0% Commission (Always Free):</strong> 100% of student tuition settles directly into your institutional bank account with zero middleman cuts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-emerald-800 dark:text-[#00E5A3]">100% Your Academy Brand:</strong> Native iOS &amp; Android apps published on Play Store &amp; App Store under your own institution developer account.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-emerald-800 dark:text-[#00E5A3]">Dedicated Database Isolation:</strong> Your student data, test rankings, and financial records remain 100% encrypted, private, and exportable.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/15 text-xs font-mono text-emerald-800 dark:text-[#00E5A3] border border-emerald-500/30 font-bold">
                Flat Annual Cost: ₹14,000 flat &middot; Keep 100% of your earnings
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 5: Separate Custom Development Card (Services 4-Phase Lifecycle Style) */}
        {/* ========================================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 shadow-2xl relative overflow-hidden space-y-8 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] dark:text-[#A78BFA] text-xs font-mono font-bold uppercase tracking-wider border border-[#7C3AED]/30">
                <Layers className="w-3.5 h-3.5" />
                <span>05 / BESPOKE &middot; ENTERPRISE ENGINEERING</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                Need Something Different?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                Get a custom solution built specifically around your coaching institute&apos;s requirements. Tailored architecture, custom mobile apps, proprietary workflows, and dedicated server deployment.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-[#0A0E1A] border border-slate-200 dark:border-white/10 text-center sm:text-right shrink-0 w-full lg:w-auto shadow-xl space-y-3">
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
                  // Custom Engineering
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#0066FF] dark:text-[#38BDF8]">
                  Custom Pricing
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                  Scope-based quote &amp; dedicated SLA
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold font-sans shadow-lg shadow-[#0066FF]/25 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to WebVibez</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Custom Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-4 border-t border-slate-200/80 dark:border-white/10 relative z-10">
            {[
              "Custom Mobile App (iOS & Android)",
              "Custom Admin Panel & Dashboards",
              "Custom Institute Website",
              "Custom Live Lecture System",
              "Custom Student & Teacher Workflows",
              "Direct Payment Gateway Integration",
              "API & Third-Party Integrations",
              "Advanced Reporting & BI Analytics",
              "Dedicated Private Cloud & Custom SLA",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-sans shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/15 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 6: Compact Comparison Matrix (Services Specs Table Style) */}
        {/* ========================================================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-slate-200/90 dark:border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#0066FF] dark:text-[#38BDF8] font-bold">
              // 06 / FEATURE MATRIX &middot; SIDE-BY-SIDE CAPABILITY BREAKDOWN
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Compare Platform Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
              Review which capabilities are included in each WebVibez plan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-mono">
                  <th className="pb-3 px-3">Platform Capability</th>
                  <th className="pb-3 px-3 text-center">
                    <div className="font-bold text-slate-900 dark:text-white">Simple App</div>
                    <div className="text-[10px] text-slate-500 font-normal">₹9,000*</div>
                  </th>
                  <th className="pb-3 px-3 text-center text-[#0066FF] dark:text-[#38BDF8] font-bold bg-[#0066FF]/[0.05] rounded-t-2xl">
                    <div>App + Admin</div>
                    <div className="text-[10px] font-normal">₹14,000*</div>
                  </th>
                  <th className="pb-3 px-3 text-center">
                    <div className="font-bold text-slate-900 dark:text-white">Live App</div>
                    <div className="text-[10px] text-slate-500 font-normal">₹20,000*</div>
                  </th>
                  <th className="pb-3 px-3 text-center text-emerald-800 dark:text-[#00E5A3] font-bold">
                    <div>Complete Suite</div>
                    <div className="text-[10px] font-normal">₹25,000*</div>
                  </th>
                  <th className="pb-3 px-3 text-center text-[#7C3AED] dark:text-[#A78BFA] font-bold">
                    <div>Custom Plan</div>
                    <div className="text-[10px] font-normal">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                {matrixRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {row.simple ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center bg-[#0066FF]/[0.04]">
                      {row.appAdmin ? (
                        <Check className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {row.liveApp ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center bg-emerald-500/[0.03]">
                      {row.complete ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center bg-[#7C3AED]/[0.03]">
                      {row.custom ? (
                        <Check className="w-4 h-4 text-[#7C3AED] dark:text-[#A78BFA] mx-auto font-bold" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 5.5: Clean Inline Quality Assurance Bar (Direct from Services Page) */}
        {/* ========================================================================================= */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
            <FileCode className="w-4 h-4 text-[#0066FF]" />
            <span>100% White-Labeled Source App</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
            <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
            <span>0% Commission Guarantee</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
            <Clock className="w-4 h-4 text-[#00E5A3]" />
            <span>7-Day Turnkey Deployment</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
            <Award className="w-4 h-4 text-[#38BDF8]" />
            <span>99.99% Production Uptime</span>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 6: Frequently Asked Questions & Interactive Knowledge Base */}
        {/* ========================================================================================= */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#38BDF8] text-[11px] font-mono font-bold uppercase tracking-wider border border-[#0066FF]/25">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>07 / KNOWLEDGE &middot; FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Everything You Need to Know About WebVibez Pricing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-xl mx-auto">
              Clear, transparent answers regarding student limits, mobile apps included, 0% payment commission, DRM security, and 7-day deployment.
            </p>
          </div>

          {/* Pricing FAQ Interactive Accordion List */}
          <PricingFaqAccordion />

          {/* Dedicated "Still Have Questions? WhatsApp & Call Box" */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1424]/95 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800 dark:text-[#00E5A3]">
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-[#00E5A3]" />
                <span>DIRECT FOUNDER &amp; TECH SUPPORT</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                Have a specific question about your coaching institute?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed max-w-lg">
                Talk directly with our software architects. We help configure custom batch structures, multi-branch scaling, and live app prototypes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/919213615331?text=Hi%20WebVibez%20Software%20Developer,%20I%20have%20a%20question%20about%20your%20coaching%20plans%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold font-sans shadow-lg shadow-emerald-700/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-slate-950 shrink-0" />
                <span>WhatsApp Us Directly</span>
              </a>

              <a
                href="tel:+919213615331"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-white text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>+91 92136 15331</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* SECTION 7: Bottom CTA Bar (Services Bottom Hero Style) */}
        {/* ========================================================================================= */}
        <div className="text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 via-[#7C3AED]/10 to-transparent border border-[#0066FF]/30 space-y-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Guarantees Pill Deck */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 relative z-10">
            {[
              { icon: <Rocket className="w-3.5 h-3.5 text-[#0066FF]" />, text: "Live in 7 Business Days" },
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00E5A3]" />, text: "0% Commission (100% Direct to Bank)" },
              { icon: <Smartphone className="w-3.5 h-3.5 text-[#8B00FF]" />, text: "100% White-Labeled on Play Store & iOS" },
              { icon: <Users className="w-3.5 h-3.5 text-[#F59E0B]" />, text: "Up to 750 Students Included" },
            ].map((g, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 shadow-xs"
              >
                {g.icon}
                <span>{g.text}</span>
              </span>
            ))}
          </div>

          <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              Ready to deploy your customized coaching app?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              Launch your branded Student, Teacher, and Admin apps in 7 days. Starting at just ₹9,000/year for up to 750 students with zero commissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white text-xs sm:text-sm font-bold shadow-xl shadow-[#0066FF]/30 hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              <span>Get Started &amp; Request Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919213615331?text=Hi%20WebVibez%20Software%20Developer,%20I%20am%20interested%20in%20deploying%20a%20coaching%20app%20for%20my%20institute."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.08] text-slate-800 dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/20 transition cursor-pointer shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageWrapper>
  );
}
