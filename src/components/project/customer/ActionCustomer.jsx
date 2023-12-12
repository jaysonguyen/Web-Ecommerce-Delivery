import React, { useState } from "react";
import "../../../assets/css/Pages/customer.css";
import { Link } from "react-router-dom";

function ActionCustomer({
  isShowIcon = false,
  item = [],
  width = "158.422px",
  height = "190px",
  boxShadow = "0 4px 6px 0 rgba(16, 25, 40, 0.1)",
  border = "1px solid #d5d7da",
  borderRadius = "8px",
  position = "absolute",
  zIndex = "12",
  icon = <div></div>,
  onClick = false,
  callBack = "",
}) {
  const style = {
    border: border,
    width: width,
    zIndex: zIndex,
    position: position,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
  };

  return (
    <>
      <div className="combo_action_group" style={style}>
        <div className="group">
          {item.map((item, index) => {
            return (
              <div className="action_name" key={index}>
                {icon}
                {item.action}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ActionCustomer;
