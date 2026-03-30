import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCart } from '@/store';
import { useSEO } from '@/hooks';
import { SlideIn } from '@/components/animations';
import { toast } from 'sonner';

import { useLanguage } from '@/store/LanguageContext';

export function Cart() {
  const { t } = useLanguage();
  const { SEOComponent } = useSEO();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { items, subtotal, shipping, total } = cart;

  if (items.length === 0) {
    return (
      <>
        {SEOComponent}
        <div className="min-h-screen bg-background pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-3">{t('cart.emptyTitle')}</h1>
            <p className="text-muted-foreground text-lg mb-8">{t('cart.emptySubtitle')}</p>
            <Link to="/catalog">
              <Button className="gradient-terracotta text-white text-lg px-8 py-6 rounded-full h-auto">
                {t('cart.explorer')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
    );
  }

  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-background relative pt-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-200px] w-[400px] h-[400px] bg-warm-gold/5 rounded-full blur-[80px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <SlideIn direction="down">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black text-foreground">{t('cart.title')}</h1>
            <p className="text-muted-foreground mt-2">{items.length} {items.length > 1 ? t('cart.articlesPlural') : t('cart.articles')}</p>
          </div>
        </SlideIn>

        {/* Cart Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <SlideIn direction="left" delay={0.1} className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-card transition-all"
                >
                  <div className="flex gap-6 items-start">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.artisan}</p>
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(item.productId);
                            toast.success(t('cart.removed'));
                          }}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-2">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-foreground">
                            {item.price * item.quantity}
                            <span className="text-sm text-muted-foreground ml-1 rtl:mr-1 rtl:ml-0">{t('catalog.currency')}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{item.price} {t('catalog.currency')} × {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SlideIn>

          {/* Summary Sidebar */}
          <SlideIn direction="right" delay={0.1}>
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <h2 className="font-black text-xl mb-6">{t('cart.summary')}</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span className="font-semibold text-foreground">{subtotal.toFixed(2)} {t('catalog.currency')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {t('cart.shipping')}
                    </span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
                      {shipping === 0 ? t('cart.free') : `${shipping.toFixed(2)} ${t('catalog.currency')}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-lg">{t('cart.total')}</span>
                  <span className="text-3xl font-black text-terracotta">{total.toFixed(2)} {t('catalog.currency')}</span>
                </div>

                {subtotal < 100 && (
                  <p className="text-xs text-muted-foreground mb-6 pb-6 border-b border-gray-100">
                    {t('cart.freeShippingAlert').replace('{amount}', (100 - subtotal).toFixed(2))}
                  </p>
                )}

                <Button className="w-full gradient-terracotta text-white rounded-full h-12 font-bold text-lg mb-3">
                  <Lock className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('cart.checkout')}
                </Button>

                <Button variant="outline" className="w-full rounded-full h-12" asChild>
                  <Link to="/catalog">{t('cart.continue')}</Link>
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid gap-3">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                  <p className="text-xs font-bold text-green-700 mb-1">✓ {t('cart.benefits.artisanal')}</p>
                  <p className="text-xs text-green-600">{t('cart.benefits.artisanalDesc')}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-1">✓ {t('cart.benefits.secure')}</p>
                  <p className="text-xs text-blue-600">{t('cart.benefits.secureDesc')}</p>
                </div>
              </div>

              {/* Clear Cart */}
              <Button
                variant="outline"
                className="w-full rounded-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  clearCart();
                  toast.success(t('cart.cleared'));
                }}
              >
                {t('cart.clear')}
              </Button>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
    </>
  );
}
