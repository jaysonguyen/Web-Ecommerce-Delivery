import React, { useState } from "react";
import "./MyButton.css";
import * as Icon from "phosphor-react";

export const MyButton = ({
  text,
  callback,
  isDisable = false,
  prefix = null,
  surfix = null,
  bgColor,
  fontColor = "#3d3d3d",
  height = "35px",
  width = "80px",
  fontSize = 14,
  borderRadius = 2,
  padding = "5px 10px",
  margin = "0",
  hoverColor,
  borderColor,
  hide = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: !isDisable
      ? isHovered && hoverColor
        ? hoverColor
        : bgColor
      : "rgb(61,61,61, 0.5)",
    width: width,
    height: height,
    cursor: !isDisable ? "pointer" : "not-allowed",
    fontSize: fontSize,
    fontWeight: "bold",
    color: !isDisable
      ? isHovered && bgColor && hoverColor
        ? bgColor
        : fontColor
      : "white",
    borderRadius: borderRadius,
    padding: padding,
    margin: margin,
    border: borderColor ? `1px solid ${borderColor}` : "",
    transition: "linear 0.1s",
  };

  return (
    <button
      onMouseEnter={() => !isDisable && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!isDisable ? callback : () => {}}
      style={style}
      className={
        "mybutton d-inline-flex justify-content-around align align-items-center " +
        (hide ? "d-none" : "")
      }
    >
      {prefix && <div className="button-icon m-0">{prefix}</div>}
      {text && <div>{text}</div>}
      {surfix && <div className="button-icon m-0">{surfix}</div>}
    </button>
  );
};
