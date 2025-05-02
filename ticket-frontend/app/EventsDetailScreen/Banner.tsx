import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Banner({ event }: { event: any }) {
  
  return (
    <View>
      <Image source={{ uri: event.eventDetail.detailImageUrl }} style={styles.banner} />
      <Text style={styles.title}>{event.eventName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",       // full chiều ngang
    height: 220,         // có thể chỉnh chiều cao nếu muốn
    borderRadius: 0,     // ảnh góc vuông
    marginBottom: 15,
    top: 2,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 38,
    top: 2,
  },
});