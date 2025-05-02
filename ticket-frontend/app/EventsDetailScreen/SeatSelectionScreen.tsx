import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { IconSymbol } from "@/components/ui/IconSymbol";
import axios from "axios";
import { BASE_URL } from "@/constants/config";

export enum TicketType {
  NORMAL = "Normal",
  VIP = "VIP",
  VVIP = "VVIP",
}

export default function SeatSelectionScreen() {
  const { ticketType, ticketId } = useLocalSearchParams<{ ticketType: TicketType; ticketId: string }>();
  const validTicketType = ticketType && Object.values(TicketType).includes(ticketType)
    ? ticketType
    : TicketType.NORMAL;
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seats, setSeats] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) {
      alert("Thiếu ticketId.");
      router.back();
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`);
        const { seatCount, type } = response.data;

        const seatPrefix = type === TicketType.NORMAL ? "A" : type === TicketType.VIP ? "V" : "VV";
        const seatList: string[] = Array.from({ length: seatCount }, (_, i) => `${seatPrefix}${i + 1}`);

        const seatsArray: string[][] = [];
        for (let i = 0; i < seatList.length; i += 5) {
          seatsArray.push(seatList.slice(i, i + 5));
        }

        setSeats(seatsArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Không thể tải dữ liệu ghế.");
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId, validTicketType]);

  const handleSeatPress = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleConfirm = async () => {
    if (!selectedSeat || !ticketId) {
      alert("Vui lòng chọn ghế và đảm bảo có ticketId.");
      return;
    }

    try {
      await axios.patch(`${BASE_URL}/tickets/${ticketId}`, {
        seat: selectedSeat,
      });
      alert(`Xác nhận ghế ${selectedSeat} khu vực ${validTicketType}`);
      router.push({
        pathname: "/EventsDetailScreen/payment",
        params: { ticketId, selectedSeat },
      });
    } catch (err) {
      console.error("Patch Error:", err);
      alert(err.response?.data?.message || "Đã có lỗi khi cập nhật ghế.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chọn chỗ ngồi - {validTicketType}</Text>
      </View>

      <LinearGradient
        colors={["#1e3c72", "#2a5298"]}
        style={styles.stage}
      >
        <Text style={styles.stageText}>SÂN KHẤU</Text>
      </LinearGradient>

      <View style={styles.seatContainer}>
        {seats.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.seatRow}>
            {row.map((seat, seatIndex) => (
              <SeatButton
                key={seat}
                seat={seat}
                isSelected={selectedSeat === seat}
                ticketType={validTicketType}
                onPress={() => handleSeatPress(seat)}
              />
            ))}
          </View>
        ))}
      </View>

      {selectedSeat && (
        <LinearGradient
          colors={["#ffffff", "#e0e0e0"]}
          style={styles.selectedInfo}
        >
          <Text style={styles.selectedText}>Ghế đã chọn: {selectedSeat}</Text>
          <Text style={styles.selectedText}>Khu vực: {validTicketType}</Text>
        </LinearGradient>
      )}

      <TouchableOpacity
        style={[styles.confirmButton, !selectedSeat && styles.disabledButton]}
        disabled={!selectedSeat}
        onPress={handleConfirm}
      >
        <LinearGradient
          colors={["#2196F3", "#3F51B5"]}
          style={styles.confirmButtonGradient}
        >
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const SeatButton: React.FC<{
  seat: string;
  isSelected: boolean;
  ticketType: TicketType;
  onPress: () => void;
}> = ({ seat, isSelected, ticketType, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.seat,
          ticketType === TicketType.NORMAL && styles.normalSeat,
          ticketType === TicketType.VIP && styles.vipSeat,
          ticketType === TicketType.VVIP && styles.vvipSeat,
          isSelected && styles.selectedSeat,
        ]}
        onPress={handlePress}
      >
        <Text style={styles.seatText}>{seat}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  stage: {
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  stageText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  seatContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  seatRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  seat: {
    width: 60,
    height: 60,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  normalSeat: {
    backgroundColor: "#4CAF50",
  },
  vipSeat: {
    backgroundColor: "#FFC107",
  },
  vvipSeat: {
    backgroundColor: "#D81B60",
  },
  selectedSeat: {
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  seatText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedInfo: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },
  confirmButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  confirmButtonGradient: {
    padding: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});