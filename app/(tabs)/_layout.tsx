import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2ec276", // Màu chữ khi active
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#282828', // Chuyển Tab Bar thành màu đen
          borderTopColor: 'transparent', // Ẩn viền trên
        },
        tabBarInactiveTintColor: '#FFFF', // Màu chữ khi không active
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Ticket"
        options={{
          title: "Vé của tôi",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ticket" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
