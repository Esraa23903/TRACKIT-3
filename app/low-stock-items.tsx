import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { products } from '@/mocks/products';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';

// HIGHLIGHT: New screen for low stock items
export default function LowStockItemsScreen() {
  const router = useRouter();
  
  // Filter products with low stock
  const lowStockProducts = products.filter(product => product.stock < product.lowStockThreshold);

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: '/product-details',
      params: { id: productId }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Low Stock Items',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.neutral.extraLightGray },
          headerTitleStyle: { color: Colors.neutral.black, fontWeight: '600' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={Colors.neutral.black} />
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.header}>
        <View style={styles.warningBanner}>
          <AlertTriangle size={20} color={Colors.status.warning} />
          <Text style={styles.warningText}>
            {lowStockProducts.length} products below minimum stock level
          </Text>
        </View>
      </View>

      <FlatList
        data={lowStockProducts}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => handleProductPress(item.id)} 
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <AlertTriangle size={48} color={Colors.neutral.lightGray} />
            <Text style={styles.emptyText}>No Low Stock Items</Text>
            <Text style={styles.emptySubtext}>All your products are above minimum stock levels</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => router.push('/new-order')}
        >
          <Text style={styles.orderButtonText}>Order Inventory</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.extraLightGray,
  },
  header: {
    padding: 16,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.status.warning + '20',
    padding: 12,
    borderRadius: 8,
  },
  warningText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.neutral.darkGray,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.neutral.gray,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  orderButton: {
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
});