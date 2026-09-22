"use client";

import React, { useEffect, useState } from "react";
import { scrollPhysicsState, subscribePhysicsState } from "@/lib/scrollPhysicsState";
import { ArrowRight, Smartphone, Globe, Code2, Database, LayoutDashboard, ShoppingCart, Server, Palette, Cloud, Wrench } from "lucide-react";

interface ServicesConveyorProps {
  onOpenConsultation: () => void;
}

const SERVICES_ROWS = [
  {
    direction: 1, // Moves Left to Right →
    items: [
      {
        title: "Mobile App Development",
        tag: "iOS & Android Native",
        icon: Smartphone,
        desc: "High-speed Swift & Kotlin white-labeled apps with offline storage & zero latency.",
      },
      {
        title: "Website Development",
        tag: "High Conversion",
        icon: Globe,
        desc: "Cinematic web experiences built with Next.js, WebGL & Three.js 3D physics.",
      },
      {
        title: "Web Application Development",
        tag: "Full-Stack SaaS",
        icon: Code2,
        desc: "Enterprise portals with real-time WebSockets, microservices & scalable backends.",
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
      },
      {
        title: "Coaching Class Management Apps",
        tag: "Flagship Suite",
        icon: LayoutDashboard,
        desc: "All-in-one attendance, online tests, student results, and WhatsApp fee collection.",
      },
      {
        title: "Admin Panels & Dashboards",
        tag: "Executive Analytics",
        icon: LayoutDashboard,
        desc: "Multi-branch telemetry command centers with role-based access & financial auditing.",
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
      },
      {
        title: "Backend & API Development",
        tag: "Ultra Low Latency",
        icon: Server,
        desc: "Distributed microservices, GraphQL gateways & high-throughput database clusters.",
      },
      {
        title: "UI/UX Development",
        tag: "Apple Aesthetic",
        icon: Palette,
        desc: "Tactile micro-animations, glassmorphism design systems & responsive interfaces.",
      },
    ],
  },
  {
    direction: -1, // Moves Right to Left ←
    items: [
      {
        title: "Cloud & Deployment",
        tag: "AWS & Bare Metal",
        icon: Cloud,
        desc: "99.98% uptime infrastructure, CDN caching, autoscaling & zero-downtime releases.",
      },
      {
        title: "Maintenance & Support",
        tag: "24/7 Monitoring",
        icon: Wrench,
        desc: "Continuous security patching, automated backups & dedicated developer on-call.",
      },
      {
        title: "WebVibez Software Developer",
        tag: "End-to-End Partner",
        icon: Code2,
        desc: "From blueprint concept to Play Store and App Store deployment in under 7 days.",
      },
    ],
  },
];

export default function ServicesConveyor({ onOpenConsultation }: ServicesConveyorProps) {
  const [scrollP, setScrollP] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      setScrollP(scrollPhysicsState.scrollProgress);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      setTime(elapsed);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full py-28 md:py-36 overflow-hidden border-t border-[var(--border-subtle)] bg-transparent transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,0,255,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold">
              <span>05 / SERVICES &middot; WHAT WE BUILD</span>
            </div>
            <h2
              className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-[1.08] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              }}
            >
              Enterprise software.
              <br />
              <span className="text-gradient-azure">Engineered for scale.</span>
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-[#94A3B8] max-w-md leading-relaxed font-sans">
            WebVibez Software Developer creates complete digital ecosystems — from bespoke mobile apps and high-conversion web platforms to resilient cloud infrastructure.
          </p>
        </div>
      </div>

      {/* Horizontal Alternating Rows Container */}
      <div className="w-full flex flex-col gap-4 sm:gap-6 overflow-hidden select-none">
        {SERVICES_ROWS.map((row, rowIdx) => {
          // Continuous slow graceful Left <-> Right oscillation + scroll synchronization
          const autoShift = Math.sin(time * 0.22 + rowIdx * 1.4) * 160 * row.direction;
          const scrollShift = row.direction * ((scrollP - 0.5) * 180);
          const shift = autoShift + scrollShift;

          return (
            <div
              key={rowIdx}
              className="flex items-center gap-4 sm:gap-6 will-change-transform transition-transform duration-75 ease-out"
              style={{
                transform: `translate3d(${shift}px, 0, 0)`,
              }}
            >
              {/* Duplicate array to allow seamless scrolling runway */}
              {[...row.items, ...row.items, ...row.items].map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={i}
                    onClick={onOpenConsultation}
                    className="group min-w-[340px] sm:min-w-[420px] max-w-[420px] p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/55 dark:bg-[#070B14]/55 backdrop-blur-2xl shadow-xl shadow-[#0066FF]/5 hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-[#0066FF]/15 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF]/15 to-[#8B00FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF] group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-slate-500 dark:text-slate-300 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
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
                      <span className="font-bold">Explore Solution</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
