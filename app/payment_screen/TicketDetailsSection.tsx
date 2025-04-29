import { View, Text, StyleSheet } from "react-native";

export default function TicketDetailsSection() {
  return (
    <View style={styles.ticketDetailsSection}>
      <Text style={styles.sectionSubtitle}>Thông tin đặt vé</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Loại vé</Text>
        <Text style={styles.detailValue}>VIP</Text>
        <Text style={styles.detailValue}>01</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Số lượng</Text>
        <Text style={styles.detailValue}>2.200.000 đ</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>E-27</Text>
      </View>
      <Text style={styles.sectionSubtitle}>Thông tin đơn hàng</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tạm tính</Text>
        <Text style={styles.detailValue}>2.200.000 đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketDetailsSection: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#333",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
});