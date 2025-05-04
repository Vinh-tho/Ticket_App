import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EventInfo() {
  return (
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>Tên sự kiện</Text>
      <Text style={styles.eventTime}>Thời gian: 20:00, 01/06/2025</Text>
      <Text style={styles.eventTime}>Địa điểm: Nhà hát lớn Hà Nội</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfo: {
    marginTop: 24,
    alignItems: "center",
  },
  eventTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  eventTime: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 12,
  },
});