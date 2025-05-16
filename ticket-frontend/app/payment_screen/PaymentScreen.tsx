import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import PaymentHeader from "./PaymentHeader";
import PaymentEventInfo from "./PaymentEventInfo";
import PaymentCountdown from "./PaymentCountdown";
import PaymentTicketInfo from "./PaymentTicketInfo";
import PaymentPromo from "./PaymentPromo";
import PaymentOrderCard from "./PaymentOrderCard";
import { handlePayment, fetchTicket } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function PaymentScreen() {
  const router = useRouter();
  const onPayment = async () => {
    try {
      // Kiểm tra đăng nhập trước khi cho phép thanh toán
      let token = await AsyncStorage.getItem("token");
      if (!token) {
        token = await SecureStore.getItemAsync("access_token");
        if (token) {
          await AsyncStorage.setItem("token", token); // đồng bộ lại cho các màn khác
        }
      }
      if (!token) {
        Alert.alert("Bạn cần đăng nhập để thanh toán.");
        router.push("/LoginScreen"); // chuyển sang màn đăng nhập
        return;
      }
      // Lấy userId thực tế từ token, nếu không có thì yêu cầu đăng nhập lại
      const ticketId = "1"; // TODO: lấy đúng ticketId thực tế
      const selectedSeat = "E-27"; // TODO: lấy đúng seat thực tế
      // Ưu tiên lấy token từ SecureStore (nơi LoginScreen lưu)
      let userId;
      try {
        const decoded: any = jwtDecode(token);
        userId = decoded.sub;
      } catch (err) {
        Alert.alert(
          "Token không hợp lệ, vui lòng đăng nhập lại.\n" + String(token)
        );
        return;
      }
      if (!userId) {
        Alert.alert(
          "Không xác định được userId, vui lòng đăng nhập lại.\n" +
            JSON.stringify(jwtDecode(token))
        );
        return;
      }
      const ticket = await fetchTicket(ticketId);
      await handlePayment(ticket, selectedSeat, userId);
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đã có lỗi xảy ra khi thanh toán");
    }
  };

  return (
    <View style={styles.container}>
      <PaymentHeader onBack={() => router.back()} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PaymentEventInfo />
        <PaymentCountdown />
        <PaymentTicketInfo />
        <PaymentPromo />
        <PaymentOrderCard />
      </ScrollView>
      <View style={styles.bottomBarWhite}>
        <Text style={styles.bottomTotalGreen}>Tổng tiền 2.200.000 đ</Text>
        <TouchableOpacity style={styles.payBtnGreen} onPress={onPayment}>
          <Text style={styles.payBtnTextGreen}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#18191A" },
  content: { flex: 1, paddingHorizontal: 16 },
  bottomBarWhite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#18191A",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  bottomTotalGreen: {
    color: "#00B14F",
    fontWeight: "bold",
    fontSize: 18,
  },
  payBtnGreen: {
    backgroundColor: "#00B14F",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  payBtnTextGreen: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
