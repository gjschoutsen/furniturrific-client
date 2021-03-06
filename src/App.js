import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {AuthContext} from './context/auth.context';
import Axios from "axios";
import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";
import "@stripe/stripe-js"
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Thanks from "./pages/Thanks";
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const {number} = useContext(AuthContext);
  const API = process.env.REACT_APP_API_URL;
  
  const fetchProducts = () => {
    Axios.get(`${API}/products`)
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => console.log("Error getting products from API", err));
  };
  //Fetch products from DB, Fetch cart items form local storage, setCartItems
  useEffect(() => {
    fetchProducts();
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCartItems(cartFromStorage);
  }, []);
  // Check if product is in cart, if so update quantity to +1, else add property quantity and set to 1
  const addToCart = (product) => {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (productExists) {
      const newCart = cartItems.map((item) => {
        return item._id === product._id
          ? { ...productExists, quantity: productExists.quantity + 1 }
          : item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItems(newCart);
    } else {
      const newCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItems(newCart);
    }
  };

  const removeAllCartItems = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };
  // Find product in cart, if found set quantity to -1, else stays the same
  const reduceProduct = (product) => {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (productExists.quitantity === 1) {
      const newCart = cartItems.filter((item) => item._id !== product.id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItems(newCart);
    } else {
      const newCart = cartItems.map((item) => {
        return item.id === product.id && item.quantity >= 2
          ? { ...productExists, quantity: productExists.quantity - 1 }
          : item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItems(newCart);
    }
  };
  //Remove one product from cart
  const removeProduct = (product) => {
    const newCart = cartItems.filter((item) => item._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  return (
    <div>
      <div className="App">
        <div className="not-footer">
          <Navbar cartItems={cartItems} removeAllCartItems={removeAllCartItems} />
          <ScrollToTop />
          <Routes>
            <Route path="/thankyou" element={<Thanks />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/shop"
              element={
                <Shop
                  products={products}
                  addToCart={addToCart}
                  fetch={fetchProducts}
                />
              }
            ></Route>
            <Route path="/login/:num" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/products/:productId"
              element={
                <ProductDetails
                  addToCart={addToCart}
                  products={products}
                  fetch={fetchProducts}
                />
              }
            ></Route>
            <Route
              path="/cart/:num"
              element={
                <IsPrivate>
                  <ShoppingCart
                    reduceProduct={reduceProduct}
                    removeProduct={removeProduct}
                    removeAllCartItems={removeAllCartItems}
                    cartItems={cartItems}
                    addToCart={addToCart}
                  />
                </IsPrivate>
              }
            ></Route>
            <Route
              path="/cart/checkout"
              element={
                <IsPrivate>
                  <Checkout cartItems={cartItems} />
                </IsPrivate>
              }
            ></Route>
            <Route
              path="/user"
              element={
                <IsPrivate>
                  {" "}
                  <UserProfile />{" "}
                </IsPrivate>
              }
            ></Route>
            <Route path="/our-story" element={<About />}></Route>
            <Route
              path="/create-product"
              element={
                <IsAdmin>
                  {" "}
                  <CreateProduct fetch={fetchProducts} />{" "}
                </IsAdmin>
              }
            ></Route>
            <Route
              path="/edit-product/:productId"
              element={
                <IsAdmin>
                  {" "}
                  <EditProduct products={products} fetch={fetchProducts} />{" "}
                </IsAdmin>
              }
            ></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/cancel" element={<Cancel />}></Route>
          </Routes>
        </div>
      </div>
      <div className="keep-footer-down"></div>
      <div className="is-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
