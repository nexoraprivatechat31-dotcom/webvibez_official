import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "WebVibez Studio | Blog & Content Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05070B] text-white pt-10 pb-20 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      {children}
    </div>
  );
}
