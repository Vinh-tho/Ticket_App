import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Animated, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import SeatMap from "./SeatMap";
import EventInfo from "./EventInfo";
import FixedButtons from "./FixedButtons";
import TicketInfoModal from "./TicketInfoModal";
import SeatDetailModal from "./SeatDetailModal";
import { ENDPOINTS } from '../../constants/api';
import axios from 'axios';
import { API_URL } from '../../constants/api';

interface LegendTicketType {
  name: string;
  price: number;
  color: string;
}

interface ApiSeat {
  id: number;
  seatNumber: string;
  status: "AVAILABLE" | "SOLD" | "HELD";
  zone: string;
  price: number;
  row: string;
  seatInRow: number;
}

interface SeatBlockItem {
  color: string;
  price: number;
  name: string;
  rows: Array<{ seats: number; label: string; apiSeats?: ApiSeat[] }>;
}

interface SelectedSeatData {
  blockIdx: number;
  rowIdx: number;
  seatIdx: number;
  seatDetails: ApiSeat;
}

const SVG_WIDTH = 380;
const seatRadius = 6;
const seatGap = 14;
const seatDiameter = seatRadius * 2;
const blockPadding = 20;
const blockVerticalPadding = 18;
const rowGap = 15;

const COLOR_MAP: Record<string, string> = {
  VIP: '#F44336',
  Premium: '#FFD966',
  Standard: '#4FC3F7',
  Economy: '#D9D9D9',
};

const ZONES = ['VIP', 'Premium', 'Standard', 'Economy'];

export default function SeatMapScreen() {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<SelectedSeatData | null>(null);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [legendTicketTypes, setLegendTicketTypes] = useState<LegendTicketType[]>([]);
  const [seatMapLayout, setSeatMapLayout] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seats, setSeats] = useState<any[]>([]);
  const { eventId, eventTicketTypesParam, eventDetailId } = useLocalSearchParams<{
    eventId?: string;
    eventTicketTypesParam?: string;
    eventDetailId?: string;
  }>();

  useFocusEffect(
    React.useCallback(() => {
      setSelectedSeat(null);
      setShowTicketInfo(false);
    }, [])
  );

  useEffect(() => {
    if (eventTicketTypesParam) {
      try {
        const parsedTicketTypes = JSON.parse(eventTicketTypesParam as string);
        setLegendTicketTypes(parsedTicketTypes);
      } catch (e) {
        setError("Lỗi xử lý thông tin loại vé.");
      }
    }
  }, [eventTicketTypesParam]);

  useEffect(() => {
    if (!eventId) {
      setLoading(false); // Stop loading if no eventId
      setError('Không có thông tin sự kiện.'); // Set an error message
      return;
    }

    const fetchSeats = async () => {
      setLoading(true);
      setError(null);
      setSeatMapLayout([]); // Reset layout trước khi fetch
      try {
        const seatRes = await fetch(`${ENDPOINTS.SEATS}/event/${eventId}`);

        if (!seatRes.ok) {
          const errorText = await seatRes.text();
          throw new Error(`Lỗi khi lấy dữ liệu ghế: ${seatRes.status} ${seatRes.statusText}`);
        }
        const seatData = await seatRes.json();

        if (!seatData || (Array.isArray(seatData) && seatData.length === 0)) {
          setSeatMapLayout([]); // Sơ đồ ghế sẽ rỗng
          return;
        }

        const layout = ZONES.map(zoneName => {
          const zoneSeats = seatData.filter((s: any) => s.zone === zoneName);
          if (zoneSeats.length === 0) return null;

          const rowLabels = [...new Set(zoneSeats.map((s: any) => s.row))].sort();
          const rows = rowLabels.map(label => {
            const seatsInRow = zoneSeats
              .filter((s: any) => s.row === label)
              .sort((a: any, b: any) => {
                const numA = typeof a.seatInRow === 'number' ? a.seatInRow : (typeof a.number === 'number' ? a.number : parseInt(a.id, 10));
                const numB = typeof b.seatInRow === 'number' ? b.seatInRow : (typeof b.number === 'number' ? b.number : parseInt(b.id, 10));
                return numA - numB;
              });
            return {
              label,
              seats: seatsInRow
            };
          });
          
          const colorForZoneMap = COLOR_MAP[zoneName] || '#CCCCCC';

          return {
            name: zoneName,
            color: colorForZoneMap,
            rows
          };
        }).filter(Boolean);

        setSeatMapLayout(layout as any[]);

      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra khi tải dữ liệu ghế.');
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [eventId]);

  const handleSeatPress = (blockIdx: number, rowIdx: number, seatIdx: number) => {
    setSelectedSeat({ blockIdx, rowIdx, seatIdx, seatDetails: undefined as any });
  };

  const closeModal = () => setSelectedSeat(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const selectedEventDetailId = eventDetailId ? Number(eventDetailId) : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn ghế</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{marginVertical: 20}} />
        ) : error ? (
          <Text style={{color: 'red', textAlign: 'center', marginVertical: 20}}>{error}</Text>
        ) : (
          <View style={styles.legendContainer}>
            {legendTicketTypes.map((ticketType, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: ticketType.color }]} />
                <Text style={styles.legendText}>{ticketType.name}</Text>
                <Text style={styles.legendPrice}>{formatPrice(ticketType.price)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.instructionsContainer}>
          <View style={styles.instructionItem}>
            <View style={[styles.seatExample, { backgroundColor: '#fff' }]} />
            <Text style={styles.instructionText}>Ghế trống</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={[styles.seatExample, { backgroundColor: '#00FF99' }]} />
            <Text style={styles.instructionText}>Ghế đã chọn</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={[styles.seatExample, { backgroundColor: '#666' }]} />
            <Text style={styles.instructionText}>Ghế đã bán</Text>
          </View>
        </View>

        <SeatMap
          seatBlocks={seatMapLayout}
          selectedSeat={selectedSeat}
          handleSeatPress={handleSeatPress}
          SVG_WIDTH={SVG_WIDTH}
          seatRadius={seatRadius}
          seatGap={seatGap}
          seatDiameter={seatDiameter}
          blockPadding={blockPadding}
          blockVerticalPadding={blockVerticalPadding}
          rowGap={rowGap}
          seats={seats}
        />
        <EventInfo eventDetailId={selectedEventDetailId} />
      </ScrollView>

      <FixedButtons
        selectedSeat={selectedSeat}
        setShowTicketInfo={setShowTicketInfo}
      />
      <TicketInfoModal
        visible={showTicketInfo}
        onClose={() => setShowTicketInfo(false)}
      />
      <SeatDetailModal
        visible={!!selectedSeat}
        selectedSeat={selectedSeat}
        seatBlocks={seatMapLayout}
        legendTicketTypes={legendTicketTypes}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 140,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#222',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    minWidth: '45%',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 5,
  },
  legendPrice: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#222',
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatExample: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#555',
  },
  instructionText: {
    color: '#fff',
    fontSize: 11,
  },
});