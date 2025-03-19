
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { ThemedView } from '@/components/ThemedView';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function SplashScreenPage() {
  useEffect(() => {
    // Hide the Expo splash screen
    SplashScreen.hideAsync();
    
    // Timer to navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
