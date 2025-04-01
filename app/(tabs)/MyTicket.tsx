import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from 'react-native';


export default function MyTicket() {
  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>
          <Text style={styles.logo}>
          <Text style={styles.boldText}>Tài khoản</Text>
          </Text>
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
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      backgroundColor: "#2ec276",
      padding: 24,
    },
    logo: {
      fontSize: 20,
      color: "white",
      fontWeight: "400",
      marginTop: 10,
      bottom: -10,
    },
    boldText: {
      fontWeight: "bold",
    },  
  });