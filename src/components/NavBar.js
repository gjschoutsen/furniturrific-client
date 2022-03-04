import React, {useContext, useState} from "react";
import {AuthContext} from '../context/auth.context';
import {CartContext} from '../context/shopping.cart.context';
import "./css/NavBar.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavBar(props) {

  const { isLoggedIn, user, isAdmin, logOutUser } = useContext(AuthContext);
  const {cart} = useContext(CartContext);
  const cartString = localStorage.getItem('cart')
  const cartTotal = JSON.parse(cartString)|| [];
  console.log(cartTotal)
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/shop">Shop</Nav.Link>
                {/* <Nav.Link href="#pricing">SALE!</Nav.Link> */}
              </Nav>
              <Nav>
              {isAdmin && (<Nav.Link href="/create-product">Create Product</Nav.Link>)}               
                <Nav.Link href="/our-story">Our Story</Nav.Link>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/cart">Cart {cartTotal.length}</Nav.Link>
                <NavDropdown title= {user ? user.username : "User"} id="collasible-nav-dropdown">
                 {isLoggedIn && (
                   <>
                      <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logOutUser}>Logout</NavDropdown.Item>
                    </>
                  )} 
                  {!isLoggedIn && (
                  <>
                    <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  </>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
}
