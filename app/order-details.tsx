import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/colors';
import { orders } from '@/mocks/orders';
import { ArrowLeft, Package, Truck, Calendar, MapPin, Phone, Mail, User, Building } from 'lucide-react-native';

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('details');
  
  // Find the order by ID
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen 
          options={{
            title: 'Order Details',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={Colors.neutral.black} />
              </TouchableOpacity>
            ),
          }} 
        />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Order not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return Colors.status.success;
      case 'shipped':
        return Colors.status.info;
      case 'processing':
        return Colors.status.warning;
      case 'pending':
        return Colors.neutral.gray;
      default:
        return Colors.neutral.gray;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: `Order #${order.id}`,
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

      <View style={styles.statusBar}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
        <Text style={styles.orderDate}>Ordered on {formatDate(order.orderDate)}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'details' && styles.activeTab]} 
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Order Details
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'shipping' && styles.activeTab]} 
          onPress={() => setActiveTab('shipping')}
        >
          <Text style={[styles.tabText, activeTab === 'shipping' && styles.activeTabText]}>
            Shipping Info
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'customer' && styles.activeTab]} 
          onPress={() => setActiveTab('customer')}
        >
          <Text style={[styles.tabText, activeTab === 'customer' && styles.activeTabText]}>
            Customer
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'details' && (
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Items</Text>
            
            {order.items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.itemImage} 
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.productName}</Text>
                  <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemQuantity}>{item.quantity} x {formatCurrency(item.price)}</Text>
                    <Text style={styles.itemTotal}>{formatCurrency(item.quantity * item.price)}</Text>
                  </View>
                </View>
              </View>
            ))}
            
            <View style={styles.divider} />
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(order.subtotal)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{formatCurrency(order.shippingCost)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>{formatCurrency(order.tax)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(order.totalAmount)}</Text>
              </View>
            </View>
            
            <View style={styles.paymentContainer}>
              <Text style={styles.sectionTitle}>Payment Information</Text>
              <Text style={styles.paymentMethod}>
                {order.paymentMethod.type} ending in {order.paymentMethod.lastFour}
              </Text>
              <Text style={styles.paymentStatus}>
                Payment Status: <Text style={{ color: Colors.status.success }}>Paid</Text>
              </Text>
            </View>
          </View>
        )}
        
        {activeTab === 'shipping' && (
          <View style={styles.shippingContainer}>
            <View style={styles.addressContainer}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <View style={styles.addressCard}>
                <MapPin size={20} color={Colors.primary.burgundy} style={styles.addressIcon} />
                <View>
                  <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
                  <Text style={styles.addressLine}>
                    {order.shippingAddress.street}
                  </Text>
                  <Text style={styles.addressLine}>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </Text>
                  <Text style={styles.addressLine}>{order.shippingAddress.country}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.trackingContainer}>
              <Text style={styles.sectionTitle}>Tracking Information</Text>
              {order.tracking ? (
                <View>
                  <View style={styles.trackingRow}>
                    <Text style={styles.trackingLabel}>Carrier:</Text>
                    <Text style={styles.trackingValue}>{order.tracking.carrier}</Text>
                  </View>
                  <View style={styles.trackingRow}>
                    <Text style={styles.trackingLabel}>Tracking Number:</Text>
                    <Text style={styles.trackingValue}>{order.tracking.number}</Text>
                  </View>
                  <View style={styles.trackingRow}>
                    <Text style={styles.trackingLabel}>Estimated Delivery:</Text>
                    <Text style={styles.trackingValue}>{formatDate(order.tracking.estimatedDelivery)}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.trackButton}
                    onPress={() => router.push('/shipment-tracking')}
                  >
                    <Truck size={16} color={Colors.neutral.white} />
                    <Text style={styles.trackButtonText}>Track Shipment</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.noTrackingText}>
                  {order.status === 'pending' || order.status === 'processing' 
                    ? 'Tracking information will be available once the order ships.' 
                    : 'No tracking information available.'}
                </Text>
              )}
            </View>
          </View>
        )}
        
        {activeTab === 'customer' && (
          <View style={styles.customerContainer}>
            <View style={styles.customerCard}>
              <View style={styles.customerHeader}>
                <User size={24} color={Colors.primary.burgundy} />
                <Text style={styles.customerName}>{order.customer.name}</Text>
              </View>
              
              <View style={styles.customerInfo}>
                <View style={styles.customerInfoRow}>
                  <Mail size={16} color={Colors.neutral.gray} style={styles.customerInfoIcon} />
                  <Text style={styles.customerInfoText}>{order.customer.email}</Text>
                </View>
                
                <View style={styles.customerInfoRow}>
                  <Phone size={16} color={Colors.neutral.gray} style={styles.customerInfoIcon} />
                  <Text style={styles.customerInfoText}>{order.customer.phone}</Text>
                </View>
                
                <View style={styles.customerInfoRow}>
                  <Building size={16} color={Colors.neutral.gray} style={styles.customerInfoIcon} />
                  <Text style={styles.customerInfoText}>{order.customer.company || 'Not specified'}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contact Customer</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.orderHistoryContainer}>
              <Text style={styles.sectionTitle}>Order History</Text>
              <View style={styles.orderHistoryCard}>
                <View style={styles.orderHistoryItem}>
                  <View style={styles.orderHistoryDot} />
                  <View style={styles.orderHistoryContent}>
                    <Text style={styles.orderHistoryTitle}>Order Placed</Text>
                    <Text style={styles.orderHistoryDate}>{formatDate(order.orderDate)}</Text>
                  </View>
                </View>
                
                {order.status !== 'pending' && (
                  <View style={styles.orderHistoryItem}>
                    <View style={[styles.orderHistoryDot, { backgroundColor: Colors.status.warning }]} />
                    <View style={styles.orderHistoryContent}>
                      <Text style={styles.orderHistoryTitle}>Processing</Text>
                      <Text style={styles.orderHistoryDate}>{formatDate(new Date(new Date(order.orderDate).getTime() + 86400000).toString())}</Text>
                    </View>
                  </View>
                )}
                
                {(order.status === 'shipped' || order.status === 'delivered') && (
                  <View style={styles.orderHistoryItem}>
                    <View style={[styles.orderHistoryDot, { backgroundColor: Colors.status.info }]} />
                    <View style={styles.orderHistoryContent}>
                      <Text style={styles.orderHistoryTitle}>Shipped</Text>
                      <Text style={styles.orderHistoryDate}>{order.tracking ? formatDate(new Date(new Date(order.tracking.estimatedDelivery).getTime() - 259200000).toString()) : 'N/A'}</Text>
                    </View>
                  </View>
                )}
                
                {order.status === 'delivered' && (
                  <View style={styles.orderHistoryItem}>
                    <View style={[styles.orderHistoryDot, { backgroundColor: Colors.status.success }]} />
                    <View style={styles.orderHistoryContent}>
                      <Text style={styles.orderHistoryTitle}>Delivered</Text>
                      <Text style={styles.orderHistoryDate}>{order.tracking ? formatDate(order.tracking.estimatedDelivery) : 'N/A'}</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {order.status === 'pending' && (
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Process Order</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'processing' && (
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Mark as Shipped</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'shipped' && (
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Mark as Delivered</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'delivered' && (
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Create Similar Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.extraLightGray,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.darkGray,
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: Colors.primary.burgundy,
    fontWeight: '500',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.neutral.white,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 14,
    color: Colors.neutral.gray,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.extraLightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary.burgundy,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.gray,
  },
  activeTabText: {
    color: Colors.primary.burgundy,
  },
  scrollView: {
    flex: 1,
  },
  detailsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.black,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  itemSku: {
    fontSize: 12,
    color: Colors.neutral.gray,
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.extraLightGray,
    marginVertical: 16,
  },
  summaryContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.neutral.gray,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.burgundy,
  },
  paymentContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentMethod: {
    fontSize: 16,
    color: Colors.neutral.darkGray,
    marginBottom: 8,
  },
  paymentStatus: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
  },
  shippingContainer: {
    padding: 16,
  },
  addressContainer: {
    marginBottom: 24,
  },
  addressCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addressIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
    marginBottom: 2,
  },
  trackingContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  trackingRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  trackingLabel: {
    fontSize: 14,
    color: Colors.neutral.gray,
    width: 140,
  },
  trackingValue: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
    flex: 1,
  },
  trackButton: {
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  trackButtonText: {
    color: Colors.neutral.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  noTrackingText: {
    fontSize: 14,
    color: Colors.neutral.gray,
    fontStyle: 'italic',
  },
  customerContainer: {
    padding: 16,
  },
  customerCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral.black,
    marginLeft: 12,
  },
  customerInfo: {
    marginBottom: 16,
  },
  customerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerInfoIcon: {
    marginRight: 12,
  },
  customerInfoText: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
  },
  contactButton: {
    backgroundColor: Colors.neutral.extraLightGray,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: Colors.primary.burgundy,
    fontSize: 14,
    fontWeight: '500',
  },
  orderHistoryContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHistoryCard: {
    paddingLeft: 8,
  },
  orderHistoryItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  orderHistoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.neutral.gray,
    marginRight: 12,
    marginTop: 4,
  },
  orderHistoryContent: {
    flex: 1,
  },
  orderHistoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  orderHistoryDate: {
    fontSize: 12,
    color: Colors.neutral.gray,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  primaryButton: {
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.neutral.extraLightGray,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary.burgundy,
    fontSize: 16,
    fontWeight: '600',
  },
});