import { useParams } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Heart, Share2, Check, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';
import { getProductSEO, getProductSchema } from '@/lib/seo';
import type { Product as ProductType } from '@/types';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  const products: ProductType[] = useMemo(() => [
    {
      id: 1,
      name: t('catalog.products.0.name'),
      artisan: 'Fatma Ben Ali',
      location: t('home.map.regions.nabeul'),
      category: t('catalog.categories.alimentaire'),
      price: 12,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.0.description'),
      ecoScore: 92,
      tags: ['bio', 'traditionnel'],
      stock: 15,
    },
    {
      id: 2,
      name: t('catalog.products.1.name'),
      artisan: 'Mohamed Trabelsi',
      location: t('home.map.regions.sfax'),
      category: t('catalog.categories.alimentaire'),
      price: 35,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.1.description'),
      ecoScore: 95,
      tags: ['bio', 'premium'],
      stock: 24,
    },
    {
      id: 3,
      name: t('catalog.products.2.name'),
      artisan: 'Ahmed Gharbi',
      location: t('home.map.regions.zaghouan'),
      category: t('catalog.categories.alimentaire'),
      price: 45,
      rating: 5.0,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.1.description'),
      ecoScore: 88,
      tags: ['traditionnel'],
      stock: 8,
    },
    {
      id: 4,
      name: t('catalog.products.3.name'),
      artisan: 'Salma Hamdi',
      location: t('home.map.regions.tozeur'),
      category: t('catalog.categories.alimentaire'),
      price: 28,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.0.description'),
      ecoScore: 90,
      tags: ['bio', 'naturel'],
      stock: 45,
    },
    {
      id: 5,
      name: t('catalog.products.4.name'),
      artisan: 'Amina Bouaziz',
      location: t('home.map.regions.kairouan'),
      category: t('catalog.categories.artisanat'),
      price: 450,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.1.description'),
      ecoScore: 85,
      tags: ['fait main', 'luxe'],
      stock: 3,
    },
    {
      id: 6,
      name: t('catalog.products.5.name'),
      artisan: 'Karim Jaziri',
      location: t('home.map.regions.nabeul'),
      category: t('catalog.categories.artisanat'),
      price: 85,
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.0.description'),
      ecoScore: 78,
      tags: ['fait main', 'décoration'],
      stock: 12,
    },
    {
      id: 7,
      name: t('catalog.products.6.name'),
      artisan: 'Nadia Slimani',
      location: t('home.map.regions.tunis'),
      category: t('catalog.categories.textile'),
      price: 55,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.1.description'),
      ecoScore: 87,
      tags: ['fait main', 'coton'],
      stock: 20,
    },
    {
      id: 8,
      name: t('catalog.products.7.name'),
      artisan: 'Hedi Romdhane',
      location: t('home.map.regions.mahdia'),
      category: t('catalog.categories.textile'),
      price: 75,
      rating: 4.6,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.0.description'),
      ecoScore: 95,
      tags: ['soie', 'traditionnel'],
      stock: 5,
    },
    {
      id: 9,
      name: t('catalog.products.8.name'),
      artisan: 'Green Pack TN',
      location: t('home.map.regions.tunis'),
      category: t('catalog.categories.ecologique'),
      price: 15,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.1.description'),
      ecoScore: 98,
      tags: ['zéro déchet', 'éco-responsable'],
      stock: 100,
    },
    {
      id: 10,
      name: t('catalog.products.9.name'),
      artisan: 'Samia Khalil',
      location: t('home.map.regions.tunis'),
      category: t('catalog.categories.ecologique'),
      price: 35,
      rating: 4.8,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
      description: t('catalog.products.0.description'),
      ecoScore: 94,
      tags: ['rechargeable', 'éco-responsable'],
      stock: 30,
    },
  ], [t]);

  const product = products.find((p) => p.id === Number(id)) || products[0];
  
  const productSeo = getProductSEO({
    id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    image: product.image,
    artisan: product.artisan,
    price: product.price,
  });

  const productSchema = getProductSchema({
    id: product.id.toString(),
    name: product.name,
    description: product.description || '',
    image: product.image,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
    artisan: product.artisan,
    inStock: product.stock > 0,
  });

  const { SEOComponent } = useSEO({
    customMeta: productSeo,
    schemas: [productSchema],
  });

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-olive/10 text-olive text-sm">
                    {product.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                    {product.rating} ({product.reviews} {t('product.reviews')})
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">
                  {t('product.by')} <span className="text-terracotta font-medium">{product.artisan}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {product.location}
                </div>
                <div className="flex items-center gap-1 text-olive">
                  <Check className="w-4 h-4" />
                  {product.stock > 0 ? t('product.inStock') : t('product.outOfStock')}
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                {product.price} {t('catalog.currency')}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Eco Score */}
              <div className="bg-olive/5 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
                    <span className="text-olive font-bold">{product.ecoScore}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('product.ecoScoreLabel')}</div>
                    <div className="text-sm text-gray-600">{t('product.ecoScoreDesc')}</div>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">{t('product.quantity')}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gradient-terracotta text-white flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('product.addToCart')}
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-olive" />
                  <span className="text-sm text-gray-600">{t('product.freeShippingLimit')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-olive" />
                  <span className="text-sm text-gray-600">{t('product.securePayment')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
