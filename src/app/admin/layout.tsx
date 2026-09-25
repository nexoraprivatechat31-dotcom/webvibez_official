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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex selection:bg-[#0066FF]/30 selection:text-[#0066FF]">
      {/* Dynamic Sidebar Component */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        {/* Dynamic Header Component */}
        <AdminHeader />
        
        <div className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
}
