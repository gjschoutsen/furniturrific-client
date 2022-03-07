import React from "react";
import "./css/Home.css";
import homeWrapper from "../images/home-wrapper.jpg";

export default function Home() {
  return (
    <div>
      <div className="home-image">
        <img src={homeWrapper} alt="" />
        <div className="title">
          <h1>Furnituriffic</h1>
        </div>
        <div className="to-shop">
          <h2>Furnituriffic</h2>
        </div>
      </div>
      

    </div>
  );
}
