import React from "react";
import "../../../assets/css/Pages/customer.css";

function DetailModel({ children }) {
  return (
    <div className="detail_customer_container">
      <div className="count_quantity_type_order_cus">
        <div className="quantity_info">
          <h4>0đ</h4>
          <p>Total sales</p>
        </div>
        <div className="quantity_info">
          <h4>2</h4>
          <p>Completed</p>
        </div>
        <div className="quantity_info">
          <h4>1</h4>
          <p>Cancelled</p>
        </div>
        <div className="quantity_info">
          <h4>0</h4>
          <p>No-show</p>
        </div>
      </div>
      <div className="info_cus">{children}</div>
    </div>
  );
}

export default DetailModel;
