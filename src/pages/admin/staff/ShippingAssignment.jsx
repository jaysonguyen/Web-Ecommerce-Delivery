import React from "react";
import "../../../assets/css/Pages/shippingAssignment.css";
import { AssignShipperTag, Input, StaffWithImage } from "../../../components";

function ShippingAssignment(props) {


  return (
    <div className="padding-body shipping-assignment_container">
      <h3>Shipping assignment</h3>
      <dd>Assign location for your shipper </dd>

      <div className="row">
        <div className="col col-lg-8">
          <AssignShipperTag />
          <AssignShipperTag />
          <AssignShipperTag />
          <AssignShipperTag />
        </div>
        <div className="shipping_assignment_list_shipper_container col col-lg-4">
          <h6>Shipper list</h6>
          <ul className="shipper_list">
            <li className="shipper_item flex-align-center">
              <span className="dot-assign"></span>
              <StaffWithImage />
            </li>
            <li className="shipper_item flex-align-center">
              <span className="dot-assign"></span>
              <StaffWithImage />
            </li>
            <li className="shipper_item flex-align-center">
              <span className="dot-assign"></span>
              <StaffWithImage />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShippingAssignment;
