const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data_processed.json', 'utf-8'));

const products = data.MOCK_PRODUCTS;
const artisans = data.MOCK_ARTISANS;

const productsCode = products.map(p => {
  const tagsStr = p.tags.map(t => `'${t}'`).join(', ');
  const imgStr = p.image.replace(/'/g, "\\'");
  const nameStr = p.name.replace(/'/g, "\\'");
  const descStr = (p.description || p.name).replace(/'/g, "\\'");
  const artisanStr = p.artisan.replace(/'/g, "\\'");
  return `  {
    id: ${p.id},
    name: '${nameStr}',
    description: '${descStr}',
    price: ${p.price},
    category: '${p.category}',
    image: '${imgStr}',
    artisan: '${artisanStr}',
    artisanId: ${p.artisanId || 1},
    location: '${p.location}',
    rating: ${p.rating},
    reviews: ${p.reviews},
    ecoScore: ${p.ecoScore},
    stock: ${p.stock},
    tags: [${tagsStr}],
  }`;
}).join(',\n');

const artisansCode = artisans.map(a => {
  const certsStr = (a.certifications || []).map(c => `'${c.replace(/'/g, "\\'")}'`).join(', ');
  const bioStr = (a.bio || '').replace(/'/g, "\\'");
  const bioArStr = (a.bioAr || '').replace(/'/g, "\\'");
  const nameArStr = (a.nameAr || '').replace(/'/g, "\\'");
  const socialLinks = a.socialLinks ? `{ ${Object.entries(a.socialLinks).map(([k,v]) => `${k}: '${v}'`).join(', ')} }` : '{}';
  return `  {
    id: ${a.id},
    name: '${a.name}',
    nameAr: '${nameArStr}',
    location: '${a.location}',
    locationAr: '${(a.locationAr || '').replace(/'/g, "\\'")}',
    specialty: '${(a.specialty || '').replace(/'/g, "\\'")}',
    specialtyAr: '${(a.specialtyAr || '').replace(/'/g, "\\'")}',
    rating: ${a.rating},
    image: '${a.image}',
    totalSales: ${a.totalSales},
    productCount: ${a.productCount},
    productsCount: ${a.productsCount || a.productCount},
    bio: '${bioStr}',
    bioAr: '${bioArStr}',
    yearsExperience: ${a.yearsExperience || 10},
    certifications: [${certsStr}],
    socialLinks: ${socialLinks},
  }`;
}).join(',\n');

const output = `import { supabase, isMockMode } from './supabase';
import type { Product, Artisan } from '@/types';

// --- RICH ARTISAN DATABASE (8 Artisans) ---

const MOCK_ARTISANS: Artisan[] = [
${artisansCode}
];

// --- PRODUCT CATALOG (75 Products scraped from Souk El Kahina) ---

const MOCK_PRODUCTS: Product[] = [
${productsCode}
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
    return MOCK_ARTISANS;
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
    console.error(\`Error fetching product \${id}:\`, error);
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
`;

fs.writeFileSync('src/lib/data.ts', output);
console.log('Successfully wrote src/lib/data.ts with', products.length, 'products and', artisans.length, 'artisans!');
