import { View, Text, StyleSheet } from "react-native";

export default function TicketInfo() {
  return (
    <View style={styles.ticketInfo}>
      <Text style={styles.sectionTitle}>Chọn vé</Text>
      <Text style={styles.sectionTitle}>Bằng cách hội</Text>
      <Text style={styles.sectionTitle}>Thanh toán</Text>
      <View style={styles.ticketDetails}>
        <Text style={styles.ticketTitle}>18/05 - THANH DUY - QUỐC THIÊN - THANH THIÊN BẠCH NHẬT</Text>
        <Text style={styles.ticketLocation}>
          Nhà văn hóa Thanh Niên - Số 4 Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
        </Text>
        <Text style={styles.ticketTime}>20:00 - 23:00, 18 Tháng 05, 2025</Text>
        <View style={styles.seatInfo}>
          <Text style={styles.seatText}>Hạng đặt vé trong</Text>
          <View style={styles.seatNumbers}>
            <Text style={styles.seatNumber}>14</Text>
            <Text style={styles.seatNumber}>:</Text>
            <Text style={styles.seatNumber}>12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketInfo: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  ticketDetails: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  ticketLocation: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  ticketTime: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  seatInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seatText: {
    fontSize: 14,
    color: "#333",
  },
  seatNumbers: {
    flexDirection: "row",
    alignItems: "center",
  },
  seatNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#6200EE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});