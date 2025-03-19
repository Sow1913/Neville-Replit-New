
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Product } from '@/models/Product';

// Mock data for demo purposes
// In a real app, this would come from an API or database
const generateMockProducts = (start: number, count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: (start + i).toString(),
    name: `Product ${start + i}`,
    code: `PRD${(start + i).toString().padStart(4, '0')}`,
    description: `This is a description for product ${start + i}`,
  }));
};

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  const loadProducts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProducts = generateMockProducts((page - 1) * 20 + 1, 20);
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const handleEndReached = () => {
    if (!loading) {
      loadProducts();
    }
  };

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/edit-product',
      params: { id: product.id, name: product.name, code: product.code, description: product.description }
    });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem} 
      onPress={() => handleProductPress(item)}
    >
      <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
      <ThemedText>{item.code}</ThemedText>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Products</ThemedText>
      </ThemedView>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setSearchText('')}>
            <IconSymbol size={20} name="xmark.circle.fill" color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
      />
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/add-product')}
      >
        <IconSymbol size={24} name="plus" color="#FFFFFF" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  clearButton: {
    position: 'absolute',
    right: 35,
  },
  list: {
    paddingHorizontal: 20,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
