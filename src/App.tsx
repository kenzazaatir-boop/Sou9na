import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
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
import { Cart } from '@/pages/Cart';
import { Product } from '@/pages/Product';
import { LanguageProvider } from '@/store/LanguageContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import './App.css';

// Page Transition Variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Layout component for pages with navbar
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-0 min-h-[calc(100vh-200px)]">
        {children}
      </main>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Routes without navbar (login/register) */}
        <Route 
          path="/login" 
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.3 }}>
              <Login />
            </motion.div>
          } 
        />
        <Route 
          path="/register" 
          element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.3 }}>
              <Register />
            </motion.div>
          } 
        />
        
        {/* Routes with navbar and footer */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
                  <Route path="/artisans" element={<PageWrapper><Artisans /></PageWrapper>} />
                  <Route path="/circular-economy" element={<PageWrapper><CircularEconomy /></PageWrapper>} />
                  <Route path="/impact" element={<PageWrapper><Impact /></PageWrapper>} />
                  <Route path="/training" element={<PageWrapper><Training /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/videos" element={<PageWrapper><Videos /></PageWrapper>} />
                  <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                  <Route path="/product/:id" element={<PageWrapper><Product /></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </MainLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <StoreProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background">
              <AnimatedRoutes />
            </div>
          </Router>
        </LanguageProvider>
      </StoreProvider>
    </HelmetProvider>
  );
}

export default App;
