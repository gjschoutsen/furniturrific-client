import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import cart from "../images/cart.png";
import home from "../images/home.png";
import logo from "../images/logo.png";
import "./css/NavBar.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavBar({ cartItems, removeAllCartItems }) {
  const { isLoggedIn, user, isAdmin, logOutUser} =
    useContext(AuthContext);
  const [cartFromStorageState, setCartFromStorageState] = useState([]);
  // const [amountOfCartItems, setAmountOfCartItems]= useState(0)

  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCartFromStorageState(cartFromStorage);
  }, [cartItems]);

  let amountOfCartItems = cartFromStorageState?.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);

  const callFunctions = () => {
    logOutUser(); 
    removeAllCartItems();
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img className="nav-logo" src={logo} alt="cart" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>
              {/* <Nav.Link href="#pricing">SALE!</Nav.Link> */}
            </Nav>
            <Nav>
              {isAdmin && (
                <Nav.Link as={Link} to="/create-product">
                  Create Product
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/our-story">
                Our Story
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <img className="nav-image" src={cart} alt="cart" />{" "}
                {amountOfCartItems}
              </Nav.Link>
              <NavDropdown
                title={user ? user.username : "User"}
                id="collasible-nav-dropdown"
              >
                {isLoggedIn && (
                  <>
                    {/* <NavDropdown.Item as={Link} to="/user">Profile</NavDropdown.Item> */}
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item onClick={callFunctions}>
                      Logout
                    </NavDropdown.Item>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <NavDropdown.Item as={Link} to="/signup">
                      Sign up
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login/2">
                      Login
                    </NavDropdown.Item>
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
