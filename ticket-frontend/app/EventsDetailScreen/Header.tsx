import { router, useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <View style={styles.iconCircle}>
            <CaretLeft size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Chi tiết sự kiện</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  header: {
    flexDirection: "column-reverse",
    alignItems: "center",
    backgroundColor: "#2dbc70",
    padding: 15,
    height: 90,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    marginRight: 330,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    top: -32,
  },
});
