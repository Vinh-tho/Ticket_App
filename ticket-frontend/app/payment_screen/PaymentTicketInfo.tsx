import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentTicketInfo() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Thông tin nhận vé</Text>
      <Text style={styles.sectionDesc}>
        Vé điện tử sẽ được hiển thị trong mục{" "}
        <Text style={{ fontWeight: "bold" }}>"Vé của tôi"</Text> của tài khoản
      </Text>
      <Text style={styles.sectionEmail}>nguyenvinh1242004@gmail.com</Text>
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
  sectionDesc: { color: "#fff", fontSize: 13 },
  sectionEmail: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2,
  },
});
