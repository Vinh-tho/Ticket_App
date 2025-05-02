import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";

export default function FacebookFollowCard() {
  const openFacebook = () => {
    const facebookURL = "https://web.facebook.com/ticketbox.vn";
    Linking.openURL(facebookURL).catch((err) => console.error("Không thể mở URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Avatar bên trái */}
      <Image
        source={require("../../assets/images/facebook.png")}
        style={styles.avatar}
      />

      {/* Thông tin & Nút */}
      <View style={styles.infoSection}>
        <Text style={styles.description}>
          Follow Ticketbox để được cập nhật những thông tin mới nhất
        </Text>
        <TouchableOpacity style={styles.facebookButton} onPress={openFacebook}>
          <Text style={styles.buttonText}>Mở Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    bottom: -12,
    elevation: 4, // Đổ bóng cho Android
  },
  avatar: {
    width: 90,
    height: 90,
    marginRight: 12,
  },
  infoSection: {
    flex: 1,
  },
  description: {
    color: "black",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 25,
    fontWeight: "500",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginLeft: 26,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
