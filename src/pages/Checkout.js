import {useState} from "react";
import Form from "../components/Form";
import Axios from 'axios';

export default function CheckOut({ cartItems }) {
  const [ user, setUser]= useState([])

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
      {cartItems.map((e) => {
        return (
          <div key={e._id}>
            <img src={e.image} alt="" />
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
