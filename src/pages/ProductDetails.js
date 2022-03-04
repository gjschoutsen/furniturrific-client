import React from "react";
import Axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./css/ProductDetails.css";
import { Button } from "react-bootstrap";

export default function ProductDetails(props) {
  const { productId } = useParams();
  const details = props.products.find((product) => productId === product._id);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const deleteProduct = () => {
    Axios.delete(`${API}/products/${productId}`)
      .then(() => {
        props.fetch();
        navigate("/shop");
      })
      .catch((err) => console.log("cannot delete project", err));
  };

  return (
    <div className="details-page">
      <h1>{details.name}</h1>
      <img src={details.image} alt={details.name} />
      <h3>€ {details.price},-</h3>
      <p>{details.brand}</p>
      <p>{details.description}</p>
      <div>
        <NavLink to={`/edit-product/${details._id}`}>Edit this product</NavLink>
      </div>
      <div>
      <Button onClick={deleteProduct} variant="outline-danger">Delete this product</Button>{' '}
      </div>
    </div>
  );
}
