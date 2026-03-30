import { supabase, isMockMode } from './supabase';
import type { Product, Artisan } from '@/types';

// --- MOCK DATA FOR FALLBACK ---

const MOCK_ARTISANS: Artisan[] = [
  {
    id: 1,
    name: 'Fatma Ben Ali',
    location: 'Nabeul',
    specialty: 'Agro-alimentaire',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
    totalSales: 450,
    productCount: 12,
  },
  {
    id: 2,
    name: 'Mohamed Trabelsi',
    location: 'Sfax',
    specialty: 'Agro-alimentaire',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
    totalSales: 320,
    productCount: 8,
  }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Huile d\'Olive Extra Vierge',
    description: 'Huile pressée à froid issue des oliviers centenaires de Sfax.',
    price: 35.00,
    category: 'alimentaire',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80',
    artisan: 'Mohamed Trabelsi',
    location: 'Sfax',
    rating: 4.8,
    reviews: 189,
    ecoScore: 95,
    stock: 30,
    tags: ['Bio', 'Traditionnel'],
  }
];

// --- Artisans ---

export async function getArtisans(): Promise<Artisan[]> {
  if (isMockMode) return MOCK_ARTISANS;

  const { data, error } = await supabase
    .from('artisans')
    .select('*')
    .order('name');

  if (error || !data) {
    console.error('Error fetching artisans from Supabase:', error);
    return MOCK_ARTISANS; // Fallback to mock on error
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    specialty: item.specialty,
    location: item.location,
    rating: Number(item.rating),
    image: item.image?.startsWith('/') ? item.image.slice(1) : item.image,
    totalSales: item.total_sales || 0,
    productCount: item.products_count || 0,
  }));
}

// --- Products ---

export async function getProducts(options?: {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  if (isMockMode) return MOCK_PRODUCTS;

  let query = supabase
    .from('products')
    .select('*, artisans(name, location)')
    .order('created_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.minPrice) {
    query = query.gte('price', options.minPrice);
  }

  if (options?.maxPrice) {
    query = query.lte('price', options.maxPrice);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching products from Supabase:', error);
    return MOCK_PRODUCTS;
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: item.category,
    image: item.image?.startsWith('/') ? item.image.slice(1) : item.image,
    artisan: item.artisans?.name || 'Artisan Inconnu',
    location: item.artisans?.location || 'Tunisie',
    rating: Number(item.rating) || 0,
    reviews: item.reviews_count || 0,
    ecoScore: item.eco_score || 0,
    stock: item.stock || 0,
    tags: item.tags || [],
  }));
}

export async function getProductById(id: string | number): Promise<Product | null> {
  if (isMockMode) {
    return MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, artisans(name, location)')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    image: data.image,
    artisan: data.artisans?.name || 'Artisan Inconnu',
    location: data.artisans?.location || data.location || 'Tunisie',
    rating: Number(data.rating),
    reviews: data.reviews,
    ecoScore: data.eco_score,
    stock: data.stock,
    tags: data.tags || [],
  };
}
