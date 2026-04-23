import { ArrowRight, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/store/LanguageContext';

const standardVideos = [
  {
    id: 'doc-1',
    title: 'قصة سوقنا: إبداع يتجدد 🌟',
    description: 'نظرة شاملة على كواليس الإبداع في سوقنا، حيث يلتقي التراث بالابتكار.',
    videoSrc: 'videos/storytelling-1.mp4'
  },
  {
    id: 'doc-2',
    title: 'سوقنا: تراث مستدام 🌱',
    description: 'وثائقي مميز يروي قصة التزام منصة سوقنا بالمحافظة على التراث التونسي العريق.',
    videoSrc: 'videos/storytelling-2.mp4'
  }
];

export function VideoSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-olive/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 animate-fade-in-up">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-bold tracking-wider uppercase mb-5 shadow-sm">
              <Video className="w-4 h-4" />
              {t('home.video.tagline')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
              {t('home.video.title').split(' ').slice(0, -1).join(' ')} <span className="text-terracotta">{t('home.video.title').split(' ').pop()}</span>
            </h2>
            <p className="text-lg text-gray-300 font-medium max-w-2xl mx-auto mb-10">
              {t('home.video.description')}
            </p>
          </div>
          <Link to="/videos" className="mt-8 lg:mt-0 lg:shrink-0">
            <Button className="rounded-full bg-white text-gray-900 border-0 hover:bg-white/90 font-bold px-8 h-12 shadow-glow group">
              {t('home.video.cta')}
              <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
          {standardVideos.map((video, index) => (
            <div
              key={video.id}
              className="group flex flex-col bg-gray-800/50 rounded-[2rem] overflow-hidden shadow-sm border border-white/5 hover:border-white/10 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video bg-black">
                <video 
                  src={video.videoSrc} 
                  className="w-full h-full object-contain" 
                  controls 
                  preload="metadata"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-xl mb-2 tracking-tight leading-snug group-hover:text-terracotta transition-colors" dir="rtl">
                    {video.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-400" dir="rtl">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
