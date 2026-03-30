import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Cart, CartItem } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ===== CART CONTEXT PROVIDER =====
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('soukna_cart');
    return savedCart
      ? JSON.parse(savedCart)
      : {
          items: [],
          totalItems: 0,
          subtotal: 0,
          shipping: 0,
          total: 0,
          lastUpdated: Date.now(),
        };
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('soukna_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart totals
  const calculateTotals = useCallback((items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over 100
    const total = subtotal + shipping;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, shipping, total, totalItems };
  }, []);

  const addToCart = useCallback((newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.productId === newItem.productId);

      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedItems = [...prevCart.items, newItem];
      }

      const { subtotal, shipping, total, totalItems } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        subtotal,
        shipping,
        total,
        lastUpdated: Date.now(),
      };
    });
  }, [calculateTotals]);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.productId !== productId);
      const { subtotal, shipping, total, totalItems } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        subtotal,
        shipping,
        total,
        lastUpdated: Date.now(),
      };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const { subtotal, shipping, total, totalItems } = calculateTotals(updatedItems);

      return {
        items: updatedItems,
        totalItems,
        subtotal,
        shipping,
        total,
        lastUpdated: Date.now(),
      };
    });
  }, [calculateTotals, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalItems: 0,
      subtotal: 0,
      shipping: 0,
      total: 0,
      lastUpdated: Date.now(),
    });
  }, []);

  const getCartTotal = useCallback(() => cart.total, [cart.total]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ===== USE CART HOOK =====
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
