import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const RECOMMENDED_EVENTS = [
    {
      id: "1",
      src: require("../../assets/images/splash.png"),
      title: "[FLOWER 1969’s] WORKSHOP SOLID PERFUME - NƯỚC HOA KHÔ",
      price: "279.000 đ",
      date: "23 Tháng 03, 2025",
    },
    {
      id: "2",
      src: require("../../assets/images/splash.png"),
      title: "[THAM QUAN] VƯỜN VOI CON - BABY ELEPHANT",
      price: "80.000 đ",
      date: "01 Tháng 02, 2025",
    },
];

export default function Recommendation() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Dành cho bạn</Text>
      <FlatList
        data={RECOMMENDED_EVENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recommendedContainer}>
            <Image source={item.src} style={styles.recommendedImage} />
            <Text style={styles.recommendedTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.recommendedPrice}>Từ {item.price}</Text>
            <View style={styles.recommendedDate}>
              <Ionicons name="calendar-outline" size={14} color="gray" />
              <Text style={styles.recommendedDateText}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 38, // Sửa lại marginTop
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
