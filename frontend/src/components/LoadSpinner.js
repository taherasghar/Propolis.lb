import React from "react";
import brand_logo from "../images/three_hives_logo.png";
function LoadSpinner() {
  return (
    <div className="spinner">
      <img src={brand_logo} alt="Loading..." className="spinner-icon" />
    </div>
  );
}

export default LoadSpinner;
