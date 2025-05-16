// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen as ExpoRouterSplash } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Đảm bảo Splash Screen của Expo hiển thị
SplashScreen.preventAutoHideAsync();

// Đảm bảo splash screen của expo-router không hiển thị
ExpoRouterSplash.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Ẩn Expo splash screen ngay khi component được tạo
    SplashScreen.hideAsync();
    
    if (loaded) {
      // Ẩn splash screen của expo-router
      ExpoRouterSplash.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Chưa load font thì không render gì
  }

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'fade'
          }}
        />
        <StatusBar 
          style="light" 
          backgroundColor={Platform.OS === 'android' ? '#21C064' : 'transparent'}
          translucent={Platform.OS === 'android'}
        />
      </ThemeProvider>
    </View>
  );
}
