import React, { useState } from "react";
import "./MyButton.css";
import * as Icon from "phosphor-react";

export const MyButton = ({
  text,
  callback,
  prefix = null,
  surfix = null,
  bgColor = "rgba(179,179,179,0.6)",
  fontColor = "#3d3d3d",
  height = 35,
  width = 80,
  fontSize = 14,
  borderRadius = 2,
  padding = "5px 10px",
  hoverColor = bgColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? hoverColor : bgColor,
    width: width,
    height: height,
    cursor: "pointer",
    fontSize: fontSize,
    fontWeight: "bold",
    color: fontColor,
    borderRadius: borderRadius,
    transition: "transform 0.3s ease",
    padding: padding,
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={callback}
      style={style}
      className="mybutton d-inline-flex justify-content-around align align-items-center"
    >
      {prefix && <div className="button-icon">{prefix}</div>}
      {text && <div>{text}</div>}
      {surfix && <div className="button-icon">{surfix}</div>}
    </button>
  );
};
