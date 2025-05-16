import axios from "axios";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/config";

export const fetchTicket = async (ticketId) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 5000,
  });
  return response.data;
};

export const handlePayment = async (ticket, selectedSeat, userId) => {
  const token = await AsyncStorage.getItem("token");
  // Tạo đơn hàng
  const orderResponse = await axios.post(
    `${BASE_URL}/orders`,
    {
      userId,
      items: [
        {
          ticketId: ticket.id,
          quantity: 1,
          seat: selectedSeat,
        },
      ],
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    }
  );
  const order = orderResponse.data.data; // Sửa: lấy order từ .data.data
  if (!order.id) {
    console.error("Order API response:", orderResponse.data);
    throw new Error(orderResponse.data?.message || "Không tạo được đơn hàng.");
  }

  // Tạo URL thanh toán VNPay
  const paymentResponse = await axios.post(
    `${BASE_URL}/payments/vnpay/create`, // Sửa endpoint đúng với backend
    {
      orderId: order.id,
      amount: ticket.price,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    }
  );
  const { paymentUrl } = paymentResponse.data;
  if (!paymentUrl) throw new Error("Không nhận được URL thanh toán.");

  // Mở URL thanh toán
  const supported = await Linking.canOpenURL(paymentUrl);
  if (!supported) throw new Error("Không thể mở URL thanh toán.");
  await Linking.openURL(paymentUrl);
  return { orderId: order.id };
};
