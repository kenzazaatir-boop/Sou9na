import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Award, ShoppingBag, 
  ChevronRight, Instagram, Facebook, 
  Calendar, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/store/LanguageContext';
import { useSEO } from '@/hooks';
import { getArtisanById, getProducts } from '@/lib/data';
import type { Artisan, Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { SlideIn, FadeIn } from '@/components/animations';
import { b2bMatches } from '@/lib/b2bData';
import { Recycle } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://soukna.com';

export function ArtisanDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [artisanProducts, setArtisanProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const artisanMatches = artisan ? b2bMatches.filter(m => m.supplierId === artisan.id || m.consumerId === artisan.id) : [];
  const hasEcoBadge = artisanMatches.length > 0;

  const artisanSchema = artisan ? {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artisan.name,
    jobTitle: artisan.specialty,
    description: artisan.bio,
    image: artisan.image.startsWith('http') ? artisan.image : `${BASE_URL}/${artisan.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: artisan.location,
      addressCountry: "TN"
    },
    worksFor: {
      "@type": "Organization",
      name: "Soukna",
      url: BASE_URL
    },
    sameAs: [
      artisan.socialLinks?.instagram ? `https://instagram.com/${artisan.socialLinks.instagram.replace('@', '')}` : null,
      artisan.socialLinks?.facebook ? `https://facebook.com/${artisan.socialLinks.facebook}` : null,
    ].filter(Boolean),
    hasCredential: artisan.certifications?.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      name: cert
    })) || []
  } : null;

  const artisanDescription = artisan
    ? `${artisan.name}, artisan${artisan.specialty ? ` spécialisé en ${artisan.specialty}` : ''} de ${artisan.location}, Tunisie. ${artisan.yearsExperience} ans d'expérience. ${artisan.productsCount} créations disponibles sur Soukna.`
    : 'Découvrez les artisans tunisiens sur Soukna, marketplace d\'artisanat authentique.';

  const { SEOComponent } = useSEO({
    customMeta: {
      title: artisan ? `${artisan.name} - ${artisan.specialty} | Artisan Tunisien Soukna` : 'Artisan Tunisien | Soukna',
      description: artisanDescription,
      canonicalUrl: artisan ? `${BASE_URL}/artisan/${artisan.id}` : undefined,
      ogImage: artisan ? (artisan.image.startsWith('http') ? artisan.image : `${BASE_URL}/${artisan.image}`) : undefined,
      ogType: 'profile',
      keywords: artisan ? [
        artisan.name,
        artisan.specialty,
        artisan.location,
        'artisan tunisien',
        'artisanat tunisie',
        'Soukna'
      ] : [],
    },
    schemas: artisanSchema ? [artisanSchema] : [],
  });

  useEffect(() => {
    const fetchArtisanData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const artisanData = await getArtisanById(Number(id));
        if (artisanData) {
          setArtisan(artisanData);
          const allProducts = await getProducts();
          const filtered = allProducts.filter(p => p.artisanId === Number(id));
          setArtisanProducts(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch artisan detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtisanData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">{t('common.error')}</h2>
        <Link to="/artisans">
          <Button variant="outline">{t('common.back')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-background relative pt-20 lg:pt-24">
        {/* Background blobs */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-warm-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-terracotta transition-colors">{t('nav.home')}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <Link to="/artisans" className="hover:text-terracotta transition-colors">{t('nav.artisans')}</Link>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            <span className="text-gray-900 font-medium">{artisan.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Visual Section */}
            <SlideIn direction="left" className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                <img
                  src={artisan.image.startsWith('http') ? artisan.image : `${import.meta.env.BASE_URL}${artisan.image}`}
                  alt={artisan.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Rating Badge */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-2 border border-white/20 shadow-xl">
                  <Star className="w-5 h-5 text-warm-gold fill-warm-gold" />
                  <span className="text-white text-lg font-black">{artisan.rating}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                {artisan.socialLinks?.instagram && (
                  <a 
                    href={`https://instagram.com/${artisan.socialLinks.instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center text-gray-900 hover:text-white hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {artisan.socialLinks?.facebook && (
                  <a 
                    href={`https://facebook.com/${artisan.socialLinks.facebook}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center text-gray-900 hover:text-white hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
              </div>
            </SlideIn>

            {/* Information Section */}
            <FadeIn className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-bold uppercase tracking-widest mb-6">
                  <Award className="w-4 h-4" />
                  {language === 'ar' ? artisan.specialtyAr : artisan.specialty}
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-tight">
                  {language === 'ar' ? artisan.nameAr : artisan.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 font-semibold text-lg">
                  <MapPin className="w-5 h-5 text-terracotta" />
                  {language === 'ar' ? artisan.locationAr : artisan.location}
                </div>

                {hasEcoBadge && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-olive/20 to-terracotta/20 border border-olive/30 rounded-2xl">
                    <Recycle className="w-5 h-5 text-olive" />
                    <span className="font-bold text-gray-900">Badge Éco-Boucle ♻️</span>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-gray-900">{artisan.yearsExperience}+</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{language === 'ar' ? 'سنة خبرة' : 'Ans d\'Exp'}</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-gray-900">{artisan.totalSales}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{language === 'ar' ? 'مبيعات' : 'Ventes'}</p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-gray-900">{artisan.productsCount}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{language === 'ar' ? 'إبداعات' : 'Créations'}</p>
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {language === 'ar' ? 'قصتي' : 'À propos de moi'}
                </h2>
                <div className="p-8 rounded-[2rem] bg-[#faf9f8] border border-gray-100 relative">
                  <div className="absolute top-0 right-0 p-8 text-6xl text-terracotta/10 font-serif leading-none italic pointer-events-none">"</div>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">
                    {language === 'ar' ? artisan.bioAr : artisan.bio}
                  </p>
                </div>
              </div>

              {/* Certifications */}
              {artisan.certifications && artisan.certifications.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-wider">
                    {language === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications & Labels'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {artisan.certifications.map((cert, i) => (
                      <span key={i} className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-bold shadow-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Circular Connections */}
              {hasEcoBadge && (
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-wider">
                    {language === 'ar' ? 'روابط الاقتصاد الدائري' : 'Connexions Circulaires (B2B)'}
                  </h2>
                  <div className="space-y-3">
                    {artisanMatches.map(match => {
                      const isSupplier = match.supplierId === artisan.id;
                      return (
                        <div key={match.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                            <Recycle className="w-5 h-5 text-olive" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {isSupplier ? 'Fournit des déchets à ' : 'Utilise les déchets de '}
                              <Link to={`/artisan/${isSupplier ? match.consumerId : match.supplierId}`} className="text-terracotta hover:underline">
                                Artisan #{isSupplier ? match.consumerId : match.supplierId}
                              </Link>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{match.material}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </FadeIn>
          </div>

          {/* Artisan's Products */}
          <div className="mt-32">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
                  {language === 'ar' ? 'مجموعتي' : 'Ma Collection'}
                </h2>
                <p className="text-gray-500 font-medium text-lg">
                  {language === 'ar' ? `كل الإبداعات المصنوعة يدوياً من قبل ${artisan.nameAr}` : `Découvrez les créations authentiques de ${artisan.name}`}
                </p>
              </div>
              <Link to="/catalog">
                <Button variant="ghost" className="hidden sm:flex text-terracotta font-bold hover:bg-terracotta/5 rounded-full px-6">
                  {t('common.viewAll')} <ChevronRight className="w-4 h-4 ml-2 rtl:rotate-180" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {artisanProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-soft hover:shadow-card transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.nameAr : product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 truncate mb-1">
                      {language === 'ar' ? product.nameAr : product.name}
                    </h3>
                    <p className="text-terracotta font-black text-lg">{product.price} DT</p>
                  </div>
                </Link>
              ))}
            </div>

            {artisanProducts.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">{language === 'ar' ? 'لا توجد منتجات حاليا' : 'Aucun produit disponible pour le moment'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
