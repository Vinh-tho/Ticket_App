import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PaymentOrderCard() {
  return (
    <View style={styles.ticketOrderCard}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.ticketOrderTitle}>Thông tin đặt vé</Text>
        <TouchableOpacity>
          <Text style={styles.ticketOrderChange}>Chọn lại vé</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ticketOrderRowHeader}>
        <Text style={styles.ticketOrderLabel}>Loại vé</Text>
        <Text style={styles.ticketOrderLabel}>Số lượng</Text>
      </View>
      <View style={styles.ticketOrderRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.ticketOrderType}>VIP</Text>
          <Text style={styles.ticketOrderPrice}>2.200.000 đ</Text>
          <View style={styles.ticketOrderSeatBox}>
            <Text style={styles.ticketOrderSeat}>E-27</Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.ticketOrderQty}>01</Text>
          <Text style={styles.ticketOrderPrice}>2.200.000 đ</Text>
        </View>
      </View>
      <View style={styles.ticketOrderDivider} />
      <Text style={styles.ticketOrderTitle}>Thông tin đơn hàng</Text>
      <View style={styles.ticketOrderRowSimple}>
        <Text style={styles.ticketOrderLabel}>Tạm tính</Text>
        <Text style={styles.ticketOrderValue}>2.200.000 đ</Text>
      </View>
      <View style={styles.ticketOrderRowSimple}>
        <Text style={styles.ticketOrderLabelBold}>Tổng tiền</Text>
        <Text style={styles.ticketOrderValueBold}>2.200.000 đ</Text>
      </View>
      <Text style={styles.ticketOrderNote}>
        Bằng việc tiến hành đặt mua, bạn đã đồng ý với{" "}
        <Text style={styles.ticketOrderLink}>Điều Kiện Giao Dịch Chung</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ticketOrderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  ticketOrderTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  ticketOrderChange: {
    color: "#0099FF",
    fontWeight: "bold",
    fontSize: 13,
  },
  ticketOrderRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  ticketOrderLabel: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 13,
  },
  ticketOrderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  ticketOrderType: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
  },
  ticketOrderQty: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
  },
  ticketOrderPrice: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  ticketOrderSeatBox: {
    backgroundColor: "#FFD966",
    borderRadius: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  ticketOrderSeat: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 13,
  },
  ticketOrderDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },
  ticketOrderRowSimple: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ticketOrderValue: {
    color: "#222",
    fontSize: 14,
  },
  ticketOrderLabelBold: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
  },
  ticketOrderValueBold: {
    color: "#00B14F",
    fontWeight: "bold",
    fontSize: 17,
  },
  ticketOrderNote: {
    color: "#888",
    fontSize: 12,
    marginTop: 8,
  },
  ticketOrderLink: {
    color: "#0099FF",
    textDecorationLine: "underline",
  },
});
