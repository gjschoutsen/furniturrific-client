import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, ToastContainer, Toast } from "react-bootstrap";
import shopImage from "../images/shop-image-white.jpg";
import logo from "../images/logo.png"
import "./css/Shop.css";
import { computeHeadingLevel } from "@testing-library/react";

export default function Shop({ products, addToCart }) {
  const [filter, setFilter] = useState(products);

  const filterProducts = (productType) => {
    const result = products.filter((product) => {
      return product.productType === productType;
    });
    setFilter(result);
  };

  const showAll = () => {
    setFilter(products);
  };

  useEffect(() => {
    setFilter(products);
  }, [products]);

  const renderMap = () => {
    return filter.map((e) => {
      return (
        <div key={e._id}>
          <div className="cart">
            <Card border="light" style={{ width: "18rem", height: "30rem" }}>
              <NavLink to={`/products/${e._id}`}>
                <Card.Img variant="top" src={e.image} />
              </NavLink>
              <Card.Body className="card-body">
                <Card.Title>{e.name}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
                <div className="shop-price">
                <Card.Text>€ {e.price},-</Card.Text>
                </div>
                <div className="add-to-cart">
                  <Button
                    onClick={() => {addToCart(e);}}
                    variant="outline-warning"
                  >
                    Add to cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="shop-container">
        <div>
          <div className="shop-header">
            <div className="text-box">
              <div>
                <button
                  onClick={() => filterProducts("chair")}
                  className="shop-button"
                >
                  <h3>Chairs</h3>
                </button>
              </div>
              <div>
                <button
                  onClick={() => filterProducts("table")}
                  className="shop-button"
                >
                  <h3>Tables</h3>
                </button>
              </div>
              <div>
                <button
                  onClick={() => filterProducts("light")}
                  className="shop-button"
                >
                  <h3>Lights</h3>
                </button>
              </div>
              <div>
                <button
                  onClick={() => filterProducts("couch")}
                  className="shop-button"
                >
                  <h3>Couches</h3>
                </button>
              </div>
              <div>
                <button
                  onClick={() => filterProducts("accessories")}
                  className="shop-button"
                >
                  <h3>Accesories</h3>
                </button>
              </div>
              <div>
                <button onClick={showAll} className="shop-button">
                  <h3>Show All</h3>
                </button>
              </div>
            </div>
            <div className="shop-image">
              <img src={shopImage} alt="Cover" />
            </div>
          </div>
          <div className="shop-map">
            {products.length ? renderMap() : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
