import React from "react";
import { View, Text, TextInput, ScrollView, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router

export default function Header() {
  const router = useRouter(); // Lấy router để điều hướng

  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tìm kiếm</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="gray" />
        <TextInput
          placeholder="Nhập từ khóa"
          placeholderTextColor="gray"
          style={styles.searchInput}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Pressable style={styles.filterButton}>
          <Ionicons name="calendar-outline" size={16} color="white" style={styles.filterIcon} />
          <Text style={styles.filterText}>Tất cả các ngày</Text>
        </Pressable>
        <Pressable style={styles.filterButton}>
          <MaterialCommunityIcons name="tune-variant" size={16} color="white" style={styles.filterIcon} />
          <Text style={styles.filterText}>Bộ lọc</Text>
        </Pressable>
      </View>

      {/* Trending Keywords */}
      <View style={styles.sectionSpacing}>
        {['noo phước thịnh', 'ntpmm', 'chị đẹp', 'atsh'].map((term, index) => (
          <Text key={index} style={styles.trendingKeyword}>📈 {term}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    headerContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    headerText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backButton: {
      position: 'absolute',
      left: 0,
    },
    searchBar: {
      backgroundColor: '#18181b',
      borderRadius: 999,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#22c55e',
    },
    searchInput: {
      marginLeft: 8,
      color: '#fff',
      flex: 1,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#27272a',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: '#3f3f46',
    },
    filterIcon: {
      marginRight: 6,
    },
    filterText: {
      color: '#fff',
    },
    sectionSpacing: {
      marginBottom: 24,
    },
    trendingKeyword: {
      color: '#22c55e',
      fontSize: 16,
      marginBottom: 4,
    },
  });
