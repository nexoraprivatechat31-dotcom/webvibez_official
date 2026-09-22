"use client";

import React, { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  createScreenCanvas,
  getAppIconAtUV,
  setOnMobileImageLoaded,
} from "./PhoneScreens";
import {
  scrollPhysicsState,
  subscribePhysicsState,
  openPhoneApp,
  returnToHomeScreen,
  notifyPhysicsListeners,
} from "@/lib/scrollPhysicsState";

// 8 Distinct 3D Showcase Rotation Perspectives for the 8 Product Modules
const SCREEN_ROTATIONS: [number, number, number][] = [
  [-0.05, 0.22, -0.02],  // 01 Student Dashboard
  [-0.08, -0.24, 0.03],  // 02 Attendance
  [0.02, 0.15, -0.01],   // 03 Tests (Front angled)
  [-0.14, 0.28, -0.06],  // 04 Results (Dynamic isometric)
  [-0.10, -0.18, 0.03],  // 05 Live Classes
  [-0.04, 0.16, -0.02],  // 06 Study Vault
  [-0.07, -0.22, 0.02],  // 07 Fees
  [-0.05, 0.20, -0.02],  // 08 Notifications
];

interface Pose {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

export interface PhoneModelProps {
  screenIndex?: number;
  brandVariant?: string;
  isInteractive?: boolean;
  mousePos?: { x: number; y: number };
  scale?: number;
  rotation?: [number, number, number] | number[];
  position?: [number, number, number] | number[];
  standalone?: boolean;
}

// Helper to create rounded rectangle shape
function createRoundedRectShape(w: number, h: number, r: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

// Helper to create precision border geometry (outer shape minus inner hole)
function createRoundedRectBorderGeometry(w: number, h: number, r: number, borderWidth: number) {
  const outer = createRoundedRectShape(w, h, r);
  const innerPath = new THREE.Path();
  const iw = w - borderWidth * 2;
  const ih = h - borderWidth * 2;
  const ir = Math.max(0.01, r - borderWidth);
  const ix = -iw / 2;
  const iy = -ih / 2;

  innerPath.moveTo(ix + ir, iy);
  innerPath.lineTo(ix + iw - ir, iy);
  innerPath.quadraticCurveTo(ix + iw, iy, ix + iw, iy + ir);
  innerPath.lineTo(ix + iw, iy + ih - ir);
  innerPath.quadraticCurveTo(ix + iw, iy + ih, ix + iw - ir, iy + ih);
  innerPath.lineTo(ix + ir, iy + ih);
  innerPath.quadraticCurveTo(ix, iy + ih, ix, iy + ih - ir);
  innerPath.lineTo(ix, iy + ir);
  innerPath.quadraticCurveTo(ix, iy, ix + ir, iy);

  outer.holes.push(innerPath);
  return new THREE.ShapeGeometry(outer, 36);
}

export default function PhoneModel({
  screenIndex,
  brandVariant,
  isInteractive,
  mousePos,
  scale,
  rotation,
  position,
  standalone = false,
}: PhoneModelProps = {}) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMeshRef = useRef<THREE.Mesh>(null);
  const glassSheenRef = useRef<THREE.Mesh>(null);
  const rimGlintRef = useRef<THREE.MeshStandardMaterial>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  const { camera } = useThree();

  // Screen transition & hover tracking
  const currentScreenRef = useRef(screenIndex ?? 0);
  const targetScreenRef = useRef(screenIndex ?? 0);
  const transitionTRef = useRef(1);
  const brandVariantRef = useRef(brandVariant ?? "webvibez-core");
  const prevHoveredIconRef = useRef<number | null>(null);
  const prevHoverHomeRef = useRef<boolean>(false);
  const userTappedTimeRef = useRef<number>(0);

  // Authentic iPhone 16 Pro Physical Dimensions
  const width = 2.78;
  const height = 5.86;
  const depth = 0.20;
  const radius = 0.44;

  // Ultra-thin 0.08 edge-to-edge Super Retina XDR OLED Display
  const screenWidth = 2.62;
  const screenHeight = 5.68;
  const screenRadius = 0.38;

  // Extruded rounded shape for titanium chassis
  const chassisShape = useMemo(
    () => createRoundedRectShape(width, height, radius),
    [width, height, radius]
  );

  const extrudeSettings = useMemo(
    () => ({
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.038,
      bevelThickness: 0.038,
    }),
    [depth]
  );

  // Precision Front Titanium Chamfer Border Highlight (Follows exact perimeter)
  const frontChamferBorderGeometry = useMemo(
    () => createRoundedRectBorderGeometry(width + 0.04, height + 0.04, radius + 0.02, 0.035),
    [width, height, radius]
  );

  // Precision Back Titanium Chamfer Border Highlight
  const backChamferBorderGeometry = useMemo(
    () => createRoundedRectBorderGeometry(width + 0.04, height + 0.04, radius + 0.02, 0.035),
    [width, height, radius]
  );

  // Precision OLED Display Hairline Bezel Outline
  const screenBezelBorderGeometry = useMemo(
    () => createRoundedRectBorderGeometry(screenWidth + 0.04, screenHeight + 0.04, screenRadius + 0.02, 0.025),
    [screenWidth, screenHeight, screenRadius]
  );

  // Rounded Display Surface Geometry with Normalized [0, 1] UV Coordinates
  const screenGeometry = useMemo(() => {
    const shape = createRoundedRectShape(screenWidth, screenHeight, screenRadius);
    const geom = new THREE.ShapeGeometry(shape, 32);

    const pos = geom.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    const minX = -screenWidth / 2;
    const maxX = screenWidth / 2;
    const minY = -screenHeight / 2;
    const maxY = screenHeight / 2;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      uvs[i * 2] = (x - minX) / (maxX - minX);
      uvs[i * 2 + 1] = (y - minY) / (maxY - minY);
    }

    geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geom;
  }, [screenWidth, screenHeight, screenRadius]);

