"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Smartphone,
  Globe,
  Server,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MousePointerClick,
  Layers as LayersIcon,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  category: "web" | "mobile" | "cloud" | "ai";
  categoryLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  features: string[];
  tech: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "software-dev",
    category: "web",
    categoryLabel: "Full-Stack Web SaaS",
    title: "Custom Web Application Development",
    subtitle: "Ultra-fast, responsive web platforms built with Next.js, React 19 & Node.js",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF]" />,
    gradient: "from-[#0066FF]/25 via-[#6366F1]/15 to-[#8B00FF]/10",
    accentColor: "#0066FF",
    features: [
      "Server-Side Rendered (SSR) & Static Site Generation (SSG)",
      "Zero-layout-shift UI engineered with Tailwind & Modern CSS",
      "Role-based authentication & multi-tenant access control",
      "Sub-second page speeds, Core Web Vitals 95+ score",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "TailwindCSS", "Node.js"],
  },
  {
    id: "mobile-apps",
    category: "mobile",
    categoryLabel: "iOS & Android Native",
    title: "High-Performance iOS & Android Apps",
    subtitle: "Fluid 60 FPS native & cross-platform mobile experiences with offline vault",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B00FF]" />,
    gradient: "from-[#8B00FF]/25 via-[#A855F7]/15 to-[#0066FF]/10",
    accentColor: "#8B00FF",
    features: [
      "Single codebase or pure native iOS (Swift) / Android (Kotlin)",
      "Offline-first synchronization with SQLite & WatermelonDB",
      "Instant push notifications via Apple APNs & Google FCM",
      "Hardware DRM protection, screen recording & screenshot block",
    ],
    tech: ["React Native", "Expo", "Swift", "Kotlin", "WatermelonDB"],
  },
  {
    id: "cloud-backend",
    category: "cloud",
    categoryLabel: "High-Scale Backend",
    title: "Cloud Infrastructure & Scalable Backends",
    subtitle: "High-concurrency microservices, GraphQL, REST & edge networks",
    icon: <Server className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E5A3]" />,
    gradient: "from-[#00E5A3]/25 via-[#0066FF]/15 to-[#8B00FF]/10",
    accentColor: "#00E5A3",
    features: [
      "Kubernetes & Docker containerized autoscaling architecture",
      "PostgreSQL, Redis distributed caching & Prisma/Drizzle ORM",
      "Live WebSocket & WebRTC low-latency streaming infrastructure",
      "Automated CI/CD pipelines with zero-downtime deployment",
    ],
    tech: ["AWS", "Docker", "PostgreSQL", "Redis", "GraphQL", "WebSockets"],
  },
  {
    id: "admin-dashboards",
    category: "web",
    categoryLabel: "Executive Hub & ERP",
    title: "Executive Admin Panels & ERP Systems",
    subtitle: "Full-control command centers for revenue, users, staff & telemetry",
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />,
    gradient: "from-[#38BDF8]/25 via-[#0066FF]/15 to-[#8B00FF]/10",
    accentColor: "#38BDF8",
    features: [
      "Real-time revenue, fee collection, and subscription analytics",
      "Comprehensive student, user, and staff management portals",
      "Automated invoice generation, tax compliance & ledger sync",
      "Granular permission trees (SuperAdmin, Manager, Teacher, Billing)",
    ],
    tech: ["Next.js", "Recharts", "TanStack Table", "Zod", "Postgres"],
  },
  {
    id: "ai-automation",
    category: "ai",
    categoryLabel: "AI & Workflow Automation",
    title: "AI & Intelligent Workflow Automation",
    subtitle: "LLM agents, automated grading, conversational assistants & predictive models",
    icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />,
    gradient: "from-[#F59E0B]/25 via-[#EF4444]/15 to-[#8B00FF]/10",
    accentColor: "#F59E0B",
    features: [
      "AI-powered automated student query resolution & tutoring agents",
      "Intelligent exam paper generation and rubric-based evaluations",
      "Predictive churn & student performance analytics",
      "Automated CRM lead nurturing and WhatsApp broadcast bots",
    ],
    tech: ["OpenAI API", "LangChain", "Python", "Vector DBs", "FastAPI"],
  },
  {
    id: "sla-support",
    category: "cloud",
    categoryLabel: "24/7 Managed SLA",
    title: "24/7 Managed DevOps & Enterprise SLA",
    subtitle: "Guaranteed 99.99% uptime, proactive threat detection & swift response",
    icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />,
    gradient: "from-[#10B981]/25 via-[#00E5A3]/15 to-[#0066FF]/10",
    accentColor: "#10B981",
    features: [
      "Continuous 24/7 server monitoring & automatic failover",
      "Hourly encrypted database backups to geo-redundant storage",
      "Dedicated senior engineering hotline with < 15 min SLA",
      "Routine security penetration tests & OS kernel patching",
    ],
    tech: ["Grafana", "Prometheus", "AWS CloudWatch", "Cloudflare", "Terraform"],
  },
];

