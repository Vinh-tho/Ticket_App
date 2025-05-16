import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, MapPin } from 'phosphor-react-native';

const { width } = Dimensions.get("window");

export default function Banner({ event }: { event: any }) {
  // Lấy eventDetail đầu tiên từ mảng eventDetails
  const eventDetail = event?.eventDetails?.[0];
  
  return (
    <View style={styles.bannerWrapper}>
      <Image 
        source={{ uri: eventDetail?.detailImageUrl || event?.mainImageUrl }} 
        style={styles.banner} 
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
        style={styles.overlay}
      />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{event?.eventName || 'Event'}</Text>
        <View style={styles.row}>
          <Calendar size={18} color="#fff" weight="bold" />
          <Text style={styles.infoText}>
            {eventDetail?.startTime ? new Date(eventDetail.startTime).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Chưa có"}
            {"  "}
            {eventDetail?.startTime ? new Date(eventDetail.startTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : ""}
          </Text>
        </View>
        <View style={styles.row}>
          <MapPin size={18} color="#fff" weight="bold" />
          <Text style={styles.infoText}>{eventDetail?.location || "Chưa rõ"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    marginTop: 8,
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderRadius: 20,
  },
  infoBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
  },
});