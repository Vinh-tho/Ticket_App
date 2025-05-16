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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BASE_URL } from "@/constants/config";

const { width, height } = Dimensions.get("window");

interface Event {
  id: number;
  mainImageUrl: string;
  eventName: string;
  eventDetails: {
    detailImageUrl: string;
    startTime: string;
    price: number;
  }[];
}

export default function Recommendation() {
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendedEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        
        // Xáo trộn mảng sự kiện để lấy ngẫu nhiên
        const shuffledEvents = data.sort(() => Math.random() - 0.5);
        
        // Lấy 4 sự kiện đầu tiên sau khi xáo trộn
        const randomEvents = shuffledEvents.slice(0, 4);
        
        setRecommendedEvents(randomEvents);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sự kiện đề xuất:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedEvents();
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
      <Text style={styles.sectionTitle}>Dành cho bạn</Text>
      <FlatList
        data={recommendedEvents}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Tìm lịch diễn có startTime nhỏ nhất
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
              style={styles.recommendedContainer}
              onPress={() => router.push(`/events_detail/${item.id}`)}
            >
              <Image 
                source={{ uri: firstDetail?.detailImageUrl || item.mainImageUrl }} 
                style={styles.recommendedImage} 
              />
              <Text style={styles.recommendedTitle} numberOfLines={2}>
                {item.eventName}
              </Text>
              <Text style={styles.recommendedPrice}>Từ {formattedPrice}</Text>
              <View style={styles.recommendedDate}>
                <Ionicons name="calendar-outline" size={14} color="gray" />
                <Text style={styles.recommendedDateText}>{formattedDate}</Text>
              </View>
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
  recommendedContainer: {
    backgroundColor: "#1e1e1e",
    width: width * 0.6,
    marginLeft: 15,
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10,
  },
  recommendedImage: {
    width: "100%",
    height: height * 0.15,
    resizeMode: "cover",
  },
  recommendedTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    margin: 5,
  },
  recommendedPrice: {
    color: "#21C064",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  recommendedDate: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  recommendedDateText: {
    color: "gray",
    fontSize: 12,
    marginLeft: 5,
  },
});
