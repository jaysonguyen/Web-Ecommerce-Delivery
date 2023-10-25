import React from "react";

//css
import "../../../assets/css/input/input.css";
function Input({ label = "", placeholder = "" }) {
  return (
    <div className="input_container flex-direction-column">
      {label && <label className="text_dark font-weight-b text_gray">{label}</label>}
      <input className="text_dark" placeholder={placeholder} />
    </div>
  );
}

export default Input;
