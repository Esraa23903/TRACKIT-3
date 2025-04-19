import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // New flag to track if auth has been initialized
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  // Added function to check permissions
  hasPermission: (permission: string) => boolean;
  // Initialize auth state
  initAuth: () => Promise<void>;
}

// Define permissions for different user types
const userPermissions = {
  business: [
    'view_dashboard',
    'view_inventory',
    'add_product',
    'scan_barcode',
    'book_event',
    'place_order',
    'track_order',
    'view_sales_report',
    'view_profile',
  ],
  supplier: [
    'view_supplier_dashboard',
    'view_inventory',
    'add_product',
    'manage_orders',
    'view_profile',
  ],
  organizer: [
    'view_dashboard',
    'manage_events',
    'add_event',
    'approve_event',
    'reject_event',
    'view_profile',
  ],
};

// Mock user for demo purposes
const mockUser: User = {
  id: 'u1',
  name: 'Mariam Mostafa',
  email: 'mariam@trackit.com',
  businessName: "Mostafa's Gourmet Market",
  userType: 'business',
  avatar: undefined
};

// Mock supplier user
const mockSupplierUser: User = {
  id: 's1',
  name: 'Global Coffee Suppliers',
  email: 'contact@globalcoffee.com',
  businessName: 'Global Coffee Suppliers',
  userType: 'supplier',
  avatar: undefined
};

// Mock event organizer user
const mockOrganizerUser: User = {
  id: 'o1',
  name: 'Cairo Events',
  email: 'events@cairoevents.com',
  businessName: 'Cairo Events Management',
  userType: 'organizer',
  avatar: undefined
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false, // Start as not initialized
      
      // Initialize auth state - called when app starts
      initAuth: async () => {
        // This will be called after hydration from storage
        set({ isInitialized: true });
      },
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, check email to determine user type
        if (email.includes('supplier') || email.includes('globalcoffee')) {
          set({
            user: mockSupplierUser,
            isAuthenticated: true,
            isLoading: false
          });
        } else if (email.includes('event') || email.includes('organizer')) {
          set({
            user: mockOrganizerUser,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          // Default to business user
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },

      signup: async (userData: Partial<User>, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a new user with the provided data and some defaults
        const newUser: User = {
          id: `u${Date.now()}`, // Generate a unique ID
          name: userData.name || '',
          email: userData.email || '',
          businessName: userData.businessName,
          userType: userData.userType || 'business',
          avatar: userData.avatar
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false
        });
      },
      
      // Function to check if the current user has a specific permission
      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        
        const userType = user.userType;
        return userPermissions[userType]?.includes(permission) || false;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // When storage is rehydrated, we need to initialize auth
        if (state) {
          state.initAuth();
        }
      }
    }
  )
);