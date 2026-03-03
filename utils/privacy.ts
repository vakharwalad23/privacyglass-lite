/**
 * Privacy Glass — core math utilities.
 *
 * The "cone" model treats the phone screen like a flashlight:
 *   - Within ±CONE_DEG degrees of upright → fully visible (opacity 0).
 *   - Beyond that angle → a black overlay fades in proportionally,
 *     reaching MAX_OPACITY at ~55° off-axis.
 *
 * SMOOTHING is applied to raw accelerometer values so the overlay
 * doesn't jitter on small hand tremors.
 */

/** Half-angle of the visible cone in degrees. */
export const CONE_DEG = 30;

/** Low-pass filter factor — smaller = smoother but laggier. */
export const SMOOTHING = 0.12;

/** Darkest the overlay can get (0–1). */
export const MAX_OPACITY = 0.97;

/** Clamp a number between min and max. */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Convert a tilt angle to an overlay opacity.
 *
 * Returns 0 while tilt stays inside the cone, then ramps linearly
 * from 0 → MAX_OPACITY over the next 25° past the cone edge.
 */
export const coneOpacity = (tilt: number, cone: number): number => {
  const absTilt = Math.abs(tilt);
  if (absTilt <= cone) return 0;
  return clamp((absTilt - cone) / 25, 0, 1) * MAX_OPACITY;
};
