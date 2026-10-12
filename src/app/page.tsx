"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import ProblemSection from "@/components/sections/ProblemSection";
import ScrollProgressHUD from "@/components/ui/ScrollProgressHUD";

// Dynamically import Unified 3D Canvas with SSR disabled
const UnifiedPhoneCanvas = dynamic(
  () => import("@/components/canvas/UnifiedPhoneCanvas"),
  { ssr: false }
);

// Dynamically import heavy below-the-fold sections to reduce initial JS execution and TBT
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"));
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"));
const ServicesConveyor = dynamic(() => import("@/components/sections/ServicesConveyor"));
const ProductArchitecture = dynamic(() => import("@/components/sections/ProductArchitecture"));
const BrandCustomizer = dynamic(() => import("@/components/sections/BrandCustomizer"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const SEOAuthoritySection = dynamic(() => import("@/components/sections/SEOAuthoritySection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
const LeadModal = dynamic(() => import("@/components/ui/LeadModal"), { ssr: false });

function AmbientCursorLight() {
  const lightRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lightRef.current) {
            lightRef.current.style.transform = `translate3d(${e.clientX - 350}px, ${e.clientY - 350}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={lightRef}
      className="pointer-events-none fixed top-0 left-0 w-[700px] h-[700px] rounded-full z-0 will-change-transform"
      style={{
        transform: "translate3d(-1000px, -1000px, 0)",
        background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(139,0,255,0.05) 40%, transparent 70%)",
      }}
    />
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenConsultation = () => {
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-transparent text-[var(--text-primary)] flex flex-col relative selection:bg-[#0066FF]/30 selection:text-[#FFFFFF] transition-colors duration-300 overflow-x-hidden">
      {/* Electric Blue / Violet Ambient Cursor-Following Lighting */}
      <AmbientCursorLight />

      {/* Unified Continuous 3D Smartphone Canvas (Pinned Central Hero Object) */}
      <UnifiedPhoneCanvas />

      {/* Pinned Cinematic Scroll Progress HUD (01 / 08) */}
      <ScrollProgressHUD />

      {/* 1. Minimal Premium Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* 2. Chapter 01 — Cinematic Editorial Hero with Horizontal Departure */}
      <HeroSection onOpenConsultation={handleOpenConsultation} />

      {/* Capabilities Marquee */}
      <MarqueeTicker />

      {/* 3. Chapter 02 — The Problem (Institutional Chaos vs WebVibez Unified OS) */}
      <ProblemSection onOpenConsultation={handleOpenConsultation} />

      {/* 4. Chapter 03 — The Interactive Product Showroom (8 Dedicated Modules) */}
      <ProductShowcase onOpenConsultation={handleOpenConsultation} />

      {/* 5. Chapter 04 — Features: 11 Core Systems (Horizontal Alternating List) */}
      <FeaturesSection onOpenConsultation={handleOpenConsultation} />

      {/* 6. Chapter 05 — Agency Services (Horizontal Conveyor Blocks) */}
      <ServicesConveyor onOpenConsultation={handleOpenConsultation} />

      {/* 7. Chapter 06 — Technical Architecture (Animated Data-Flow Topology) */}
      <ProductArchitecture onOpenConsultation={handleOpenConsultation} />

      {/* 8. Brand Identity Customizer (100% Whitelabel Theme Engine) */}
      <BrandCustomizer onOpenConsultation={handleOpenConsultation} />

      {/* 9. Chapter 07 — How It Works (Live in 7 Days) */}
      <HowItWorks onOpenConsultation={handleOpenConsultation} />

      {/* Semantic Authority & High-Intent FAQ Knowledge Section */}
      <SEOAuthoritySection onOpenConsultation={handleOpenConsultation} />

      {/* 10. Cinematic CTA Finale */}
      <CTASection onOpenConsultation={handleOpenConsultation} />

      {/* 11. Global Footer */}
      <Footer />

      {/* 12. Consultation Lead Modal */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
