import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ Thêm dòng này
import { BASE_URL } from "@/constants/config";

const { width, height } = Dimensions.get("window");

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Dùng router để điều hướng

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Sự kiện đặc biệt</Text>
      <FlatList
        data={events}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/events_detail/${item.id}`)}>
            <View style={styles.eventContainer}>
              <Image source={{ uri: item.mainImageUrl }} style={styles.eventImage} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 38,
  },
  eventImage: {
    width: width * 0.48,
    height: height * 0.32,
    resizeMode: "cover",
    borderRadius: 8,
    marginHorizontal: -5,
    marginBottom: 4,
  },
});
