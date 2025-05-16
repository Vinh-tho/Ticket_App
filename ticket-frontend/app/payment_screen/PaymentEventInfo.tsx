import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentEventInfo() {
  return (
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle}>
        18/05 - THANH DUY - QUỐC THIÊN - THANH THIÊN BẠCH NHẬT
      </Text>
      <Text style={styles.eventLocation}>Nhà văn hóa Thanh Niên</Text>
      <Text style={styles.eventAddress}>
        Số 4 Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh
      </Text>
      <Text style={styles.eventTime}>20:00 - 23:00, 18 Tháng 05, 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfo: { marginBottom: 12 },
  eventTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  eventLocation: { color: "#fff", marginTop: 4 },
  eventAddress: { color: "#bbb", fontSize: 13 },
  eventTime: { color: "#bbb", fontSize: 13, marginTop: 2 },
});
