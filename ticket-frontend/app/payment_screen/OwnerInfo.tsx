import { View, Text, StyleSheet } from "react-native";

export default function OwnerInfo() {
  return (
    <View style={styles.ownerInfo}>
      <Text style={styles.sectionSubtitle}>Thông tin nhận vé</Text>
      <Text style={styles.ownerText}>
        Vé điện tử sẽ được hiển thị trong mục "Vé của tơi" của tài khoản nguyenvinh1242004@gmail.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ownerInfo: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  ownerText: {
    fontSize: 14,
    color: "#B0BEC5",
  },
});