import {
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import LiveMusicEvents from "../../components/index_creen/LiveMusicEvents";
import TrendingEvent from "../../components/index_creen/TrendingEvent"
import Events from "../../components/index_creen/Events";
import Recommendation from "../../components/index_creen/Recommendation"
import Wekend_And_Month from "../../components/index_creen/Wekend_And_Month";
import Header from "../../components/index_creen/Header";
import InterestingDestinations from "../../components/index_creen/InterestingDestinations";


const COMPONENTS = [
  { id: "1", component: <Header /> },
  { id: "2", component: <Events /> },
  { id: "3", component: <TrendingEvent /> },
  { id: "4", component: <Recommendation /> },
  { id: "5", component: <Wekend_And_Month /> },
  { id: "6", component: <LiveMusicEvents /> },
  { id: "7", component: <InterestingDestinations /> },
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
    backgroundColor: "#282828",
  },
});
