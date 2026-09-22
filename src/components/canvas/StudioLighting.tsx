"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollPhysicsState } from "@/lib/scrollPhysicsState";

export default function StudioLighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightLeftRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRightRef = useRef<THREE.DirectionalLight>(null);
  const bounceLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state, delta) => {
    const proximity = scrollPhysicsState.phoneProximity;
    const p = scrollPhysicsState.scrollProgress;
    const time = state.clock.getElapsedTime();

    // Breathing light drift
    const drift = Math.sin(time * 0.5) * 0.04;

    // Section contextual light targets — new Azure/Iris/Apricot/Mint palette
    let baseAmbient = 0.60;
    let baseKey = 1.75;
    let keyColor = new THREE.Color("#ffffff");
    let rimLeftColor = new THREE.Color("#0066FF");
    let bounceColor = new THREE.Color("#8B00FF");

    if (p <= 0.15) {
      // HERO: Electric Blue + Violet studio — clean, premium brand aesthetic
      baseAmbient = 0.62;
      baseKey = 1.80;
      keyColor.set("#f8fafc");
      rimLeftColor.set("#0066FF"); // Electric Blue
      bounceColor.set("#8B00FF"); // Electric Violet
    } else if (p <= 0.30) {
      // PROBLEM: Restrained warm — subtle Apricot edge creates tension
      baseAmbient = 0.48;
      baseKey = 1.35;
      keyColor.set("#e2e8f0");
      rimLeftColor.set("#FF9A6B"); // Apricot — warm tension
      bounceColor.set("#4A5568"); // Neutral graphite
    } else if (p <= 0.55) {
      // PRODUCT SHOWCASE: High contrast — Electric Violet + Blue premium product studio
      baseAmbient = 0.68;
      baseKey = 2.10;
      keyColor.set("#ffffff");
      rimLeftColor.set("#8B00FF"); // Violet
      bounceColor.set("#0066FF"); // Blue
    } else if (p <= 0.72) {
      // FEATURES: Architectural — Mint + Azure technical environment
      baseAmbient = 0.60;
      baseKey = 1.75;
      keyColor.set("#f8fafc");
      rimLeftColor.set("#72D7B0"); // Mint
      bounceColor.set("#5B8CFF"); // Azure
    } else if (p <= 0.88) {
      // BRAND: Warm, aspirational — Apricot + Iris brand glow
      baseAmbient = 0.65;
      baseKey = 1.85;
      keyColor.set("#ffffff");
      if (scrollPhysicsState.brandVariant === "branded-institute") {
        rimLeftColor.set("#72D7B0"); // Mint — success state
        bounceColor.set("#FF9A6B"); // Apricot — warmth
      } else if (scrollPhysicsState.brandVariant === "generic") {
        rimLeftColor.set("#A9B0BA"); // Muted neutral
        bounceColor.set("#4A5568");
      } else {
        rimLeftColor.set("#8B7CFF"); // Iris — WebVibez brand
        bounceColor.set("#5B8CFF"); // Azure
      }
    } else {
      // CTA FINALE: Atmospheric Azure — cinematic, expansive
      baseAmbient = 0.55;
      baseKey = 1.65;
      keyColor.set("#dbeafe");
      rimLeftColor.set("#5B8CFF"); // Azure
      bounceColor.set("#8B7CFF"); // Iris
    }

    if (ambientRef.current) {
      const targetAmbient = baseAmbient + proximity * 0.15 + drift * 0.02;
      ambientRef.current.intensity = THREE.MathUtils.damp(
        ambientRef.current.intensity,
        targetAmbient,
        3.5,
        delta
      );
    }

    if (keyLightRef.current) {
      const targetKey = baseKey * 1.35 + proximity * 0.50;
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        targetKey,
        3.5,
        delta
      );
      keyLightRef.current.color.lerp(keyColor, delta * 2.5);
    }

    if (rimLightLeftRef.current) {
      const targetRim = 3.40 + proximity * 0.80;
      rimLightLeftRef.current.intensity = THREE.MathUtils.damp(
        rimLightLeftRef.current.intensity,
        targetRim,
        3.5,
        delta
      );
      rimLightLeftRef.current.color.lerp(rimLeftColor, delta * 2.5);
    }

    if (rimLightRightRef.current) {
      const targetRimR = 2.60 + proximity * 0.50;
      rimLightRightRef.current.intensity = THREE.MathUtils.damp(
        rimLightRightRef.current.intensity,
        targetRimR,
        3.5,
        delta
      );
    }

    if (bounceLightRef.current) {
      const targetBounce = 1.35 + proximity * 0.40;
      bounceLightRef.current.intensity = THREE.MathUtils.damp(
        bounceLightRef.current.intensity,
        targetBounce,
        3.5,
        delta
      );
      bounceLightRef.current.color.lerp(bounceColor, delta * 2.5);
    }
  });

  return (
    <>
      {/* Soft Ambient Foundation */}
      <ambientLight ref={ambientRef} intensity={0.90} color="#e2e8f0" />

      {/* Key Light — diffused top right */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 4]}
        intensity={1.15}
        color="#ffffff"
      />

      {/* Cool Fill (top left) */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, 4, 3]}
        intensity={0.60}
        color="#cbd5e1"
      />

      {/* Azure Rim Light — subtle accent edge */}
      <directionalLight
        ref={rimLightLeftRef}
        position={[-5, 2, -3]}
        intensity={1.40}
        color="#5B8CFF"
      />

      {/* Iris Accent Rim — right edge */}
      <directionalLight
        ref={rimLightRightRef}
        position={[5, -2, -3]}
        intensity={1.10}
        color="#8B7CFF"
      />

      {/* Under-Glow Bounce — soft ambient fill */}
      <pointLight
        ref={bounceLightRef}
        position={[0, -3, 2]}
        intensity={0.45}
        color="#64748b"
        distance={10}
      />
    </>
  );
}
