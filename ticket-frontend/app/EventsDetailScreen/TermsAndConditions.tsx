import { View, Text, StyleSheet } from "react-native";

export default function TermsAndConditions() {
  return (
    <View>
      <Text style={styles.sectionTitle}>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</Text>
      <Text style={styles.description}>
        • Vé đã mua không thể đổi, trả, thay đổi, chuyển nhượng hay yêu cầu hoàn tiền dưới bất kỳ hình thức nào.{'\n'}
        • Chương trình chỉ phù hợp cho trẻ từ 6 tuổi trở lên. Trẻ em dưới 6 tuổi chỉ được vào nếu đã có vé hợp lệ.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 22,
  },
});