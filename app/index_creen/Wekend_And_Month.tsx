import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useRef, useState } from "react";

const WEEKEND_EVENTS = [
  {
    id: "1",
    src: require("../../assets/images/splash.png"),
    title: 'ANH TRAI "SAY HI" CONCERT - ĐÊM 5',
    price: "700.000 đ",
    date: "21 Tháng 03, 2025",
  },
  {
    id: "2",
    src: require("../../assets/images/splash.png"),
    title: "SÂN KHẤU THIÊN ĐỊA - ĐỒ ĐỊNH MỆNH",
    price: "330.000 đ",
    date: "22 Tháng 03, 2025",
  },
];

const MONTH_EVENTS = [
  {
    id: "1",
    src: require("../../assets/images/splash.png"),
    title: "ĐÊM NHẠC TRỰC TUYẾN - THẾ HỆ MỚI",
    price: "500.000 đ",
    date: "15 Tháng 03, 2025",
  },
  {
    id: "2",
    src: require("../../assets/images/splash.png"),
    title: "FESTIVAL DJ - EDM NỔI LOẠN",
    price: "1.200.000 đ",
    date: "30 Tháng 03, 2025",
  },
];

const { width, height } = Dimensions.get("window");

export default function Wekend_And_Month() {
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  const moveIndicator = (position: number) => {
    Animated.timing(indicatorPosition, {
      toValue: position,
      duration: 200, // Thời gian chuyển động
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "weekend") {
      moveIndicator(width - 369); // Vị trí ban đầu (cho "Cuối tuần này")
    } else {
      moveIndicator(width * 0.32); // Điều chỉnh vị trí của "Tháng này"
    }
  };

  const [selectedTab, setSelectedTab] = useState("weekend");


  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress("weekend")}>
          <Text
            style={[
              styles.tabText,
              selectedTab === "weekend" && styles.activeTab,
            ]}
          >
            Cuối tuần này
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress("month")}>
          <Text
            style={[
              styles.tabText,
              selectedTab === "month" && styles.activeTab,
            ]}
          >
            Tháng này
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.indicator,
          { left: indicatorPosition }, // Thay vì left cố định, dùng Animated.Value
        ]}
      />

      <FlatList
        data={selectedTab === "weekend" ? WEEKEND_EVENTS : MONTH_EVENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recommendedEventContainer}>
            <Image source={item.src} style={styles.recommendedEventImage} />
            <Text style={styles.eventTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.eventPrice}>Từ {item.price}</Text>
            <View style={styles.eventDate}>
              <Ionicons name="calendar-outline" size={14} color="gray" />
              <Text style={styles.eventDateText}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 39,
        paddingHorizontal: 96,
      },
    
      tabText: {
        fontSize: 16,
        color: "gray",
        fontWeight: "bold",
        paddingBottom: 5,
        right: 85,
      },
    
      activeTab: {
        color: "white",
      },
    
      tabIndicator: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 13,
      },
    
      indicator: {
        width: "22%",
        height: 5,
        backgroundColor: "#21C064",
        borderRadius: 2,
        position: "absolute",
        top:60,
      },
    
      indicatorRight: {
        left: "50%",
      },
    
      recommendedEventContainer: {
        backgroundColor: "#1e1e1e",
        width: width * 0.6,
        marginLeft: 15,
        borderRadius: 10,
        overflow: "hidden",
        paddingBottom: 10,
        marginTop: 26,
      },
    
      recommendedEventImage: {
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
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
      },
    
      eventDateText: {
        color: "gray",
        fontSize: 12,
        marginLeft: 5,
      },
});
