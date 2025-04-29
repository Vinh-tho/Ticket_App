import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft, CheckCircle, XCircle } from "phosphor-react-native";
import axios from "axios";
import { BASE_URL } from "@/constants/config";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8 && password.length <= 32,
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
    };
  };

  const validateEmail = (email: string) => {
    return email.endsWith("@gmail.com");
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setNameError(!text.trim());
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(!validateEmail(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const validation = validatePassword(text);
    setPasswordError(
      !(
        validation.length &&
        validation.hasNumber &&
        validation.hasSpecialChar &&
        validation.hasUpperCase
      )
    );
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text !== password);
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid =
    passwordValidation.length &&
    passwordValidation.hasNumber &&
    passwordValidation.hasSpecialChar &&
    passwordValidation.hasUpperCase;

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ và chính xác thông tin!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        name,
        email,
        password,
      });      

      Alert.alert("Thành công", "Đăng ký thành công, hãy đăng nhập!");
      router.push("/LoginScreen");
    }
    
    catch (error: any) {
      if (axios.isAxiosError(error)) {
      Alert.alert("Đăng ký thất bại", "Tên đăng nhập hoặc email đã được sử dụng ");
      }   
    }    
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.iconCircle}>
            <CaretLeft size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
      </View>

      <View style={styles.container}>
        {/* Nhập tên */}
        <TextInput
          placeholder="Nhập tên của bạn"
          style={[styles.input, nameError && styles.inputError]}
          value={name}
          onChangeText={handleNameChange}
        />
        {nameError && <Text style={styles.errorEmail}>Tên không được để trống</Text>}

        {/* Nhập email */}
        <TextInput
          placeholder="Nhập email của bạn"
          style={[styles.input, emailError && styles.inputError]}
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError && <Text style={styles.errorEmail}>Sai định dạng email</Text>}

        {/* Nhập mật khẩu */}
        <TextInput
          placeholder="Nhập mật khẩu"
          style={[styles.input, passwordError && styles.inputError]}
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />

        {/* Nhập lại mật khẩu */}
        <TextInput
          placeholder="Nhập lại mật khẩu"
          style={[styles.input, confirmPasswordError && styles.inputError]}
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <Text style={styles.errorPassword}>Mật khẩu nhập lại không khớp</Text>
        )}

        {/* Kiểm tra mật khẩu */}
        {!isPasswordValid && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Mật khẩu chưa hợp lệ</Text>
            {Object.entries(passwordValidation).map(([key, valid]) => (
              <View key={key} style={styles.errorItem}>
                {valid ? (
                  <CheckCircle size={16} color="green" />
                ) : (
                  <XCircle size={16} color="red" />
                )}
                <Text style={styles.errorText}>
                  {key === "length" && "Từ 8 - 32 ký tự"}
                  {key === "hasNumber" && "Bao gồm chữ thường và số"}
                  {key === "hasSpecialChar" && "Bao gồm ký tự đặc biệt (!,$,@,%)"}
                  {key === "hasUpperCase" && "Có ít nhất 1 ký tự in hoa"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Nút đăng ký */}
        <TouchableOpacity
          style={[styles.submitButton, (!isPasswordValid || nameError) && styles.disabledButton]}
          onPress={handleRegister}
          disabled={!isPasswordValid || nameError}
        >
          <Text style={styles.submitText}>Tiếp tục</Text>
        </TouchableOpacity>

        {/* Đã có tài khoản */}
        <Text style={styles.loginText}>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
          <Text style={styles.loginLink}>Đăng nhập ngay</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
          <Text style={styles.linkText}>Điều khoản sử dụng</Text> và{" "}
          <Text style={styles.linkText}>Chính sách bảo mật thông tin cá nhân của Ticketbox.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2dbc70",
  },
  header: {
    flexDirection: "column-reverse",
    alignItems: "center",
    backgroundColor: "#2dbc70",
    padding: 15,
    height: 90,
  },
  backButton: {
    marginRight: 330,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    top: -32,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorTitle: {
    color: "red",
    fontWeight: "bold",
  },
  errorItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#B91C1C",
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 10,
    fontSize: 14,
  },
  loginLink: {
    textAlign: "center",
    color: "#10B981",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "left",
    color: "#6B7280",
    fontSize: 12,
    marginTop: 320,
  },
  linkText: {
    color: "#10B981",
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "red",
  },
  errorEmail: {
    color: "#B91C1C",
    marginLeft: 5,
    top: -7,
  },
  errorPassword: {
    color: "#B91C1C",
    marginLeft: 5,
    top: -7,
  },
});
