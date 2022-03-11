import React, { useContext } from "react";
import Axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./css/ProductDetails.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

export default function ProductDetails({ fetch, products, addToCart }) {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const { productId } = useParams();
  const details = products.find((product) => productId === product._id);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const deleteProduct = () => {
    const storedToken = localStorage.getItem("authToken");
    Axios.delete(`${API}/products/${productId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        fetch();
        navigate("/shop");
      })
      .catch((err) => console.log("cannot delete project", err));
  };

  return (
    <div className="details-page">
      {details && (
        <>
          
          <div className="details-product">
            <div className="spacer"></div>
            <div className="details-img">
              <img src={details.image} alt={details.name} />
            </div>
            <div className="details-text">
              <div className="details-name-price">
                <h1>{details.name}</h1>
                <h3>€ {details.price},-</h3>
              </div>
              <div className="description-box">
                <p>{details.description}</p>
              </div>
                <Button onClick={() => addToCart(details)} variant="outline-success">
                  Add to cart
                </Button>
              <div className=" details-brand">
                <h5 >Brand name:</h5>
                <h5  className="brand-name" >{details.brand}</h5>
              </div>
            </div>
          </div>
          <div>
            {isLoggedIn && isAdmin && (
              <div className="details-buttons-container">
              <div className="details-buttons">
                <div>
                  <Button onClick={() => navigate(`/edit-product/${details._id}`)} variant="outline-primary">
                    Edit this product
                  </Button>
                </div>
                <Button onClick={deleteProduct} variant="outline-danger">
                  Delete this product
                </Button>{" "}
              </div>
              </div>
            )}
          </div>
          
        </>
      )}
      <div className="footer-spacer"></div>
    </div>
  );
}
