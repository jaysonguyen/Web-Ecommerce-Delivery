import React from "react";


function StatusButton({
  text = "Done",
  backgroundColor = "#a6bbe0",
  borderRadius = "8px",
  border = "0.5px solid #0e5ee7",
  boxShadow = "0 4px 6px 0 rgba(16, 25, 40, 0.2)",
  color = "#0e5ee7",
  padding = "8px 25px",
  cursor = "pointer",
  margin = "0 5px",
  height = "5px",
  width = "5px",
  display = "inline-block",
 alignItems = "center",
 marginRight = "7px",

}) {
  const style = {
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    border: border,
    boxShadow: boxShadow,
    color: color,
    padding: padding,
    cursor: cursor,
    margin: margin,
    display: "flex",
    alignItems: alignItems,
    
  };
  const styleDot = {
    backgroundColor: "#0e5ee7",
    borderRadius: "50%",
    height:height,
    width: width,
    display: display, 
    marginRight:marginRight,


  };
  
  return (
    <div className="padding-body btn_frame"  >
      <button className="title_btn" style={style}>
      <span class="dot" style={styleDot} ></span>
        {text}
      </button>
    </div>
  );
}

export default StatusButton;
