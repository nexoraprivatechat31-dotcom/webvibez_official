"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import StudioLighting from "./StudioLighting";
import FloatingAtmosphere from "./FloatingAtmosphere";
import PhoneModel from "./PhoneModel";

export default function UnifiedPhoneCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setEventSource(document.body);
    }
    // Delay rendering the 3D scene to prioritize initial page load (fixes Lighthouse TBT)
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        eventSource={eventSource}
        eventPrefix="client"
        camera={{ position: [0, 0, 8.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true, stencil: false, depth: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <FloatingAtmosphere count={45} />
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
