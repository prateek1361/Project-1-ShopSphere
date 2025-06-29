import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import { ShopProvider } from "./context/ShopContext";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserProfilePage from "./pages/UserProfilePage";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  return (
    <Router>
      <ShopProvider>
        <Header />
        <ToastContainer position="top-center" autoClose={1500} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/wishlistPage" element={<WishlistPage />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderSuccess" element={<OrderSuccessPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </ShopProvider>
    </Router>
  );
}
