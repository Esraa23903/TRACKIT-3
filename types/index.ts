export interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  userType: 'business' | 'supplier' | 'distributor' | 'organizer';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string;
  image?: string;
  supplier?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  categories: string[];
  rating: number;
  productsCount: number;
}

export interface Order {
  id: string;
  supplierId: string;
  supplierName: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: number;
  isBooked?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockItems: number;
  totalSales: number;
  pendingOrders: number;
  upcomingEvents: number;
  monthlySales: MonthlySales[];
  topSellingProducts: TopSellingProduct[];
  recentOrders: Order[];
}

export interface MonthlySales {
  month: string;
  sales: number;
  unitsSold: number;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface SalesReport {
  totalSales: number;
  totalOrders: number;
  totalUnitsSold: number;
  averageOrderValue: number;
  salesByCategory: SalesByCategory[];
  salesByMonth: SalesByMonth[];
  topProducts: TopProduct[];
}

export interface SalesByCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface SalesByMonth {
  month: string;
  amount: number;
  unitsSold: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface SupplierDashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  topSellingProducts: TopSellingProduct[];
  recentOrders: Order[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}