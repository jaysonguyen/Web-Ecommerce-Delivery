import React from "react";

//css
import "../../../assets/css/input/input.css";
import { MyButton } from "../button/MyButton/MyButton";
function Input({
  label = "",
  placeholder = "",
  type = "text",
  width = "100%",
  borderRadius = "10px",
  icon,
  onChange = () => {},
}) {
  let style = {
    width: width,
    borderRadius: borderRadius,
  };

  return (
    <div className="input_container flex-direction-column" style={style}>
      {label && (
        <label className="text_dark font-weight-b text_gray">{label}</label>
      )}
      <div className="d-flex">
        {icon && <MyButton bgColor="transparent" prefix={icon} />}
        <input
          className="text_dark"
          placeholder={placeholder}
          type={type}
          onChange={(v) => onChange(v)}
        />
      </div>
    </div>
  );
}

export default Input;
