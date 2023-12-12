import React from "react";

//css
import "../../../assets/css/input/input.css";
import { MyButton } from "../button/MyButton/MyButton";
function Input({
  label = "",
  placeholder = "",
  type = "text",
  width = "100%",
  height = "50px",
  borderRadius = "3px",
  border = "",
  boxShadow = "0 0 5px var(--box-shadow-color)",
  icon,
  value = "",
  className = "",
  onChange = function (v) {},
  setDisabled = false,
}) {
  let style = {
    width: width,
    borderRadius: borderRadius,
  };
  let inputStyle = {
    width: width,
    height: height,
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
  };

  return (
    <div
      className={"input_container flex-direction-column" + className}
      style={style}
    >
      {label && (
        <label
          className="text_dark text_gray"
          style={{
            textAlign: "left",
          }}
        >
          {label}
        </label>
      )}
      <div className="d-flex input_content m-0" style={inputStyle}>
        {icon && (
          <MyButton
            width="5%"
            height="25px"
            bgColor="transparent"
            padding="none"
            margin="none"
            prefix={icon}
          />
        )}
        <input
          className="text_dark"
          placeholder={placeholder}
          value={value}
          type={type}
          defaultValue={value}
          onChange={onChange}
          disabled={setDisabled}
        />
      </div>
    </div>
  );
}

export default Input;
