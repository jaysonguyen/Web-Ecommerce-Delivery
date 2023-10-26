import React from "react";
import Input from "../../template/Input/Input";

export const Toolkit = ({ bgColor = "#3d3d3d" }) => {
  const style = {
    backgroundColor: "rgba(var(--bg-light-purple), 0.7)",
    borderRadius: "10px",
  };

  return (
    <div className="tookit-wrapper px-2 py-3" style={style}>
      <Input
        placeholder="Search by name, email or mobile number"
        borderRadius="50px"
        width="50%"
      />
    </div>
  );
};
