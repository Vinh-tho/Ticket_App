import { useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import Header from "../EventsDetailScreen/Header";
import Banner from "../EventsDetailScreen/Banner";
import EventInfo from "../EventsDetailScreen/EventInfo";
import Introduction from "../EventsDetailScreen/Introduction";
import TermsAndConditions from "../EventsDetailScreen/TermsAndConditions";
import TicketInfo from "../EventsDetailScreen/TicketInfo";
import Organizer from "../EventsDetailScreen/Organizer";
import RelatedEvents from "../EventsDetailScreen/RelatedEvents";
import SelectScheduleButton from "../EventsDetailScreen/SelectScheduleButton";
import { BASE_URL } from "@/constants/config";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event detail:", error);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (!event) {
    return <Text style={{ color: "white", marginTop: 40 }}>Đang tải chi tiết...</Text>;
  }

  const COMPONENTS = [
    { id: "1", component: <Header /> },
    { id: "2", component: <Banner event={event} /> },
    { id: "3", component: <EventInfo event={event} /> },
    { id: "4", component: <Introduction event={event} /> },
    { id: "5", component: <TermsAndConditions /> },
    { id: "6", component: <TicketInfo event={event} /> },
    { id: "7", component: <Organizer /> },
    { id: "8", component: <RelatedEvents /> },
    { id: "9", component: <SelectScheduleButton /> },
  ];

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      data={COMPONENTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => item.component}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});