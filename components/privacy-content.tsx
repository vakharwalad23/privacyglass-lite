/**
 * PrivacyContent — wraps any child view with a tilt-reactive black overlay.
 *
 * When the device is held within the viewing cone the content is fully
 * visible.  As the phone tilts beyond CONE_DEG on either axis the overlay
 * opacity ramps up, effectively hiding the content from side-viewers.
 *
 * The overlay is positioned absolutely inside the wrapper so it only
 * darkens the wrapped content, not the whole screen.
 */

import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { CONE_DEG, coneOpacity } from "@/utils/privacy";

interface PrivacyContentProps {
  tiltX: number;
  tiltY: number;
  children: React.ReactNode;
  /** Border radius applied to the clipping container (default 14). */
  radius?: number;
}

export function PrivacyContent({
  tiltX,
  tiltY,
  children,
  radius = 14,
}: PrivacyContentProps) {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Take the worst-case opacity across both axes in both directions.
    const opacity = Math.max(
      coneOpacity(tiltX, CONE_DEG),
      coneOpacity(-tiltX, CONE_DEG),
      coneOpacity(tiltY, CONE_DEG),
      coneOpacity(-tiltY, CONE_DEG),
    );

    Animated.timing(animatedOpacity, {
      toValue: opacity,
      duration: 60,
      useNativeDriver: true,
    }).start();
  }, [tiltX, tiltY, animatedOpacity]);

  return (
    <View style={{ borderRadius: radius, overflow: "hidden" }}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[styles.overlay, { opacity: animatedOpacity }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },
});
