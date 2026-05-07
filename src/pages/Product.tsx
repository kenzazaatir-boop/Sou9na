import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Shield, 
  Leaf,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';
import { useCart } from '@/store';
import { getProductSEO, getProductSchema } from '@/lib/seo';
import { getProducts, getArtisanById } from '@/lib/data';
import type { Product as ProductType, Artisan } from '@/types';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { b2bMatches } from '@/lib/b2bData';
import { Recycle } from 'lucide-react';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const { addToCart } = useCart();

  const productMatches = artisan ? b2bMatches.filter(m => m.consumerId === artisan.id) : [];

  // Safety fallbacks for SEO (Must be outside any condition for Hooks)
  const dispName = product ? ((language === 'ar' && product.nameAr) ? product.nameAr : product.name) : 'Produit';
  const dispDesc = product ? ((language === 'ar' && product.descriptionAr) ? product.descriptionAr : (product.description || '')) : '';

  const productSeo = getProductSEO({
    id: product?.id.toString() || '0',
    name: dispName,
    description: dispDesc,
    image: product?.image || '',
    artisan: product?.artisan || '',
    price: product?.price || 0,
  });

  const productSchema = getProductSchema({
    id: product?.id.toString() || '0',
    name: dispName,
    description: dispDesc,
    image: product?.image || '',
    price: product?.price || 0,
    rating: product?.rating || 0,
    reviews: product?.reviews || 0,
    artisan: product?.artisan || '',
    inStock: true,
  });

  const { SEOComponent } = useSEO({
    customMeta: productSeo,
    schemas: [productSchema],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        const productIdNum = Number(id);
        const found = allProducts.find(p => p.id === productIdNum);

        if (found) {
          setProduct(found);
          if (found.artisanId) {
            const artisanData = await getArtisanById(found.artisanId);
            setArtisan(artisanData);
          }
          const related = allProducts
            .filter(p => p.category === found.category && p.id !== found.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Critical error in fetchProduct:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr || '',
        artisan: product.artisan,
        price: product.price,
        quantity,
        image: product.image,
        ecoScore: product.ecoScore,
      });
      toast.success(`${language === 'ar' && product.nameAr ? product.nameAr : product.name} ${t('catalog.addedToCart')}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <Skeleton className="h-4 w-48 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-2 gap-4 pt-8">
                 <Skeleton className="h-16 w-full rounded-2xl" />
                 <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-soft border border-dashed max-w-md">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="text-gray-500 mb-8">Nous n'avons pas pu trouver les détails pour le produit avec l'identifiant "{id}".</p>
          <Button onClick={() => window.history.back()} className="rounded-full px-8">
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumb — Accueil > Catalogue > Catégorie > Produit */}
          <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-1 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-terracotta transition-colors font-medium">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link to="/catalog" className="hover:text-terracotta transition-colors font-medium">Catalogue</Link>
            {product.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <Link
                  to={`/catalog?category=${product.category}`}
                  className="hover:text-terracotta transition-colors capitalize font-medium"
                >
                  {t(`catalog.categories.${product.category}`) || product.category}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-900 font-semibold truncate max-w-[200px]">{dispName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-soft border border-gray-100 group">
                <img
                  src={product.image}
                  alt={`${dispName} - Artisanat tunisien par ${product.artisan}, ${product.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  fetchPriority="high"
                  width={600}
                  height={600}
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider">
                    {t(`catalog.categories.${product.category}`)}
                  </span>
                  <div className="flex items-center gap-1 text-olive text-sm font-bold bg-olive/10 px-3 py-1 rounded-full border border-olive/20">
                    <Leaf className="w-3.5 h-3.5" />
                    Eco-Score: {product.ecoScore}%
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-4 leading-tight">
                  {dispName}
                </h1>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-warm-gold text-warm-gold' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} {t('product.reviews')})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 border-l pl-6">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{product.location}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-gray-900">{product.price}</span>
                  <span className="text-lg text-gray-500 font-medium">{t('catalog.currency')}</span>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {dispDesc}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-6 border-t space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-[0_8px_30px_rgb(5,150,105,0.3)] hover:shadow-[0_8px_30px_rgb(5,150,105,0.5)] transition-all transform hover:-translate-y-1"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3 border-2 border-transparent" />
                    {language === 'ar' ? 'أضف للسلة و إدعم الحرفي' : 'Ajouter et soutenir l\'artisan'}
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 rounded-2xl h-11 border-gray-200 hover:border-terracotta hover:text-terracotta">
                    <Heart className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'أضف للمفضلة' : 'Favoris'}
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-2xl h-11 border-gray-200 hover:border-terracotta hover:text-terracotta">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'مشاركة' : 'Partager'}
                  </Button>
                </div>
              </div>

              {/* Réassurance - Confiance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t">
                <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <div className="text-[11px] font-black tracking-wide text-gray-900 uppercase">Paiement sécurisé</div>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <Heart className="w-6 h-6 text-terracotta" />
                  <div className="text-[11px] font-black tracking-wide text-gray-900 uppercase">Soutien direct aux artisans</div>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-warm-gold/10 rounded-2xl border border-warm-gold/20">
                  <CheckCircle className="w-6 h-6 text-warm-gold" />
                  <div className="text-[11px] font-black tracking-wide text-gray-900 uppercase">Fait main en Tunisie</div>
                </div>
              </div>

              {/* Circular Economy Impact */}
              {productMatches.length > 0 && (
                <div className="mt-6 p-6 bg-olive/10 border border-olive/20 rounded-3xl flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-olive flex items-center justify-center shrink-0 shadow-md">
                    <Recycle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Impact Circulaire (Soukna Loops)</h3>
                    <p className="text-sm text-gray-600">
                      Ce produit a été fabriqué en valorisant des matières premières de seconde vie : <strong>{productMatches[0].material}</strong>, provenant de notre réseau d'artisans solidaires (Artisan #{productMatches[0].supplierId}).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details & Artisan Sections */}
          <div className="mt-16 lg:mt-24 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Technical Specifications */}
              {product && product.specifications && typeof product.specifications === 'object' && Object.keys(product.specifications).length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-terracotta rounded-full"></div>
                    {language === 'ar' ? 'المواصفات التقنية' : 'Détails Techniques'}
                  </h2>
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft">
                    <div className="grid">
                      {Object.entries(product.specifications).map(([key, value], idx) => (
                        <div key={key} className={`flex px-8 py-4 border-b border-gray-50 last:border-0 ${idx % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                          <div className="w-1/3 text-gray-500 font-medium text-sm">{key}</div>
                          <div className="w-2/3 text-gray-900 font-bold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Care Instructions */}
              {product && product.careInstructions && (
                <section>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-terracotta rounded-full"></div>
                    {language === 'ar' ? 'نصائح العناية' : 'Entretien & Conseils'}
                  </h2>
                  <div className="bg-olive/5 rounded-3xl p-8 border border-olive/10">
                    <p className="text-gray-700 leading-relaxed italic text-lg line-clamp-4">
                      "{product.careInstructions}"
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Artisan Sidebar */}
            <div className="space-y-8">
              {artisan && (
                <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 relative overflow-hidden group h-fit lg:sticky lg:top-32">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                  
                  <div className="relative z-10 text-center">
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <img 
                        src={artisan.image} 
                        alt={artisan.name} 
                        className="w-full h-full rounded-2xl object-cover shadow-soft"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-warm-gold text-white p-1.5 rounded-lg shadow-lg">
                        <Star className="w-4 h-4 fill-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-1">
                      {language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name}
                    </h3>
                    <p className="text-terracotta font-bold text-sm mb-4 uppercase tracking-widest">
                      {language === 'ar' && artisan.specialtyAr ? artisan.specialtyAr : artisan.specialty}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mb-6 text-gray-500 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {artisan.location}
                    </div>
                    <p className="text-gray-600 text-sm mb-8 line-clamp-4 leading-relaxed">
                      {language === 'ar' && artisan.bioAr ? artisan.bioAr : artisan.bio}
                    </p>
                    <Link to={`/artisan/${artisan.id}`}>
                      <Button variant="outline" className="w-full h-11 rounded-xl border-2 border-terracotta text-terracotta font-bold hover:bg-terracotta hover:text-white transition-all">
                        {language === 'ar' ? 'عرض الملف الشخصي' : 'Portrait Artisan'}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 lg:mt-32">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                    {language === 'ar' ? 'منتجات مشابهة' : 'Produits Similaires'}
                  </h2>
                  <div className="h-1.5 w-24 bg-terracotta rounded-full"></div>
                </div>
                <Link to="/catalog" className="text-terracotta font-bold hover:translate-x-1 transition-transform flex items-center gap-2">
                  {language === 'ar' ? 'مشاهدة الكل' : 'Voir tout le catalogue'}
                  <span className="text-xl">→</span>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => {
                   const pName = (language === 'ar' && p.nameAr) ? p.nameAr : p.name;
                   return (
                  <Link key={p.id} to={`/product/${p.id}`} className="group h-full">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all border border-gray-100 flex flex-col h-full">
                      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-black shadow-sm">
                          {p.ecoScore}% Eco
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-terracotta transition-colors line-clamp-1">
                          {pName}
                        </h3>
                        <div className="flex items-center justify-between mt-4 gap-2">
                          <span className="text-2xl font-black text-gray-900">{p.price} <span className="text-sm font-medium text-gray-400">TND</span></span>
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );})}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
