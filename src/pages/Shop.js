import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./css/Shop.css";

export default function Shop(props) {
  return (
    <div>
      <div className="shop-container">
        {props.products.map((e) => {
          return (
            <div key={e._id}>
              <Card style={{ width: "18rem" }}>
                <NavLink to={`/products/${e._id}`}>
                  <Card.Img variant="top" src={e.image} />
                </NavLink>
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text>{e.description}</Card.Text>
                  <Button onClick={()=>{}} variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
