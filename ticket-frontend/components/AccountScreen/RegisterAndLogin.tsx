import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "../../components/ui/IconSymbol";

export default function RegisterAndLogin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={require("../../assets/images/avatar.png")}
        style={styles.avatar}
      />

      {/* User Info */}
      <View style={styles.infoSection}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/LoginScreen")} // Chuyển đến LoginScreen
        >
          <Text style={styles.loginText}>Đăng nhập/Đăng ký</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>Để trải nghiệm toàn bộ tính năng</Text>
      </View>

      {/* Ticket Section */}
      <TouchableOpacity style={styles.ticketButton}>
        <IconSymbol name="ticket" size={20} color="#21C064" />
        <Text style={styles.ticketText}>Vé của tôi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 4, // Cho Android
  },
  avatar: {
    width: 120,
    height: 110,
    borderRadius: 200,
    marginRight: 12,
    bottom: -17,
  },
  infoSection: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: "#21C064",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 150,
    bottom: 70,
    elevation: 5,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoText: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 150,
    bottom: 68,
  },
  ticketButton: {
    flexDirection: "row",
    marginTop: 0,
    bottom: 8,
  },
  ticketText: {
    color: "#000",
    marginLeft: 4,
    fontSize: 14,
  },
});
