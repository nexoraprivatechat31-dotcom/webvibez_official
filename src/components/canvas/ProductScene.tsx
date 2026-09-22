"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StudioLighting from "./StudioLighting";
import FloatingAtmosphere from "./FloatingAtmosphere";
import PhoneModel from "./PhoneModel";

interface ProductSceneProps {
  screenIndex: number;
  rotation?: [number, number, number];
  scale?: number;
}

export default function ProductScene({
  screenIndex,
  rotation = [-0.05, 0.25, -0.02],
  scale = 1.05,
}: ProductSceneProps) {
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
            screenIndex={screenIndex}
            brandVariant="webvibez-core"
            mousePos={mousePos}
            isInteractive={true}
            scale={isMobile ? scale * 0.85 : scale}
            position={[0, 0, 0]}
            rotation={rotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
