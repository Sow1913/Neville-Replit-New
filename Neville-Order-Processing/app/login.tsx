
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      setErrorMsg('Please enter both username and password');
      return;
    }
    
    // In a real app, you would validate with a server
    // For demo purposes, we'll just navigate to dashboard
    setErrorMsg('');
    router.replace('/dashboard');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Login</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderBottomColor: Colors[colorScheme ?? 'light'].icon }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        />
        <TouchableOpacity 
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <IconSymbol 
            name={showPassword ? "eye.slash.fill" : "eye.fill"} 
            size={20} 
            color={Colors[colorScheme ?? 'light'].icon} 
          />
        </TouchableOpacity>
      </View>
      
      {errorMsg ? <ThemedText style={styles.errorText}>{errorMsg}</ThemedText> : null}
      
      <View style={styles.rememberContainer}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[
            styles.checkbox, 
            rememberMe && styles.checkboxChecked,
            { borderColor: Colors[colorScheme ?? 'light'].icon }
          ]}>
            {rememberMe && (
              <IconSymbol name="checkmark" size={12} color="#ffffff" />
            )}
          </View>
          <ThemedText style={styles.rememberText}>Remember Me</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleForgotPassword}>
          <ThemedText style={styles.forgotText}>Forgot Password</ThemedText>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <ThemedText style={styles.loginButtonText}>Login</ThemedText>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingHorizontal: 10,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#444',
  },
  rememberText: {
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#0760f0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});
