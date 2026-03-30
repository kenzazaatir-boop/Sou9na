import { Link } from 'react-router-dom';
import { Heart, HandHeart, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/store/LanguageContext';

export function Footer() {
  const { language, t } = useLanguage();

  const navigation = {
    main: [
      { name: t('nav.catalog'), href: '/catalog' },
      { name: t('nav.artisans'), href: '/artisans' },
      { name: t('nav.eco'), href: '/circular-economy' },
      { name: t('nav.impact'), href: '/impact' },
    ],
    partners: [
      { name: 'Enda Tamweel', href: 'https://www.endatamweel.tn/' },
      { name: 'Enda Inter Arabe', href: 'https://www.endarabe.org.tn/' },
    ],
  };

  const cycleSteps = t('footer.cycleSteps') as string[];
  return (
    <footer className="bg-[#0f1115] text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-terracotta/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-[200px] -right-[200px] w-[600px] h-[600px] bg-olive/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] bg-warm-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* CTA Section */}
      <div className="border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative rounded-[2rem] p-10 lg:p-14 overflow-hidden shadow-2xl glass-dark border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-warm-gold/10 opacity-50" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight text-white leading-tight">
                  {language === 'fr' ? (
                    <>Rejoignez notre mouvement pour un <span className="text-gradient">avenir durable</span></>
                  ) : (
                    <>انضم إلى حركتنا من أجل <span className="text-gradient">مستقبل مستدام</span></>
                  )}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4 text-gray-300 font-medium">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-olive/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-olive-light" />
                    </div>
                    {t('footer.supportArtisans')}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-olive/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-olive-light" />
                    </div>
                    {t('footer.protectEnv')}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-olive/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-olive-light" />
                    </div>
                    {t('footer.preserveHeritage')}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link to="/catalog">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-terracotta hover:bg-terracotta-light text-white shadow-glow group rounded-xl">
                    {t('footer.buyNow')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-xl transition-all">
                    {t('footer.becomePartner')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta to-warm-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl leading-none">س</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-2xl tracking-tight leading-none text-white">Soukna</span>
                <span className="text-sm font-semibold leading-none text-terracotta mt-1">سوقنا</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-wider text-sm">{t('footer.navigation')}</h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-wider text-sm">{t('footer.partners')}</h3>
            <ul className="space-y-4">
              {navigation.partners.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-lg text-white mb-6 uppercase tracking-wider text-sm">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="flex items-start gap-3">
                <span className="mt-1">📍</span>
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <span>+216 71 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <span>contact@soukna.tn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Circular Economy Section */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 bg-white/5 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-olive to-olive-dark flex items-center justify-center shadow-lg">
                <HandHeart className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">{t('footer.ecoCycle')}</h4>
            </div>
            
            <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-3 min-w-max px-2">
                {cycleSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-black/20 text-sm font-medium text-gray-300">
                      {step}
                    </div>
                    {index < cycleSteps.length - 1 && (
                      <ArrowRight className="w-4 h-4 mx-3 text-gray-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-medium">
            © {new Date().getFullYear()} Soukna. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            {t('footer.madeIn')} <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
