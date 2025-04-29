import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DESTINATIONS = [
  {
    id: "1",
    src: require("../../assets/images/splash.png"),
    name: "Tp. Hồ Chí Minh",
  },
  {
    id: "2",
    src: require("../../assets/images/splash.png"),
    name: "Hà Nội",
  },
];

export default function ExploreCities() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Khám phá theo thành phố</Text>
      <FlatList
        data={DESTINATIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.destinationContainer}>
            <Image source={item.src} style={styles.destinationImage} />
            <View style={styles.overlay} />
            <Text style={styles.destinationName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingLeft: 7,
    top: -70,
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
    height: 200,
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
