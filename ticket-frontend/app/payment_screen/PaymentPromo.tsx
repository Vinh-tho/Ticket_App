import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PaymentPromo() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mã khuyến mãi</Text>
      <TouchableOpacity style={styles.promoBtn}>
        <Text style={styles.promoBtnText}>+ Thêm khuyến mãi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#00FF99",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  promoBtn: {
    marginTop: 4,
    padding: 8,
    backgroundColor: "#333",
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  promoBtnText: { color: "#00FF99", fontWeight: "bold" },
});
