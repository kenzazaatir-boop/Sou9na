import { Hero } from '@/sections/Hero';
import { Stats } from '@/sections/Stats';
import { Features } from '@/sections/Features';
import { MapSection } from '@/sections/MapSection';
import { VideoSection } from '@/sections/VideoSection';
import { useSEO } from '@/hooks/useSEO';

export function Home() {
  const { SEOComponent } = useSEO({ includeBreadcrumb: false });

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen">
        <Hero />
        <Stats />
        <Features />
        <MapSection />
        <VideoSection />
      </div>
    </>
  );
}
