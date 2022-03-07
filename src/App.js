import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
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
import IsPrivate from "./components/IsPrivate";
import IsAdmin from "./components/IsAdmin";

function App() {
  const [products, setProducts] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const fetchProducts = () => {
    Axios.get(`${API}/products`)
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => console.log("Error getting products from API", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (productExists) {
      setCartItems(
        cartItems.map((item) => {
          return item._id === product._id
            ? { ...productExists, quantity: productExists.quantity + 1 }
            : item;
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeAllCartItems = () => {
    setCartItems([]);
  };

  const reduceProduct = (product) => {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (productExists.quitantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) => {
          return item.id === product.id && item.quantity >= 2
                 ? { ...productExists, quantity: productExists.quantity - 1 }
                 : item;           
        }) 
      );
    };
  };

  const removeProduct = (product) => {
    const updatedCart = cartItems.filter(item => item._id !== product._id)
    setCartItems(updatedCart)
  };

  return (
    <div className="App">
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/shop"
          element={<Shop products={products} addToCart={addToCart} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/products/:productId"
          element={<ProductDetails addToCart={addToCart} products={products} fetch={fetchProducts} />}
        ></Route>
        <Route
          path="/cart"
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
              <CreateProduct fetch={fetchProducts}/>{" "}
            </IsAdmin>
          }
        ></Route>
        <Route
          path="/edit-product/productId"
          element={
            <IsAdmin>
              {" "}
              <EditProduct />{" "}
            </IsAdmin>
          }
        ></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
