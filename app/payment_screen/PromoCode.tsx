import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PromoCode() {
  return (
    <View style={styles.promoCode}>
      <TouchableOpacity style={styles.promoButton}>
        <Text style={styles.promoButtonText}>+ Thêm khuyến mãi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  promoCode: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  promoButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00C853",
    alignItems: "center",
  },
  promoButtonText: {
    fontSize: 14,
    color: "#00C853",
  },
});