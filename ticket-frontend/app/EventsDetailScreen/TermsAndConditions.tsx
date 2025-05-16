import { View, Text, StyleSheet } from "react-native";

export default function TermsAndConditions() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</Text>
      <Text style={styles.description}>
        • Vé đã mua không thể đổi, trả, thay đổi, chuyển nhượng hay yêu cầu hoàn tiền dưới bất kỳ hình thức nào.{"\n"}
        • Chương trình chỉ phù hợp cho trẻ từ 6 tuổi trở lên. Trẻ em dưới 6 tuổi chỉ được vào nếu đã có vé hợp lệ.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#222",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    textAlign: "left",
  },
});