  // Rounded Jet Black OLED Substrate Margin
  const bezelGeometry = useMemo(() => {
    const shape = createRoundedRectShape(2.68, 5.74, 0.40);
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  // Frosted Matte Back Glass Geometry
  const backGlassGeometry = useMemo(() => {
    const shape = createRoundedRectShape(width - 0.03, height - 0.03, radius - 0.02);
    return new THREE.ShapeGeometry(shape, 32);
  }, [width, height, radius]);

  // Rounded Glass Specular Sheen Geometry
  const glassGeometry = useMemo(() => {
    const shape = createRoundedRectShape(screenWidth, screenHeight, screenRadius);
    return new THREE.ShapeGeometry(shape, 32);
  }, [screenWidth, screenHeight, screenRadius]);

  // Raised Vertical Pill Camera Island Geometry (Authentic Apple iPhone 16 2024 design)
  const cameraPlateauGeometry = useMemo(() => {
    const shape = createRoundedRectShape(0.76, 1.54, 0.38);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.026,
      bevelThickness: 0.026,
    });
  }, []);

  // Precision Perimeter Chamfer Border around the Vertical Pill Camera Island
  const cameraPlateauBorderGeometry = useMemo(() => {
    return createRoundedRectBorderGeometry(0.80, 1.58, 0.40, 0.022);
  }, []);

