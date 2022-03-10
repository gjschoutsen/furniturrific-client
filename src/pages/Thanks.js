import React from "react";
import "./css/Thanks.css";
import pic1 from "../images/Screenshot 2022-03-02 at 17.15.45.png";
import pic2 from "../images/Screenshot 2022-03-10 at 22.47.31.png";
import pic3 from "../images/Screenshot 2022-03-10 at 22.48.34.png";

export default function Thanks() {
  return (
    <div className="thanks">
      <div className="gif">
        <iframe
          src="https://giphy.com/embed/m2WQBH7DhSdgLfnTUi"
          width="480"
          height="480"
          frameBorder="0"
        ></iframe>
      </div>
      <div className="pic-cont">
        <div className="pic">
          <img src={pic2} alt="" />
        </div>
        <div className="pic">
          <img src={pic1} alt="" />
        </div>
        <div className="pic">
          <img src={pic3} alt="" />
        </div>
      </div>
    </div>
  );
}
