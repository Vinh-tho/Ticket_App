import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

// Giả định SHARED_COLOR_MAP và LegendTicketType được import hoặc định nghĩa ở đây/constants
// Ví dụ:
const SHARED_COLOR_MAP: Record<string, string> = {
  VIP: '#F44336',
  Normal: '#4FC3F7',
  VVIP: '#800080', // Purple for VVIP
  Premium: '#FFD966',
  Standard: '#4FC3F7',
  Economy: '#D9D9D9',
};

interface LegendTicketType {
  name: string;
  price: number;
  color: string;
}

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
  eventDetailId: number;
}

interface EventDetail {
  id: number;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  status: string;
}

interface Event {
  id: number;
  tickets: Ticket[];
  eventDetails: EventDetail[];
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
    return <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Thông tin vé</Text>
      {event.eventDetails.map((detail) => {
        // Lấy vé đầu tiên cho lịch diễn này
        const ticket = event.tickets.find(t => t.eventDetailId === detail.id);
        return (
          <View key={detail.id} style={styles.scheduleRow}>
            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>
                {formatTime(detail.startTime)} - {formatTime(detail.endTime)}
              </Text>
              <Text style={styles.dateText}>{formatDate(detail.startTime)}</Text>
            </View>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                // Trích xuất các loại vé duy nhất và giá từ event.tickets
                const uniqueTicketTypesForEvent: LegendTicketType[] = [];
                if (event && event.tickets) {
                  event.tickets.forEach(ticket => {
                    if (!uniqueTicketTypesForEvent.find(t => t.name === ticket.type)) {
                      uniqueTicketTypesForEvent.push({
                        name: ticket.type,
                        price: ticket.price,
                        color: SHARED_COLOR_MAP[ticket.type] || '#CCCCCC'
                      });
                    }
                  });
                }
                router.push({
                  pathname: "/seat_screen/SeatMapScreen",
                  params: {
                    eventId: event.id,
                    eventTicketTypesParam: JSON.stringify(uniqueTicketTypesForEvent),
                    eventDetailId: detail.id
                  },
                });
              }}
            >
              <Text style={styles.buyButtonText}>Mua vé ngay</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#23272f',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c313a',
    borderRadius: 10,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  timeInfo: {
    flex: 1,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dateText: {
    color: '#fff',
    fontSize: 15,
  },
  buyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});