  // Luminous volumetric backdrop aura texture
  const auraTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(256, 256, 15, 256, 256, 250);
    grad.addColorStop(0, "rgba(94, 202, 185, 0.85)"); // Vibrant iPhone 16 Teal
    grad.addColorStop(0.35, "rgba(0, 102, 255, 0.50)"); // Electric Azure
    grad.addColorStop(0.70, "rgba(139, 0, 255, 0.15)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Authentic mirror-polished Titanium Apple Logo Texture for rear glass
  const appleLogoTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Clear transparent background
    ctx.clearRect(0, 0, 512, 512);

    // Official Apple Logo SVG path normalized and centered
    ctx.save();
    ctx.translate(256, 256);
    ctx.scale(1.4, 1.4);
    ctx.translate(-125, -170);

    // Linear gradient for authentic iPhone 16 Teal Apple logo
    const grad = ctx.createLinearGradient(0, 40, 250, 320);
    grad.addColorStop(0, "#3E8B7E");
    grad.addColorStop(0.5, "#2D7166");
    grad.addColorStop(1, "#367D71");

    ctx.fillStyle = grad;

    // Official Apple Silhouette Path
    const applePath = new Path2D(
      "M155.8 81.3c7.2-8.7 12.1-20.8 10.7-33-10.4 0.4-23.1 7-30.5 15.6-6.6 7.6-12.4 20-10.8 31.8 11.6 0.9 23.5-5.8 30.6-14.4zm30.4 51.5c-17.7-1-32.8 10.1-41.2 10.1-8.5 0-21.2-9.6-35-9.4-18 0.3-34.6 10.5-43.8 26.6-18.8 32.5-4.8 80.6 13.4 107 8.9 13 19.6 27.4 33.6 26.9 13.5-0.5 18.7-8.7 35-8.7 16.4 0 21.1 8.7 35.3 8.4 14.5-0.3 23.8-13 32.7-25.9 10.3-15 14.5-29.5 14.8-30.3-0.3-0.1-28.5-10.9-28.8-43.5-0.2-27.3 22.3-40.4 23.3-41-12.8-18.8-32.7-20.9-39.3-21.6z"
    );
    ctx.fill(applePath);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Chassis material ref for dynamic brand color morphing
  const chassisMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const backGlassMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Redraw canvas texture helper
  const updateCanvasTexture = (
    fromIdx: number,
    toIdx: number,
    t: number,
    brand: string,
    pX: number,
    pY: number
  ) => {
    if (typeof window === "undefined" || !screenMeshRef.current) return;

    const hoveredIcon = scrollPhysicsState.hoveredIconIndex;
    const isHoverHome = scrollPhysicsState.isHoveringHomeBar;

    const canvas = createScreenCanvas(
      fromIdx,
      brand,
      toIdx,
      t,
      pX,
      pY,
      hoveredIcon,
      isHoverHome
    );

    if (!textureRef.current) {
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      textureRef.current = tex;

      const mat = screenMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.map = tex;
      mat.needsUpdate = true;
    } else {
      textureRef.current.image = canvas;
      textureRef.current.needsUpdate = true;
    }
  };

  // Initial render & image load hook
  useEffect(() => {
    setOnMobileImageLoaded(() => {
      updateCanvasTexture(
        currentScreenRef.current,
        targetScreenRef.current,
        1,
        brandVariantRef.current,
        0,
        0
      );
    });

    updateCanvasTexture(
      currentScreenRef.current,
      targetScreenRef.current,
      1,
      brandVariantRef.current,
      0,
      0
    );
  }, []);

  // Sync with scroll physics state changes
  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      const targetIdx = scrollPhysicsState.targetScreenIndex;
      const brand = scrollPhysicsState.brandVariant;

      let needsRedraw = false;

      if (targetIdx !== targetScreenRef.current) {
        currentScreenRef.current = targetScreenRef.current;
        targetScreenRef.current = targetIdx;
        transitionTRef.current = 0;
        needsRedraw = true;
      }

      if (brand !== brandVariantRef.current) {
        brandVariantRef.current = brand;
        needsRedraw = true;

        // Dynamic chassis tinting based on brand mode
        if (chassisMaterialRef.current && backGlassMaterialRef.current) {
          if (brand === "branded-institute") {
            chassisMaterialRef.current.color.set("#2D3748");
            backGlassMaterialRef.current.color.set("#064E3B");
          } else if (brand === "generic") {
            chassisMaterialRef.current.color.set("#475569");
            backGlassMaterialRef.current.color.set("#1E293B");
          } else {
            // iPhone 16 Teal Flagship
            chassisMaterialRef.current.color.set("#4A9E8F");
            backGlassMaterialRef.current.color.set("#7BC6B7");
          }
        }
      }

      if (needsRedraw && transitionTRef.current === 1) {
        updateCanvasTexture(
          currentScreenRef.current,
          targetScreenRef.current,
          1,
          brandVariantRef.current,
          0,
          0
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // Section Poses — True Cinematic Alternating Left <-> Right Pattern
  // Each section gets its own clearly defined bay.
  //
  // Scroll Progress Map (alternating RIGHT → LEFT → RIGHT → LEFT → RIGHT):
  //   0.00–0.16 → HERO:             RIGHT bay  (x = +3.2)
  //   0.16–0.23 → ARC 1:            RIGHT → LEFT  (short, 7%)
  //   0.23–0.37 → PROBLEM:          LEFT bay   (x = -3.2)
  //   0.37–0.44 → ARC 2:            LEFT → RIGHT  (short, 7%)
  //   0.44–0.58 → PRODUCT SHOWCASE: RIGHT bay  (x = +3.2) ← content LEFT, phone RIGHT
  //   0.58–0.65 → ARC 3:            RIGHT → LEFT  (short, 7%)
  //   0.65–0.80 → FEATURES:         LEFT bay   (x = -3.2)
  //   0.80–0.86 → ARC 4:            LEFT → RIGHT  (short, 6%)
  //   0.86–0.92 → BRAND + HIT:      RIGHT bay  (x = +3.2)
  //   0.92–1.00 → FADE OUT:         glides away
  const getSectionPose = (p: number, isMobile: boolean): Pose => {
    let x = 3.2;
    let y = -0.04;
    let z = 0.20;
    let rotX = -0.03;
    let rotY = -0.035;
    let rotZ = 0.00;
    let sc = scale ?? 0.88;

    if (p <= 0.01) {
      // 1. HERO (0.00 - 0.01) — RIGHT bay (+3.2), FRONT screen
      x = 3.2;
      y = -0.28;
      z = 0.22;
      rotX = -0.02;
      rotY = -0.04;
      rotZ = 0.00;
      sc = 0.94;

    } else if (p <= 0.04) {
      // 2. CRISP & FAST SWEEP: RIGHT → LEFT BAY FOR PROBLEM SECTION (0.01 - 0.04)
      // Phone sweeps smoothly, crisply, and immediately to the Left Bay as soon as scrolling starts!
      const t = (p - 0.01) / 0.03;
      const smoothT = t * t * (3 - 2 * t);
      const depthDip = Math.sin(t * Math.PI) * 0.35; // Crisp low dip for immediate, clean travel

      x = THREE.MathUtils.lerp(3.2, -3.2, smoothT);
      y = THREE.MathUtils.lerp(-0.28, -0.28, smoothT);
      z = THREE.MathUtils.lerp(0.22, 0.24, smoothT) - depthDip;
      rotX = THREE.MathUtils.lerp(-0.02, 0.00, smoothT);
      rotY = THREE.MathUtils.lerp(-0.04, 0.14, smoothT); // Angled towards right problem content
      rotZ = THREE.MathUtils.lerp(0.00, 0.00, smoothT);
      sc = THREE.MathUtils.lerp(0.94, 0.95, smoothT);

    } else if (p <= 0.14) {
      // 3. PROBLEM SECTION (0.04 - 0.14) — RESTING ON LEFT BAY (-3.2), FULL BIG SIZE
      // Stays locked in full big mode on Left bay right beside "01 / REALITY CHECK · THE FRAGMENTATION PROBLEM"
      x = -3.2;
      y = -0.28;
      z = 0.24;
      rotX = 0.00;
      rotY = 0.14; // Angled towards right-hand problem details
      rotZ = 0.00;
      sc = 0.95; // Full BIG size on Left bay

    } else if (p <= 0.17) {
      // 4A. EARLY NANO TRANSITION BEFORE PRODUCT SHOWCASE TEXT (0.14 - 0.17)
      // Phone shrinks to nano mode and glides to the RIGHT bay BEFORE the heading/module text arrives!
      const t = (p - 0.14) / 0.03;
      const smoothT = t * t * (3 - 2 * t);

      x = THREE.MathUtils.lerp(-3.15, 3.2, smoothT);
      y = THREE.MathUtils.lerp(-0.28, -0.16, smoothT);
      z = THREE.MathUtils.lerp(0.24, -2.4, smoothT);
      rotX = THREE.MathUtils.lerp(-0.02, 0.02, smoothT);
      rotY = THREE.MathUtils.lerp(0.14, -0.08, smoothT);
      rotZ = THREE.MathUtils.lerp(0.00, 0.01, smoothT);
      sc = THREE.MathUtils.lerp(0.95, 0.38, smoothT); // Shrinks to nano mode on the right

    } else if (p <= 0.20) {
      // 4B. DRAMATIC EXPANSION TO BIG AS PRODUCT SHOWCASE TEXT ARRIVES (0.17 - 0.20)
      // Right as "03 / PRODUCT · THE ENZOCHAT ECOSYSTEM" and "Module 01 · Live Engine" arrives,
      // the phone expands smoothly from nano mode into full BIG showcase size!
      const t = (p - 0.17) / 0.03;
      const smoothT = t * t * (3 - 2 * t);

      x = 3.2;
      y = THREE.MathUtils.lerp(-0.16, -0.28, smoothT);
      z = THREE.MathUtils.lerp(-2.4, 0.24, smoothT);
      rotX = THREE.MathUtils.lerp(0.02, 0.00, smoothT);
      rotY = THREE.MathUtils.lerp(-0.08, -0.15, smoothT); // Angled facing the left module details
      rotZ = THREE.MathUtils.lerp(0.01, 0.00, smoothT);
      sc = THREE.MathUtils.lerp(0.38, 0.95, smoothT); // Expands to BIG mode

    } else if (p <= 0.38) {
      // 5. PRODUCT SHOWCASE (0.20 - 0.38): Phone is BIG on the RIGHT bay (x = +3.2)
      // Stays locked in full big mode on the right bay beside the left module details
      x = 3.2;
      y = -0.28;
      z = 0.24;
      rotX = 0.00;
      rotY = -0.15; // Angled facing the left-hand module details
      rotZ = 0.00;
      sc = 0.95; // Full BIG mode on the Right bay

    } else if (p <= 0.43) {
      // 6. EARLY SHRINK BEFORE FEATURES BOX (0.38 - 0.43)
      // Phone starts shrinking to small mode WELL BEFORE the user reaches the Features box!
      const t = (p - 0.38) / 0.05;
      const smoothT = t * t * (3 - 2 * t);

      x = THREE.MathUtils.lerp(3.2, 3.10, smoothT);
      y = THREE.MathUtils.lerp(-0.28, 1.72, smoothT);
      z = THREE.MathUtils.lerp(0.24, -1.8, smoothT);
      rotX = THREE.MathUtils.lerp(0.00, 0.05, smoothT);
      rotY = THREE.MathUtils.lerp(-0.15, -0.10, smoothT);
      rotZ = THREE.MathUtils.lerp(0.00, 0.01, smoothT);
      sc = THREE.MathUtils.lerp(0.95, 0.40, smoothT); // Shrinks down to small mode early

    } else if (p <= 0.48) {
      // 7. FEATURES SECTION (11 CORE SYSTEMS) (0.43 - 0.48)
      // Phone is already small and seated above the card
      x = 3.10;
      y = 1.72 + Math.sin((p - 0.43) * 20) * 0.02;
      z = -1.8;
      rotX = 0.05;
      rotY = -0.10;
      rotZ = 0.01;
      sc = 0.40; // Small mode comfortably positioned above the card

    } else if (p <= 0.67) {
      // 8. SERVICES CONVEYOR, ARCHITECTURE & BRAND HEADER (0.48 - 0.67)
      // Phone stays cleanly in compact nano mode in deep background so it doesn't block "100% Whitelabel Identity" header or stage cards
      const t = (p - 0.48) / 0.19;
      const smoothExit = Math.min(1, t * 2.5);
      const sweepAngle = t * Math.PI * 2;
      const xVel = -Math.sin(sweepAngle);

      x = THREE.MathUtils.lerp(3.10, -3.3, t) + Math.sin(t * Math.PI) * 0.25;
      y = THREE.MathUtils.lerp(1.72, -0.18, smoothExit);
      z = THREE.MathUtils.lerp(-1.8, -4.5, smoothExit);
      rotX = THREE.MathUtils.lerp(0.05, 0.00, smoothExit);
      rotY = xVel * 0.18;
      rotZ = -xVel * 0.02;
      sc = THREE.MathUtils.lerp(0.40, 0.28, smoothExit); // Stays compact in background

    } else if (p <= 0.70) {
      // 9A. TIGHT ENTRY TO TRANSFORMATION IMPACT (0.67 - 0.70)
      // Right AFTER "100% Whitelabel Identity" and stage cards, as "Transformation Impact" arrives,
      // the phone swoops from background to Left Bay and smoothly expands to FULL BIG SIZE!
      const t = (p - 0.67) / 0.03;
      const smoothT = t * t * (3 - 2 * t);

      x = THREE.MathUtils.lerp(-3.3, -3.2, smoothT);
      y = THREE.MathUtils.lerp(-0.18, -0.28, smoothT);
      z = THREE.MathUtils.lerp(-4.5, 0.24, smoothT);
      rotX = THREE.MathUtils.lerp(0.00, -0.01, smoothT);
      rotY = THREE.MathUtils.lerp(0.00, 0.15, smoothT);
      rotZ = 0.00;
      sc = THREE.MathUtils.lerp(0.28, 0.95, smoothT); // Expands to full big mode right at Transformation Impact!

    } else if (p <= 0.83) {
      // 9B. TRANSFORMATION IMPACT & CUSTOMIZATION PILLARS (0.70 - 0.83) — FULL BIG MODE ON LEFT BAY!
      // Phone is in FULL BIG SHOWCASE SIZE on the LEFT side (x = -3.2) throughout "Transformation Impact / Empowering 2,400+ Future Rankers"
      x = -3.2;
      y = -0.28;
      z = 0.24;
      rotX = -0.01;
      rotY = 0.15; // Angled towards center-right brand details
      rotZ = 0.00;
      sc = 0.95; // FULL BIG SIZE on the Left side!

    } else if (p <= 0.85) {
      // 10. RAPID CLEAN CUT EXIT INTO HOW IT WORKS (0.83 - 0.85)
      // As user scrolls past Brand Customizer towards "07 / DEPLOYMENT · STREAMLINED ONBOARDING",
      // the phone cuts / vanishes completely away into the distance!
      const t = (p - 0.83) / 0.02;
      const smoothT = t * t * (3 - 2 * t);

      x = THREE.MathUtils.lerp(-3.2, 0.0, smoothT);
      y = THREE.MathUtils.lerp(-0.28, -2.5, smoothT);
      z = THREE.MathUtils.lerp(0.24, -25.0, smoothT);
      rotX = THREE.MathUtils.lerp(-0.01, 0.35, smoothT);
      rotY = THREE.MathUtils.lerp(0.15, 0.00, smoothT);
      rotZ = 0.00;
      sc = THREE.MathUtils.lerp(0.95, 0.0001, smoothT); // Cuts to 0 immediately!

    } else {
      // 11. HOW IT WORKS, PRICING, CTA & FOOTER (p > 0.85)
      // Completely hidden / vanished for zero obstruction in subsequent sections!
      x = 0.0;
      y = -10.0;
      z = -30.0;
      rotX = 0.0;
      rotY = 0.0;
      rotZ = 0.0;
      sc = 0.0001; // Completely cut away
    }

    if (isMobile) {
      x = 0;
      sc *= 0.78;
      z = Math.min(z, -0.2);
    }

    return { x, y, z, rotX, rotY, rotZ, scale: sc };
  };

  // Pointer Interaction Handlers for Raycasting on 3D Screen Surface
  const handlePointerMove = (e: any) => {
    if (standalone) return;
    e.stopPropagation();
    if (e.uv) {
      scrollPhysicsState.screenU = e.uv.x;
      scrollPhysicsState.screenV = e.uv.y;
      const hit = getAppIconAtUV(e.uv.x, e.uv.y);

      if (hit === "home") {
        scrollPhysicsState.isHoveringHomeBar = true;
        scrollPhysicsState.hoveredIconIndex = null;
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      } else if (typeof hit === "number") {
        scrollPhysicsState.hoveredIconIndex = hit;
        scrollPhysicsState.isHoveringHomeBar = false;
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      } else {
        scrollPhysicsState.hoveredIconIndex = null;
        scrollPhysicsState.isHoveringHomeBar = false;
        if (typeof document !== "undefined") document.body.style.cursor = "default";
      }
    }
  };

  const handlePointerLeave = (e: any) => {
    if (standalone) return;
    scrollPhysicsState.hoveredIconIndex = null;
    scrollPhysicsState.isHoveringHomeBar = false;
    scrollPhysicsState.screenU = null;
    scrollPhysicsState.screenV = null;
    if (typeof document !== "undefined") document.body.style.cursor = "default";
  };

  const handlePointerDown = (e: any) => {
    if (standalone) return;
    e.stopPropagation();
    // Intentionally disabled image switching on click as requested
  };

  // Main animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const isMobile = scrollPhysicsState.isMobile;
    const isReduced = scrollPhysicsState.isReducedMotion;
    const p = scrollPhysicsState.scrollProgress;

    // 1. Screen Space Proximity & Raycasting
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const screenPos = worldPos.clone().project(camera); // [-1, 1]

    let proximity = 0;
    let isOverScreen = false;
    let screenHoverX = 0;
    let screenHoverY = 0;

    const currentMouseX = mousePos ? mousePos.x : scrollPhysicsState.mouseX;
    const currentMouseY = mousePos ? mousePos.y : scrollPhysicsState.mouseY;
    const isInside = mousePos ? true : scrollPhysicsState.isMouseInside;

    if (!isMobile && isInside) {
      const dx = currentMouseX - screenPos.x;
      const dy = currentMouseY - screenPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      proximity = Math.max(0, Math.min(1, 1 - dist / 0.85));
      proximity = proximity * proximity;

      if (Math.abs(dx) < 0.24 && Math.abs(dy) < 0.44) {
        isOverScreen = true;
        screenHoverX = dx / 0.24;
        screenHoverY = dy / 0.44;
      }
    }

    scrollPhysicsState.phoneProximity = proximity;
    scrollPhysicsState.isOverScreen = isOverScreen;
    scrollPhysicsState.screenHoverX = screenHoverX;
    scrollPhysicsState.screenHoverY = screenHoverY;

    // 2. Base Section Pose
    const basePose = getSectionPose(scrollPhysicsState.scrollProgress, isMobile);

    // 3. Scroll Velocity Physical Tilt
    const velocity = scrollPhysicsState.scrollVelocity;
    const velocityTiltX = Math.max(-0.12, Math.min(0.12, velocity * 0.0025));

    // 4. Cursor Rotation Parallax
    let cursorRotX = 0;
    let cursorRotY = 0;
    let magneticPosX = 0;
    let magneticPosY = 0;

    if (!isMobile && isInside && isInteractive !== false) {
      const maxRotX = 0.12;
      const maxRotY = 0.20;

      cursorRotX = -currentMouseY * maxRotX * (1 + proximity * 0.3);
      cursorRotY = currentMouseX * maxRotY * (1 + proximity * 0.3);

      magneticPosX = currentMouseX * 0.15 * proximity;
      magneticPosY = currentMouseY * 0.12 * proximity;
    }

    // 5. Subtle Floating & Breathing
    const idleY = isReduced ? 0 : Math.sin(time * 0.9) * 0.028;
    const idleRotZ = isReduced ? 0 : Math.sin(time * 0.7) * 0.010;

    // 6. Smooth Damping to Final Transform
    const targetX = basePose.x + magneticPosX;
    const targetY = basePose.y + magneticPosY + idleY;
    const targetZ = basePose.z;

    const targetRotX = basePose.rotX + cursorRotX + velocityTiltX;
    const targetRotY = basePose.rotY + cursorRotY;
    const targetRotZ = basePose.rotZ + idleRotZ;

    const targetScale = basePose.scale * (1 + proximity * 0.02);

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4.2, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4.2, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4.2, delta);

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4.5, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4.5, delta);

    groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.2, delta);
    groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4.2, delta);
    groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4.2, delta);
    groupRef.current.visible = groupRef.current.scale.x > 0.005;

    // 7. Specular Sheen reacts to lighting & cursor
    if (glassSheenRef.current) {
      const sheenMat = glassSheenRef.current.material as THREE.MeshBasicMaterial | undefined;
      if (sheenMat && typeof sheenMat.opacity === "number") {
        const targetOpacity = isOverScreen ? 0.12 : 0.04 + proximity * 0.05;
        sheenMat.opacity = THREE.MathUtils.damp(sheenMat.opacity, targetOpacity, 4.0, delta);
      }

      glassSheenRef.current.position.x = THREE.MathUtils.damp(
        glassSheenRef.current.position.x,
        screenHoverX * 0.22,
        4.0,
        delta
      );
    }

    if (rimGlintRef.current && typeof rimGlintRef.current.roughness === "number") {
      const targetRoughness = 0.08 - proximity * 0.04;
      rimGlintRef.current.roughness = THREE.MathUtils.damp(rimGlintRef.current.roughness, targetRoughness, 3.5, delta);
    }

    // 8. Screen Transition & Hover Refresh
    const isHoverChanged =
      scrollPhysicsState.hoveredIconIndex !== prevHoveredIconRef.current ||
      scrollPhysicsState.isHoveringHomeBar !== prevHoverHomeRef.current;

    if (isHoverChanged) {
      prevHoveredIconRef.current = scrollPhysicsState.hoveredIconIndex;
      prevHoverHomeRef.current = scrollPhysicsState.isHoveringHomeBar;
      updateCanvasTexture(
        currentScreenRef.current,
        targetScreenRef.current,
        transitionTRef.current,
        brandVariantRef.current,
        screenHoverX,
        screenHoverY
      );
    }

    if (transitionTRef.current < 1) {
      transitionTRef.current = Math.min(1, transitionTRef.current + delta * 3.4);
      updateCanvasTexture(
        currentScreenRef.current,
        targetScreenRef.current,
        transitionTRef.current,
        brandVariantRef.current,
        screenHoverX,
        screenHoverY
      );
    }

    // 9. Cinematic Focus Depth Pan System — matches getSectionPose() 10-phase map
    //   0.00–0.16 → HERO:             RIGHT (sideX=+1)
    //   0.16–0.23 → ARC RIGHT→LEFT
    //   0.23–0.37 → PROBLEM:          LEFT  (sideX=-1)
    //   0.37–0.44 → ARC LEFT→RIGHT
    //   0.44–0.58 → PRODUCT:          RIGHT (sideX=+1)
    //   0.58–0.65 → ARC RIGHT→LEFT
    //   0.65–0.80 → FEATURES:         LEFT  (sideX=-1)
    //   0.80–0.86 → ARC LEFT→RIGHT
    //   0.86–0.92 → BRAND + HIT:      RIGHT (sideX=+1)
    //   0.92–1.00 → FADE OUT
    if (!standalone) {
      const easeInOut = (t: number) => t * t * (3 - 2 * t);

      let targetFocusIntensity = 1.0;
      let targetSideX = 1.0;

      if (p <= 0.02) {
        // RESTING: RIGHT bay (Hero)
        targetFocusIntensity = 1.0;
        targetSideX = 1.0;

      } else if (p <= 0.06) {
        // ARC: RIGHT → LEFT
        const t = (p - 0.02) / 0.04;
        targetFocusIntensity = 1.0 - Math.sin(t * Math.PI) * 0.72;
        targetSideX = THREE.MathUtils.lerp(1.0, -1.0, easeInOut(t));

      } else if (p <= 0.18) {
        // RESTING: LEFT bay (Problem)
        targetFocusIntensity = 1.0;
        targetSideX = -1.0;

      } else if (p <= 0.23) {
        // TRANSITION TO DEEP BACKGROUND
        const t = (p - 0.18) / 0.05;
        targetFocusIntensity = THREE.MathUtils.lerp(1.0, 0.0, easeInOut(t));
        targetSideX = THREE.MathUtils.lerp(-1.0, 1.0, easeInOut(t));

      } else {
        // CONTENT FOCUS (Showcase, Features, Services, Architecture, Brand, How It Works, CTA)
        targetFocusIntensity = 0.0;
        targetSideX = 1.0;
      }

      scrollPhysicsState.phoneFocusIntensity = THREE.MathUtils.damp(
        scrollPhysicsState.phoneFocusIntensity,
        targetFocusIntensity,
        5.5,
        delta
      );
      scrollPhysicsState.phoneSideX = THREE.MathUtils.damp(
        scrollPhysicsState.phoneSideX,
        targetSideX,
        5.5,
        delta
      );

      notifyPhysicsListeners();
    }
  });

  return (
    <group ref={groupRef}>
      {/* ============================================================== */}
      {/* 0. LUMINOUS BACKLIGHT AURA & DEDICATED HARDWARE LIGHTING        */}
      {/* ============================================================== */}
      {/* Radial Backlight Halo Plane traveling directly with the iPhone */}
      {auraTexture && (
        <mesh position={[0, 0, -depth / 2 - 0.60]}>
          <planeGeometry args={[5.8, 9.0]} />
          <meshBasicMaterial
            map={auraTexture}
            transparent
            opacity={0.48}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Intense Electric Blue & Violet Rim Highlight Point Lights */}
      <pointLight position={[0, 0, -0.40]} intensity={6.0} color="#0066FF" distance={6} />
      <pointLight position={[-1.5, 0.3, -0.2]} intensity={4.5} color="#8B00FF" distance={5.5} />
      
      {/* Dedicated Edge Highlighting Point Lights for Titanium Border Definition */}
      <pointLight position={[1.8, 1.4, 0.6]} intensity={4.2} color="#FFFFFF" distance={4.5} />
      <pointLight position={[-1.8, -1.4, 0.6]} intensity={3.8} color="#93C5FD" distance={4.5} />
      <pointLight position={[0, -3.2, 0.8]} intensity={3.0} color="#0066FF" distance={4} />

      {/* Soft, Diffused Lighting for Rear Camera & Frosted Glass (Zero Harsh Hotspots) */}
      <pointLight position={[0.8, 1.8, -2.0]} intensity={0.45} color="#A7F3D0" distance={4.0} />
      <pointLight position={[-1.2, 1.6, -1.8]} intensity={0.35} color="#E0F2FE" distance={3.5} />
      <pointLight position={[1.2, -1.5, -1.8]} intensity={0.25} color="#99F6E4" distance={3.5} />

      {/* ============================================================== */}
      {/* 1. GRADE 5 NATURAL TITANIUM FRAME CHASSIS                       */}
      {/* ============================================================== */}
      <mesh position={[0, 0, -depth / 2]} castShadow receiveShadow>
        <extrudeGeometry args={[chassisShape, extrudeSettings]} />
        <meshStandardMaterial
          ref={chassisMaterialRef}
          color="#4A9E8F" // Authentic Aerospace-Grade Teal Aluminum
          metalness={0.88}
          roughness={0.26}
          envMapIntensity={2.2}
        />
      </mesh>

      {/* Continuous Perimeter Chamfer Border (Front Outer Rim) */}
      <mesh position={[0, 0, depth / 2 + 0.038]}>
        <primitive object={frontChamferBorderGeometry} attach="geometry" />
        <meshStandardMaterial
          ref={rimGlintRef}
          color="#6EC7B8" // Anodized Teal Chamfer Rim
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={2.8}
        />
      </mesh>

      {/* Continuous Perimeter Chamfer Border (Back Outer Rim) */}
      <mesh position={[0, 0, -depth / 2 - 0.038]}>
        <primitive object={backChamferBorderGeometry} attach="geometry" />
        <meshStandardMaterial
          color="#5DB9AA"
          metalness={0.95}
          roughness={0.10}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Precision OLED Display Outer Border Bezel */}
      <mesh position={[0, 0, depth / 2 + 0.0395]}>
        <primitive object={screenBezelBorderGeometry} attach="geometry" />
        <meshStandardMaterial
          color="#1A1C22"
          metalness={0.90}
          roughness={0.15}
        />
      </mesh>

      {/* Antenna Isolation Bands in Deep Teal */}
      <mesh position={[-width / 2 - 0.038, 1.8, 0]}>
        <boxGeometry args={[0.015, 0.045, depth + 0.04]} />
        <meshBasicMaterial color="#377A6F" />
      </mesh>
      <mesh position={[-width / 2 - 0.038, -1.8, 0]}>
        <boxGeometry args={[0.015, 0.045, depth + 0.04]} />
        <meshBasicMaterial color="#377A6F" />
      </mesh>
      <mesh position={[width / 2 + 0.038, 1.8, 0]}>
        <boxGeometry args={[0.015, 0.045, depth + 0.04]} />
        <meshBasicMaterial color="#377A6F" />
      </mesh>
      <mesh position={[width / 2 + 0.038, -1.8, 0]}>
        <boxGeometry args={[0.015, 0.045, depth + 0.04]} />
        <meshBasicMaterial color="#377A6F" />
      </mesh>

      {/* ============================================================== */}
      {/* 2. REAR MATTE GLASS & TRIPLE-LENS SAPPHIRE CAMERA SYSTEM       */}
      {/* ============================================================== */}
      <group position={[0, 0, -depth / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
        {/* Frosted Matte Teal Color-Infused Back Glass */}
        <mesh position={[0, 0, 0]}>
          <primitive object={backGlassGeometry} attach="geometry" />
          <meshStandardMaterial
            ref={backGlassMaterialRef}
            color="#7BC6B7" // Official Apple iPhone 16 Teal
            roughness={0.46} // Satin frosted diffusion
            metalness={0.18}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Iconic Glossy Deep-Teal Apple Logo */}
        {appleLogoTexture && (
          <mesh position={[0, 0.25, 0.003]}>
            <planeGeometry args={[0.55, 0.55]} />
            <meshStandardMaterial
              map={appleLogoTexture}
              transparent
              roughness={0.10}
              metalness={0.45}
              envMapIntensity={2.2}
            />
          </mesh>
        )}

        {/* ============================================================== */}
        {/* IPHONE 16 VERTICAL DUAL-CAMERA SYSTEM (Main 48MP + Ultra-Wide) */}
        {/* ============================================================== */}
        <group position={[0.76, 1.84, 0]}>
          {/* Raised Beveled Sapphire Glass Vertical Pill Plateau */}
          <mesh castShadow receiveShadow>
            <primitive object={cameraPlateauGeometry} attach="geometry" />
            <meshStandardMaterial
              color="#5DB4A6" // Matching Glossy Saturated Teal
              metalness={0.65}
              roughness={0.18}
              envMapIntensity={2.2}
            />
          </mesh>

          {/* Precision Perimeter Chamfer Rim around Pill Base */}
          <mesh position={[0, 0, 0.066]}>
            <primitive object={cameraPlateauBorderGeometry} attach="geometry" />
            <meshStandardMaterial color="#3A8275" metalness={0.92} roughness={0.15} />
          </mesh>

          {/* 1. Main 48MP Fusion Camera (Top Lens in Vertical Pill) */}
          <group position={[0, 0.38, 0.066]}>
            {/* Outer Stepped Dark Teal Aerospace Aluminum Bezel Ring */}
            <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.265, 0.09, 48]} />
              <meshStandardMaterial color="#2B675E" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Precision Chamfer Lip on Ring */}
            <mesh position={[0, 0, 0.091]}>
              <ringGeometry args={[0.22, 0.26, 48]} />
              <meshStandardMaterial color="#68C0B2" metalness={0.96} roughness={0.08} />
            </mesh>
            {/* Inner Dark Optical Barrel */}
            <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.21, 0.21, 0.03, 48]} />
              <meshStandardMaterial color="#020807" metalness={0.92} roughness={0.2} />
            </mesh>
            {/* Convex Sapphire Lens with Anti-Reflective Emerald/Cyan Nano-Coating */}
            <mesh position={[0, 0, 0.088]}>
              <circleGeometry args={[0.18, 36]} />
              <meshStandardMaterial
                color="#064E3B"
                metalness={0.96}
                roughness={0.03}
              />
            </mesh>
            {/* Deep Optical Sensor Pupil */}
            <mesh position={[0, 0, 0.089]}>
              <circleGeometry args={[0.09, 32]} />
              <meshBasicMaterial color="#010403" />
            </mesh>
            {/* Specular Glint Reflection */}
            <mesh position={[0.04, 0.04, 0.091]}>
              <circleGeometry args={[0.035, 20]} />
              <meshBasicMaterial color="#74EBD5" />
            </mesh>
          </group>

          {/* 2. 12MP Ultra-Wide Camera (Bottom Lens in Vertical Pill) */}
          <group position={[0, -0.38, 0.066]}>
            {/* Outer Stepped Dark Teal Aerospace Aluminum Bezel Ring */}
            <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.265, 0.09, 48]} />
              <meshStandardMaterial color="#2B675E" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Precision Chamfer Lip on Ring */}
            <mesh position={[0, 0, 0.091]}>
              <ringGeometry args={[0.22, 0.26, 48]} />
              <meshStandardMaterial color="#68C0B2" metalness={0.96} roughness={0.08} />
            </mesh>
            {/* Sapphire Lens Element with Deep Teal AR Coating */}
            <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.21, 0.21, 0.03, 48]} />
              <meshStandardMaterial color="#0F766E" metalness={0.96} roughness={0.03} />
            </mesh>
            <mesh position={[0, 0, 0.088]}>
              <circleGeometry args={[0.17, 36]} />
              <meshStandardMaterial color="#115E59" metalness={0.96} roughness={0.04} />
            </mesh>
            <mesh position={[0, 0, 0.089]}>
              <circleGeometry args={[0.085, 32]} />
              <meshBasicMaterial color="#010403" />
            </mesh>
            <mesh position={[0.04, 0.04, 0.091]}>
              <circleGeometry args={[0.035, 20]} />
              <meshBasicMaterial color="#5EEAD4" />
            </mesh>
          </group>

          {/* Rear Acoustic Microphone Hole (Between Lenses) */}
          <mesh position={[0.22, 0.0, 0.068]}>
            <circleGeometry args={[0.024, 20]} />
            <meshBasicMaterial color="#0A221E" />
          </mesh>
        </group>

        {/* 3. True Tone Quad-LED Flash (On Back Glass to the right of the vertical pill island) */}
        <group position={[0.28, 1.84, 0.003]}>
          <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.10, 0.10, 0.03, 32]} />
            <meshStandardMaterial color="#FDF6B2" roughness={0.3} metalness={0.15} />
          </mesh>
          <mesh position={[0, 0, 0.031]}>
            <ringGeometry args={[0.06, 0.095, 24]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
          <mesh position={[0, 0, 0.032]}>
            <circleGeometry args={[0.05, 20]} />
            <meshBasicMaterial color="#FFFBEB" />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. HARDWARE BUTTONS & CONTROLS (ACTION, VOLUME, POWER, SENSOR) */}
      {/* ============================================================== */}
      {/* Left: Action Button (Tactile orange ring & titanium pill) */}
      {/* Left: Action Button (Tactile orange ring & Teal aluminum pill) */}
      <group position={[-width / 2 - 0.048, 1.42, 0]}>
        <mesh>
          <boxGeometry args={[0.040, 0.28, 0.08]} />
          <meshStandardMaterial color="#4A9E8F" metalness={0.92} roughness={0.20} />
        </mesh>
        {/* Action Ring Highlight */}
        <mesh position={[-0.021, 0, 0]}>
          <boxGeometry args={[0.004, 0.22, 0.06]} />
          <meshBasicMaterial color="#34D399" />
        </mesh>
      </group>

      {/* Left: Volume Up Button */}
      <mesh position={[-width / 2 - 0.048, 0.88, 0]}>
        <boxGeometry args={[0.040, 0.46, 0.08]} />
        <meshStandardMaterial color="#4A9E8F" metalness={0.92} roughness={0.20} />
      </mesh>

      {/* Left: Volume Down Button */}
      <mesh position={[-width / 2 - 0.048, 0.34, 0]}>
        <boxGeometry args={[0.040, 0.46, 0.08]} />
        <meshStandardMaterial color="#4A9E8F" metalness={0.92} roughness={0.20} />
      </mesh>

      {/* Right: Side Power / Lock Key */}
      <mesh position={[width / 2 + 0.048, 0.95, 0]}>
        <boxGeometry args={[0.040, 0.68, 0.08]} />
        <meshStandardMaterial color="#4A9E8F" metalness={0.92} roughness={0.20} />
      </mesh>

      {/* Right: iPhone 16 Flush Capacitive Camera Control Sensor */}
      <group position={[width / 2 + 0.038, -0.72, 0]}>
        {/* Metallic Beveled Sensor Well in Teal */}
        <mesh>
          <boxGeometry args={[0.025, 0.50, 0.075]} />
          <meshStandardMaterial color="#5EB5A7" metalness={0.94} roughness={0.12} />
        </mesh>
        {/* Sapphire Touch Surface in Deep Teal */}
        <mesh position={[0.012, 0, 0]}>
          <boxGeometry args={[0.005, 0.44, 0.055]} />
          <meshStandardMaterial color="#115E59" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Bottom: USB-C Port with Metallic Teal Chamfer Bezel */}
      <group position={[0, -height / 2 - 0.026, 0]}>
        <mesh>
          <boxGeometry args={[0.36, 0.032, 0.075]} />
          <meshStandardMaterial color="#377A6F" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, -0.002, 0]}>
          <boxGeometry args={[0.30, 0.028, 0.055]} />
          <meshBasicMaterial color="#020408" />
        </mesh>
        {/* Center USB-C Connector Pin */}
        <mesh position={[0, -0.002, 0]}>
          <boxGeometry args={[0.16, 0.008, 0.012]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* Speaker Grille Right (CNC Drilled Holes) */}
      <mesh position={[0.45, -height / 2 - 0.026, 0]}>
        <boxGeometry args={[0.28, 0.024, 0.05]} />
        <meshBasicMaterial color="#0B0F17" />
      </mesh>

      {/* Microphone Grille Left */}
      <mesh position={[-0.45, -height / 2 - 0.026, 0]}>
        <boxGeometry args={[0.20, 0.024, 0.05]} />
        <meshBasicMaterial color="#0B0F17" />
      </mesh>

      {/* ============================================================== */}
      {/* 4. FRONT DISPLAY & CERAMIC SHIELD GLASS                        */}
      {/* ============================================================== */}
      {/* Jet Black OLED Bezel Substrate Margin */}
      <mesh position={[0, 0, depth / 2 + 0.039]}>
        <primitive object={bezelGeometry} attach="geometry" />
        <meshBasicMaterial color="#020305" />
      </mesh>

      {/* Ear Speaker Micro-Grille (Micro-slit on top titanium border) */}
      <mesh position={[0, 2.78, depth / 2 + 0.040]}>
        <boxGeometry args={[0.46, 0.018, 0.008]} />
        <meshBasicMaterial color="#020408" />
      </mesh>

      {/* Super Retina XDR Display Surface with Interactive Canvas Texture */}
      <mesh
        ref={screenMeshRef}
        position={[0, 0, depth / 2 + 0.041]}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClick={handlePointerDown}
      >
        <primitive object={screenGeometry} attach="geometry" />
        <meshStandardMaterial
          roughness={0.10}
          metalness={0.04}
        />
      </mesh>

      {/* Physical Ceramic Shield Specular Sheen (Curved glass reflection) */}
      <mesh ref={glassSheenRef} position={[0, 0, depth / 2 + 0.044]}>
        <primitive object={glassGeometry} attach="geometry" />
        <meshBasicMaterial
          color="#93C5FD"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 5. DYNAMIC ISLAND (AUTHENTIC HORIZONTAL PROPORTIONS & SENSORS) */}
      {/* ============================================================== */}
      <group position={[0, 2.50, depth / 2 + 0.046]}>
        {/* Dynamic Island Pill Shell (Horizontal Capsule) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.058, 0.32, 8, 24]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Front FaceTime Camera Lens (Right side of pill) */}
        <mesh position={[0.10, 0, 0.003]}>
          <circleGeometry args={[0.026, 20]} />
          <meshStandardMaterial color="#0369A1" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0.108, 0.006, 0.004]}>
          <circleGeometry args={[0.010, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        {/* TrueDepth FaceID Illuminator / Dot Projector (Left side of pill) */}
        <mesh position={[-0.09, 0, 0.003]}>
          <circleGeometry args={[0.020, 20]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
        {/* Active Live Indicator Dot (Tiny green indicator) */}
        <mesh position={[0.01, 0, 0.003]}>
          <circleGeometry args={[0.007, 12]} />
          <meshBasicMaterial color="#22C55E" />
        </mesh>
      </group>
    </group>
  );
}
