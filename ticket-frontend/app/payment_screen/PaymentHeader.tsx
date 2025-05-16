import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentHeader({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <View style={styles.backBtnCircle}>
          <Ionicons name="chevron-back" size={26} color="#2ECC40" />
        </View>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Thanh toán</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#21C064",
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 36,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  backBtn: {
    position: "absolute",
    left: 12,
    top: 25,
    bottom: 0,
    justifyContent: "center",
    zIndex: 2,
    paddingRight: 16,
  },
  backBtnCircle: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
});
