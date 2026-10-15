import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Code2, Database, LayoutDashboard, ShoppingCart, Server, Palette, Cloud, Wrench } from "lucide-react";

interface ServicesConveyorProps {
  onOpenConsultation?: () => void;
}

const SERVICES_ROWS = [
  {
    direction: 1, // Moves Left to Right →
    items: [
      {
        title: "Mobile App Development",
        tag: "iOS & Android",
        icon: Smartphone,
        desc: "High-performance React Native white-labeled apps with offline caching & low latency.",
        href: "/services/mobile-app-development",
      },
      {
        title: "Website Development",
        tag: "Next.js Engineering",
        icon: Globe,
        desc: "Fast, conversion-driven web experiences built with Next.js, TypeScript & responsive UI.",
        href: "/services/website-development",
      },
      {
        title: "Web Application Development",
        tag: "Full-Stack SaaS",
        icon: Code2,
        desc: "Enterprise portals with real-time WebSockets, microservices & scalable backends.",
        href: "/services/custom-software-development",
      },
    ],
  },
  {
    direction: -1, // Moves Right to Left ←
    items: [
      {
        title: "Custom Software",
        tag: "Tailored Architecture",
        icon: Database,
        desc: "Bespoke digital engines built specifically for unique academic & business models.",
        href: "/services/custom-software-development",
      },
      {
        title: "Coaching Class Management Apps",
        tag: "Flagship Suite",
        icon: LayoutDashboard,
        desc: "All-in-one attendance, online tests, student results, and WhatsApp fee collection.",
        href: "/services/coaching-class-management-app",
      },
      {
        title: "Admin Panels & Dashboards",
        tag: "Executive Analytics",
        icon: LayoutDashboard,
        desc: "Multi-branch telemetry command centers with role-based access & financial auditing.",
        href: "/product",
      },
    ],
  },
  {
    direction: 1, // Moves Left to Right →
    items: [
      {
        title: "E-Commerce Platforms",
        tag: "Course & Notes Sales",
        icon: ShoppingCart,
        desc: "Instant UPI checkouts, digital notes watermarking & automated GST invoices.",
        href: "/services/website-development",
      },
      {
        title: "Backend & API Development",
        tag: "Ultra Low Latency",
        icon: Server,
        desc: "Distributed microservices, GraphQL gateways & high-throughput database clusters.",
        href: "/services/custom-software-development",
      },
      {
        title: "UI/UX Development",
        tag: "Modern Design",
        icon: Palette,
        desc: "Tactile micro-animations, glassmorphism design systems & responsive interfaces.",
        href: "/services/website-development",
      },
    ],
  },
  {
    direction: -1, // Moves Right to Left ←
    items: [
      {
        title: "Cloud & Deployment",
        tag: "Cloud Infrastructure",
        icon: Cloud,
        desc: "High-availability cloud infrastructure, CDN caching, autoscaling & zero-downtime releases.",
        href: "/services/custom-software-development",
      },
      {
        title: "Maintenance & Support",
        tag: "Auto Monitoring",
        icon: Wrench,
        desc: "Continuous security patching, automated backups & priority developer support.",
        href: "/pricing",
      },
      {
        title: "Mobile Apps on Rent",
        tag: "1-Year Leasing",
        icon: Smartphone,
        desc: "Turnkey iOS & Android white-label apps with zero upfront development cost & cloud hosting.",
        href: "/services/mobile-apps-on-rent",
      },
    ],
  },
];

export default function ServicesConveyor({ onOpenConsultation }: ServicesConveyorProps) {
  return (
    <section
      id="services"
      className="relative w-full py-16 md:py-32 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,0,255,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
              <span>05 / SERVICES &middot; WHAT WE BUILD</span>
            </div>
            <h2
              className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-[1.08] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4.2vw, 3.8rem)",
              }}
            >
              Enterprise software.
              <br />
              <span className="text-gradient-azure">Engineered for scale.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] max-w-md leading-relaxed font-sans">
            WebVibez Software Developer creates complete digital ecosystems — from bespoke mobile apps and high-conversion web platforms to resilient cloud infrastructure.
          </p>
        </div>
      </div>

      {/* Horizontal Alternating Rows Container — 100% GPU Hardware Accelerated */}
      <div className="w-full flex flex-col gap-4 sm:gap-6 overflow-hidden select-none">
        {SERVICES_ROWS.map((row, rowIdx) => {
          const animationClass = row.direction === 1 ? "animate-conveyor-left" : "animate-conveyor-right";

          return (
            <div
              key={rowIdx}
              className={`conveyor-row w-full overflow-hidden flex ${
                rowIdx >= 2 ? "hidden md:flex" : "flex"
              }`}
            >
              <div
                className={`flex shrink-0 items-center gap-4 sm:gap-6 ${animationClass}`}
              >
                {/* 4 loops of items creates infinite seamless continuous scrolling on any screen size */}
                {[...row.items, ...row.items, ...row.items, ...row.items].map((service, i) => {
                  const isClone = i >= row.items.length;
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={i}
                      href={service.href}
                      aria-hidden={isClone ? "true" : undefined}
                      tabIndex={isClone ? -1 : undefined}
                      className="group min-w-[280px] sm:min-w-[380px] max-w-[380px] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/55 dark:bg-[#070B14]/55 backdrop-blur-2xl shadow-xl shadow-[#0066FF]/5 hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-[#0066FF]/15 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Bar: Icon + Category Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF]/15 to-[#8B00FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF] group-hover:scale-110 transition-transform">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-slate-600 dark:text-slate-300 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                            // {service.tag}
                          </span>
                        </div>

                        {/* Service Name */}
                        <h3
                          className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0066FF] transition-colors mb-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed font-medium">
                          {service.desc}
                        </p>
                      </div>

                      {/* Bottom Action Link */}
                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                        <span className="font-bold">Explore {service.title}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
