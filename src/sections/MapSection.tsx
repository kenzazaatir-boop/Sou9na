import { useState } from 'react';
import { MapPin, Users, Store, ArrowRight, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/store/LanguageContext';

interface Region {
  id: string;
  name: string;
  artisans: number;
  products: number;
  specialties: string[];
  rating: number;
  x: number;
  y: number;
  color: string;
}

export function MapSection() {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const rawRegions: Region[] = [
    { id: 'tunis', name: 'tunis', artisans: 25, products: 120, specialties: ['textile', 'ecologique'], rating: 4.8, x: 52, y: 18, color: '#c75b39' },
    { id: 'nabeul', name: 'nabeul', artisans: 35, products: 180, specialties: ['poterie', 'conserves'], rating: 4.9, x: 58, y: 22, color: '#d4693f' },
    { id: 'sfax', name: 'sfax', artisans: 20, products: 95, specialties: ['huileOlive', 'menuiserie'], rating: 4.7, x: 42, y: 55, color: '#8b9a46' },
    { id: 'kairouan', name: 'kairouan', artisans: 18, products: 85, specialties: ['tapisMargoum'], rating: 4.8, x: 48, y: 42, color: '#a85d3c' },
    { id: 'sousse', name: 'sousse', artisans: 22, products: 110, specialties: ['artisanatDivers'], rating: 4.6, x: 54, y: 32, color: '#9cb071' },
    { id: 'mahdia', name: 'mahdia', artisans: 12, products: 60, specialties: ['peche', 'tissage'], rating: 4.5, x: 50, y: 48, color: '#7a9a5a' },
    { id: 'gabes', name: 'gabes', artisans: 15, products: 70, specialties: ['dattes'], rating: 4.7, x: 48, y: 62, color: '#b8884a' },
    { id: 'tozeur', name: 'tozeur', artisans: 10, products: 45, specialties: ['dattier'], rating: 4.8, x: 35, y: 58, color: '#c9a86c' },
    { id: 'gafsa', name: 'gafsa', artisans: 8, products: 35, specialties: ['traditionsBerberes'], rating: 4.4, x: 38, y: 68, color: '#8b7355' },
    { id: 'kasserine', name: 'kasserine', artisans: 6, products: 25, specialties: ['tissageRural'], rating: 4.3, x: 40, y: 52, color: '#9a8b7a' },
    { id: 'beja', name: 'beja', artisans: 14, products: 65, specialties: ['bois', 'agriculture'], rating: 4.6, x: 45, y: 25, color: '#7d9b76' },
    { id: 'jendouba', name: 'jendouba', artisans: 9, products: 40, specialties: ['liege'], rating: 4.5, x: 38, y: 22, color: '#6b8e6b' },
    { id: 'zaghouan', name: 'zaghouan', artisans: 11, products: 50, specialties: ['miel'], rating: 4.7, x: 50, y: 28, color: '#daa520' },
    { id: 'monastir', name: 'monastir', artisans: 16, products: 75, specialties: ['textileMaritime'], rating: 4.6, x: 56, y: 38, color: '#5f9ea0' },
    { id: 'medenine', name: 'medenine', artisans: 7, products: 30, specialties: ['ksour'], rating: 4.4, x: 52, y: 72, color: '#cd853f' },
  ];

  const regions: Region[] = rawRegions.map(r => ({
    ...r,
    name: t(`home.map.regions.${r.id}`),
    specialties: r.specialties.map((s: string) => t(`home.map.specialties.${s}`))
  }));

  return (
    <section className="py-24 relative overflow-hidden bg-[#fdfbf7]">
      {/* Decorative Gradients */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-olive/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive/10 text-olive text-sm font-bold tracking-wider uppercase mb-5 shadow-sm border border-olive/10">
            <MapPin className="w-4 h-4" />
            {t('home.map.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight">
            {t('home.map.title').split('Région')[0]} <span className="text-gradient">{t('home.map.title').includes('Région') ? 'Région' : 'الجهات'}</span>
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            {t('home.map.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 animate-fade-in-up">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative glass-light rounded-[2.5rem] shadow-soft border border-white/50 p-6 sm:p-8 h-full">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-sand/30 to-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                {/* Tunisia SVG Map */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Tunisia outline */}
                  <path
                    d="M55 5 L60 8 L65 12 L70 15 L72 20 L70 25 L68 30 L65 35 L62 40 L60 45 L58 50 L56 55 L54 60 L52 65 L50 70 L48 75 L46 80 L44 85 L42 88 L40 90 L38 88 L36 85 L35 80 L34 75 L33 70 L32 65 L31 60 L30 55 L29 50 L28 45 L27 40 L26 35 L25 30 L24 25 L23 20 L22 15 L25 12 L30 10 L35 8 L40 6 L45 5 L50 4 L55 5Z"
                    fill="#fcfaf8"
                    stroke="#e6decb"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Region markers */}
                  {regions.map((region) => (
                    <g key={region.id}>
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={region.artisans >= 30 ? 4.5 : region.artisans >= 20 ? 3.5 : 2.5}
                        fill={region.color}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                          opacity: hoveredRegion === region.id || selectedRegion?.id === region.id ? 1 : 0.7,
                          transform: hoveredRegion === region.id || selectedRegion?.id === region.id ? 'scale(1.4)' : 'scale(1)',
                          transformOrigin: `${region.x}px ${region.y}px`,
                          filter: hoveredRegion === region.id || selectedRegion?.id === region.id ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                        }}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion(region)}
                      />
                      <text
                        x={region.x}
                        y={region.y + 7}
                        textAnchor="middle"
                        className={`text-[2.2px] font-bold pointer-events-none transition-all duration-300 ${hoveredRegion === region.id || selectedRegion?.id === region.id ? 'fill-gray-900 text-[2.8px]' : 'fill-gray-500'}`}
                      >
                        {region.name}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-5 left-5 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-white/60">
                  <div className="text-xs font-bold text-gray-900 mb-3 tracking-wide uppercase">{t('home.map.legendTitle')}</div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-terracotta shadow-sm" />
                      <span className="text-xs font-medium text-gray-600">{t('home.map.legendHigh')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-olive shadow-sm" />
                      <span className="text-xs font-medium text-gray-600">{t('home.map.legendMid')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-gold shadow-sm" />
                      <span className="text-xs font-medium text-gray-600">{t('home.map.legendLow')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Region Details Panel */}
          <div className="lg:col-span-2">
            <div className="glass-light rounded-[2.5rem] shadow-soft border border-white/50 p-6 sm:p-8 h-full relative overflow-hidden">
              {/* Subtle background decoration for the panel */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-terracotta/5 rounded-full blur-[40px] pointer-events-none" />

              {selectedRegion ? (
                <div className="space-y-8 relative z-10 animate-fade-in">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-terracotta tracking-wider uppercase mb-1 block">{t('home.map.panelRegion')}</span>
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedRegion.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-yellow-700">{selectedRegion.rating}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-terracotta/30 transition-colors group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                          <Users className="w-4 h-4 text-terracotta" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{t('home.map.panelArtisans')}</span>
                      </div>
                      <div className="text-3xl font-black text-gray-900">{selectedRegion.artisans}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-olive/30 transition-colors group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center group-hover:bg-olive/20 transition-colors">
                          <Store className="w-4 h-4 text-olive" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{t('home.map.panelProducts')}</span>
                      </div>
                      <div className="text-3xl font-black text-gray-900">{selectedRegion.products}</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                      {t('home.map.panelSpecialties')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedRegion.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button className="w-full rounded-full h-12 text-base font-bold gradient-terracotta text-white shadow-soft transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group">
                      {t('home.map.panelCTA')}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 relative z-10 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                    <MapPin className="w-10 h-10 text-terracotta/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {t('home.map.emptyTitle')}
                  </h3>
                  <p className="text-gray-500 font-medium max-w-[250px] leading-relaxed">
                    {t('home.map.emptyDesc')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
