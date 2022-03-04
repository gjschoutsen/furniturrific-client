import React, { useContext } from "react";
import Axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./css/ProductDetails.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

export default function ProductDetails(props) {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const { productId } = useParams();
  const details = props.products.find((product) => productId === product._id);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const deleteProduct = () => {
    const storedToken = localStorage.getItem("authToken");
    Axios.delete(`${API}/products/${productId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        props.fetch();
        navigate("/shop");
      })
      .catch((err) => console.log("cannot delete project", err));
  };

  return (
    <div className="details-page">
      {details && (
        <>
          <h1>{details.name}</h1>
          <img src={details.image} alt={details.name} />
          <h3>€ {details.price},-</h3>
          <p>{details.brand}</p>
          <p>{details.description}</p>
          <div>
            {isLoggedIn && isAdmin && (
              <>
                <div>
                  <NavLink to={`/edit-product/${details._id}`}>
                    Edit this product
                  </NavLink>
                </div>
                <Button onClick={deleteProduct} variant="outline-danger">
                  Delete this product
                </Button>{" "}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
