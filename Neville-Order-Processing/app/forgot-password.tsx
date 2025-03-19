
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const colorScheme = useColorScheme();

  const handleSubmit = () => {
    // Basic email validation
    if (!email) {
      setErrorMsg('Please enter your email address');
      return;
    }
    
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send a reset password request
    // For demo purposes, we'll just navigate back to login
    setErrorMsg('');
    
    // Show confirmation and navigate back
    alert('Password reset instructions have been sent to your email.');
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Forgot Password</ThemedText>
      <ThemedText style={styles.instructions}>
        Enter your email address below and we'll send you instructions to reset your password.
      </ThemedText>
      
      <TextInput
        style={[styles.input, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
      />
      
      {errorMsg ? <ThemedText style={styles.errorText}>{errorMsg}</ThemedText> : null}
      
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ThemedText>Back to Login</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#0760f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});
