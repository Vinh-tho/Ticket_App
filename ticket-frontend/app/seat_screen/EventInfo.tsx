import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { useLocalSearchParams } from 'expo-router';

// Định nghĩa kiểu dữ liệu cho thông tin sự kiện
interface EventDetailResponse {
  id: number;
  location: string;
  startTime: string;
  endTime: string;
  description?: string;
  status: string;
  capacity: number;
  detailImageUrl?: string;
  event?: {
    id: number;
    eventName: string;
    mainImageUrl?: string;
  };
}

// Nhận eventDetailId từ props, nếu không có thì lấy từ URL params
export default function EventInfo(props: { eventDetailId?: string | number }) {
  const params = useLocalSearchParams();
  let id: string | undefined = undefined;
  if (props.eventDetailId) {
    id = String(props.eventDetailId);
  } else if (typeof params.eventDetailId === 'string') {
    id = params.eventDetailId;
  }

  const [eventDetail, setEventDetail] = useState<EventDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hàm format thời gian từ ISO string thành định dạng ngày tháng dễ đọc
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('vi-VN');
    } catch (e) {
      return "Không có dữ liệu";
    }
  };

  // Hàm format thời gian từ ISO string thành định dạng giờ dễ đọc
  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "Không có dữ liệu";
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get<EventDetailResponse>(`${API_URL}/events-detail/${id}`);
        if (response.data) {
          setEventDetail(response.data);
        } else {
          setError('Không có dữ liệu từ API');
        }
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin sự kiện');
        setLoading(false);
      }
    };
    fetchEventDetail();
  }, [id]);

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có eventDetailId</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!eventDetail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có dữ liệu từ API</Text>
      </View>
    );
  }

  // Sử dụng dữ liệu từ API
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={20} color="#22c55e" />
          <Text style={styles.infoText}>
            {eventDetail.startTime ? formatDate(eventDetail.startTime) : "Không có dữ liệu"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={20} color="#22c55e" />
          <Text style={styles.infoText}>
            {eventDetail.startTime ? formatTime(eventDetail.startTime) : "Không có dữ liệu"}
          </Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={20} color="#22c55e" />
          <Text style={styles.infoText}>
            {eventDetail.location || "Không có dữ liệu"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="people" size={20} color="#22c55e" />
          <Text style={styles.infoText}>
            {eventDetail.capacity ? `${eventDetail.capacity} chỗ` : "Không có dữ liệu"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c313a",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  errorText: {
    color: "#ff4545",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  descriptionContainer: {
    marginTop: 16, 
    backgroundColor: "#2c313a",
    borderRadius: 12,
    padding: 12,
  },
  descriptionTitle: {
    color: "#22c55e",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
});