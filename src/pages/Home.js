import React from "react";
import "./css/Home.css";
import {NavLink} from 'react-router-dom';
import homeWrapper from "../images/home-wrapper.jpg";

export default function Home() {
  return (
    <div>
      <div className="home-image">
        <img src={homeWrapper} alt="" />
        <div className="title">
          <h1>Furniturrific</h1>
        </div>
        <NavLink to="/shop">
        <div className="to-shop">
            <div>
            <h2>Shop</h2>
            </div>
            <div>
            <h2>now</h2>
            </div>
        </div>
        </NavLink>
      </div>
      

    </div>
  );
}
