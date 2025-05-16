import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Animated,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Header from "@/components/SearchScreen/Header";
import SearchResults from "@/components/SearchScreen/SearchResults";
import { searchEvents, SearchEventResult } from "@/services/eventService";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchEventResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const insets = useSafeAreaInsets();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Animate when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const searchResults = await searchEvents(searchQuery);
      setResults(searchResults);
    } catch (err) {
      setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setResults([]);
      setHasSearched(false);
    }
  };
  
  const handleCategorySelect = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#0f172a', '#020617']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View 
              style={[
                styles.container,
                { 
                  paddingTop: insets.top || 40,
                  paddingBottom: insets.bottom || 20,
                  opacity: fadeAnim,
                  transform: [{ translateY: translateY }]
                }
              ]}
            >
              <Header 
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
              />
              
              {hasSearched && (
                <SearchResults 
                  results={results} 
                  loading={loading} 
                  error={error} 
                  searchQuery={searchQuery}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  }
});
