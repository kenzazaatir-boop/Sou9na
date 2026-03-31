import { Link } from 'react-router-dom';
import { BookOpen, Video, Users, Award, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks';
import { useLanguage } from '@/store/LanguageContext';

export function Training() {
  const { t, language } = useLanguage();
  const { SEOComponent } = useSEO();

  // Helper to ensure we have an array for mapping
  const ensureArray = (val: any) => Array.isArray(val) ? val : [];

  const trainings = [
    {
      icon: BookOpen,
      title: t('training.list.0.title'),
      items: ensureArray(t('training.list.0.items')),
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10',
    },
    {
      icon: Video,
      title: t('training.list.1.title'),
      items: ensureArray(t('training.list.1.items')),
      color: 'text-olive',
      bgColor: 'bg-olive/10',
    },
    {
      icon: Users,
      title: t('training.list.2.title'),
      items: ensureArray(t('training.list.2.items')),
      color: 'text-warm-gold',
      bgColor: 'bg-warm-gold/10',
    },
    {
      icon: Award,
      title: t('training.list.3.title'),
      items: ensureArray(t('training.list.3.items')),
      color: 'text-deep-blue',
      bgColor: 'bg-deep-blue/10',
    },
  ];

  const benefits = ensureArray(t('training.benefits'));
  
  // Robust title logic: use first word or first half for non-gradient, rest for gradient
  const fullTitle = t('training.title');
  const words = fullTitle.split(' ');
  const titlePart1 = words.length > 1 ? words.slice(0, Math.ceil(words.length / 2)).join(' ') : (language === 'fr' ? '' : fullTitle);
  const titlePart2 = words.length > 1 ? words.slice(Math.ceil(words.length / 2)).join(' ') : (language === 'fr' ? fullTitle : '');

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-4">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#faf9f8] border-b border-border/40 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-warm-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-warm-gold/10 border border-warm-gold/20 mb-8 shadow-sm">
            <BookOpen className="w-10 h-10 text-warm-gold" />
          </div>
          <h1 className="text-4xl lg:text-[5.5rem] font-black text-gray-900 mb-6 tracking-tighter leading-none">
            {titlePart1} {titlePart1 && <br />}
            <span className="text-gradient inline-block">
              {titlePart2 || fullTitle}
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            {t('training.subtitle')}
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-10 bg-white border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-6 h-6 rounded-full bg-olive/10 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-olive" strokeWidth={4} />
                </div>
                <span className="text-gray-900 font-bold tracking-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Cards */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            {t('training.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {trainings.map((training, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-[2.5rem] p-10 shadow-soft hover:shadow-card border border-gray-100 hover:border-warm-gold/20 transition-all duration-500 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 120 + 400}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${training.bgColor} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <training.icon className={`w-8 h-8 ${training.color}`} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{training.title}</h3>
                <ul className="space-y-2">
                  {training.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <Check className={`w-4 h-4 ${training.color} flex-shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {t('training.ctaTitle')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {t('training.ctaSubtitle')}
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-terracotta text-white group">
              {t('training.registerFree')}
              <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
