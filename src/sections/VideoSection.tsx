import { Play, ArrowRight, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/store/LanguageContext';

export function VideoSection() {
  const { t } = useLanguage();
  
  const videos = (t('home.video.list') as { title: string; items: string[]; music: string; id: string }[]).map((v, i) => ({
    ...v,
    thumbnail: [
      "https://images.unsplash.com/photo-1464333086628-25da9945a60e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586522332483-36ca3246eb5e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523741543316-991730bb3995?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511871893393-82e9c18943e3?auto=format&fit=crop&q=80"
    ][i % 5],
    duration: ['4:20', '5:45', '3:50', '6:15', '4:40'][i % 5]
  }));

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 animate-fade-in-up">
          {videos.map((video, index) => (
            <Link
              key={video.id}
              to={`/videos?video=${video.id}`}
              className="group flex flex-col bg-gray-800/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-glow border border-white/5 hover:border-white/10 transition-all duration-500 hover-lift isolate"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden bg-gray-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-white/30 group-hover:scale-110 border border-white/30 shadow-lg">
                    <Play className="w-7 h-7 text-white fill-white ml-1 rtl:mr-1 rtl:ml-0 drop-shadow-sm" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {video.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg mb-4 tracking-tight leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  {/* Items list */}
                  <ul className="space-y-2 mb-6">
                    {video.items.slice(0, 2).map((item, i) => (
                      <li key={i} className="text-sm font-medium text-gray-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0 mt-1.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="inline-flex self-start px-3 py-1.5 rounded-lg bg-terracotta/10 border border-terracotta/20">
                  <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                    {video.music}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
