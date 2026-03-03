/**
 * Demo Screen — simulates an iOS lock screen with a notification card.
 *
 * The notification is wrapped in <PrivacyContent> so its content darkens
 * when the phone is tilted beyond the safe viewing cone — demonstrating
 * the privacy effect in a realistic context.
 */

import { useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

import { NotificationCard } from "@/components/notification-card";
import { PrivacyContent } from "@/components/privacy-content";
import { PrivacyHeader } from "@/components/privacy-header";
import { TiltHUD } from "@/components/tilt-hud";
import { useTilt } from "@/hooks/use-tilt";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function PrivacyDemoScreen() {
  const { tiltX, tiltY } = useTilt();
  const [privacyOn, setPrivacyOn] = useState(true);
  const [showHUD, setShowHUD] = useState(true);

  // When privacy is off, force tilt to 0 so overlay stays transparent.
  const effectiveTiltX = privacyOn ? tiltX : 0;
  const effectiveTiltY = privacyOn ? tiltY : 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <PrivacyHeader
        privacyOn={privacyOn}
        showHUD={showHUD}
        onPrivacyChange={setPrivacyOn}
        onHUDChange={setShowHUD}
      />

      {/* Mock lock-screen clock */}
      <View style={styles.clockArea}>
        <Text style={styles.clockTime}>09:41</Text>
        <Text style={styles.clockDate}>Tuesday, March 3</Text>
      </View>

      {/* Notification wrapped in privacy overlay */}
      <View style={styles.cardArea}>
        <PrivacyContent
          tiltX={effectiveTiltX}
          tiltY={effectiveTiltY}
          radius={20}
        >
          <NotificationCard />
        </PrivacyContent>
      </View>

      <Text style={styles.hint}>Tilt your phone to activate privacy</Text>

      {/* Floating tilt debug overlay */}
      {showHUD && <TiltHUD tiltX={tiltX} tiltY={tiltY} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#030303",
    alignItems: "center",
  },
  clockArea: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 48,
  },
  clockTime: {
    fontSize: 72,
    fontWeight: "200",
    color: "#f2f2f7",
    letterSpacing: -2,
  },
  clockDate: {
    fontSize: 17,
    color: "#999",
    marginTop: 4,
    letterSpacing: 0.2,
  },
  cardArea: {
    width: SCREEN_WIDTH - 32,
  },
  hint: {
    position: "absolute",
    bottom: 48,
    fontSize: 13,
    color: "#666",
    letterSpacing: 0.4,
  },
});
