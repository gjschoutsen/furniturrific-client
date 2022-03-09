import { useState, useEffect, useContext } from "react";
import {Navigate} from 'react-router-dom'
import Form from "../components/Form";
import { AuthContext } from "../context/auth.context";
import { FormContext } from "../context/form.context";
import Axios from "axios";
import "./css/Checkout.css";
import { Button } from "react-bootstrap";
const API = process.env.REACT_APP_API_URL;

export default function CheckOut({ cartItems }) {
  const { formInputs, removeInputs } = useContext(FormContext);
  const { user, getToken } = useContext(AuthContext);
  const storedToken = getToken();
  const [cartFromStorageState, setCartFromStorageState] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [render, setRender] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [ defaultValues, setDefaultValues ] = useState(
    {
      street: currentUser.street,
      city: currentUser.city,
      state: currentUser.state,
      postalCode: currentUser.postalCode,
      country: currentUser.country,
    } 
  );
    console.log("defaultValues", defaultValues)
    console.log(formInputs)
  useEffect(() => { 
    setDefaultValues(formInputs);
   },[])


  // calculate total price of products
  const totalPrice = cartFromStorageState?.reduce((price, item) => {
    return price + item.quantity * item.price;
  }, 0);
  // get cart items from storage
  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart"))??[];
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);
  // GET user information from DB
  const fetchUserInfo = () => {
    
    Axios
      .get(`${API}/user/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch(err => console.log("Cannot get user information from DB"))
  };
  //Render the user information
  const renderAddress = () => {
    return (
      <div className="render-address">
            <div className="user-details">
              <div>{currentUser.username}</div>
              <div>Street: {currentUser.street}</div>
              <div>PostalCode: {currentUser.postalCode}</div>
              <div>City: {currentUser.city}</div>
              <div>State: {currentUser.state}</div>
              <div>Country: {currentUser.country}</div>
            </div>
            <div>
              <Button onClick={renderEditFormOnClick} variant="outline-info">Edit</Button>
            </div>
      </div>
    );
  };

  useEffect(() => { 
    fetchUserInfo() 
  },[])

  const renderCartItems = () => {
    return (
      <div>
        {cartFromStorageState?.map((e) => {
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

  let template = {
    title: "Please provide your Shipping Information",
    fields: [
      {
        title: "Street:",
        type: "text",
        name: "street",
        value: defaultValues.street,
      },
      {
        title: "City:",
        type: "text",
        name: "city",
        value: defaultValues.city,
      },
      {
        title: "State:",
        type: "text",
        name: "state",
        value: defaultValues.state,
      },
      {
        title: "Postal Code:",
        type: "text",
        name: "postalCode",
        value: defaultValues.postalCode,
      },
      {
        title: "Country:",
        type: "text",
        name: "country",
        value: defaultValues.country,
      },
    ],
  };

  const onSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`${API}/user/${user._id}`, formInputs, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        fetchUserInfo();
        setRender(false)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const renderEditFormOnClick = () => {
    setRender(true);
  }
  const renderCondition = () => {
    return currentUser && (Object.keys(currentUser).length < 13 || render === true ? renderForm() : renderAddress())  
  }

  const renderForm = () => {
    return <div className="add-address">{ <Form template={template} onSubmit={onSubmit}/> }</div>
  }

  return (
    <div className="checkout-body">
      {renderCondition()}
      <div className="checkout-items">
        <h5>Your Order</h5>
        {renderCartItems()}
        <div className="checkout-total-price">Total: €{totalPrice},-</div>
        <button>Pay</button>
      </div>
    </div>
  );
};