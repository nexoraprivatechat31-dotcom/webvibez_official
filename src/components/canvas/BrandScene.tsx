"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StudioLighting from "./StudioLighting";
import FloatingAtmosphere from "./FloatingAtmosphere";
import PhoneModel from "./PhoneModel";

interface BrandSceneProps {
  brandVariant: string;
}

export default function BrandScene({ brandVariant }: BrandSceneProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 9.5 : 8.0], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <FloatingAtmosphere count={60} />
          <PhoneModel
            screenIndex={0}
            brandVariant={brandVariant}
            mousePos={mousePos}
            isInteractive={true}
            scale={isMobile ? 0.9 : 1.06}
            position={[0, 0, 0]}
            rotation={[-0.08, -0.22, 0.03]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
