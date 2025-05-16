import { Redirect } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  // Chuyển hướng trực tiếp đến SplashScreen
  return <Redirect href="/SplashScreen" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21C064',
  },
}); 