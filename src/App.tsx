import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from '@/store';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { Artisans } from '@/pages/Artisans';
import { CircularEconomy } from '@/pages/CircularEconomy';
import { Impact } from '@/pages/Impact';
import { Training } from '@/pages/Training';
import { Contact } from '@/pages/Contact';
import { Videos } from '@/pages/Videos';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { B2BMarket } from '@/pages/B2BMarket';
import { Product } from '@/pages/Product';
import { ArtisanDetail } from '@/pages/ArtisanDetail';
import { LanguageProvider } from '@/store/LanguageContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BabaElHedi } from '@/components/BabaElHedi';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

// Layout component for pages with navbar
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-0 min-h-[calc(100vh-200px)] pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
    </>
  );
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <ErrorBoundary>
      <Routes location={location} key={location.pathname}>
        {/* Routes without navbar (login/register) */}
        <Route 
          path="/login" 
          element={
            <div className="min-h-screen">
              <Login />
            </div>
          } 
        />
        <Route 
          path="/register" 
          element={
            <div className="min-h-screen">
              <Register />
            </div>
          } 
        />
        
        {/* All other routes wrapped in MainLayout */}
        <Route path="/" element={<MainLayout><PageWrapper><Home /></PageWrapper></MainLayout>} />
        <Route path="/catalog" element={<MainLayout><PageWrapper><Catalog /></PageWrapper></MainLayout>} />
        <Route path="/artisans" element={<MainLayout><PageWrapper><Artisans /></PageWrapper></MainLayout>} />
        <Route path="/circular-economy" element={<MainLayout><PageWrapper><CircularEconomy /></PageWrapper></MainLayout>} />
        <Route path="/impact" element={<MainLayout><PageWrapper><Impact /></PageWrapper></MainLayout>} />
        <Route path="/training" element={<MainLayout><PageWrapper><Training /></PageWrapper></MainLayout>} />
        <Route path="/contact" element={<MainLayout><PageWrapper><Contact /></PageWrapper></MainLayout>} />
        <Route path="/videos" element={<MainLayout><PageWrapper><Videos /></PageWrapper></MainLayout>} />
        <Route path="/b2b" element={<MainLayout><PageWrapper><B2BMarket /></PageWrapper></MainLayout>} />
        <Route path="/product/:id" element={<MainLayout><PageWrapper><Product /></PageWrapper></MainLayout>} />
        <Route path="/artisan/:id" element={<MainLayout><PageWrapper><ArtisanDetail /></PageWrapper></MainLayout>} />
        <Route path="*" element={<MainLayout><PageWrapper><Home /></PageWrapper></MainLayout>} />
      </Routes>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <StoreProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground">
            <AnimatedRoutes />
          </div>
          <Toaster position="bottom-right" richColors />
          <BabaElHedi />
        </Router>
      </LanguageProvider>
    </StoreProvider>
  );
}

export default App;
