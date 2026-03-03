/**
 * TiltHUD — a small floating debug widget that visualises tilt angles.
 *
 * Layout:
 *   - A 120×120 grid with crosshair axes at the centre.
 *   - A faint circle represents the CONE_DEG safe zone.
 *   - A cyan dot moves in real-time to reflect (tiltX, tiltY).
 *
 * The dot position is mapped linearly: ±90° → edge of the grid.
 */

import { StyleSheet, Text, View } from "react-native";

import { clamp } from "@/utils/privacy";

const GRID_SIZE = 120;
const GRID_HALF = GRID_SIZE / 2;
const DOT_SIZE = 12;

interface TiltHUDProps {
  tiltX: number;
  tiltY: number;
}

export function TiltHUD({ tiltX, tiltY }: TiltHUDProps) {
  // Map tilt angle (±90°) to pixel offset within the grid.
  const dotX = clamp((tiltX / 90) * GRID_HALF + GRID_HALF, 4, GRID_SIZE - 16);
  const dotY = clamp((tiltY / 90) * GRID_HALF + GRID_HALF, 4, GRID_SIZE - 16);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>TILT SENSOR</Text>

      <View style={styles.grid}>
        <View style={styles.axisH} />
        <View style={styles.axisV} />
        <View style={styles.coneCircle} />
        <View
          style={[
            styles.dot,
            { left: dotX - DOT_SIZE / 2, top: dotY - DOT_SIZE / 2 },
          ]}
        />
      </View>

      <Text style={styles.values}>
        X {tiltX.toFixed(1)}°{"  "}Y {tiltY.toFixed(1)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 32,
    right: 16,
    backgroundColor: "#0a0a0aee",
    borderWidth: 1,
    borderColor: "#1aff8c22",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 140,
  },
  label: {
    fontSize: 9,
    color: "#1aff8c",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    backgroundColor: "#0d0d0d",
    position: "relative",
    overflow: "hidden",
  },
  axisH: {
    position: "absolute",
    top: GRID_HALF - 0.5,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#222",
  },
  axisV: {
    position: "absolute",
    left: GRID_HALF - 0.5,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#222",
  },
  coneCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#00bfff33",
    top: 36,
    left: 36,
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: "#00bfff",
    shadowColor: "#00bfff",
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  values: {
    fontSize: 10,
    color: "#555",
    marginTop: 8,
  },
});
