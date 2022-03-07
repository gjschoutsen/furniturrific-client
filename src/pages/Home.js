import React from "react";
import "./css/Home.css";
import homeWrapper from "../images/home-wrapper.jpg";

export default function Home() {
  return (
    <div>
      <div className="home-image">
        <img src={homeWrapper} alt="" />
      </div>

    </div>
  );
}
