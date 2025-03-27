import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useState } from "react";
import MyContext from './MyContext';
import { CartProvider } from "./context/CartContext";
import ThankYou from "./Pages/ThankYou";
import SearchResults from "./Components/SearchResults.js";
import { AuthProvider } from "./context/AuthContext.js";

function Layout() {
  const location = useLocation(); 
  const isHeaderFooterShown = !(location.pathname === "/signIn" || location.pathname === "/signUp");

  return (
    <>
      {isHeaderFooterShown && <Header />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route exact path="/category/:categoryId" element={<Listing />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/thank-you" element={<ThankYou />} />
        <Route exact path="/search" element={<SearchResults />} />
      </Routes>
      {isHeaderFooterShown && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MyContext.Provider value={{}}>
            <Layout />
          </MyContext.Provider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
