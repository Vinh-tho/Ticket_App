import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BottomActions({ selectedSeat, setShowTicketInfo }) {
  return (
    <View style={styles.fixedBtnContainer}>
      <TouchableOpacity
        style={styles.chooseBtn}
        onPress={() => setShowTicketInfo(true)}
        disabled={!selectedSeat}
      >
        <Text style={styles.chooseBtnText}>
          {selectedSeat ? "Xem thông tin vé" : "Chọn ghế để tiếp tục"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedBtnContainer: {
    backgroundColor: "#111",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  chooseBtn: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  chooseBtnText: {
    color: "#bbb",
    fontSize: 16,
    fontWeight: "bold",
  },
});