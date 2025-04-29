import { View, Text, StyleSheet } from "react-native";

export default function TotalPrice() {
  return (
    <View style={styles.totalPrice}>
      <Text style={styles.totalLabel}>Tổng tiền</Text>
      <Text style={styles.totalValue}>2.200.000 đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  totalPrice: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});