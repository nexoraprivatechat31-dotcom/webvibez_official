import React from "react";
import { 
  Smartphone, 
  Globe, 
  Database, 
  ShieldCheck, 
  Cpu, 
  ShoppingCart, 
  Code, 
  Zap, 
  BookOpen, 
  Layout,
  Server,
  Cloud
} from "lucide-react";

/**
 * Automatically maps a service or feature title to the most relevant SVG icon.
 */
export function getAutoIconForService(title: string, className: string = "w-6 h-6"): React.ReactNode {
  const normalizedTitle = title.toLowerCase();

  // Mobile & App Development
  if (normalizedTitle.includes("app") || normalizedTitle.includes("mobile") || normalizedTitle.includes("ios") || normalizedTitle.includes("android")) {
    return <Smartphone className={className} />;
  }

  // Web Development
  if (normalizedTitle.includes("web") || normalizedTitle.includes("site") || normalizedTitle.includes("frontend")) {
    return <Globe className={className} />;
  }

  // Coaching & Education
  if (normalizedTitle.includes("coaching") || normalizedTitle.includes("education") || normalizedTitle.includes("student") || normalizedTitle.includes("lms")) {
    return <BookOpen className={className} />;
  }

  // E-commerce
  if (normalizedTitle.includes("commerce") || normalizedTitle.includes("store") || normalizedTitle.includes("shop")) {
    return <ShoppingCart className={className} />;
  }

  // Database & Backend
  if (normalizedTitle.includes("database") || normalizedTitle.includes("backend") || normalizedTitle.includes("api")) {
    return <Database className={className} />;
  }

  // Security
  if (normalizedTitle.includes("security") || normalizedTitle.includes("auth") || normalizedTitle.includes("protect")) {
    return <ShieldCheck className={className} />;
  }

  // AI & Automation
  if (normalizedTitle.includes("ai ") || normalizedTitle.includes("artificial") || normalizedTitle.includes("bot") || normalizedTitle.includes("automation")) {
    return <Cpu className={className} />;
  }

  // Cloud & Hosting
  if (normalizedTitle.includes("cloud") || normalizedTitle.includes("hosting") || normalizedTitle.includes("server") || normalizedTitle.includes("aws")) {
    return <Cloud className={className} />;
  }

  // Performance & Speed
  if (normalizedTitle.includes("fast") || normalizedTitle.includes("speed") || normalizedTitle.includes("performance")) {
    return <Zap className={className} />;
  }

  // UI / UX Design
  if (normalizedTitle.includes("ui") || normalizedTitle.includes("design") || normalizedTitle.includes("interface")) {
    return <Layout className={className} />;
  }

  // Default Fallback Icon
  return <Code className={className} />;
}
