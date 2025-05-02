import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AccountScreen from '../account_screens/AccountScreen';
import ProfileScreen from '../account_screens/ProfileScreen';
import { ActivityIndicator, View } from 'react-native';

export default function AccountTab() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setIsLoggedIn(!!token); // true nếu có token, false nếu không
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    // Chờ kiểm tra token xong
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <ProfileScreen /> : <AccountScreen />;
}