import { Link } from 'react-router-dom';
import { Users, Leaf, TrendingUp, Heart, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';

export function Impact() {
  const { t } = useLanguage();
  const { SEOComponent } = useSEO();

  const impacts = [
    {
      icon: Users,
      title: t('impact.stats.0.title'),
      items: t('impact.stats.0.items') as unknown as string[],
      stat: t('impact.stats.0.stat'),
      statLabel: t('impact.stats.0.label'),
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10',
    },
    {
      icon: Leaf,
      title: t('impact.stats.1.title'),
      items: t('impact.stats.1.items') as unknown as string[],
      stat: t('impact.stats.1.stat'),
      statLabel: t('impact.stats.1.label'),
      color: 'text-olive',
      bgColor: 'bg-olive/10',
    },
    {
      icon: TrendingUp,
      title: t('impact.stats.2.title'),
      items: t('impact.stats.2.items') as unknown as string[],
      stat: t('impact.stats.2.stat'),
      statLabel: t('impact.stats.2.label'),
      color: 'text-warm-gold',
      bgColor: 'bg-warm-gold/10',
    },
    {
      icon: Heart,
      title: t('impact.stats.3.title'),
      items: t('impact.stats.3.items') as unknown as string[],
      stat: t('impact.stats.3.stat'),
      statLabel: t('impact.stats.3.label'),
      color: 'text-deep-blue',
      bgColor: 'bg-deep-blue/10',
    },
  ];

  const testimonials = [
    {
      name: t('impact.testimonials.0.name'),
      role: t('impact.testimonials.0.role'),
      quote: t('impact.testimonials.0.quote'),
    },
    {
      name: t('impact.testimonials.1.name'),
      role: t('impact.testimonials.1.role'),
      quote: t('impact.testimonials.1.quote'),
    },
    {
      name: t('impact.testimonials.2.name'),
      role: t('impact.testimonials.2.role'),
      quote: t('impact.testimonials.2.quote'),
    },
  ];
  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-4">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#faf9f8] border-b border-border/40 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-warm-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-terracotta/10 border border-terracotta/20 mb-8 shadow-sm">
            <Users className="w-10 h-10 text-terracotta" />
          </div>
          <h1 className="text-4xl lg:text-[5.5rem] font-black text-gray-900 mb-6 tracking-tighter leading-none">
            {t('impact.title').split('Impact')[0]} <br /><span className="text-gradient inline-block">{t('impact.title').includes('Impact') ? 'Impact Local' : 'المحلي'}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="group bg-white rounded-[2.5rem] p-10 shadow-soft hover:shadow-card border border-gray-100 hover:border-terracotta/20 transition-all duration-500 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 120 + 400}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${impact.bgColor} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <impact.icon className={`w-8 h-8 ${impact.color}`} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{impact.title}</h3>
                <ul className="space-y-4 mb-10">
                  {impact.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base font-medium text-gray-600">
                      <div className={`w-5 h-5 rounded-full ${impact.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${impact.color}`} strokeWidth={4} />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                  <div className={`text-5xl font-black tracking-tighter ${impact.color}`}>{impact.stat}</div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{impact.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('impact.testimonialsTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '1000ms' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100 hover:border-terracotta/20 transition-all duration-300 hover:bg-white hover:shadow-soft group">
                <div className="text-6xl text-terracotta/20 mb-[-1.5rem] font-serif group-hover:text-terracotta/40 transition-colors">"</div>
                <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed italic relative z-10">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center font-bold text-terracotta">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {t('impact.ctaTitle')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {t('impact.ctaSubtitle')}
          </p>
          <Link to="/catalog">
            <Button size="lg" className="gradient-terracotta text-white group">
              {t('impact.startBuying')}
              <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
