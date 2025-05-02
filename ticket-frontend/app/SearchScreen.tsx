import {
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import Header from "@/components/SearchScreen/Header";
import ExploreGenres  from "@/components/SearchScreen/ExploreGenres";
import ExploreCities from "@/components/SearchScreen/ExploreCities";


const COMPONENTS = [
  { id: "1", component: <Header /> },
  { id: "2", component: <ExploreGenres /> },
  { id: "3", component: <ExploreCities /> },
];

export default function HomeScreen() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }} // Đảm bảo nội dung không bị cắt
      showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
      data={COMPONENTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => item.component}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
});
