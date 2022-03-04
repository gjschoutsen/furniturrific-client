import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  const [ products, setProducts ] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const fetchProducts = () => {
    Axios
      .get(`${API}/products`)
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => console.log("Error getting products from API",err));
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  return (
    <div className="App">
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop products={products}/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/products/:productId" element={<ProductDetails products={products} fetch={fetchProducts}/>}></Route>
            <Route path="/cart" element={<ShoppingCart />}></Route>
            <Route path="/user" element={<UserProfile />}></Route>
            <Route path="/our-story" element={<About />}></Route>
            <Route path="/create-product" element={<CreateProduct />}></Route>
        <Route path="/edit-product/productId" element={<EditProduct />}></Route>
          </Routes>

      <Footer />
    </div>
  );
}

export default App;
