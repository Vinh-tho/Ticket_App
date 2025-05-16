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
} from "react-native";
import { useRouter } from "expo-router";
import { BASE_URL } from "@/constants/config";

const { width, height } = Dimensions.get("window");

interface Event {
  id: number;
  mainImageUrl: string;
  eventName: string;
  searchCount: number;
  eventDetails: {
    detailImageUrl: string;
  }[];
}

export default function TrendingEvents() {
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        
        // Sắp xếp sự kiện theo số lượt tìm kiếm (searchCount) giảm dần
        const sortedEvents = data.sort((a: Event, b: Event) => b.searchCount - a.searchCount);
        
        // Lấy 3 sự kiện đầu tiên
        const topEvents = sortedEvents.slice(0, 3);
        
        setTrendingEvents(topEvents);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sự kiện xu hướng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#21C064" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.trendingHeader}>
        <Text style={styles.sectionTitle}>🔥Sự kiện xu hướng</Text>
      </View>
      <FlatList
        data={trendingEvents}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const eventDetail = item.eventDetails?.[0];
          return (
            <TouchableOpacity 
              style={styles.trendingEventContainer}
              onPress={() => router.push(`/events_detail/${item.id}`)}
            >
              <Image 
                source={{ uri: eventDetail?.detailImageUrl || item.mainImageUrl }} 
                style={styles.trendingEventImage} 
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 38,
  },
  trendingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    marginTop: -6,
  },
  trendingEventContainer: {
    position: "relative",
    marginLeft: 20,
    marginTop: 10,
    alignItems: "center",
  },
  trendingEventImage: {
    width: width * 0.65,
    height: height * 0.18,
    resizeMode: "cover",
    marginHorizontal: -2,
    borderRadius: 10,
  },
});
