import React from "react";
import "./css/NavBar.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavBar() {
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
                <Nav.Link href="/create-product">Create Product</Nav.Link>
                <Nav.Link href="/our-story">Our Story</Nav.Link>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <NavDropdown title="User" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
}