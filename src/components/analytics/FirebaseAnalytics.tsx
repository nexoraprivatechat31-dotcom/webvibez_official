"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics().catch((err) => {
      // Analytics initialization silent catch
      if (process.env.NODE_ENV === "development") {
        console.warn("Firebase Analytics could not be initialized:", err);
      }
    });
  }, []);

  return null;
}
