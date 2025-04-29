import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const TRENDING_EVENTS = [
  { id: "1", src: require("../../assets/images/TrendingEvent_index/1.png") },
  { id: "2", src: require("../../assets/images/TrendingEvent_index/2.png") },
  { id: "3", src: require("../../assets/images/TrendingEvent_index/3.png") },
  { id: "4", src: require("../../assets/images/TrendingEvent_index/4.png") },
];
export default function Eventss() {
  return (
    <View>
      <View style={styles.trendingHeader}>
        <Text style={styles.sectionTitle}>🔥Sự kiện xu hướng</Text>
      </View>
      <FlatList
        data={TRENDING_EVENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.trendingEventContainer}>
            <Image source={item.src} style={styles.trendingEventImage} />
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
  trendingHeader: {
    flexDirection: "row",
    alignItems: "center", // Căn giữa theo chiều dọc
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
    width: width * 0.65, // Làm hình chữ nhật ngang
    height: height * 0.18, // Điều chỉnh chiều cao
    resizeMode: "cover",
    marginHorizontal: -2, // Giảm khoảng cách ngang
    borderRadius: 10,
  },
});
