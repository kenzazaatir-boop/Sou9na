import React, { useState } from 'react';
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
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
    specialties: r.specialties.map((s: string) => {
      const key = `home.map.specialties.${s}`;
      const translation = t(key);
      return translation === key ? s : translation; // Fallback to raw ID if translation is missing
    })
  }));

  const handleMouseMove = (e: React.MouseEvent, region: Region) => {
    const rect = (e.currentTarget.closest('.map-container') || document.body).getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredRegion(region);
  };

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
            <div className="relative glass-light rounded-[2.5rem] shadow-lg border border-white/50 p-6 sm:p-8 h-full map-container shadow-terracotta/5">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-sand/20 to-gray-50/50 rounded-3xl overflow-hidden border border-white shadow-inner">
                {/* Tunisia SVG Map */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.05))" }}
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Refined Tunisia shape (still abstract but smoother) */}
                  <path
                    d="M55 4 C 62 8, 68 12, 72 20 C 70 30, 60 45, 55 60 C 50 75, 45 85, 40 90 C 35 80, 25 60, 25 30 C 25 20, 30 15, 45 5 Z"
                    fill="#ffffff"
                    stroke="#e6decb"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    className="drop-shadow-sm transition-all duration-700 hover:fill-[#fcfaf8]"
                  />
                  
                  {/* Region markers */}
                  {regions.map((region) => {
                    const isHovered = hoveredRegion?.id === region.id;
                    const isSelected = selectedRegion?.id === region.id;
                    const isActive = isHovered || isSelected;
                    const isOtherSelected = selectedRegion && !isSelected;
                    const isMajor = region.artisans >= 30;

                    return (
                      <g key={region.id}>
                        {/* Pulse effect for major hubs */}
                        {isMajor && !isOtherSelected && (
                          <circle
                            cx={region.x}
                            cy={region.y}
                            r={4.5}
                            fill={region.color}
                            className="animate-ping"
                            style={{ opacity: 0.3, transformOrigin: `${region.x}px ${region.y}px` }}
                          />
                        )}
                        
                        <circle
                          cx={region.x}
                          cy={region.y}
                          r={isMajor ? 4.5 : region.artisans >= 20 ? 3.5 : 2.5}
                          fill={region.color}
                          className="cursor-pointer transition-all duration-500 ease-out"
                          style={{
                            opacity: isOtherSelected ? 0.3 : isActive ? 1 : 0.8,
                            transform: isActive ? 'scale(1.3)' : 'scale(1)',
                            transformOrigin: `${region.x}px ${region.y}px`,
                            filter: isActive ? 'url(#glow)' : 'none',
                          }}
                          onMouseMove={(e) => handleMouseMove(e, region)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          onClick={() => setSelectedRegion(region)}
                        />
                        <text
                          x={region.x}
                          y={region.y + (isMajor ? 8 : 7)}
                          textAnchor="middle"
                          className={`text-[2.2px] font-bold pointer-events-none transition-all duration-500 ${
                            isActive ? 'fill-gray-900 text-[2.8px]' : 
                            isOtherSelected ? 'fill-gray-300' : 'fill-gray-600'
                          }`}
                        >
                          {region.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Tooltip */}
                {hoveredRegion && (
                  <div
                    className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+15px)] animate-fade-in"
                    style={{ left: tooltipPos.x, top: tooltipPos.y }}
                  >
                    <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white flex flex-col items-center min-w-[140px]">
                      <span className="font-bold text-gray-900 mb-1">{hoveredRegion.name}</span>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1.5 text-terracotta">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{hoveredRegion.artisans}</span>
                        </div>
                        <div className="w-[1px] h-3 bg-gray-200"></div>
                        <div className="flex items-center gap-1.5 text-olive">
                          <Store className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{hoveredRegion.products}</span>
                        </div>
                      </div>
                      {/* Tooltip triangle */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white/95 border-r-[8px] border-r-transparent filter drop-shadow-md"></div>
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/60">
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
            <div className="glass-light rounded-[2.5rem] shadow-lg border border-white/50 p-6 sm:p-8 h-full relative overflow-hidden transition-all duration-500">
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
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-terracotta/30 transition-colors group cursor-default">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                          <Users className="w-4 h-4 text-terracotta" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{t('home.map.panelArtisans')}</span>
                      </div>
                      <div className="text-3xl font-black text-gray-900">{selectedRegion.artisans}</div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-olive/30 transition-colors group cursor-default">
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
                      <TrendingUp className="w-5 h-5 text-terracotta" />
                      {t('home.map.panelSpecialties')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedRegion.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-sand/30 to-sand/10 text-gray-800 text-sm font-bold shadow-sm border border-sand/40 hover:border-terracotta/40 hover:shadow-md transition-all cursor-default"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-auto">
                    <Button className="w-full rounded-2xl h-14 text-base font-bold gradient-terracotta text-white shadow-lg transition-all duration-300 hover:shadow-terracotta/40 hover:-translate-y-1 group">
                      {t('home.map.panelCTA')}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 relative z-10 animate-fade-in my-auto">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-md border border-gray-50 drop-shadow-xl pulse-glow">
                    <MapPin className="w-10 h-10 text-terracotta/60" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                    {t('home.map.emptyTitle')}
                  </h3>
                  <p className="text-gray-500 font-medium max-w-[280px] leading-relaxed">
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
