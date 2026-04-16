import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { useCart } from '@/store';
import { useLanguage } from '@/store/LanguageContext';
import { toast } from 'sonner';

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const { language, t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { items, subtotal, shipping, total } = cart;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-gray-100">
          <SheetTitle className="text-2xl font-black text-foreground">
            {t('cart.title')}
          </SheetTitle>
          <p className="text-muted-foreground text-sm">
            {items.length} {items.length > 1 ? t('cart.articlesPlural') : t('cart.articles')}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{t('cart.emptyTitle')}</h3>
              <p className="text-muted-foreground mb-6">{t('cart.emptySubtitle')}</p>
              <SheetClose asChild>
                <Link to="/catalog">
                  <Button className="gradient-terracotta text-white rounded-full">
                    {t('cart.explorer')}
                  </Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 items-start bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-foreground truncate">
                        {language === 'ar' && item.nameAr ? item.nameAr : item.name}
                      </h4>
                      <button
                        onClick={() => {
                          removeFromCart(item.productId);
                          toast.success(t('cart.removed'));
                        }}
                        className="text-muted-foreground hover:text-red-500 transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{item.artisan}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                        <button onClick={() => updateQuantity(item.productId, -1)} className="hover:bg-white rounded-full transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, 1)} className="hover:bg-white rounded-full transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">
                        {item.price * item.quantity} {t('catalog.currency')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                <span className="font-semibold">{subtotal.toFixed(2)} {t('catalog.currency')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  {t('cart.shipping')}
                </span>
                <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? t('cart.free') : `${shipping.toFixed(2)} ${t('catalog.currency')}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-bold">{t('cart.total')}</span>
                <span className="text-xl font-black text-terracotta">{total.toFixed(2)} {t('catalog.currency')}</span>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-14 font-black mb-1 shadow-[0_8px_30px_rgb(5,150,105,0.3)] transition-all">
              <Lock className="w-5 h-5 mr-2" />
              {language === 'ar' ? 'إتمام الطلب بأمان' : 'Valider ma commande'}
            </Button>
            <p className="text-xs text-center text-gray-500 font-medium mb-3">
              {language === 'ar' ? 'شراء سريع بدون إنشاء حساب متاح.' : 'Achat rapide sans création de compte disponible.'}
            </p>
            <Button
                variant="ghost"
                className="w-full text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  clearCart();
                  toast.success(t('cart.cleared'));
                }}
              >
                {t('cart.clear')}
              </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
