import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Coffee Beans',
    sku: 'COF-001',
    description: 'High-quality Arabica coffee beans from Colombia',
    category: 'Beverages',
    price: 24.99,
    quantity: 45,
    minStockLevel: 20,
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
    expiryDate: '2024-12-15',
    lastUpdated: '2023-10-05'
  },
  {
    id: 'p2',
    name: 'Organic Flour',
    sku: 'FLR-002',
    description: 'Organic all-purpose flour, perfect for baking',
    category: 'Baking',
    price: 8.99,
    quantity: 12,
    minStockLevel: 15,
    supplierId: 's2',
    supplierName: 'Organic Essentials',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a',
    expiryDate: '2024-06-20',
    lastUpdated: '2023-10-10'
  },
  {
    id: 'p3',
    name: 'Stainless Steel Cutlery Set',
    sku: 'KIT-003',
    description: 'Premium 24-piece stainless steel cutlery set',
    category: 'Kitchen',
    price: 89.99,
    quantity: 8,
    minStockLevel: 5,
    supplierId: 's3',
    supplierName: 'Kitchen Essentials Co.',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1',
    lastUpdated: '2023-09-28'
  },
  {
    id: 'p4',
    name: 'Artisanal Chocolate Bars',
    sku: 'CHC-004',
    description: 'Handcrafted dark chocolate bars with sea salt',
    category: 'Confectionery',
    price: 12.50,
    quantity: 32,
    minStockLevel: 20,
    supplierId: 's4',
    supplierName: 'Sweet Delights',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b',
    expiryDate: '2024-05-10',
    lastUpdated: '2023-10-12'
  },
  {
    id: 'p5',
    name: 'Organic Olive Oil',
    sku: 'OIL-005',
    description: 'Extra virgin olive oil from Italian olives',
    category: 'Cooking',
    price: 18.75,
    quantity: 15,
    minStockLevel: 10,
    supplierId: 's2',
    supplierName: 'Organic Essentials',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
    expiryDate: '2024-08-30',
    lastUpdated: '2023-10-01'
  },
  {
    id: 'p6',
    name: 'Ceramic Dinner Plates',
    sku: 'DIN-006',
    description: 'Set of 6 handmade ceramic dinner plates',
    category: 'Dining',
    price: 65.00,
    quantity: 4,
    minStockLevel: 8,
    supplierId: 's3',
    supplierName: 'Kitchen Essentials Co.',
    image: 'https://images.unsplash.com/photo-1578079957245-8d6f6e3a5b9b',
    lastUpdated: '2023-09-15'
  },
  {
    id: 'p7',
    name: 'Specialty Tea Collection',
    sku: 'TEA-007',
    description: 'Assorted specialty teas from around the world',
    category: 'Beverages',
    price: 32.99,
    quantity: 18,
    minStockLevel: 12,
    supplierId: 's1',
    supplierName: 'Global Coffee Suppliers',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
    expiryDate: '2024-11-05',
    lastUpdated: '2023-10-08'
  },
  {
    id: 'p8',
    name: 'Gourmet Spice Set',
    sku: 'SPC-008',
    description: 'Collection of 12 premium spices in glass jars',
    category: 'Cooking',
    price: 45.50,
    quantity: 7,
    minStockLevel: 5,
    supplierId: 's5',
    supplierName: 'Spice Traders',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
    expiryDate: '2025-01-15',
    lastUpdated: '2023-09-20'
  }
];