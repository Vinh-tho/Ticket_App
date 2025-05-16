import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

interface SeatBlock {
  color: string;
  price: number;
  name: string;
  rows: Array<{
    label: string;
    seats: number;
  }>;
}

interface SelectedSeat {
  blockIdx: number;
  rowIdx: number;
  seatIdx: number;
}

interface SeatDetailModalProps {
  visible: boolean;
  selectedSeat: SelectedSeat | null;
  seatBlocks: SeatBlock[];
  legendTicketTypes: { name: string; price: number; color: string }[];
  onClose: () => void;
}

export default function SeatDetailModal({
  visible,
  selectedSeat,
  seatBlocks,
  legendTicketTypes,
  onClose,
}: SeatDetailModalProps) {
  const router = useRouter();
  const slideAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  if (!selectedSeat) return null;

  const selectedBlock = seatBlocks[selectedSeat.blockIdx];
  const selectedRow = selectedBlock.rows[selectedSeat.rowIdx];
  const seatNumber = selectedSeat.seatIdx + 1;

  const ticketType = legendTicketTypes.find(t => t.name === selectedBlock.name);
  const price = ticketType ? ticketType.price : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View 
        style={[
          styles.modalContainer,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY }] }
          ]}
        >
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <View style={[styles.seatIndicator, { backgroundColor: selectedBlock.color }]} />
            <Text style={styles.zoneTitle}>{selectedBlock.name}</Text>
          </View>

          <View style={styles.seatInfoContainer}>
            <View style={styles.seatInfoRow}>
              <Ionicons name="location" size={20} color="#00FF99" />
              <Text style={styles.seatInfoText}>
                Khu vực: {selectedBlock.name}
              </Text>
            </View>
            <View style={styles.seatInfoRow}>
              <Ionicons name="grid" size={20} color="#00FF99" />
              <Text style={styles.seatInfoText}>
                Hàng: {selectedRow.label}
              </Text>
            </View>
            <View style={styles.seatInfoRow}>
              <Ionicons name="ticket" size={20} color="#00FF99" />
              <Text style={styles.seatInfoText}>
                Số ghế: {seatNumber}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Giá vé</Text>
            <Text style={styles.priceValue}>
              {formatPrice(price)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/payment_screen/PaymentScreen")}
            >
              <Ionicons name="card" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Thanh toán ngay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onClose}
            >
              <Ionicons name="arrow-back" size={20} color="#00FF99" style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Chọn ghế khác</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000a",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  seatIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  zoneTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  seatInfoContainer: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  seatInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  seatInfoText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 12,
  },
  priceContainer: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00FF99",
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#00FF99",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00FF99",
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#00FF99",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 8,
  },
});