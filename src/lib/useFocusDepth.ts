"use client";

import { useState, useEffect, CSSProperties } from "react";
import { scrollPhysicsState, subscribePhysicsState } from "./scrollPhysicsState";

export interface FocusDepthState {
  phoneFocusIntensity: number; // 0 = unfocused (in arc), 1 = settled on bay
  phoneSideX: number;          // -1 = phone left, +1 = phone right
}

/**
 * React hook that subscribes to the cinematic focus-depth state.
 * Returns the current focus intensity and phone side position.
 */
export function useFocusDepth(): FocusDepthState {
  const [state, setState] = useState<FocusDepthState>({
    phoneFocusIntensity: scrollPhysicsState.phoneFocusIntensity,
    phoneSideX: scrollPhysicsState.phoneSideX,
  });

  useEffect(() => {
    const unsubscribe = subscribePhysicsState(() => {
      setState({
        phoneFocusIntensity: scrollPhysicsState.phoneFocusIntensity,
        phoneSideX: scrollPhysicsState.phoneSideX,
      });
    });
    return () => unsubscribe();
  }, []);

  return state;
}

/**
 * Get CSS style objects for two-column layout focus-depth effect.
 *
 * @param phoneFocusIntensity  Current phone focus intensity (0–1)
 * @param phoneSideX           Current phone side (-1=left, +1=right)
 * @param phoneSide            Which side the phone bay is on: 'left' | 'right'
 *
 * Returns { phoneStyles, textStyles }:
 * - phoneStyles: for the column/placeholder that represents the phone bay
 * - textStyles: for the column that has the text/card content
 */
export function getFocusDepthStyles(
  phoneFocusIntensity: number,
  phoneSideX: number,
  phoneSide: "left" | "right"
): { phoneStyles: CSSProperties; textStyles: CSSProperties } {
  // Text and UI must ALWAYS remain 100% sharp, fully opaque, and crisp!
  const textStyles: CSSProperties = {
    opacity: 1.0,
    filter: "none",
    transform: "none",
  };

  const phoneStyles: CSSProperties = {
    opacity: 1.0,
    filter: "none",
    transform: "none",
  };

  return { phoneStyles, textStyles };
}
