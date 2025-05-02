import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function RelatedEvents() {
  return (
    <View>
      <Text style={styles.sectionTitle}>CÓ THỂ BẠN QUAN TÂM</Text>
      <View style={styles.relatedEventsContainer}>
        <View style={styles.relatedEvent}>
          <Image source={{ uri: "https://via.placeholder.com/150x100" }} style={styles.relatedEventImage} />
          <Text style={styles.relatedEventTitle}>ART WORKSHOP: STRAWBERRY DOUBL...</Text>
          <Text style={styles.relatedEventPrice}>Từ 390.000 đ</Text>
          <Text style={styles.relatedEventDate}>20 Tháng 04, 2025</Text>
        </View>
        <View style={styles.relatedEvent}>
          <Image source={{ uri: "https://via.placeholder.com/150x100" }} style={styles.relatedEventImage} />
          <Text style={styles.relatedEventTitle}>SÂN KHẤU THIẾN ĐƯƠNG: 13 ĐỨ-...</Text>
          <Text style={styles.relatedEventPrice}>Từ 330.000 đ</Text>
          <Text style={styles.relatedEventDate}>24 Tháng 04, 2025</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  relatedEventsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  relatedEvent: {
    width: (width - 50) / 2,
    backgroundColor: "#1a2525",
    borderRadius: 8,
    padding: 10,
  },
  relatedEventImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  relatedEventTitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  relatedEventPrice: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 5,
  },
  relatedEventDate: {
    fontSize: 12,
    color: "#ccc",
  },
});