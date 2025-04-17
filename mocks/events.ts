import { Event } from '@/types';

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Food & Beverage Expo 2023',
    description: 'The largest food and beverage industry trade show featuring the latest products and innovations.',
    date: '2023-11-15',
    time: '09:00 - 18:00',
    location: 'Convention Center, New York, NY',
    organizer: 'F&B Industry Association',
    category: 'Trade Show',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    price: 75.00
  },
  {
    id: 'e2',
    title: 'Sustainable Supply Chain Workshop',
    description: 'Learn strategies for implementing sustainable practices in your supply chain operations.',
    date: '2023-11-22',
    time: '13:00 - 17:00',
    location: 'Business Innovation Hub, Chicago, IL',
    organizer: 'Green Business Network',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    price: 45.00,
    isRegistered: true
  },
  {
    id: 'e3',
    title: 'Restaurant Tech Summit',
    description: 'Discover the latest technology solutions for restaurant management and operations.',
    date: '2023-12-05',
    time: '10:00 - 16:00',
    location: 'Tech Hub, San Francisco, CA',
    organizer: 'Restaurant Innovation Group',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    price: 120.00
  },
  {
    id: 'e4',
    title: 'Inventory Management Masterclass',
    description: 'Advanced techniques for optimizing inventory control and reducing costs.',
    date: '2023-12-12',
    time: '09:30 - 15:30',
    location: 'Business Center, Austin, TX',
    organizer: 'Supply Chain Experts',
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    price: 199.00
  },
  {
    id: 'e5',
    title: 'Local Suppliers Networking Event',
    description: 'Connect with local suppliers and producers to build sustainable business relationships.',
    date: '2023-12-18',
    time: '18:00 - 21:00',
    location: 'Community Hall, Portland, OR',
    organizer: 'Local Business Alliance',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1',
    price: 0.00,
    isRegistered: true
  }
];