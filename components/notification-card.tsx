/**
 * NotificationCard — a mock iOS-style notification used on the demo screen
 * to show how PrivacyContent hides sensitive information.
 */

import { StyleSheet, Text, View } from "react-native";

export function NotificationCard() {
  return (
    <View style={styles.card}>
      <View style={styles.appRow}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>💬</Text>
        </View>
        <Text style={styles.appName}>Messages</Text>
        <Text style={styles.time}>now</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sender}>Rahul</Text>
      <Text style={styles.message}>
        Hey! Your OTP for login is <Text style={styles.highlight}>847291</Text>.
        Do not share with anyone.
      </Text>

      <View style={styles.actions}>
        <View style={styles.actionBtn}>
          <Text style={styles.actionText}>Reply</Text>
        </View>
        <View style={[styles.actionBtn, styles.actionBtnSecondary]}>
          <Text style={[styles.actionText, styles.actionTextSecondary]}>
            Mark Read
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  appRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  appIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#e8f5e9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  appIconText: { fontSize: 16 },
  appName: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#3c3c43",
    letterSpacing: 0.1,
  },
  time: {
    fontSize: 12,
    color: "#aeaeb2",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5ea",
    marginBottom: 10,
  },
  sender: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1c1c1e",
    marginBottom: 4,
  },
  message: {
    fontSize: 15,
    color: "#3c3c43",
    lineHeight: 22,
  },
  highlight: {
    fontWeight: "700",
    color: "#007aff",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#007aff",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionBtnSecondary: {
    backgroundColor: "#e5e5ea",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  actionTextSecondary: {
    color: "#3c3c43",
  },
});
