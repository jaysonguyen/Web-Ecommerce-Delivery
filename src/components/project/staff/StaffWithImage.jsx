import React, { useEffect } from "react";

function StaffWithImage({ nameShipper }) {
  const bgColorList = [
    "#4d28d2",
    "#ff1717",
    "#192655",
    "#CD5C08",
    "#CD5C08",
    "#004225",
    "#FFB000",
    "#323377",
    "#E19898",
    "#89B7A9",
    "#D67398",
    "#00339B",
    "#E76244",
    "#CAE00C",
  ];
  const randomColor = () => {
    return Math.floor(Math.random(0, 20) * 14);
  };


  return (
    <>
      <div
        className="shipper_avatar flex-center-center"
        style={{ backgroundColor: `${bgColorList[randomColor()]}` }}
      >
        S
      </div>
      <div className="shipper_assign_name">{nameShipper}</div>
    </>
  );
}

export default StaffWithImage;
