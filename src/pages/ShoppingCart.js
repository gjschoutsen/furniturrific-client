import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { Nav, ToastContainer, Toast, Button } from "react-bootstrap";
import logo from "../images/logo.png";
import "./css/ShoppingCart.css";

export default function ShoppingCart({
  cartItems,
  addToCart,
  removeAllCartItems,
  reduceProduct,
  removeProduct,
}) {
  const [cartFromStorageState, setCartFromStorageState] = useState([]);
  const [show, setShow] = useState(false);
  const cartNum = useParams();

  const ToastMessage = () => {
    return (
      <ToastContainer position="middle-center">
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <img src={logo} className="rounded me-2" alt="" width="40px" />
            <strong className="me-auto">Payment was cancelled</strong>
            <small className="text-muted">I'm sorry</small>
          </Toast.Header>
          <Toast.Body variant="Dark">Please try again</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  };
  //Show toast on page load
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);

  const totalPrice = cartFromStorageState?.reduce((price, item) => {
    return price + item.quantity * item.price;
  }, 0);

  const renderItems = () => {
    return cartFromStorageState?.map((e) => {
      return (
        <div className="product-box" key={e._id}>
          <div className="product-box-img">
            <img src={e.image} alt="" />
          </div>
          <div className="product-box-text">
            <div>
              <h3>{e.name}</h3>
            </div>
            <div className="product-box-btns">
              <button onClick={() => addToCart(e)}>+</button>
              <div className="product-box-quantity">{e.quantity}</div>
              <button onClick={() => reduceProduct(e)}>-</button>
            </div>
            <div className="product-box-price">€ {e.price},-</div>
          </div>
          <div className="remove-btn">
            <button onClick={() => removeProduct(e)}>x</button>
          </div>
        </div>
      );
    });
  };
  console.log(cartNum.num);

  return (
    <div>
      {cartFromStorageState.length === 0 && <div className="empty-cart">
        <div className="empty-text-box">
          <div>Your shopping cart is empty.</div>
          <div>Pleas add your items in the shop.</div>
          <div className="to-the-shop">
            <Button as={Link} to="/shop" variant="outline-warning">To the shop!</Button>
          </div>
        </div>
      </div>}
      <div>{cartNum.num === "2" && ToastMessage()}</div>
      <div className="shopping-cart">
        <div className="sc-title">
          <h1>Shopping List:</h1>
        </div>

        <div className="sc-product-container">
          <div>{renderItems()}</div>
        </div>
        <div className="fixed-items">
          <div className="total-price">
            <h4>Total:</h4> 
              <div>€ {totalPrice},-</div>
          </div>


          {cartFromStorageState.length && (
            <div className="checkout-button">
              <Button variant="warning" as={Link} to="/cart/checkout">
                Checkout
              </Button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
