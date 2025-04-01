import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

export default function SettingsCard() {
  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Cài đặt</Text>

      {/* Mục Ngôn ngữ */}
      <TouchableOpacity style={styles.option}>
        <IconSymbol name="language" size={20} color="gray" />
        <Text style={styles.optionText}>Ngôn ngữ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    bottom: -20,
    elevation: 2, // Cho Android
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    color: "black",
    marginLeft: 8,
  },
});
