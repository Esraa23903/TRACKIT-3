import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '@/types';
import Colors from '@/constants/colors';
import { Package, Truck, ShoppingCart } from 'lucide-react-native';

interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

export default function OrderCard({ order, onPress }: OrderCardProps) {
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
      case 'cancelled':
        return Colors.status.error;
      default:
        return Colors.neutral.gray;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Package size={16} color={Colors.status.success} />;
      case 'shipped':
        return <Truck size={16} color={Colors.status.info} />;
      case 'processing':
        return <ShoppingCart size={16} color={Colors.status.warning} />;
      case 'pending':
        return <ShoppingCart size={16} color={Colors.neutral.gray} />;
      case 'cancelled':
        return <ShoppingCart size={16} color={Colors.status.error} />;
      default:
        return <ShoppingCart size={16} color={Colors.neutral.gray} />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(order)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Order #{order.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          {getStatusIcon(order.status)}
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.supplierName}>{order.supplierName}</Text>
        <Text style={styles.orderDate}>{formatDate(order.orderDate)}</Text>
      </View>
      
      <View style={styles.items}>
        {order.items.map((orderItem, index) => (
          <Text key={index} style={styles.itemText} numberOfLines={1}>
            {orderItem.quantity}x {orderItem.productName}
          </Text>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral.black,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral.darkGray,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.neutral.gray,
  },
  items: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.neutral.gray,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.burgundy,
  },
});