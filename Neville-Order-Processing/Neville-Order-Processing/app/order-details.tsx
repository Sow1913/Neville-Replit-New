
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Order } from '../models/Order';

// Sample order data
const sampleOrders: Record<string, Order & { items: Array<{ id: string, name: string, quantity: number, price: number }> }> = {
  '1': {
    id: '1',
    customerName: 'John Doe',
    orderDate: new Date().toISOString(),
    totalAmount: 125.99,
    status: 'Completed',
    items: [
      { id: '101', name: 'Product A', quantity: 2, price: 49.99 },
      { id: '102', name: 'Product B', quantity: 1, price: 26.01 }
    ]
  },
  '2': {
    id: '2',
    customerName: 'Jane Smith',
    orderDate: new Date().toISOString(),
    totalAmount: 89.50,
    status: 'Processing',
    items: [
      { id: '103', name: 'Product C', quantity: 1, price: 89.50 }
    ]
  },
  '3': {
    id: '3',
    customerName: 'Michael Johnson',
    orderDate: new Date().toISOString(),
    totalAmount: 230.75,
    status: 'Pending',
    items: [
      { id: '104', name: 'Product D', quantity: 3, price: 45.25 },
      { id: '105', name: 'Product E', quantity: 2, price: 47.50 }
    ]
  }
};

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = sampleOrders[id || '1'];

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back to Orders</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={[
          styles.statusBadge, 
          order.status === 'Completed' ? styles.statusCompleted : 
          order.status === 'Processing' ? styles.statusProcessing : styles.statusPending
        ]}>
          {order.status}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <Text style={styles.customerName}>{order.customerName}</Text>
        <Text style={styles.orderDate}>Order Date: {new Date(order.orderDate).toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {order.items.map(item => (
          <View key={item.id} style={styles.orderItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#1976d2',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 14,
    overflow: 'hidden',
  },
  statusCompleted: {
    backgroundColor: '#e6f7e6',
    color: '#2e7d32',
  },
  statusProcessing: {
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
  },
  statusPending: {
    backgroundColor: '#fff8e1',
    color: '#f57f17',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#757575',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#757575',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
