import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StatusBar,
    Animated,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useRef, useState } from "react";

const IMAGES = [
    { id: "1", src: require("../../assets/images/Header_index/1.png") },
    { id: "2", src: require("../../assets/images/Header_index/2.png") },
    { id: "3", src: require("../../assets/images/Header_index/3.png") },
  ];

const { width, height } = Dimensions.get("window");

export default function Header() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
    };
    

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#21C064" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Ticket<Text style={styles.boldText}>box</Text>
        </Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <FlatList
        data={IMAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.src} style={styles.fullWidthImage} />
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {IMAGES.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#21C064",
    height: 80,
  },
  logo: {
    fontSize: 30,
    color: "white",
    fontWeight: "400",
  },
  boldText: {
    fontWeight: "bold",
  },
  fullWidthImage: {
    width: "100%", // Tránh việc tính toán width thủ công
    height: "100%", // Để ảnh luôn full chiều cao của container
    resizeMode: "stretch", // Dãn ảnh để luôn khớp với khung
  },
  imageContainer: {
    width: width, // Kích thước bằng màn hình
    height: height * 0.3, // Điều chỉnh chiều cao nếu cần
    overflow: "hidden", // Đảm bảo không bị tràn ra ngoài
  },
  pagination: {
    position: "absolute",
    bottom: -27, // Đưa chấm lên trên
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Làm nền mờ nhẹ để nhìn rõ
    padding: 5,
    borderRadius: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 40,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#21C064",
    width: 10,
    height: 10,
  },
  detailButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  detailText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
});
