import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Ticket() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (!token) {
          router.replace("/LoginScreen"); // Dùng replace để tránh quay lại màn hình này nếu chưa login
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
        router.replace("/LoginScreen");
      }
    };

    checkLogin();
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.boldText}>Tài khoản</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#2ec276",
    padding: 24,
  },
  logo: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    marginTop: 10,
    bottom: -10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
