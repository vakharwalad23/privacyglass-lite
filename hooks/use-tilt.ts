/**
 * useTilt — reads the device accelerometer and returns smoothed
 * X / Y tilt angles in degrees.
 *
 * How it works:
 *   1. expo-sensors Accelerometer gives normalised gravity values (±1g).
 *   2. We convert each axis to an angle via arcsin (value → degrees).
 *   3. A simple exponential moving-average (EMA) smooths out noise.
 *   4. State updates at 50 ms intervals (~20 fps) for UI reactivity.
 */

import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

import { clamp, SMOOTHING } from "@/utils/privacy";

const UPDATE_INTERVAL_MS = 50;

export function useTilt() {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  // Smoothed accumulators kept in refs to avoid re-render dependencies.
  const smoothX = useRef(0);
  const smoothY = useRef(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    const subscription = Accelerometer.addListener(({ x, y }) => {
      // Convert linear acceleration to degrees of tilt.
      // asin(g) gives the angle from vertical; negate Y so tilting
      // the phone "forward" (top away from you) yields a positive angle.
      const rawX = Math.asin(clamp(x, -1, 1)) * (180 / Math.PI);
      const rawY = Math.asin(clamp(-y, -1, 1)) * (180 / Math.PI);

      // Exponential moving-average for jitter reduction.
      smoothX.current += (rawX - smoothX.current) * SMOOTHING;
      smoothY.current += (rawY - smoothY.current) * SMOOTHING;

      setTiltX(smoothX.current);
      setTiltY(smoothY.current);
    });

    return () => subscription.remove();
  }, []);

  return { tiltX, tiltY };
}
