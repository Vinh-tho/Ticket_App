import { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { fetchTicket, handlePayment } from '../payment_screen/api';
import { Ticket, JwtPayload } from '../payment_screen/types';
import Header from '../payment_screen/Header';
import TicketInfo from '../payment_screen/TicketInfo';
import OwnerInfo from '../payment_screen/OwnerInfo';
import PaymentMethods from '../payment_screen/PaymentMethods';
import PromoCode from '../payment_screen/PromoCode';
import TicketDetailsSection from '../payment_screen/TicketDetailsSection';
import TotalPrice from '../payment_screen/TotalPrice';
import PaymentButton from '../payment_screen/PaymentButton';

export default function PaymentScreen() {
  const { ticketId, selectedSeat } = useLocalSearchParams<{ ticketId: string; selectedSeat: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId || !selectedSeat) {
      setError("Thiếu thông tin vé hoặc ghế.");
      setLoading(false);
      return;
    }

    fetchTicket(ticketId)
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Không thể tải thông tin vé.");
        setLoading(false);
      });
  }, [ticketId]);

  const onPayment = async () => {
    if (!ticket || !selectedSeat) {
      alert("Thiếu thông tin vé hoặc ghế.");
      return;
    }

    if (!selectedMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert("Vui lòng đăng nhập để tiếp tục.");
        router.push('/LoginScreen');
        return;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        await AsyncStorage.removeItem('token');
        router.push('/LoginScreen');
        return;
      }

      // Gọi hàm handlePayment với phương thức thanh toán
      await handlePayment(ticket, selectedSeat, decoded.sub, selectedMethod);
      alert(`Thanh toán bằng ${selectedMethod} thành công!`);
      // Có thể điều hướng đến màn hình xác nhận
      // router.push('/PaymentSuccess');
    } catch (err) {
      alert(err.response?.data?.message || "Đã có lỗi khi tạo thanh toán.");
    }
  };

  const COMPONENTS = [
    { id: "1", component: <Header /> },
    { id: "2", component: <TicketInfo /> },
    { id: "3", component: <OwnerInfo /> },
    {
      id: "4",
      component: (
        <PaymentMethods
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
        />
      ),
    },
    { id: "5", component: <PromoCode /> },
    { id: "6", component: <TicketDetailsSection /> },
    { id: "7", component: <TotalPrice /> },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error || !ticket) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || "Không tìm thấy thông tin vé."}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      data={COMPONENTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View>{item.component}</View>}
      ListFooterComponent={
        <>
          <Text style={styles.termsText}>
            Bằng việc tiến hành đặt mua, bạn đã đồng ý với Điều Kiện Giao Dịch Chung
          </Text>
          <PaymentButton onPress={onPayment} selectedMethod={selectedMethod} />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#B0BEC5",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
});