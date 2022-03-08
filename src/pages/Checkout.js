import { useState, useEffect } from "react";
import Form from "../components/Form";
import Axios from "axios";
import "./css/Checkout.css";
export default function CheckOut({ cartItems }) {
  const [user, setUser] = useState([]);
  const [cartFromStorageState, setCartFromStorageState] = useState([]);

  const totalPrice = cartFromStorageState?.reduce((price, item) => {
    return price + item.quantity * item.price;
  }, 0);

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart"));
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);

  const renderAddress = () => {
    return (
      <div className="render-address">
        {user.map((userDetails) => {
          return (
            <div className="user-details">
              <div>{userDetails.username}</div>
              <div>{userDetails.address.street}</div>
              <div>{userDetails.address.postalCode}</div>
              <div>{userDetails.address.city}</div>
              <div>{userDetails.address.state}</div>
              <div>{userDetails.address.country}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCartItems = () => {
    return (
      <div>
        {cartFromStorageState.map((e) => {
          return (
            <div className="checkout-container" key={e._id}>
              <div>
                <p>{e.name}</p>
              </div>
              <div className="quant-price">
                <div>{e.quantity}</div>
                <div>€ {e.price},-</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="checkout-body">
      <div className="add-address">{/* <Form /> */}</div>
      {renderAddress()}
      <div className="checkout-items">
        <h5>Your Order</h5>
        {renderCartItems()}
        <div className="checkout-total-price">Total: €{totalPrice},-</div>
        <button>Pay</button>
      </div>
    </div>
  );
}
