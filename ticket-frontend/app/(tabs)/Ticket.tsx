import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "@/constants/config";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { TicketList } from "@/app/Ticket/TicketList";
import { TicketModal } from "@/app/Ticket/TicketModal";
import { TicketOrder } from "@/app/Ticket/types";
import { checkForNewOrUpdatedTickets, getSampleTickets } from "@/app/Ticket/utils";

export default function Ticket() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketOrder[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketOrder | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkLoginAndFetch = async () => {
        try {
          const token = await SecureStore.getItemAsync("access_token");
          if (!token) {
            router.replace("/LoginScreen");
          } else {
            setLoading(false);
            fetchTickets(token);
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra đăng nhập:", error);
          router.replace("/LoginScreen");
        }
      };
      checkLoginAndFetch();
    }, [])
  );

  const mapApiDataToTicketOrder = (apiData: any): TicketOrder[] => {
    if (!apiData || !Array.isArray(apiData)) {
      console.warn("Dữ liệu API không phải là mảng:", apiData);
      return [];
    }

    return apiData.map(item => {
      let eventName = "Không xác định";
      let seat = "Chưa chọn";
      let type = "Tiêu chuẩn";
      let eventDate = undefined;
      let location = undefined;
      let price = item.totalAmount;
      let quantity = 1;
      
      if (item.orderDetails && Array.isArray(item.orderDetails) && item.orderDetails.length > 0) {
        const firstDetail = item.orderDetails[0];
        
        if (firstDetail.quantity) {
          quantity = firstDetail.quantity;
        }
        
        if (firstDetail.ticket) {
          if (firstDetail.ticket.event) {
            if (firstDetail.ticket.event.eventName) {
              eventName = firstDetail.ticket.event.eventName;
            } else if (firstDetail.ticket.event.name) {
              eventName = firstDetail.ticket.event.name;
            }
            
            if (firstDetail.ticket.event.location) {
              location = firstDetail.ticket.event.location;
            } else if (firstDetail.ticket.event.eventDetails && firstDetail.ticket.event.eventDetails.length > 0) {
              location = firstDetail.ticket.event.eventDetails[0].location;
            }
            
            if (firstDetail.ticket.event.eventDate) {
              eventDate = firstDetail.ticket.event.eventDate;
            } else if (firstDetail.ticket.event.eventDetails && firstDetail.ticket.event.eventDetails.length > 0) {
              eventDate = firstDetail.ticket.event.eventDetails[0].startTime;
            }
          }
          
          if (!eventName || eventName === "Không xác định") {
            if (firstDetail.ticket.eventName) {
              eventName = firstDetail.ticket.eventName;
            }
          }
          
          if (firstDetail.ticket.seat) {
            seat = firstDetail.ticket.seat;
          } else if (firstDetail.ticket.seatNumber) {
            seat = firstDetail.ticket.seatNumber;
          }
          
          if (firstDetail.ticket.type) {
            type = firstDetail.ticket.type;
          } else if (firstDetail.ticket.ticketType) {
            type = firstDetail.ticket.ticketType;
          }
          
          if (!eventDate) {
            if (firstDetail.ticket.eventDate) {
              eventDate = firstDetail.ticket.eventDate;
            }
          }
          
          if (!location) {
            if (firstDetail.ticket.location) {
              location = firstDetail.ticket.location;
            }
          }
        }
        
        if (firstDetail.unitPrice) {
          price = firstDetail.unitPrice;
        } else if (firstDetail.ticket && firstDetail.ticket.price) {
          price = firstDetail.ticket.price;
        }
      }
      
      let formattedDate = item.orderDate;
      try {
        if (item.orderDate && typeof item.orderDate === 'string') {
          const date = new Date(item.orderDate);
          formattedDate = date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      } catch (e) {
        console.warn("Lỗi khi định dạng ngày:", e);
      }
      
      const ticket: TicketOrder = {
        id: item.id?.toString() || item._id?.toString() || "N/A",
        eventName: eventName,
        type: type,
        seat: seat,
        orderDate: formattedDate || item.createdAt || new Date().toISOString(),
        status: item.status || "pending",
        price: parseFloat(price) || 0,
        quantity: quantity
      };
      
      if (eventDate) {
        ticket.eventDate = eventDate;
      }
      
      if (location) {
        ticket.location = location;
      }
      
      return ticket;
    });
  };

  const fetchEventInfo = async (ticketId: number, ticketObj: TicketOrder) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) return ticketObj;

      const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.event) {
        const eventData = response.data.event;
        
        return {
          ...ticketObj,
          eventName: eventData.eventName || eventData.name || ticketObj.eventName,
          eventDate: eventData.eventDate || (eventData.eventDetail ? eventData.eventDetail.eventDate : undefined) || ticketObj.eventDate,
          location: eventData.location || (eventData.eventDetail ? eventData.eventDetail.location : undefined) || ticketObj.location
        };
      }
      
      return ticketObj;
    } catch (error) {
      console.log(`Không thể lấy thông tin sự kiện cho vé ${ticketId}:`, error);
      return ticketObj;
    }
  };

  const fetchTickets = async (token: string) => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${BASE_URL}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Dữ liệu vé từ API:", res.data);
      
      let newTickets: TicketOrder[] = [];
      
      if (res.data && res.data.data) {
        newTickets = mapApiDataToTicketOrder(res.data.data);
      } else if (res.data && Array.isArray(res.data)) {
        newTickets = mapApiDataToTicketOrder(res.data);
      } else {
        console.warn("Cấu trúc dữ liệu không như mong đợi:", res.data);
        if (process.env.NODE_ENV === 'development') {
          console.log("Sử dụng dữ liệu mẫu để kiểm tra");
          newTickets = getSampleTickets();
        }
      }
      
      const ticketsWithEvents = await Promise.all(
        newTickets.map(async (ticket) => {
          if (ticket.eventName === "Không xác định" && 
              ticket.orderDetails && 
              ticket.orderDetails.length > 0 && 
              ticket.orderDetails[0].ticket && 
              ticket.orderDetails[0].ticket.id) {
            
            return await fetchEventInfo(ticket.orderDetails[0].ticket.id, ticket);
          }
          return ticket;
        })
      );
      
      if (tickets.length > 0) {
        const hasNewOrUpdated = checkForNewOrUpdatedTickets(tickets, ticketsWithEvents);
        setHasNotification(hasNewOrUpdated);
      }
      
      setTickets(ticketsWithEvents);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách vé:", err);
      setTickets([]);
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Sử dụng dữ liệu mẫu để kiểm tra");
        setTickets(getSampleTickets());
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      fetchTickets(token);
    }
  };

  const handleTicketPress = (ticket: TicketOrder) => {
    console.log("Dữ liệu vé được chọn:", ticket);
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#21C064" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        <Text style={styles.headerTitle}>Vé của tôi</Text>
        {hasNotification && (
          <View style={styles.notificationDot} />
        )}
      </View>
      <TicketList
        tickets={tickets}
        onTicketPress={handleTicketPress}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onBrowsePress={() => router.push('/(tabs)')}
      />
      <TicketModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        ticket={selectedTicket}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21C064",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  notificationDot: {
    position: "absolute",
    right: 20,
    top: 18,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
});
