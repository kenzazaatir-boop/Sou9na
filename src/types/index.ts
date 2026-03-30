/**
 * Global Type Definitions for Soukna Marketplace
 */

// ===== PRODUCT & ARTISAN TYPES =====
export interface Product {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  artisan: string;
  artisanId?: number;
  location: string;
  locationAr?: string;
  category: string;
  categoryAr?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  ecoScore: number;
  tags: string[];
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Artisan {
  id: number;
  name: string;
  nameAr?: string;
  specialty: string;
  specialtyAr?: string;
  location: string;
  locationAr?: string;
  rating: number;
  totalSales: number;
  productCount: number;
  productsCount?: number; // Alias for consistency
  image: string;
  description?: string; // New field for UI
  bio?: string;
  bioAr?: string;
  yearsExperience?: number;
  certifications?: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
}

export interface Region {
  id: number;
  name: string;
  nameAr: string;
  artisanCount: number;
  productCount: number;
  avgRating: number;
  specialties: string[];
  lat: number;
  lng: number;
}

// ===== CART & ORDER TYPES =====
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  artisan: string;
  price: number;
  quantity: number;
  image: string;
  ecoScore?: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  lastUpdated: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

// ===== USER & AUTH TYPES =====
export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  type: 'client' | 'artisan'; // client or artisan
  avatar?: string;
  bio?: string;
  address?: Address;
  createdAt?: string;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country?: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// ===== WISHLIST TYPES =====
export interface WishlistItem {
  productId: number;
  addedAt: number;
}

export interface Wishlist {
  items: WishlistItem[];
  totalItems: number;
}

// ===== FILTER TYPES =====
export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  locations: string[];
  ecoScore: number;
  tags: string[];
  search: string;
}

export interface FilterState {
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// ===== NOTIFICATION TYPES =====
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ===== REVIEW TYPES =====
export interface Review {
  id: number;
  productId: number;
  userId: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  helpful: number;
}

// ===== SEO TYPES =====
export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  keywords?: string[];
}
