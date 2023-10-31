import React from "react";
import { MyButton } from "../../template/button/MyButton/MyButton";
import { useDispatch, useSelector } from "react-redux";
import displaySlice from "../../../features/Display/displaySlice";

export const OrderButtons = ({ rowData = {} }) => {
  const dispatch = useDispatch();

  const handleViewDetail = () => {
    dispatch(displaySlice.actions.openDetails(rowData));
  };

  return (
    <div>
      <MyButton
        text={"Details"}
        margin="5px 15px"
        borderRadius="20px"
        callback={() => handleViewDetail()}
      />
    </div>
  );
};
