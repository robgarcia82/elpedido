import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Geist_400Regular,
  Geist_500Medium,
} from '@expo-google-fonts/geist';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Geist-Regular': Geist_400Regular,
    'Geist-Medium': Geist_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#4C7DFE" size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <HomeScreen />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
