import React, { useState } from "react";
import "./MyButton.css";

export const MyButton = ({
  text,
  callback,
  icon = <div></div>,
  bgColor = "rgba(179,179,179,0.6)",
  fontColor = "#3d3d3d",
  height = 35,
  width = 80,
  fontSize = 14,
  borderRadius = 2,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? "rgba(61,61,61, 0.6)" : bgColor,
    width: width,
    height: height,
    cursor: "pointer",
    fontSize: fontSize,
    fontcolor: fontColor,
    borderRadius: borderRadius,
    transition: "transform 0.3s ease",
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={callback}
      style={style}
      className="mybutton d-inline-flex justify-content-around align align-items-center"
    >
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
};
