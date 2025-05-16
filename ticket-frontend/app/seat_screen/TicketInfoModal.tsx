import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export default function TicketInfoModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.ticketInfoModalContainer}>
        <View style={styles.ticketInfoModal}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Trạng thái ghế
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <View style={styles.statusDot} />
            <Text style={styles.statusLabel}>Đang trống</Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: "#00FF99", marginLeft: 16 },
              ]}
            />
            <Text style={styles.statusLabel}>Đang chọn</Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: "#F44336", marginLeft: 16 },
              ]}
            />
            <Text style={styles.statusLabel}>Không chọn được</Text>
          </View>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 8,
            }}
          >
            Giá Vé
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <View style={[styles.priceDot, { backgroundColor: "#F44336" }]} />
            <Text style={styles.priceLabel}>PREMIUM</Text>
            <Text style={styles.priceValue}>2.900.000 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <View style={[styles.priceDot, { backgroundColor: "#FFD966" }]} />
            <Text style={styles.priceLabel}>VIP</Text>
            <Text style={styles.priceValue}>2.200.000 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <View style={[styles.priceDot, { backgroundColor: "#4FC3F7" }]} />
            <Text style={styles.priceLabel}>STANDARD 1</Text>
            <Text style={styles.priceValue}>1.500.000 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <View style={[styles.priceDot, { backgroundColor: "#A389F4" }]} />
            <Text style={styles.priceLabel}>STANDARD 2</Text>
            <Text style={styles.priceValue}>860.000 đ</Text>
          </View>
          <TouchableOpacity
            style={styles.closeTicketInfoBtn}
            onPress={onClose}
          >
            <Text
              style={{ color: "#00FF99", fontWeight: "bold", fontSize: 16 }}
            >
              Đóng
            </Text>
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
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#888",
  },
  statusLabel: {
    color: "#fff",
    marginRight: 8,
    fontSize: 14,
  },
  priceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  priceLabel: {
    color: "#fff",
    fontSize: 15,
    width: 110,
  },
  priceValue: {
    color: "#00FF99",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
  closeTicketInfoBtn: {
    alignSelf: "center",
    marginTop: 18,
    padding: 8,
  },
});