import axios from 'axios';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants/config';
import { Ticket } from './types';

export const fetchTicket = async (ticketId: string): Promise<Ticket> => {
  const token = await AsyncStorage.getItem('token');
  // if (!token) {
  //   throw new Error('Vui lòng đăng nhập để tiếp tục.');
  // }

  try {
    
    const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`, {
      timeout: 5000,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi khi lấy thông tin vé: ${error.message}`);
  }
};

export const handlePayment = async (ticket: Ticket, selectedSeat: string, userId: number) => {
  const token = await AsyncStorage.getItem('token');
  // if (!token) {
  //   throw new Error('Vui lòng đăng nhập để tiếp tục.');
  // }

  try {
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

    const order = orderResponse.data;
    if (!order.id) {
      throw new Error('Không tạo được đơn hàng.');
    }

    // Tạo URL thanh toán VNPay
    const paymentResponse = await axios.post(
      `${BASE_URL}/payments/vnpay`,
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
    if (!paymentUrl) {
      throw new Error('Không nhận được URL thanh toán.');
    }

    // Mở URL thanh toán
    const supported = await Linking.canOpenURL(paymentUrl);
    if (!supported) {
      throw new Error('Không thể mở URL thanh toán.');
    }

    // Đăng ký deep link để xử lý callback
    const handleUrl = ({ url }: { url: string }) => {
      if (url.includes('payments/vnpay/callback')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const responseCode = urlParams.get('vnp_ResponseCode');
        const orderId = urlParams.get('vnp_TxnRef');
        if (responseCode === '00') {
          console.log(`Thanh toán thành công cho đơn hàng #${orderId}`);
          // TODO: Cập nhật UI hoặc thông báo
        } else {
          console.log(`Thanh toán thất bại cho đơn hàng #${orderId}`);
          // TODO: Cập nhật UI hoặc thông báo
        }
        Linking.removeEventListener('url', handleUrl);
      }
    };

    Linking.addEventListener('url', handleUrl);
    await Linking.openURL(paymentUrl);

    return { orderId: order.id }; // Trả về orderId để frontend theo dõi
  } catch (error) {
    console.error('Payment Error:', error);
    throw new Error(`Lỗi thanh toán: ${error.message}`);
  }
};