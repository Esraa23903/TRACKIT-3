// types.ts (or wherever you define shared types)
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }
  
  export enum OrderStatus {
    New = 'new',
    Pending = 'pending',
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
  }
  
  export interface Order {
    id: string;
    supplierId: string;
    supplierName: string;
    status: OrderStatus;
    items: OrderItem[];
    totalAmount: number;
    orderDate: string;
    expectedDelivery?: string;
    trackingNumber?: string;
  }
  
  // Extended Order type with businessName for supplier view
  export interface SupplierOrder extends Order {
    businessName: string;
  }
// supplierOrders.ts
import { SupplierOrder, OrderStatus } from '@/types';

export const supplierOrders: SupplierOrder[] = [
  {
    id: 'so1',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: "Mostafa's Gourmet Market",
    status: OrderStatus.New,
    items: [
      {
        productId: 'p1',
        productName: 'Premium Coffee Beans',
        quantity: 30,
        unitPrice: 24.99
      },
      {
        productId: 'p7',
        productName: 'Specialty Tea Collection',
        quantity: 15,
        unitPrice: 32.99
      }
    ],
    totalAmount: 1244.55,
    orderDate: '2023-10-15',
  },
  {
    id: 'so2',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: 'Artisan Cafe',
    status: OrderStatus.Pending,
    items: [
      {
        productId: 'p1',
        productName: 'Premium Coffee Beans',
        quantity: 25,
        unitPrice: 24.99
      }
    ],
    totalAmount: 624.75,
    orderDate: '2023-10-14',
  },
  {
    id: 'so3',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: 'Urban Brews',
    status: OrderStatus.Processing,
    items: [
      {
        productId: 'p1',
        productName: 'Premium Coffee Beans',
        quantity: 40,
        unitPrice: 24.99
      },
      {
        productId: 'p7',
        productName: 'Specialty Tea Collection',
        quantity: 20,
        unitPrice: 32.99
      }
    ],
    totalAmount: 1659.40,
    orderDate: '2023-10-12',
    expectedDelivery: '2023-10-19',
  },
  {
    id: 'so4',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: 'Coffee Corner',
    status: OrderStatus.Shipped,
    items: [
      {
        productId: 'p1',
        productName: 'Premium Coffee Beans',
        quantity: 35,
        unitPrice: 24.99
      }
    ],
    totalAmount: 874.65,
    orderDate: '2023-10-10',
    expectedDelivery: '2023-10-17',
    trackingNumber: 'GCS-87654321'
  },
  {
    id: 'so5',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: 'Morning Brew Cafe',
    status: OrderStatus.Delivered,
    items: [
      {
        productId: 'p1',
        productName: 'Premium Coffee Beans',
        quantity: 20,
        unitPrice: 24.99
      },
      {
        productId: 'p7',
        productName: 'Specialty Tea Collection',
        quantity: 10,
        unitPrice: 32.99
      }
    ],
    totalAmount: 829.70,
    orderDate: '2023-10-05',
    expectedDelivery: '2023-10-12',
    trackingNumber: 'GCS-12345678'
  },
  {
    id: 'so6',
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    businessName: 'Bean & Leaf',
    status: OrderStatus.New,
    items: [
      {
        productId: 'p7',
        productName: 'Specialty Tea Collection',
        quantity: 25,
        unitPrice: 32.99
      }
    ],
    totalAmount: 824.75,
    orderDate: '2023-10-15',
  }
];
  