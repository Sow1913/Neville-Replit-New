
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    code: '',
    description: '',
  });

  const validateInputs = () => {
    const newErrors = {
      name: '',
      code: '',
      description: '',
    };
    
    let isValid = true;
    
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    }
    
    if (!code.trim()) {
      newErrors.code = 'Product code is required';
      isValid = false;
    }
    
    if (!description.trim()) {
      newErrors.description = 'Product description is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateInputs()) {
      // In a real app, this would save to a database
      Alert.alert(
        "Success",
        "Product added successfully!",
        [
          { 
            text: "OK", 
            onPress: () => router.replace('/product-list')
          }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Add Product</ThemedText>
          
          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Product Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              value={name}
              onChangeText={setName}
            />
            {errors.name ? <ThemedText style={styles.errorText}>{errors.name}</ThemedText> : null}
          </ThemedView>
          
          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Product Code</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter product code"
              value={code}
              onChangeText={setCode}
            />
            {errors.code ? <ThemedText style={styles.errorText}>{errors.code}</ThemedText> : null}
          </ThemedView>
          
          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Product Description</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter product description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.description ? <ThemedText style={styles.errorText}>{errors.description}</ThemedText> : null}
          </ThemedView>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <ThemedText style={styles.saveButtonText}>Save</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 120,
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
