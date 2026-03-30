import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Wishlist, WishlistItem } from '@/types';

interface WishlistContextType {
  wishlist: Wishlist;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ===== WISHLIST CONTEXT PROVIDER =====
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist>(() => {
    // Load wishlist from localStorage on mount
    const savedWishlist = localStorage.getItem('soukna_wishlist');
    return savedWishlist
      ? JSON.parse(savedWishlist)
      : {
          items: [],
          totalItems: 0,
        };
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('soukna_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((productId: number) => {
    setWishlist((prevWishlist) => {
      const alreadyExists = prevWishlist.items.some((item) => item.productId === productId);

      if (alreadyExists) return prevWishlist; // Don't add duplicates

      const newItem: WishlistItem = {
        productId,
        addedAt: Date.now(),
      };

      const updatedItems = [...prevWishlist.items, newItem];

      return {
        items: updatedItems,
        totalItems: updatedItems.length,
      };
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prevWishlist) => {
      const updatedItems = prevWishlist.items.filter((item) => item.productId !== productId);

      return {
        items: updatedItems,
        totalItems: updatedItems.length,
      };
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlist.items.some((item) => item.productId === productId),
    [wishlist.items]
  );

  const toggleWishlist = useCallback(
    (productId: number) => {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist({
      items: [],
      totalItems: 0,
    });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ===== USE WISHLIST HOOK =====
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
