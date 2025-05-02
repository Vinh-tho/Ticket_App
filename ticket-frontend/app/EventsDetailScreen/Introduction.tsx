import { View, Text, StyleSheet } from "react-native";

export default function Introduction({ event }: { event: any }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>GIỚI THIỆU</Text>
      <Text style={styles.description}>{event.detail?.description}</Text>
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
  description: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 22,
  },
});