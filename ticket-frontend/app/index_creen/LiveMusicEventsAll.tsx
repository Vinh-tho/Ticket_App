import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BASE_URL } from "@/constants/config";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

interface Event {
  id: number;
  mainImageUrl: string;
  eventName: string;
  eventDetails: {
    detailImageUrl: string;
    startTime: string;
    price: number;
    category?: string;
  }[];
}

export default function LiveMusicEventsAll() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tất cả sự kiện nhạc sống</Text>
          <View style={{ width: 40 }} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#21C064" style={{ flex: 1, justifyContent: 'center' }} />
        ) : (
          <FlatList
            data={events}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item }) => {
              const sortedDetails = (item.eventDetails || []).filter(e => e.startTime).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
              const firstDetail = sortedDetails[0];
              const formattedDate = firstDetail?.startTime 
                ? new Date(firstDetail.startTime).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })
                : "Chưa có ngày";
              const formattedPrice = firstDetail?.price 
                ? `${firstDetail.price.toLocaleString('vi-VN')} đ`
                : "Miễn phí";
              return (
                <TouchableOpacity
                  style={styles.eventContainer}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/events_detail/${item.id}`)}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: firstDetail?.detailImageUrl || item.mainImageUrl }} style={styles.eventImage} />
                    <View style={styles.imageOverlay} />
                    <Text style={styles.eventTitleOverlay} numberOfLines={2}>{item.eventName}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.eventPrice}>Từ {formattedPrice}</Text>
                    <View style={styles.eventDateContainer}>
                      <Ionicons name="calendar-outline" size={14} color="gray" />
                      <Text style={styles.eventDateText}>{formattedDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1c1c1c',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  eventContainer: {
    backgroundColor: "#232323",
    borderRadius: 16,
    margin: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    width: width * 0.45,
  },
  imageWrapper: {
    width: "100%",
    height: height * 0.15,
    position: "relative",
    justifyContent: "flex-end",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  eventTitleOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoBox: {
    padding: 10,
  },
  eventPrice: {
    color: "#21C064",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDateText: {
    color: "gray",
    fontSize: 12,
    marginLeft: 5,
  },
}); 