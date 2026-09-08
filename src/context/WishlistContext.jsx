/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const loadWishlist = () => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  };

  const [wishlistItems, setWishlistItems] = useState(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, { ...product }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getTotalWishlistItems = () => wishlistItems.length;

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        getTotalWishlistItems,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;