export default function SpatialServicesExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const isWheelLocked = useRef(false);

  // Drag / Swipe State
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const totalServices = SERVICES_DATA.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalServices - 1));
  }, [totalServices]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < totalServices - 1 ? prev + 1 : 0));
  }, [totalServices]);

  // Handle Wheel Scroll over stage without jumping or breaking page scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal swipe on trackpad
      if (Math.abs(e.deltaX) > 30) {
        if (!isWheelLocked.current) {
          isWheelLocked.current = true;
          if (e.deltaX > 0) handleNext();
          else handlePrev();
          setTimeout(() => {
            isWheelLocked.current = false;
          }, 380);
        }
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current !== null) {
      const diff = e.touches[0].clientX - dragStartX.current;
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragStartX.current !== null) {
      if (dragOffset > 50) handlePrev();
      else if (dragOffset < -50) handleNext();
    }
    dragStartX.current = null;
    setDragOffset(0);
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const diff = e.clientX - dragStartX.current;
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (dragStartX.current !== null) {
      if (dragOffset > 60) handlePrev();
      else if (dragOffset < -60) handleNext();
    }
    dragStartX.current = null;
    setDragOffset(0);
  };

  return (
    <section
      ref={stageRef}
      onWheel={handleWheel}
      className="relative w-full py-8 sm:py-12 px-4 sm:px-8 max-w-[1440px] mx-auto flex flex-col justify-between gap-6 select-none"
    >
      {/* TOP HUD: Section Header & Service Stepper Pills */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 z-30">
        <div className="space-y-1">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / CAPABILITIES &middot; SPATIAL 3D SERVICES STAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Software Services &amp; Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
            Click, drag, or use arrows to explore our full-stack engineering disciplines.
          </p>
        </div>

        {/* Quick Scrub Pills */}
        <div className="flex items-center gap-1.5 flex-wrap p-1.5 rounded-2xl bg-white/80 dark:bg-[#0D1424]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-md">
          {SERVICES_DATA.map((srv, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-[#0066FF] to-[#8B00FF] text-white shadow-md shadow-[#0066FF]/35 scale-105"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline font-sans">{srv.categoryLabel.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D SPATIAL STAGE (Always centered in view with depth & smooth coverflow) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[540px] sm:h-[580px] lg:h-[600px] flex items-center justify-center [perspective:1400px] overflow-hidden rounded-3xl border border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-[#060913]/50 my-2"
      >
        {/* Ambient Radial Spotlight */}
        <div
          className="absolute w-[500px] h-[320px] sm:w-[700px] sm:h-[400px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-65"
          style={{
            background: `radial-gradient(circle, ${SERVICES_DATA[activeIndex].accentColor}35 0%, transparent 70%)`,
          }}
        />

        {/* Subtle Tech Grid Lines in Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-100 shadow-xl hover:scale-110 hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer group"
          aria-label="Previous Service"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-100 shadow-xl hover:scale-110 hover:border-[#0066FF] active:scale-95 transition-all cursor-pointer group"
          aria-label="Next Service"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* RENDER ALL 6 SERVICE CARDS IN 3D SPATIAL COVERFLOW */}
        {SERVICES_DATA.map((service, idx) => {
          // Relative position offset (-2, -1, 0, +1, +2)
          let offset = idx - activeIndex;

          // Wrap around so circular browsing works naturally
          if (offset > totalServices / 2) offset -= totalServices;
          if (offset < -totalServices / 2) offset += totalServices;

          const absOffset = Math.abs(offset);
          const isDominant = offset === 0;

          // Compute 3D Coordinates
          let posX = 0;
          let posY = 0;
          let posZ = 0;
          let scale = 1;
          let rotateY = 0;
          let rotateZ = 0;
          let opacity = 1;
          let blur = 0;
          let zIndex = 20;

          if (!isMobile) {
            // DESKTOP: Smooth Coverflow in 3D Depth
            posX = offset * 350 + dragOffset * 0.5;
            posY = Math.min(absOffset * 8, 16);
            posZ = isDominant ? 0 : -absOffset * 150 - 50;
            scale = isDominant ? 1.02 : Math.max(0.78, 1 - absOffset * 0.12);
            rotateY = isDominant ? 0 : Math.max(-28, Math.min(28, -offset * 16));
            rotateZ = isDominant ? 0 : Math.max(-3, Math.min(3, -offset * 1.5));
            opacity = isDominant ? 1.0 : Math.max(0, 0.75 - (absOffset - 1) * 0.45);
            blur = isDominant ? 0 : Math.min(4, absOffset * 2);
            zIndex = 30 - absOffset * 5;
          } else {
            // MOBILE: Fluid Horizontal Card Deck
            posX = offset * 290 + dragOffset;
            posY = 0;
            posZ = isDominant ? 0 : -absOffset * 90;
            scale = isDominant ? 1.0 : Math.max(0.84, 1 - absOffset * 0.1);
            rotateY = isDominant ? 0 : Math.max(-14, Math.min(14, -offset * 10));
            rotateZ = 0;
            opacity = isDominant ? 1.0 : Math.max(0, 0.6 - (absOffset - 1) * 0.4);
            blur = isDominant ? 0 : Math.min(3, absOffset * 2);
            zIndex = 30 - absOffset * 5;
          }

          // Hide distant cards beyond 2 steps
          if (absOffset > 2) {
            opacity = 0;
          }

          return (
            <div
              key={service.id}
              onClick={() => {
                if (!isDominant) setActiveIndex(idx);
              }}
              className={`absolute w-[88vw] sm:w-[480px] lg:w-[540px] max-w-[540px] p-5 sm:p-6 lg:p-7 rounded-3xl border transition-all duration-500 ease-out will-change-transform select-none ${
                isDominant
                  ? "bg-white/95 dark:bg-[#0D1424]/95 shadow-2xl cursor-default"
                  : "bg-white/80 dark:bg-[#0D1424]/75 shadow-md cursor-pointer hover:border-[#0066FF]/60 hover:brightness-105"
              }`}
              style={{
                transform: `translate3d(${posX}px, ${posY}px, ${posZ}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                opacity: opacity,
                filter: blur > 0 ? `blur(${blur}px)` : "none",
                zIndex: zIndex,
                borderColor: isDominant ? service.accentColor : undefined,
                boxShadow: isDominant
                  ? `0 20px 50px -10px ${service.accentColor}35, 0 0 30px -5px ${service.accentColor}25, inset 0 1px 0 rgba(255,255,255,0.4)`
                  : undefined,
                backdropFilter: "blur(20px)",
                pointerEvents: opacity < 0.1 ? "none" : "auto",
              }}
            >
              {/* Card Top: Icon + Category Badge + IN FOCUS Live Radar */}
              <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/20"
                    style={{ backgroundColor: service.accentColor }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest font-bold uppercase text-slate-500 dark:text-slate-400">
                      // {service.categoryLabel}
                    </span>
                    <div className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                      SERVICE 0{idx + 1}
                    </div>
                  </div>
                </div>

                {isDominant && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-[11px] font-mono font-bold animate-in fade-in duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>IN FOCUS</span>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-slate-900 dark:text-white mb-1.5 leading-snug">
                {service.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3 sm:mb-4">
                {service.subtitle}
              </p>

              {/* Core Architectural Features */}
              <div className="space-y-1.5 sm:space-y-2 py-2.5 sm:py-3 border-y border-slate-200/80 dark:border-white/10 my-2 sm:my-3">
                {service.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-200 font-sans leading-tight"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5"
                      style={{ color: service.accentColor }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges & Inquire CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9.5px] sm:text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold hover:underline transition-all group/link"
                  style={{ color: service.accentColor }}
                >
                  <span>Inquire Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM HUD: Active Progress Tracker & Instructions */}
      <div className="w-full flex items-center justify-between gap-4 pt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-white">
            0{activeIndex + 1} / 0{totalServices}
          </span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline text-slate-700 dark:text-slate-300 font-medium">
            {SERVICES_DATA[activeIndex].title}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="flex-1 max-w-xs h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mx-3">
          <div
            className="h-full bg-gradient-to-r from-[#0066FF] to-[#8B00FF] transition-all duration-300 rounded-full"
            style={{ width: `${((activeIndex + 1) / totalServices) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-[11.5px]">
          <MousePointerClick className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
          <span className="hidden sm:inline">Use arrows or click cards to switch</span>
        </div>
      </div>
    </section>
  );
}
