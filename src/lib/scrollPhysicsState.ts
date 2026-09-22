"use client";

export interface AppIconBounds {
  id: string;
  name: string;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScrollPhysicsState {
  // Global normalized scroll (0 to 1)
  scrollProgress: number;
  scrollY: number;
  scrollVelocity: number; // signed velocity

  // Global mouse coordinates (normalized -1 to 1)
  mouseX: number;
  mouseY: number;
  rawMouseX: number;
  rawMouseY: number;
  isMouseInside: boolean;

  // Proximity to 3D phone (0 to 1)
  phoneProximity: number;
  isOverScreen: boolean;
  screenHoverX: number; // -1 to 1 across the screen width
  screenHoverY: number; // -1 to 1 across the screen height
  screenU: number | null; // 0 to 1 UV
  screenV: number | null; // 0 to 1 UV

  // App & Home Screen State
  activeScreenIndex: number; // 0 = Home Screen, 1-8 = Dedicated Apps
  targetScreenIndex: number;
  screenTransitionT: number; // 0 to 1 during transition
  hoveredIconIndex: number | null; // 0 to 7 on Home Screen
  isHoveringHomeBar: boolean;

  // Brand variant
  brandVariant: string; // "generic" | "webvibez-core" | "branded-institute"

  // Environment & accessibility
  isReducedMotion: boolean;
  isMobile: boolean;

  // Focus Depth Pan System
  // phoneFocusIntensity: 0.0 = phone in background arc (unfocused), 1.0 = phone settled on bay (fully focal)
  phoneFocusIntensity: number;
  // phoneSideX: -1.0 = phone on left bay, +1.0 = phone on right bay, 0 = crossing center arc
  phoneSideX: number;
}

export const scrollPhysicsState: ScrollPhysicsState = {
  scrollProgress: 0,
  scrollY: 0,
  scrollVelocity: 0,

  mouseX: 0,
  mouseY: 0,
  rawMouseX: 0,
  rawMouseY: 0,
  isMouseInside: false,

  phoneProximity: 0,
  isOverScreen: false,
  screenHoverX: 0,
  screenHoverY: 0,
  screenU: null,
  screenV: null,

  activeScreenIndex: 0, // Opens to Home Screen by default
  targetScreenIndex: 0,
  screenTransitionT: 1,
  hoveredIconIndex: null,
  isHoveringHomeBar: false,

  brandVariant: "webvibez-core",

  isReducedMotion: false,
  isMobile: false,

  phoneFocusIntensity: 1.0,
  phoneSideX: 1.0,
};

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribePhysicsState(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let isNotifying = false;
export function notifyPhysicsListeners() {
  if (isNotifying) return;
  isNotifying = true;
  try {
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error("Physics listener error:", err);
      }
    });
  } finally {
    isNotifying = false;
  }
}

export function openPhoneApp(appIndex: number) {
  scrollPhysicsState.activeScreenIndex = appIndex % 6;
  scrollPhysicsState.targetScreenIndex = appIndex % 6;
  notifyPhysicsListeners();
}

export function returnToHomeScreen() {
  scrollPhysicsState.activeScreenIndex = 0;
  scrollPhysicsState.targetScreenIndex = 0;
  notifyPhysicsListeners();
}

export function setActiveScreenModule(targetIndex: number) {
  const moduleScreenMap = [2, 1, 5, 0, 3, 4, 2, 1];
  const screenIdx = moduleScreenMap[targetIndex % moduleScreenMap.length] ?? 2;
  scrollPhysicsState.activeScreenIndex = screenIdx;
  scrollPhysicsState.targetScreenIndex = screenIdx;
  notifyPhysicsListeners();
}

export function setBrandThemeVariant(variant: string) {
  if (scrollPhysicsState.brandVariant === variant) return;
  scrollPhysicsState.brandVariant = variant;
  notifyPhysicsListeners();
}

// Map feature list index (0-10) to the best matching 3D app screen (1-8)
export function selectFeatureApp(featureIndex: number) {
  const featureScreenMap = [3, 1, 2, 0, 4, 5, 2, 3, 1, 4, 0];
  const screenIdx = featureScreenMap[featureIndex % featureScreenMap.length] ?? 3;
  scrollPhysicsState.activeScreenIndex = screenIdx;
  scrollPhysicsState.targetScreenIndex = screenIdx;
  notifyPhysicsListeners();
}
