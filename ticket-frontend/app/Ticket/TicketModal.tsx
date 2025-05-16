import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TicketModalProps } from './types';
import { modalStyles } from './styles';
import { getStatusColor, formatStatus } from './utils';

export const TicketModal: React.FC<TicketModalProps> = ({ visible, onClose, ticket }) => {
  const router = useRouter();
  
  if (!ticket) return null;

  const statusColor = getStatusColor(ticket.status);

  const handlePayment = () => {
    onClose();
    router.push({
      pathname: "/payment_screen/PaymentScreen",
      params: { 
        orderId: ticket.id,
        amount: (ticket.price || 0) * (ticket.quantity || 1),
        eventName: ticket.eventName
      }
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <TouchableOpacity 
            style={modalStyles.closeModalButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={modalStyles.modalTitle}>
            Chi tiết vé
          </Text>
          
          <View style={modalStyles.eventNameContainer}>
            <Text style={modalStyles.eventName} numberOfLines={2}>
              {ticket.eventName && ticket.eventName !== "Không xác định" 
                ? ticket.eventName 
                : `Vé ${ticket.type} - Ghế ${ticket.seat}`}
            </Text>
            {(!ticket.eventName || ticket.eventName === "Không xác định") && (
              <Text style={modalStyles.eventNameWarning}>
                Mã đơn hàng: #{ticket.id}
              </Text>
            )}
          </View>
          
          <View style={modalStyles.ticketMetaContainer}>
            {ticket.eventDate && (
              <View style={modalStyles.metaItem}>
                <Ionicons name="calendar-outline" size={18} color="#666" />
                <Text style={modalStyles.metaText}>{ticket.eventDate}</Text>
              </View>
            )}
            
            {ticket.location && (
              <View style={modalStyles.metaItem}>
                <Ionicons name="location-outline" size={18} color="#666" />
                <Text style={modalStyles.metaText}>{ticket.location}</Text>
              </View>
            )}
          </View>
          
          <View style={modalStyles.ticketStatusContainer}>
            <Text style={modalStyles.ticketStatusLabel}>Trạng thái:</Text>
            <View 
              style={[
                modalStyles.statusBadgeLarge, 
                { backgroundColor: statusColor + '20' }
              ]}
            >
              <Text 
                style={[
                  modalStyles.statusTextLarge, 
                  { color: statusColor }
                ]}
              >
                {formatStatus(ticket.status)}
              </Text>
            </View>
          </View>
          
          <View style={modalStyles.ticketDetailSection}>
            <Text style={modalStyles.sectionTitle}>Chi tiết vé</Text>
            
            <View style={modalStyles.detailRowModal}>
              <Text style={modalStyles.detailLabelModal}>Mã vé:</Text>
              <Text style={modalStyles.detailValueModal}>{ticket.id}</Text>
            </View>
            
            <View style={modalStyles.detailRowModal}>
              <Text style={modalStyles.detailLabelModal}>Loại vé:</Text>
              <Text style={modalStyles.detailValueModal}>{ticket.type}</Text>
            </View>
            
            <View style={modalStyles.detailRowModal}>
              <Text style={modalStyles.detailLabelModal}>Ghế:</Text>
              <Text style={modalStyles.detailValueModal}>{ticket.seat}</Text>
            </View>
            
            {ticket.quantity && ticket.quantity > 1 && (
              <View style={modalStyles.detailRowModal}>
                <Text style={modalStyles.detailLabelModal}>Số lượng:</Text>
                <Text style={modalStyles.detailValueModal}>{ticket.quantity}</Text>
              </View>
            )}
            
            {ticket.price !== undefined && (
              <View style={modalStyles.detailRowModal}>
                <Text style={modalStyles.detailLabelModal}>Giá:</Text>
                <Text style={modalStyles.detailValueModal}>
                  {ticket.price.toLocaleString('vi-VN')} đ
                  {ticket.quantity && ticket.quantity > 1 
                    ? ` (${(ticket.price * ticket.quantity).toLocaleString('vi-VN')} đ tổng cộng)` 
                    : ''}
                </Text>
              </View>
            )}
            
            <View style={modalStyles.detailRowModal}>
              <Text style={modalStyles.detailLabelModal}>Ngày mua:</Text>
              <Text style={modalStyles.detailValueModal}>{ticket.orderDate}</Text>
            </View>
          </View>
          
          {ticket.status === 'pending' && (
            <TouchableOpacity
              style={[modalStyles.paymentButton, { backgroundColor: '#21C064' }]}
              onPress={handlePayment}
            >
              <Text style={modalStyles.paymentButtonText}>Thanh toán ngay</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={onClose}
          >
            <Text style={modalStyles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}; 