import { View, Text, StyleSheet } from "react-native";
import { Calendar, Clock, MapPin } from 'phosphor-react-native';

export default function EventInfo({ event }: { event: any }) {
  const eventDetail = event?.eventDetails?.[0];
  
  return (
    <View style={styles.eventInfoContainer}>
      <View style={styles.row}>
        <Calendar size={18} color="#222" weight="bold" />
        <Text style={styles.infoText}>
          {eventDetail?.startTime ? new Date(eventDetail.startTime).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Chưa có"}
        </Text>
        <Clock size={18} color="#222" weight="bold" style={{ marginLeft: 16 }} />
        <Text style={styles.infoText}>
          {eventDetail?.startTime ? new Date(eventDetail.startTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "Chưa có"}
        </Text>
      </View>
      <View style={styles.row}>
        <MapPin size={18} color="#222" weight="bold" />
        <Text style={styles.infoText}>{eventDetail?.location || "Chưa rõ"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfoContainer: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#222",
    marginLeft: 8,
    fontWeight: "500",
  },
});