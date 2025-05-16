import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "../../components/ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../constants/api";

export default function Name() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  // Hàm để lấy thông tin user từ token hoặc API
  const getUserInfo = async () => {
    let token = await AsyncStorage.getItem("token");
    if (!token) {
      token = await SecureStore.getItemAsync("access_token");
    }
    
    if (token) {
      try {
        // Đầu tiên lấy tên từ token
        const decoded: any = jwtDecode(token);
        let name = decoded.name || decoded.email || "User";
        
        // Sau đó thử lấy từ API nếu có thể
        try {
          const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.name) {
            name = response.data.name;
          }
        } catch (error) {
          console.log("Không lấy được thông tin từ API, dùng thông tin từ token");
        }
        
        setUserName(name);
      } catch (error) {
        setUserName("");
      }
    } else {
      setUserName("");
    }
  };

  // Gọi getUserInfo mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, [])
  );

  const handleEditProfile = () => {
    router.push("/account_screens/EditProfileScreen");
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={require("../../assets/images/avatar.png")}
        style={styles.avatar}
      />
      {/* User Info */}
      <View style={styles.infoSection}>
        <Text style={styles.displayName} numberOfLines={1} ellipsizeMode="tail">
          {userName}
        </Text>
        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Text style={styles.editText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      {/* Ticket Section */}
      <TouchableOpacity style={styles.ticketButton}>
        <IconSymbol name="ticket" size={20} color="#21C064" />
        <Text style={styles.ticketText}>Vé của tôi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
    marginRight: 0,
    bottom: 0,
  },
  infoSection: {
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  displayName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
    maxWidth: 200,
  },
  editBtn: {
    borderWidth: 2,
    borderColor: "#21C064",
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 28,
    alignSelf: "center",
    marginBottom: 8,
  },
  editText: {
    color: "#21C064",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  ticketButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    bottom: 0,
  },
  ticketText: {
    color: "#000",
    marginLeft: 4,
    fontSize: 14,
  },
});
