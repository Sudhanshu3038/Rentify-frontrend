import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import WishlistPage from './Pages/WishlistPage';
import { WishlistProvider } from './Context/WishListContext';
import { CartProvider } from './Context/CartContext';
import ProductDetailPage from './Pages/ProductDetailPage';
import ProductListPage from './Pages/ProductListPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePage from './Pages/ProfilePage';
import LogoutPage from './Pages/LogoutPage'; 
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/products/:category/:productType" element={<ProductListPage />} />
                <Route path="/product/:category/:id" element={<ProductDetailPage />} />
                <Route path="/Checkout" element={<CheckoutPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="*" element={<LoginPage />} /> 
              </Routes>
            </main>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
