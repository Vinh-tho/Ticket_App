import {
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import Header from "@/components/AccountScreen/Header";
import RegisterAndLogin from "@/components/AccountScreen/RegisterAndLogin"
import FacebookFollowCard from "@/components/AccountScreen/FacebookFollowCard";
import SettingsCard from "@/components/AccountScreen/SettingsCard";
import SupportList from "@/components/AccountScreen/SupportList";
import CompanyInfo from "@/components/AccountScreen/CompanyInfo";

const COMPONENTS = [
  { id: "1", component: <Header /> },
  { id: "2", component: <RegisterAndLogin /> },
  { id: "3", component: <FacebookFollowCard /> },
  { id: "4", component: <SettingsCard /> },
  { id: "5", component: <SupportList /> },
  { id: "6", component: <CompanyInfo /> },
];

export default function AccountScreen() {

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
    backgroundColor: "#FFFF",
  },
});
