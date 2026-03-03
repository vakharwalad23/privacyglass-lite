/**
 * PrivacyHeader — shared top bar used across all screens.
 *
 * Renders:
 *   - App title + dynamic device subtitle
 *   - HUD toggle (show/hide tilt sensor widget)
 *   - Privacy toggle (enable/disable the overlay)
 *   - Status pill showing current privacy state and cone angle
 */

import * as Device from "expo-device";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

import { CONE_DEG } from "@/utils/privacy";

interface PrivacyHeaderProps {
  privacyOn: boolean;
  showHUD: boolean;
  onPrivacyChange: (value: boolean) => void;
  onHUDChange: (value: boolean) => void;
}

export function PrivacyHeader({
  privacyOn,
  showHUD,
  onPrivacyChange,
  onHUDChange,
}: PrivacyHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Privacy Glass</Text>
          <View style={styles.controls}>
            <Text style={styles.controlLabel}>HUD</Text>
            <Switch
              value={showHUD}
              onValueChange={onHUDChange}
              trackColor={{ true: "#1aff8c33", false: "#333" }}
              thumbColor={showHUD ? "#1aff8c" : "#666"}
            />
            <Text style={[styles.controlLabel, { marginLeft: 12 }]}>
              Privacy
            </Text>
            <Switch
              value={privacyOn}
              onValueChange={onPrivacyChange}
              trackColor={{ true: "#00bfff33", false: "#333" }}
              thumbColor={privacyOn ? "#00bfff" : "#666"}
            />
          </View>
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          Software Edition · {Device.manufacturer ?? ""}{" "}
          {Device.modelName ?? "Unknown Device"}
        </Text>
      </View>

      {/* Status pill: shows current privacy state */}
      <View style={[styles.pill, privacyOn ? styles.pillOn : styles.pillOff]}>
        <View
          style={[
            styles.dot,
            { backgroundColor: privacyOn ? "#1aff8c" : "#ff4444" },
          ]}
        />
        <Text style={styles.pillText}>
          {privacyOn
            ? `Privacy Active · Cone ±${CONE_DEG}°`
            : "Privacy Disabled"}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 48 : 56,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    color: "#555",
    marginTop: 2,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  controlLabel: {
    fontSize: 11,
    color: "#666",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 7,
  },
  pillOn: {
    backgroundColor: "#0d2b1f",
    borderWidth: 1,
    borderColor: "#1aff8c22",
  },
  pillOff: {
    backgroundColor: "#2b0d0d",
    borderWidth: 1,
    borderColor: "#ff444422",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  pillText: {
    fontSize: 12,
    color: "#aaa",
    letterSpacing: 0.5,
  },
});
