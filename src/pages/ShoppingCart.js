import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function ShoppingCart({
  cartItems,
  addToCart,
  removeAllCartItems,
  reduceProduct,
  removeProduct,
}) {
  const [cartFromStorageState, setCartFromStorageState] = useState([]);

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart"));
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);

  const totalPrice = cartFromStorageState?.reduce((price, item) => {
    return price + item.quantity * item.price;
  }, 0);
  console.log(cartFromStorageState);

 

  const renderItems = () => {
    return cartFromStorageState?.map((e) => {
      return (
        <div key={e._id}>
          <img src={e.image} alt="" />
          <div>
            <h3>{e.name}</h3>
          </div>
          <button onClick={() => addToCart(e)}>+</button>
          <div>{e.quantity}</div>
          <button
            onClick={() => {
              reduceProduct(e);
            }}
          ></button>
          <div>Price: {e.price}</div>
          <button onClick={() => removeProduct(e)}>x</button>
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Your shoppinglist here: </h1>

      <div>
        <div>{renderItems()}</div>
        <div className="total-price">
          <h4>Total Price: {totalPrice}</h4>
        </div>
      </div>

      {cartFromStorageState.length >= 1 && (
        <div className="empty-button">
          <button onClick={removeAllCartItems}>Empty cart</button>
        </div>
      )}

      <div className="checkout-button">
        <Nav.Link as={Link} to="/cart/checkout">
          Checkout
        </Nav.Link>
      </div>
    </div>
  );
}
