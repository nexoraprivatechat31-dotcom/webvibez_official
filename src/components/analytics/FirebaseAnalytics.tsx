"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    const startAnalytics = () => {
      initAnalytics().catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Firebase Analytics could not be initialized:", err);
        }
      });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(startAnalytics, { timeout: 3500 });
      } else {
        setTimeout(startAnalytics, 2500);
      }
    }
  }, []);

  return null;
}
