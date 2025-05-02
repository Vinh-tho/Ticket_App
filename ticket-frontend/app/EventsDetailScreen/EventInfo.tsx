import { View, Text, StyleSheet } from "react-native";

export default function EventInfo({ event }: { event: any }) {
  return (
    <View style={styles.eventInfoContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>
          📅 {new Date(event.eventDetail?.startTime).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
        </Text>
        <Text style={styles.dateTime}>
          🕒 {new Date(event.eventDetail?.startTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
      <Text style={styles.location}>📍 {event.eventDetail?.location || "Chưa rõ"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfoContainer: {
    backgroundColor: "#1a2525",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#2e3a3a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  location: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },
});