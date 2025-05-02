import { View, Text, Image, StyleSheet } from "react-native";

export default function Organizer() {
  return (
    <View>
      <Text style={styles.sectionTitle}>BAN TỔ CHỨC</Text>
      <Image source={{ uri: "https://via.placeholder.com/80x80" }} style={styles.organizerLogo} />
      <Text style={styles.organizerName}>Công ty Cổ phần Orchestars</Text>
      <Text style={styles.organizerDetails}>
        Đại diện theo pháp luật: Lương Nhí Thị{'\n'}
        Địa chỉ: 675-677 Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM{'\n'}
        Hotline: (+84) 972 444 023{'\n'}
        Email: info@orchestars.vn{'\n'}
        Giấy chứng nhận đăng ký doanh nghiệp số: 0318788336 cấp lần đầu ngày 23 tháng 12 năm 2024 bởi Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh.
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
    textAlign: "left", // thêm dòng này
  },
  organizerLogo: {
    width: 80,
    height: 80,
    alignSelf: "flex-start", // đổi từ center sang flex-start
    marginBottom: 10,
  },
  organizerName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left", // đổi từ center
    marginBottom: 10,
  },
  organizerDetails: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "left", // đổi từ center
    lineHeight: 18,
  },
});
