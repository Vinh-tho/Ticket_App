import { View, Text, Image, StyleSheet } from "react-native";

export default function Organizer() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>BAN TỔ CHỨC</Text>
      <Image source={{ uri: "https://via.placeholder.com/80x80" }} style={styles.organizerLogo} />
      <Text style={styles.organizerName}>Công ty Cổ phần Orchestars</Text>
      <Text style={styles.organizerDetails}>
        Đại diện theo pháp luật: Lương Nhí Thị{"\n"}
        Địa chỉ: 675-677 Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM{"\n"}
        Hotline: (+84) 972 444 023{"\n"}
        Email: info@orchestars.vn{"\n"}
        Giấy chứng nhận đăng ký doanh nghiệp số: 0318788336 cấp lần đầu ngày 23 tháng 12 năm 2024 bởi Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh.
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
  organizerLogo: {
    width: 80,
    height: 80,
    alignSelf: "flex-start",
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  organizerName: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  organizerDetails: {
    fontSize: 13,
    color: "#444",
    textAlign: "left",
    lineHeight: 20,
  },
});
