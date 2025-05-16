import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "../../constants/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      let token = await AsyncStorage.getItem("token");
      if (!token) {
        token = await SecureStore.getItemAsync("access_token");
      }
      
      if (!token) {
        Alert.alert("Lỗi", "Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại!");
        router.back();
        return;
      }
      
      const decoded: any = jwtDecode(token);
      console.log("Decoded token:", decoded); // Để debug
      
      try {
        // Fetch user data from API with proper Authorization header
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Nếu API trả về dữ liệu
        if (response.data) {
          setUserData({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          });
        }
      } catch (apiError) {
        console.error("API Error:", apiError);
        
        // Nếu không gọi API được, dùng dữ liệu từ JWT
        setUserData({
          name: decoded.name || "",
          email: decoded.email || "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin người dùng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userData.name.trim()) {
      Alert.alert("Lỗi", "Tên không được để trống");
      return;
    }
    
    setIsSaving(true);
    try {
      let token = await AsyncStorage.getItem("token");
      if (!token) {
        token = await SecureStore.getItemAsync("access_token");
      }
      
      // Gửi dữ liệu cập nhật lên server
      await axios.put(
        `${API_URL}/users/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại sau.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#21C064" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin cá nhân</Text>
        <View style={styles.placeholderView} />
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changeAvatarBtn}>
            <Text style={styles.changeAvatarText}>Đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            placeholder="Nhập họ tên"
          />
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={userData.email}
            editable={false}
          />
          
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={userData.phone}
            onChangeText={(text) => setUserData({ ...userData, phone: text })}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Lưu</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  backButton: {
    padding: 8,
  },
  placeholderView: {
    width: 40, // Để cân bằng với nút back
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarBtn: {
    marginTop: 8,
    padding: 8,
  },
  changeAvatarText: {
    color: "#21C064",
    fontWeight: "600",
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#21C064",
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#21C064",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#21C064",
    borderRadius: 8,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
}); 