import { ArrowRight, Play, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useReveal } from '@/hooks/useReveal';
import { useLanguage } from '@/store/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const { ref: contentRef, revealClass: contentClass } = useReveal<HTMLDivElement>(0.05);

  const heroFeatures = t('home.hero.features') as string[];

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden bg-[#fdfbf7] gradient-hero">
      {/* Decorative ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-terracotta/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse-glow" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-olive/15 rounded-full blur-[80px] mix-blend-multiply animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-warm-gold/10 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Left Side */}
          <div ref={contentRef} className={`space-y-8 ${contentClass}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/60 text-olive-dark text-sm font-semibold shadow-soft">
              <Sparkles className="w-4 h-4 text-warm-gold animate-pulse" />
              <span>{t('home.hero.tagline')}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight">
              {t('home.hero.title1')} <br className="hidden sm:block" />
              <span className="text-gradient font-black relative inline-block">
                {t('home.hero.title2')}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-terracotta/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground/90 max-w-lg leading-relaxed font-medium">
              {t('home.hero.description')}
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 pt-2">
              {heroFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                  <div className="w-6 h-6 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-olive" strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-terracotta hover:bg-terracotta-dark text-white shadow-glow hover:shadow-lg transition-all duration-300 rounded-xl group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    {t('home.hero.ctaPrimary')}
                    <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[slide-in-right_0.6s_ease-out_forwards]" />
                </Button>
              </Link>
              <Link to="/videos">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-2 border-border/80 hover:border-olive hover:bg-olive/5 text-foreground font-semibold rounded-xl group transition-all duration-300 glass hover-lift">
                  <Play className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 group-hover:scale-110 group-hover:text-olive transition-transform text-foreground/70" fill="currentColor" />
                  {t('home.hero.ctaSecondary')}
                </Button>
              </Link>
            </div>

            {/* Premium Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-border/50">
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black text-foreground">120<span className="text-terracotta">+</span></div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('home.hero.statsArtisans')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black text-foreground">500<span className="text-olive">+</span></div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('home.hero.statsProducts')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl lg:text-4xl font-black text-foreground">24</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t('home.hero.statsRegions')}</div>
              </div>
            </div>
          </div>

          {/* Hero Image Right Side */}
          <div className={`relative lg:h-[700px] flex items-center justify-center ${contentClass} stagger-3`}>
            <div className="relative w-full max-w-[500px]">
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-card border-[6px] border-white/60 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 z-10 transition-opacity duration-300 group-hover:opacity-60" />
                <img
                  src="videos/economie-circulaire-1.jpg"
                  alt="Artisanat durable Soukna"
                  className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-warm-gold/20 rounded-2xl blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-olive/20 rounded-full blur-2xl -z-10" />

              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl z-20 animate-float stagger-2 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">100% {t('home.hero.handmade')}</div>
                    <div className="text-xs text-muted-foreground">{t('home.hero.authentic')}</div>
                  </div>
                </div>
              </div>

              {/* Artisan Badge */}
              <div className="absolute top-10 -right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 animate-float flex items-center gap-3 border border-white/50 hidden lg:flex">
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-olive/20 flex items-center justify-center overflow-hidden">
                    <img src="placeholder-avatar.svg" alt="Artisan" className="w-14 h-14 rounded-full border-2 border-white object-cover hidden" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">100% {t('nav.eco')}</div>
                    <div className="text-xs text-muted-foreground font-medium">{t('home.stats.labels.materials')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
