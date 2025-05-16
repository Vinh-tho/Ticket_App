import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import router
import { XCircle } from "phosphor-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const router = useRouter(); // Lấy router để điều hướng
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          {/* Icon Close có viền tròn */}
          <XCircle size={35} color="white" />
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
