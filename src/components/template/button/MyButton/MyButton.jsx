import React, { useState } from "react";
import "./MyButton.css";
import * as Icon from "phosphor-react";

export const MyButton = ({
  text,
  callback,
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
    backgroundColor: isHovered && hoverColor ? hoverColor : bgColor,
    width: width,
    height: height,
    cursor: "pointer",
    fontSize: fontSize,
    fontWeight: "bold",
    color: isHovered && bgColor && hoverColor ? bgColor : fontColor,
    borderRadius: borderRadius,
    transition: "transform 0.3s ease",
    padding: padding,
    margin: margin,
    border: borderColor ? `1px solid ${borderColor}` : "",
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={callback}
      style={style}
      className={
        "mybutton d-inline-flex justify-content-around align align-items-center " +
        (hide ? "d-none" : "")
      }
    >
      {prefix && <div className="button-icon">{prefix}</div>}
      {text && <div>{text}</div>}
      {surfix && <div className="button-icon">{surfix}</div>}
    </button>
  );
};
