import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { handlePayment, fetchTicket } from './api'; // Thay bằng đường dẫn thực tế
import { Ticket } from './types'; // Thay bằng đường dẫn thực tế

interface PaymentButtonProps {
  ticketId: string;
  selectedSeat: string;
  userId: number;
}

export default function PaymentButton({ ticketId, selectedSeat, userId }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const onPayment = async () => {
    setLoading(true);
    try {
      const ticket: Ticket = await fetchTicket(ticketId);
      const { orderId } = await handlePayment(ticket, selectedSeat, userId);

      // Đăng ký deep link để xử lý callback
      const handleUrl = ({ url }: { url: string }) => {
        if (url.includes('payment-callback')) {
          const urlParams = new URLSearchParams(url.split('?')[1]);
          const status = urlParams.get('status');
          const orderId = urlParams.get('orderId');
          if (status === 'success') {
            Alert.alert('Thành công', `Thanh toán thành công cho đơn hàng #${orderId}`);
          } else {
            Alert.alert('Thất bại', `Thanh toán thất bại cho đơn hàng #${orderId}`);
          }
          Linking.removeEventListener('url', handleUrl);
        }
      };

      Linking.addEventListener('url', handleUrl);
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Lỗi', error.message || 'Đã có lỗi xảy ra khi thanh toán');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.paymentButton}
      onPress={onPayment}
      disabled={loading}
    >
      <LinearGradient colors={['#00C853', '#00E676']} style={styles.paymentButtonGradient}>
        <Text style={styles.paymentButtonText}>
          {loading ? 'Đang xử lý...' : 'Thanh toán'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paymentButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  paymentButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});