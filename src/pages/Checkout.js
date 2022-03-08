import {useState, useEffect} from "react";
import Form from "../components/Form";
import Axios from 'axios';
import './css/Checkout.css'
export default function CheckOut({ cartItems }) {
  const [ user, setUser]= useState([])
  const [cartFromStorageState, setCartFromStorageState] = useState([]);

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart"));
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);

  return (
    <div className="checkout-body">

      <div className="add-address">
        {/* <Form /> */}
      </div>

      <div className="show-address">
        {user.map((userDetails)=>{
          return(
            <div className="user-details">
              <div>{userDetails.username}</div>
              <div>{userDetails.address.street}</div>
              <div>{userDetails.address.postalCode}</div>
              <div>{userDetails.address.city}</div>
              <div>{userDetails.address.state}</div>
              <div>{userDetails.address.country}</div>
            </div>
          )
        })}
      </div>

    <div className="checkout-items">
      {cartFromStorageState.map((e) => {
        return (
          <div className="checkout-container" key={e._id}>
            <div>
            <img src={e.image} alt="" />
            </div>
            <div>
              <h3>{e.name}</h3>
            </div>
            <div>{e.quantity}</div>
            <div>Price: {e.price}</div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
