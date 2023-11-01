import React from "react";

//css
import "../../../assets/css/input/input.css";
import { MyButton } from "../button/MyButton/MyButton";
function Input({
  label = "",
  placeholder = "",
  type = "text",
  width = "100%",
  borderRadius = "3px",
  icon,
  value = "",
  onChange = function (v) {},
}) {
  let style = {
    width: width,
    borderRadius: borderRadius,
  };
  let inputStyle = {
    width: width,
    borderRadius: borderRadius,
  };

  return (
    <div className="input_container flex-direction-column" style={style}>
      {label && (
        <label className="text_dark font-weight-b text_gray">{label}</label>
      )}
      <div className="d-flex input_content" style={inputStyle}>
        {icon && <MyButton bgColor="transparent" prefix={icon} />}
        <input
          className="text_dark"
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Input;
