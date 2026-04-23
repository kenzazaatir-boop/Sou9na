import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks';

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

export function Videos() {
  const { SEOComponent } = useSEO();

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">

      {/* Hero */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive/10 text-olive text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Documentaires
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            L'Artisanat Responsable en Action
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Découvrez comment Soukna transforme chaque achat en impact positif pour les artisans et l'environnement
          </p>
        </div>
      </div>

      {/* Documentaires Complets Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Documentaires Complets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Plongez au cœur de notre histoire avec ces documentaires complets.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {standardVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="relative aspect-video bg-black">
                  <video 
                    src={video.videoSrc} 
                    className="w-full h-full object-contain" 
                    controls 
                    preload="metadata"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" dir="rtl">{video.title}</h3>
                  <p className="text-gray-600 text-sm" dir="rtl">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-terracotta/10 to-olive/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-olive/20 mb-6">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Soutenir l'Artisanat Tunisien
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Chaque achat aide à préserver notre patrimoine et protéger notre environnement
          </p>
          <Link to="/catalog">
            <Button size="lg" className="gradient-terracotta text-white">
              Acheter maintenant
            </Button>
          </Link>
        </div>
      </div>

    </div>
    </>
  );
}
