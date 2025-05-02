import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SelectScheduleButton() {
  return (
    <TouchableOpacity style={styles.selectScheduleButton}>
      <Text style={styles.selectScheduleButtonText}>Chọn lịch diễn</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectScheduleButton: {
    backgroundColor: "#00cc00",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  selectScheduleButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});