import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart";

function App() {
  return (
    
<BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/" exact={true} element={<Home />} />
      <Route path ="/cat/:id" exact={true} element={<Listing />} />
      <Route exact={true} path="/product/:id" element={<ProductDetails />} />
      <Route exact={true} path="/cart" element={<Cart />} />
    </Routes>
    <Footer/>
</BrowserRouter>

  );
}

export default App;
