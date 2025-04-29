import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import axios from "axios";

export enum TicketType {
  NORMAL = "Normal",
  VIP = "VIP",
  VVIP = "VVIP",
}

interface Ticket {
  id: number;
  type: TicketType;
  price: number;
  quantity: number;
  seat: string;
  seatCount: number;
}

interface Event {
  tickets: Ticket[];
}

interface TicketInfoProps {
  event: Event;
}

export default function TicketInfo({ event }: TicketInfoProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [event]);

  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>THÔNG TIN VÉ</Text>
      {event.tickets.length > 0 ? (
        event.tickets.map((ticket, index) => (
          <View key={index} style={styles.ticketContainer}>
            <View style={styles.ticketRow}>
              <Text style={styles.ticketTime}>Vé: {ticket.type}</Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                  router.push({
                    pathname: "/EventsDetailScreen/SeatSelectionScreen",
                    params: { ticketType: ticket.type, ticketId: ticket.id.toString() },
                  });
                }}
              >
                <Text style={styles.buyButtonText}>Mua vé ngay</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.ticketPrice}>
              Giá: {ticket.price.toLocaleString()} đ
            </Text>
            <Text style={styles.ticketQuantity}>
              Số lượng còn lại: {ticket.quantity}
            </Text>
            <Text style={styles.ticketSeatCount}>
              Số ghế: {ticket.seatCount}
            </Text>
            {ticket.seat && (
              <Text style={styles.ticketSeat}>Ghế đã chọn: {ticket.seat}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noTickets}>Không có vé cho sự kiện này</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  ticketContainer: {
    backgroundColor: "#1a2525",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ticketTime: {
    fontSize: 14,
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "#00cc00",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  ticketPrice: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  ticketQuantity: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  ticketSeatCount: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  ticketSeat: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  noTickets: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});