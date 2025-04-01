import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LIVE_MUSIC_EVENTS = [
  {
    id: "1",
    src: require("../../assets/images/splash.png"),
    title: "[THE MIRAGE SHOW] LIVE SHOW BÙI ANH TUẤN & ...",
    price: "600.000 đ",
    date: "05 Tháng 04, 2025",
  },
  {
    id: "2",
    src: require("../../assets/images/splash.png"),
    title: "LULULOLA SHOW VĂN MAI HƯƠNG KM LÂM PH...",
    price: "450.000 đ",
    date: "06 Tháng 04, 2025",
  },
  {
    id: "3",
    src: require("../../assets/images/splash.png"),
    title: "[BẾN THÀNH] Đêm nhạc Tuấn Ngọc - Phương Vy - ...",
    price: "600.000 đ",
    date: "05 Tháng 04, 2025",
  },
  {
    id: "4",
    src: require("../../assets/images/splash.png"),
    title: "GIAI ĐIỆU HOÀNG HÔN",
    price: "600.000 đ",
    date: "06 Tháng 04, 2025",
  },
];

export default function LiveMusicEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Nhạc sống</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>Xem thêm <MaterialIcons name="keyboard-arrow-right" size={18} color="gray" /></Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: height * 0.5 }}>
        <FlatList
          data={LIVE_MUSIC_EVENTS}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              <Image source={item.src} style={styles.eventImage} />
              <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.eventPrice}>Từ {item.price}</Text>
              <Text style={styles.eventDate}>📅 {item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  seeMore: {
    color: "gray",
    fontSize: 14,
  },
  eventContainer: {
    backgroundColor: "#1e1e1e",
    width: width * 0.45,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10,
  },
  eventImage: {
    width: "100%",
    height: height * 0.15,
    resizeMode: "cover",
  },
  eventTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    margin: 5,
  },
  eventPrice: {
    color: "#21C064",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  eventDate: {
    color: "gray",
    fontSize: 12,
    marginLeft: 5,
  },
});
