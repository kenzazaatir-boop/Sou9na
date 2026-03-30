import { Check, ShoppingBag, Users, Leaf, Shield, Star } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLanguage } from '@/store/LanguageContext';

export function Features() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  const featureIcons = [ShoppingBag, Users, Leaf, Shield];
  const featureColors = [
    { text: 'text-terracotta', bg: 'bg-terracotta/10' },
    { text: 'text-olive', bg: 'bg-olive/10' },
    { text: 'text-warm-gold', bg: 'bg-warm-gold/10' },
    { text: 'text-deep-blue', bg: 'bg-deep-blue/10' },
  ];

  const features = (t('home.features.list') as { title: string; items: string[] }[]).map((f, i) => ({
    ...f,
    icon: featureIcons[i],
    color: featureColors[i].text,
    bgColor: featureColors[i].bg,
  }));

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-warm-gold/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
      
        <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${revealClass}`}>
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/5 text-terracotta text-sm font-bold tracking-wider uppercase mb-6 border border-terracotta/10 shadow-sm">
              <Star className="w-4 h-4" />
              {t('home.features.tagline')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              {t('home.features.title').split('Marketplace')[0]} <span className="text-gradient">{t('home.features.title').includes('Marketplace') ? 'Marketplace' : 'سوق'}</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {t('home.features.description')}
            </p>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('home.features.sectionTitle')}</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {features.map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/5 text-terracotta text-sm font-bold tracking-wider uppercase">
                  {feature.title}
                </span>
              ))}
            </div>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 reveal-stagger reveal-visible">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative isolate bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-glow border border-gray-100 hover:border-gray-200 transition-all duration-500 hover-lift overflow-hidden stagger-${index + 1}`}
            >
              {/* Card Hover Gradient Background */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 -z-10 ${feature.bgColor}`} 
                style={{ maskImage: 'linear-gradient(to bottom, white 0%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 80%)' }} 
              />
              
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="font-bold text-xl text-gray-900 mb-6 tracking-tight group-hover:text-terracotta transition-colors">{feature.title}</h3>
              
              <ul className="space-y-4">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium group/item">
                    <div className={`w-5 h-5 rounded-full ${feature.bgColor} flex items-center justify-center shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
                      <Check className={`w-3 h-3 ${feature.color}`} strokeWidth={3} />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
