import { Link } from 'react-router-dom';
import { Recycle, Leaf, TreePine, Package, HandCoins, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/store/LanguageContext';

export function CircularEconomy() {
  const { t } = useLanguage();

  const cycleSteps = [
    {
      icon: HandCoins,
      title: t('circularEconomy.steps.0.title'),
      items: t('circularEconomy.steps.0.items') as unknown as string[],
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10',
    },
    {
      icon: Leaf,
      title: t('circularEconomy.steps.1.title'),
      items: t('circularEconomy.steps.1.items') as unknown as string[],
      color: 'text-olive',
      bgColor: 'bg-olive/10',
    },
    {
      icon: TreePine,
      title: t('circularEconomy.steps.2.title'),
      items: t('circularEconomy.steps.2.items') as unknown as string[],
      color: 'text-warm-gold',
      bgColor: 'bg-warm-gold/10',
    },
    {
      icon: Package,
      title: t('circularEconomy.steps.3.title'),
      items: t('circularEconomy.steps.3.items') as unknown as string[],
      color: 'text-deep-blue',
      bgColor: 'bg-deep-blue/10',
    },
    {
      icon: Recycle,
      title: t('circularEconomy.steps.4.title'),
      items: t('circularEconomy.steps.4.items') as unknown as string[],
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10',
    },
    {
      icon: HandCoins,
      title: t('circularEconomy.steps.5.title'),
      items: t('circularEconomy.steps.5.items') as unknown as string[],
      color: 'text-olive',
      bgColor: 'bg-olive/10',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 pt-4">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#faf9f8] border-b border-border/40 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-olive/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-olive/10 border border-olive/20 mb-8 shadow-sm">
            <Recycle className="w-10 h-10 text-olive" />
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
            {t('circularEconomy.title').split('Environnement')[0]} <br /><span className="text-gradient inline-block">{t('circularEconomy.title').includes('Environnement') ? 'l\'Environnement' : 'البيئة'}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            {t('circularEconomy.subtitle')}
          </p>
        </div>
      </div>

      {/* Cycle Steps */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cycleSteps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-[2.5rem] p-10 shadow-soft hover:shadow-card border border-gray-100 hover:border-olive/20 transition-all duration-500 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 120 + 400}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-black shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{step.title}</h3>
                <ul className="space-y-4">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base font-medium text-gray-600">
                      <div className={`w-5 h-5 rounded-full ${step.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${step.color}`} strokeWidth={4} />
                      </div>
                      <span className="leading-tight">{item}</span>
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
            {t('circularEconomy.ctaTitle')}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {t('circularEconomy.ctaSubtitle')}
          </p>
          <Link to="/catalog">
            <Button size="lg" className="gradient-terracotta text-white group">
              {t('circularEconomy.discoverProducts')}
              <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
