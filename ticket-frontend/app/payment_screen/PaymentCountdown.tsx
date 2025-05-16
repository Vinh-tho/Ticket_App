import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentCountdown() {
  return (
    <View style={styles.countdownBox}>
      <Text style={styles.countdownLabel}>Hoàn tất đặt vé trong</Text>
      <View style={styles.countdown}>
        <Text style={styles.countdownTime}>14</Text>
        <Text style={styles.countdownColon}>:</Text>
        <Text style={styles.countdownTime}>12</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countdownBox: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  countdownLabel: { color: "#fff", marginBottom: 4 },
  countdown: { flexDirection: "row", alignItems: "center" },
  countdownTime: {
    backgroundColor: "#00FF99",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    minWidth: 36,
    textAlign: "center",
  },
  countdownColon: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 4,
  },
});
