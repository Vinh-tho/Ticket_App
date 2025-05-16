import { View, Text, StyleSheet } from "react-native";

export default function Introduction({ event }: { event: any }) {
  const eventDetail = event?.eventDetails?.[0];
  
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>GIỚI THIỆU</Text>
      <Text style={styles.description}>{eventDetail?.description || "Chưa có mô tả"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#222",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    textAlign: "left",
  },
});