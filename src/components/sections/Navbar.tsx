"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/product" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "nav-scrolled py-3 sm:py-3.5 shadow-xl shadow-black/10 backdrop-blur-xl"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-10 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group">
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl overflow-hidden p-0.5 bg-white/[0.08] border border-white/[0.18] flex items-center justify-center shadow-lg shadow-[#0066FF]/20 group-hover:border-[#0066FF]/80 group-hover:scale-105 transition-all duration-300">
            <img
              src="/images/square-image.jpg"
              alt="WebVibez Software Developer"
              className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight font-display flex items-center nav-brand-title">
              Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">Vibez</span>
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-mono nav-brand-sub font-bold">
              Software Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-[14px] xl:text-[15px] font-semibold transition-colors duration-200 group py-1.5 ${
                  isActive
                    ? "text-[#0066FF] dark:text-[#38BDF8] font-bold"
                    : "nav-link hover:text-slate-900 dark:hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span>{link.label}</span>
                {/* Active or hover indicator underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#0066FF] to-[#8B00FF] transition-all duration-300 rounded-full ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right: CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="btn-cta-nav group inline-flex items-center gap-2.5 px-5 py-2.5 xl:px-5.5 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold tracking-normal active:scale-95 shadow-md shadow-[#0066FF]/20 cursor-pointer"
          >
            {/* Ambient gloss top highlight */}
            <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
            
            {/* Live green beacon cleanly aligned on the left side */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
            </span>

            <span className="font-semibold text-white">Build Your App</span>
            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 nav-link transition-transform duration-200 active:scale-90 cursor-pointer rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.08]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 transition-transform rotate-90" /> : <Menu className="w-6 h-6 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mobile-drawer-bg px-6 sm:px-8 py-6 space-y-5 border-b shadow-2xl animate-in fade-in slide-in-from-top-3 duration-300">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base sm:text-lg py-2.5 font-semibold border-b border-white/[0.05] last:border-0 transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#0066FF] dark:text-[#38BDF8] font-bold"
                      : "nav-link"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="btn-cta-nav w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full font-bold text-sm"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              </span>
              <span className="tracking-wide text-white">Build Your App</span>
              <ArrowUpRight className="w-4 h-4 text-white/90 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
