import { OrderItem } from "./OrderItem";
import { Toolkit } from "../../template/toolkit/Toolkit";
import React from "react";

export const OrderList = ({
  data = [],
  deleteCallback = function () {},
  select = [],
}) => {
  return (
    <>
      <Toolkit selectedList={select} deleteCallback={deleteCallback} />
      <div className="row">
        {data.map((item) => (
          <div className="col-3 my-2 px-1">
            <OrderItem data={item} />
          </div>
        ))}
      </div>
    </>
  );
};
