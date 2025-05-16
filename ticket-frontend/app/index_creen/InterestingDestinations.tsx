import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { BASE_URL } from "@/constants/config";

const { width } = Dimensions.get("window");

const DESTINATION_IMAGES: Record<string, any> = {
  "Hà Nội": require("../../assets/images/avatar.png"),
  "Tp. Hồ Chí Minh": require("../../assets/images/facebook.png"),
  // Thêm các địa chỉ khác nếu muốn
};

export default function InterestingDestinations() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        const data = await response.json();
        // Lấy ra các địa chỉ duy nhất
        const addressSet = new Set();
        data.forEach((event: any) => {
          const location = event.eventDetails?.[0]?.location;
          if (location) addressSet.add(location);
        });
        setDestinations(Array.from(addressSet) as string[]);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#21C064" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Điểm đến thú vị</Text>
      <FlatList
        data={destinations}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.destinationContainer}
            onPress={() => router.push({
              pathname: "/index_creen/EventsByDestination",
              params: { destinationName: item }
            })}
          >
            <Image source={DESTINATION_IMAGES[item] || require("../../assets/images/splash.png")} style={styles.destinationImage} />
            <View style={styles.overlay} />
            <Text style={styles.destinationName}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingLeft: 7,
  },
  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  destinationContainer: {
    position: "relative",
    width: width * 0.6,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  destinationImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 128, 0, 0.4)",
    borderRadius: 10,
  },
  destinationName: {
    position: "absolute",
    bottom: 20,
    left: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
