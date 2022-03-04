import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProviderWrapper} from "./context/auth.context";
import {ShoppingCartWrapper,} from "./context/shopping.cart.context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ShoppingCartWrapper>
          <App />
        </ShoppingCartWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
