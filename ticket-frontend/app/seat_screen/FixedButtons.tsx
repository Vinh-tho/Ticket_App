import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface FixedButtonsProps {
  selectedSeat: {
    blockIdx: number;
    rowIdx: number;
    seatIdx: number;
  } | null;
  setShowTicketInfo: (show: boolean) => void;
}

export default function FixedButtons({ selectedSeat, setShowTicketInfo }: FixedButtonsProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setShowTicketInfo(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {selectedSeat ? (
          <>
            <View style={styles.seatInfo}>
              <Ionicons name="ticket" size={24} color="#22c55e" />
              <Text style={styles.seatText}>
                Ghế {String.fromCharCode(65 + selectedSeat.rowIdx)}
                {selectedSeat.seatIdx + 1}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => selectedSeat && setShowTicketInfo(true)}
            >
              <Text style={styles.changeButtonText}>Thay đổi</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noSeatText}>Vui lòng chọn ghế</Text>
        )}
      </View>

      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedSeat && styles.continueButtonDisabled,
          ]}
          onPress={handlePress}
          disabled={!selectedSeat}
        >
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seatInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  seatText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#2c313a",
  },
  changeButtonText: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "600",
  },
  noSeatText: {
    color: "#666",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#2c313a",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});