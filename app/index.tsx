/**
 * Home Screen — main dashboard for Privacy Glass.
 *
 * Controls:
 *   - Privacy toggle: enables / disables the tilt-based overlay.
 *   - HUD toggle: shows / hides the floating tilt sensor widget.
 *   - Demo button: navigates to the lock-screen demo page.
 *
 * Sensitive demo cards are each wrapped in <PrivacyContent> so they
 * black out independently when the phone is tilted.
 */

import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { PrivacyContent } from "@/components/privacy-content";
import { PrivacyHeader } from "@/components/privacy-header";
import { TiltHUD } from "@/components/tilt-hud";
import { useTilt } from "@/hooks/use-tilt";

const SENSITIVE_ITEMS = [
  { label: "💳  CARD NUMBER", value: "4532 •••• •••• 7891" },
  { label: "🔑  PASSWORD", value: "MyS3cr3tP@ssw0rd!" },
  { label: "📬  PRIVATE MESSAGE", value: '"Meet at 9pm. Don\'t tell anyone."' },
  { label: "🏦  BALANCE", value: "₹ 2,45,980.00" },
  { label: "📊  SALARY", value: "CTC: ₹28,00,000 / year" },
];

export default function HomeScreen() {
  const router = useRouter();
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

      {/* Scrollable list of sensitive data cards */}
      <View style={{ flex: 1, marginTop: 8 }}>
        <ScrollView
          contentContainerStyle={styles.cardList}
          showsVerticalScrollIndicator={false}
        >
          {SENSITIVE_ITEMS.map((item) => (
            <PrivacyContent
              key={item.label}
              tiltX={effectiveTiltX}
              tiltY={effectiveTiltY}
            >
              <View style={styles.card}>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
            </PrivacyContent>
          ))}
        </ScrollView>
      </View>

      {/* Navigation to the lock-screen demo */}
      <TouchableOpacity
        style={styles.demoBtn}
        onPress={() => router.push("/demo")}
      >
        <Text style={styles.demoBtnText}>Open Demo Screen →</Text>
      </TouchableOpacity>

      {/* Floating tilt debug overlay */}
      {showHUD && <TiltHUD tiltX={tiltX} tiltY={tiltY} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#030303",
  },
  cardList: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "#0e0e0e",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1c1c1c",
  },
  cardLabel: {
    fontSize: 11,
    color: "#555",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
    color: "#e8e8e8",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  demoBtn: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "#00bfff11",
    borderWidth: 1,
    borderColor: "#00bfff33",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  demoBtnText: {
    color: "#00bfff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
