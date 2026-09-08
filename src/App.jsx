/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CategoryFilter from './components/CategoryFilter';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage'; // ✅ Importerad!

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleProductUpdate = (data) => {
    console.log('📦 Data received from ProductDetails (App.jsx):', data);
  };

  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter basename="/elanStore">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/home" element={<HomePage onLogout={() => setIsLoggedIn(false)} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails onProductUpdate={handleProductUpdate} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ Rute tillagd! */}
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/category-filter" element={<CategoryFilter />} />
            <Route path="/profile" element={<ProfilePage onLogout={() => setIsLoggedIn(false)} />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
