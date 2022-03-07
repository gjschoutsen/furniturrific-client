import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./css/Shop.css";

export default function Shop({products, addToCart}) {

  // const { addToCart } = useContext(CartContext);

  return (
    <div>
      <div className="shop-container">
        {products.map((e) => {
          return (
            <div key={e._id}>
              <Card style={{ width: "18rem" }}>
                <NavLink to={`/products/${e._id}`}>
                  <Card.Img variant="top" src={e.image} />
                </NavLink>
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text>{e.description}</Card.Text>
                  <Card.Text>{e.price}</Card.Text>
                  <Button onClick={() => addToCart(e) } variant="primary">Add to cart</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
