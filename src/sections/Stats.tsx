import { useEffect, useRef, useState } from 'react';
import { Leaf, Users, Recycle, Percent, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLanguage } from '@/store/LanguageContext';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  const stats = [
    {
      icon: Leaf,
      value: 200,
      suffix: '+',
      label: t('home.stats.labels.products'),
      color: 'text-olive',
      bgColor: 'bg-olive/10',
    },
    {
      icon: Users,
      value: 120,
      suffix: '',
      label: t('home.stats.labels.artisans'),
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10',
    },
    {
      icon: Recycle,
      value: 5,
      suffix: 'T',
      label: t('home.stats.labels.co2'),
      color: 'text-warm-gold',
      bgColor: 'bg-warm-gold/10',
    },
    {
      icon: Percent,
      value: 80,
      suffix: '%',
      label: t('home.stats.labels.materials'),
      color: 'text-deep-blue',
      bgColor: 'bg-deep-blue/10',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#fdfbf7]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-olive/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive/10 text-olive text-sm font-bold tracking-wider uppercase mb-5 shadow-sm">
            <Sparkles className="w-4 h-4" />
            {t('home.stats.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight">
            {t('home.stats.title').split('parlent')[0]} <span className="text-gradient font-black">{t('home.stats.title').includes('parlent') ? 'parlent' : 'تتحدث'}</span>
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            {t('home.stats.description')}
          </p>
        </div>

        <div ref={ref} className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 reveal-stagger ${revealClass}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-[2rem] bg-white hover:bg-white border border-gray-100/50 shadow-sm hover:shadow-glow transition-all duration-500 hover-lift stagger-${index + 1}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-5xl font-black ${stat.color} mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
