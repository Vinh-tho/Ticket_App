import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <View style={styles.iconCircle}>
            <CaretLeft size={24} color="black" />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Quên mật khẩu</Text>
      </View>

      {/* Input Field */}
      <View style={styles.container}>
        <Text style={styles.instruction}>
          Vui lòng nhập email hoặc số điện thoại đăng nhập
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email hoặc số điện thoại"
          placeholderTextColor="#A1A1A1"
          value={input}
          onChangeText={setInput}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, !input && styles.disabledButton]}
          disabled={!input}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2dbc70",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
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
  instruction: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
    top: 520,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
