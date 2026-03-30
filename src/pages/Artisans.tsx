import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { SlideIn } from '@/components/animations';
import type { Artisan } from '@/types';

import { getArtisans } from '@/lib/data';

export function Artisans() {
  const { t } = useLanguage();
  const { SEOComponent } = useSEO();
  
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      setIsLoading(true);
      try {
        const data = await getArtisans();
        setArtisans(data);
      } catch (error) {
        console.error('Failed to fetch artisans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtisans();
  }, [t]);

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-background relative pt-4">
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero */}
        <div className="relative overflow-hidden bg-[#faf9f8] border-b border-border/40">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-warm-gold/10 to-transparent rounded-full blur-[80px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10 animate-slide-up">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-white/40 text-terracotta text-sm font-bold tracking-widest uppercase mb-8 shadow-sm">
                <Star className="w-4 h-4 fill-terracotta" />
                {t('artisans.tagline')}
              </div>
              <h1 className="text-5xl lg:text-[5.5rem] font-black text-gray-900 mb-8 tracking-tighter leading-[1] group">
                {t('artisans.title').split('Artisans')[0]}<span className="text-gradient inline-block">{t('artisans.title').includes('Artisans') ? 'Artisans' : 'الحرفيين'}</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium max-w-2xl">
                {t('artisans.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-8 space-y-6 shadow-soft border border-gray-50">
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <div className="space-y-3">
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                  </div>
                ))
              ) : (
                artisans.map((artisan, index) => (
                  <SlideIn
                    key={artisan.id}
                    direction="up"
                    delay={index * 0.1}
                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-card border border-gray-50 hover:border-terracotta/20 transition-all duration-700 hover-lift"
                  >
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                      
                      <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 border border-white/20 shadow-lg">
                        <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                        <span className="text-white text-sm font-black">{artisan.rating}</span>
                      </div>
  
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                          <MapPin className="w-4 h-4 text-terracotta" />
                          {artisan.location}
                        </div>
                        <h3 className="text-white font-black text-3xl tracking-tight leading-none">{artisan.name}</h3>
                      </div>
                    </div>
  
                    <div className="p-8">
                      <span className="inline-block px-3 py-1 rounded-lg bg-terracotta/10 text-terracotta text-sm font-bold mb-5 tracking-wide uppercase">
                        {artisan.specialty}
                      </span>
  
                      <p className="text-gray-600 leading-relaxed font-medium mb-6 line-clamp-3">
                        {artisan.description}
                      </p>
  
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t('artisans.creations')}</span>
                          <span className="text-lg font-bold text-gray-900">{artisan.productsCount}</span>
                        </div>
                        <Button variant="ghost" className="group/btn text-gray-900 hover:text-terracotta hover:bg-terracotta/5 font-semibold rounded-full px-5 transition-colors">
                          {t('artisans.discover')}
                          <span className="bg-gray-100 group-hover/btn:bg-terracotta/10 rounded-full w-8 h-8 flex items-center justify-center ml-3 rtl:mr-3 rtl:ml-0 transition-colors">
                            <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </SlideIn>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
