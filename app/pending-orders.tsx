import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { orders } from "@/mocks/orders";
import OrderCard from "@/components/OrderCard"; // Fixed import statement
import { ArrowLeft, ShoppingCart } from "lucide-react-native";

// HIGHLIGHT: New screen for pending orders
export default function PendingOrdersScreen() {
  const router = useRouter();

  // Filter pending orders
  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing"
  );

  const handleOrderPress = (orderId: string) => {
    router.push({
      pathname: "/order-details",
      params: { id: orderId },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Pending Orders",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.neutral.extraLightGray },
          headerTitleStyle: { color: Colors.neutral.black, fontWeight: "600" },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={Colors.neutral.black} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {pendingOrders.length} orders awaiting fulfillment
        </Text>
      </View>

      <FlatList
        data={pendingOrders}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={() => handleOrderPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <ShoppingCart size={48} color={Colors.neutral.lightGray} />
            <Text style={styles.emptyText}>No Pending Orders</Text>
            <Text style={styles.emptySubtext}>
              All your orders have been fulfilled
            </Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.newOrderButton}
          onPress={() => router.push("/new-order")}
        >
          <Text style={styles.newOrderButtonText}>Create New Order</Text>
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
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.gray,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.neutral.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.neutral.gray,
    textAlign: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  newOrderButton: {
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  newOrderButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
