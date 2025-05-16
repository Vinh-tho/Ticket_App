import { router, useRouter } from "expo-router";
import { CaretLeft, ShareNetwork } from "phosphor-react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerOverlay, { paddingTop: insets.top, minHeight: 48 }]} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.iconCircle, styles.backButton]}
      >
        <CaretLeft size={24} color="#222" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.iconCircle, styles.shareButton]}
      >
        <ShareNetwork size={22} color="#222" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerOverlay: {
    position: "absolute",
    top: 36,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    height: 48,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    left: 0,
  },
  shareButton: {
    right: 0,
  },
});
