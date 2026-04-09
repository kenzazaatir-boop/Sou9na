import { useParams } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Heart, Share2, Check, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';
import { useCart } from '@/store';
import { getProductSEO, getProductSchema } from '@/lib/seo';
import { getProducts, getArtisanById } from '@/lib/data';
import type { Product as ProductType, Artisan } from '@/types';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      nameAr: product.nameAr,
      artisan: product.artisan,
      price: product.price,
      quantity,
      image: product.image,
      ecoScore: product.ecoScore,
    });
    toast.success(`${language === 'ar' && product.nameAr ? product.nameAr : product.name} ${t('catalog.addedToCart')}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        const found = allProducts.find(p => p.id === Number(id));
        if (found) {
          setProduct(found);
          // Fetch artisan info
          if (found.artisanId) {
            const artisanData = await getArtisanById(found.artisanId);
            setArtisan(artisanData);
          }
          // Fetch related products
          const related = allProducts
            .filter(p => p.category === found.category && p.id !== found.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
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
                <Button 
                  size="lg" 
                  className="gradient-terracotta text-white flex-1"
                  onClick={handleAddToCart}
                >
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

          {/* Detailed Info Tabs/Sections */}
          <div className="mt-16 grid lg:grid-cols-3 gap-12">
            {/* Characteristics & Description */}
            <div className="lg:col-span-2 space-y-12">
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5 text-terracotta" />
                    {language === 'ar' ? 'المواصفات التقنية' : 'Caractéristiques Techniques'}
                  </h2>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                            <td className="py-4 px-6 font-medium text-gray-700 w-1/3 border-b border-gray-100">{key}</td>
                            <td className="py-4 px-6 text-gray-600 border-b border-gray-100">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {product.careInstructions && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {language === 'ar' ? 'تعليمات العناية' : 'Conseils d\'Entretien'}
                  </h2>
                  <div className="bg-terracotta/5 rounded-2xl p-6 border border-terracotta/10">
                    <p className="text-gray-700 italic">{product.careInstructions}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Artisan Sidebar */}
            <div className="space-y-8">
              {artisan && (
                <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                  
                  <div className="relative z-10 text-center">
                    <img 
                      src={artisan.image} 
                      alt={artisan.name} 
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-soft mb-4"
                    />
                    <h3 className="text-xl font-black text-gray-900 mb-1">
                      {language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name}
                    </h3>
                    <p className="text-terracotta font-medium text-sm mb-4 uppercase tracking-widest">
                      {language === 'ar' && artisan.specialtyAr ? artisan.specialtyAr : artisan.specialty}
                    </p>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-4 italic">
                      {language === 'ar' && artisan.bioAr ? artisan.bioAr : artisan.bio}
                    </p>
                    <Link to={`/artisans/${artisan.id}`}>
                      <Button variant="outline" className="w-full rounded-full border-terracotta text-terracotta hover:bg-terracotta hover:text-white">
                        {language === 'ar' ? 'عرض الملف الشخصي' : 'Voir le Profil Artisan'}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  {language === 'ar' ? 'منتجات ذات صلة' : 'Produits Similaires'}
                </h2>
                <Link to="/catalog" className="text-terracotta font-bold hover:underline">
                  {language === 'ar' ? 'مشاهدة الكل' : 'Voir tout le catalogue'}
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all border border-gray-100 flex flex-col h-full">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-terracotta transition-colors line-clamp-1">
                          {language === 'ar' && p.nameAr ? p.nameAr : p.name}
                        </h3>
                        <p className="text-terracotta font-black">{p.price} {t('catalog.currency')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
