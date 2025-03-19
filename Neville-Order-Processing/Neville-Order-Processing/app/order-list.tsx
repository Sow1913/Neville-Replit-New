
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Order } from '../models/Order';

// Sample order data
const sampleOrders: Order[] = [
  { id: '1', customerName: 'John Doe', orderDate: new Date().toISOString(), totalAmount: 125.99, status: 'Completed' },
  { id: '2', customerName: 'Jane Smith', orderDate: new Date().toISOString(), totalAmount: 89.50, status: 'Processing' },
  { id: '3', customerName: 'Michael Johnson', orderDate: new Date().toISOString(), totalAmount: 230.75, status: 'Pending' },
];

export default function OrderListScreen() {
  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => router.push(`/order-details?id=${item.id}`)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>Order #{item.id}</Text>
        <Text style={[
          styles.statusBadge, 
          item.status === 'Completed' ? styles.statusCompleted : 
          item.status === 'Processing' ? styles.statusProcessing : styles.statusPending
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.orderDate}>
        {new Date(item.orderDate).toLocaleDateString()}
      </Text>
      <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={sampleOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
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
  customerName: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});
