"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LeadModal from "@/components/ui/LeadModal";

function AmbientCursorLight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let ticking = false;
    const handleMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
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
      className="pointer-events-none fixed top-0 left-0 w-[650px] h-[650px] rounded-full z-0 will-change-transform"
      style={{
        transform: `translate3d(${pos.x - 325}px, ${pos.y - 325}px, 0)`,
        background:
          "radial-gradient(circle, rgba(0,102,255,0.07) 0%, rgba(139,0,255,0.04) 40%, transparent 70%)",
      }}
    />
  );
}

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--text-primary)] flex flex-col relative selection:bg-[#0066FF]/30 selection:text-[#FFFFFF] transition-colors duration-300 overflow-x-clip">
      <AmbientCursorLight />
      <Navbar onOpenConsultation={() => setModalOpen(true)} />
      
      {/* Main Page Content with top clearance for fixed Navbar */}
      <main className="flex-1 pt-24 sm:pt-28 pb-16 relative z-10">
        {children}
      </main>

      <Footer />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
