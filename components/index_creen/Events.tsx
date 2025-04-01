import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";


const EVENTS = [
  { id: "1", src: require("../../assets/images/Events_index/1.png") },
  { id: "2", src: require("../../assets/images/Events_index/2.png") },
  { id: "3", src: require("../../assets/images/Events_index/3.png") },
  { id: "4", src: require("../../assets/images/Events_index/4.png") },
  { id: "5", src: require("../../assets/images/Events_index/5.png") },
];

const { width, height } = Dimensions.get("window");

export default function Events() {
  return (
    <View>
      {/* Sự kiện đặc biệt */}
      <Text style={styles.sectionTitle}>Sự kiện đặc biệt</Text>
      <FlatList
        data={EVENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Image source={item.src} style={styles.eventImage} />
          </View>
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
    marginTop: 38, // Sửa lại marginTop
  },
  eventImage: {
    width: width * 0.48, // Tăng kích thước ngang
    height: height * 0.32, // Tăng chiều cao
    resizeMode: "cover",
    borderRadius: 8, // Giữ góc bo nhẹ
    marginHorizontal: -7, // Giảm khoảng cách ngang
    marginBottom: 4, // Giảm khoảng cách dọc
  },
});
