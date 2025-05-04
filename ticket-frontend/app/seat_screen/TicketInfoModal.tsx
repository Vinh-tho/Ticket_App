import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TicketInfoModal({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.ticketInfoModalContainer}>
        <View style={styles.ticketInfoModal}>
          <View style={styles.dragBar} />
          <Text style={styles.ticketInfoTitle}>Thông tin vé</Text>
          <Text style={styles.ticketInfoTime}>Chi tiết vé sẽ hiển thị ở đây</Text>
          <TouchableOpacity style={styles.closeTicketInfoBtn} onPress={onClose}>
            <Text style={{ color: "#fff" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ticketInfoModalContainer: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "flex-end",
  },
  ticketInfoModal: {
    backgroundColor: "#39393b",
    padding: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: "100%",
    alignItems: "flex-start",
  },
  dragBar: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#888",
    marginBottom: 12,
  },
  ticketInfoTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "left",
  },
  ticketInfoTime: {
    color: "#bbb",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "left",
  },
  closeTicketInfoBtn: {
    alignSelf: "center",
    marginTop: 18,
    padding: 8,
  },
});