import { useParams } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Heart, Share2, Check, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';
import { getProductSEO, getProductSchema } from '@/lib/seo';
import { getProducts } from '@/lib/data';
import type { Product as ProductType } from '@/types';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        const found = allProducts.find(p => p.id === Number(id));
        setProduct(found || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Button onClick={() => window.history.back()}>Retour</Button>
        </div>
      </div>
    );
  }
  
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
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
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
                  {language === 'ar' && product.nameAr ? product.nameAr : product.name}
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
                {language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description}
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
