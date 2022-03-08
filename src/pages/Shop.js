import { useState} from "react";
import { NavLink } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import shopImage from "../images/shop-image-white.jpg";
import "./css/Shop.css";

export default function Shop({ products, addToCart }) {
  const [ filter , setFilter] = useState(products)

  const filterChairs = () => {
    const chairs = products.filter((product) => {
      return product.productType === "chair" 
    })
    setFilter(chairs);
  }
  const filterTables = () => {
    const tables = products.filter((product) => {
      return product.productType === "table" 
    })
    console.log(tables);
    setFilter(tables);
  }
  const filterLights = () => {
    const lights = products.filter((product) => {
      return product.productType === "light" 
    })
    setFilter(lights);
  }
  const filterCouches = () => {
    const couches = products.filter((product) => {
      return product.productType === "couch" 
    })
    setFilter(couches);
  }
  const filterAccesories = () => {
    const accessories = products.filter((product) => {
      return product.productType === "accessories" 
    })
    setFilter(accessories);
  }
  const showAll = () => {
    setFilter(products);
  }


  return (
    <div>
      <div className="shop-container">
        <div>
          <div className="shop-header">
            <div className="text-box">
              <div>
            <button onClick={filterChairs} className="shop-button">
                <h3>Chairs</h3>
              </button>
              </div>
              <div>
              <button onClick={filterTables} className="shop-button">
                <h3>Tables</h3>
              </button>
              </div>
              <div>
              <button onClick={filterLights} className="shop-button">
                <h3>Lights</h3>
              </button>
              </div>
              <div>
              <button onClick={filterCouches} className="shop-button">
                <h3>Couches</h3>
              </button>
              </div>
              <div>
              <button onClick={filterAccesories} className="shop-button">
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
              <img src={shopImage} alt="" />
            </div>
          </div>
          <div className="shop-map">
            {filter.map((e) => {
              return (
                <div key={e._id}>
                  <div className="cart">
                    <Card style={{ width: "18rem", height: "28rem" }}>
                      <NavLink to={`/products/${e._id}`}>
                        <Card.Img variant="top" src={e.image} />
                      </NavLink>
                      <Card.Body>
                        <Card.Title>{e.name}</Card.Title>
                        <Card.Text>{e.description}</Card.Text>
                        <Card.Text>{e.price},-</Card.Text>
                        <Button onClick={() => addToCart(e)} variant="outline-warning">
                          Add to cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
