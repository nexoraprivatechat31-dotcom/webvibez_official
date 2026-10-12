import React from "react";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

export const metadata = {
  title: "Admin Panel | WebVibez",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  // If not authenticated, just render the children (Login Page) without the sidebar
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex selection:bg-[#0066FF]/20 selection:text-[#0066FF] antialiased font-sans">
      {/* Dynamic Sidebar Component */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/60">
        {/* Subtle Ambient Background Light Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

        {/* Dynamic Header Component */}
        <AdminHeader />

        <div className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto relative z-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
}
