import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/store';
import { useLanguage } from '@/store/LanguageContext';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/catalog', label: t('nav.catalog') },
    { href: '/artisans', label: t('nav.artisans') },
    { href: '/circular-economy', label: t('nav.eco') },
    { href: '/impact', label: t('nav.impact') },
    { href: '/training', label: t('nav.training') },
    { href: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br from-terracotta to-warm-gold flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}>
              <span className="text-white font-bold text-xl leading-none">س</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl tracking-tight leading-none text-foreground">
                Soukna
              </span>
              <span className="text-xs font-semibold leading-none text-terracotta mt-0.5">
                سوقنا
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white/70 text-terracotta shadow-sm'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full text-foreground/60 hover:text-foreground"
            >
              {language === 'fr' ? <Globe className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <motion.div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-foreground/60 hover:text-foreground relative group"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                {cart.totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    {cart.totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Login/Register */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/30">
              <Link to="/login">
                <Button variant="ghost" className="rounded-full text-foreground/70 hover:text-foreground font-medium">
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-terracotta text-white rounded-full font-medium px-6">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground bg-white/50 rounded-full backdrop-blur-sm border border-white/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 p-4 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-card border border-white/50 overflow-hidden">
              <nav className="flex flex-col p-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`px-4 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-terracotta/10 text-terracotta'
                          : 'text-foreground/80 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 bg-gray-50/50 border-t border-gray-100/50 flex flex-col gap-3">
                <Link to="/login">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-semibold border-border/50 bg-white">
                    <User className="w-5 h-5 mr-2 text-muted-foreground" />
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-semibold border-border/50 bg-white">
                    <User className="w-5 h-5 mr-2 text-muted-foreground" />
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
