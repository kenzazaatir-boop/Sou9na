import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getArtisans } from '@/lib/data';
import type { Artisan } from '@/types';
import { useLanguage } from '@/store/LanguageContext';
import { useReveal } from '@/hooks/useReveal';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedArtisans() {
  const { language, t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>(0.1);
  const [featured, setFeatured] = useState<Artisan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArtisans().then(data => {
      setFeatured(data.slice(0, 3));
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 ${revealClass}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-terracotta tracking-wider uppercase mb-3">
              {t('home.hero.statsArtisans') || "Nos Artisans"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              {language === 'ar' ? 'اكتشف حرفيينا' : 'Derrière chaque objet, une histoire'}
            </h3>
            <p className="text-muted-foreground text-lg">
              {language === 'ar' 
                ? 'تعرف على الحرفيين الموهوبين الذين يصنعون منتجاتنا بشغف.' 
                : 'Faites la connaissance des femmes et des hommes qui préservent le savoir-faire tunisien avec passion et authenticité.'}
            </p>
          </div>
          <Link to="/artisans">
            <Button variant="outline" className="rounded-full shadow-soft hover:bg-olive hover:text-white hover:border-olive transition-all h-12 px-6 group">
              {language === 'ar' ? 'عرض كل الحرفيين' : 'Voir tous nos artisans'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform rtl:ml-0 rtl:mr-2 rtl:-scale-x-100" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className={`stagger-${i + 1}`}>
                  <Skeleton className="w-full aspect-[4/5] rounded-3xl" />
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : featured.map((artisan, i) => (
            <Link 
              key={artisan.id} 
              to={`/artisan/${artisan.id}`}
              className={`block group stagger-${i + 1} ${revealClass}`}
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-soft hover-lift">
                <img 
                  src={artisan.image} 
                  alt={language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />
                
                {/* Info block */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="text-2xl font-bold text-white">
                      {language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name}
                    </h4>
                  </div>
                  <p className="text-white/80 font-medium mb-4">{artisan.location}</p>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {[artisan.specialty].filter(Boolean).map((spec, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
