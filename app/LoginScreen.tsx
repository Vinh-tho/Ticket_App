import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; // Biểu tượng Google, Apple
import Header from "@/components/LoginScreen/Header";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header></Header>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Nhập email hoặc số điện thoại"
        placeholderTextColor="#BDBDBD"
      />

      {/* Input Password */}
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
      />

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(tabs)")} >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Quên mật khẩu */}
      <TouchableOpacity onPress={() => router.push("/ForgotPasswordScreen")}>
      <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      
      {/* Đăng ký tài khoản */}
      <View>
      <Text style={styles.registerText}>Chưa có tài khoản?</Text>
      <TouchableOpacity onPress={() => router.push("/RegisterScreen")}>
        <Text style={styles.registerLink}>Tạo tài khoản ngay</Text>
      </TouchableOpacity>
      </View>
      {/* Hoặc */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.line} />
      </View>

      {/* Đăng nhập Google và Apple */}
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <FontAwesome name="google" size={36} color="#4285F4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="apple" size={36} color="black" />
        </TouchableOpacity>
      </View>

      {/* Điều khoản */}
      <Text style={styles.termsText}>
        Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
        <Text style={styles.termsLink}>Điều khoản sử dụng</Text> và{" "}
        <Text style={styles.termsLink}>
          Chính sách bảo mật thông tin cá nhân
        </Text>{" "}
        của Ticketbox.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00",
    paddingHorizontal: 20,
    paddingTop: 170,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#BDBDBD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotText: {
    textAlign: "center",
    color: "#666",
    marginTop: 15,
  },
  registerText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  registerLink: {
    color: "#21C064",
    fontWeight: "bold",
    textAlign: "center",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#BDBDBD",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  termsText: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
    marginTop: 260,
  },
  termsLink: {
    color: "#21C064",
    fontWeight: "bold",
  },
});
