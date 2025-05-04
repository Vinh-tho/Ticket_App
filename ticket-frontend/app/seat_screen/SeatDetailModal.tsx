import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SeatDetailModal({ selectedSeat, onClose }) {
  return (
    <Modal visible={!!selectedSeat} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.zoneTitle}>Chi tiết ghế</Text>
          <Text style={styles.zonePrice}>
            {selectedSeat
              ? `Block: ${selectedSeat.blockIdx + 1}, Hàng: ${selectedSeat.rowIdx + 1}, Ghế: ${selectedSeat.seatIdx + 1}`
              : ""}
          </Text>
          <TouchableOpacity style={styles.continueBtn} onPress={onClose}>
            <Text style={styles.continueText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#39393b",
    padding: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: "100%",
    alignItems: "center",
  },
  zoneTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FF99",
    marginBottom: 4,
    textAlign: "center",
  },
  zonePrice: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  continueBtn: {
    backgroundColor: "#00C471",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});