"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { scrollPhysicsState, notifyPhysicsListeners } from "@/lib/scrollPhysicsState";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Reset scroll to top on route change
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset native scroll
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Reset Lenis scroll
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }

    // Reset physics state
    scrollPhysicsState.scrollProgress = 0;
    scrollPhysicsState.scrollY = 0;
    scrollPhysicsState.scrollVelocity = 0;
    notifyPhysicsListeners();
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion & mobile
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    scrollPhysicsState.isReducedMotion = reducedMotionQuery.matches;

    const checkDevice = () => {
      scrollPhysicsState.isMobile = window.innerWidth < 768;
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      scrollPhysicsState.isReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    // Global cursor listener
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      scrollPhysicsState.rawMouseX = e.clientX;
      scrollPhysicsState.rawMouseY = e.clientY;
      scrollPhysicsState.mouseX = normX;
      scrollPhysicsState.mouseY = normY;
      scrollPhysicsState.isMouseInside = true;
    };

    const handleMouseLeave = () => {
      scrollPhysicsState.isMouseInside = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      const scroll = e.scroll;
      const limit = e.limit || Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(Math.max(scroll / limit, 0), 1);
      const velocity = e.velocity || 0;

      scrollPhysicsState.scrollProgress = progress;
      scrollPhysicsState.scrollY = scroll;
      scrollPhysicsState.scrollVelocity = velocity;
      notifyPhysicsListeners();
    });

    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }

    reqId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", checkDevice);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
