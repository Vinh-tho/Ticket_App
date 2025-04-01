import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router"; // Import router
import { XCircle } from "phosphor-react-native";

export default function Header() {
  const router = useRouter(); // Lấy router để điều hướng

  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          // Icon Close có viền tròn
          <XCircle size={35} color="white" />{" "}
        </TouchableOpacity>
        <Text style={styles.title}>Đăng nhập</Text>
        <Image
          source={require("../../assets/images/shiba.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#2ec276",
    paddingTop: 50, // khoảng cách với status bar
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: "absolute", // Trải rộng ngang màn hình
    width: "120%",
    height: 160,
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    bottom: -30,
  },
  image: {
    width: 90,
    height: 90,
    paddingLeft: 600,
    bottom: 55.5,
  },
});
