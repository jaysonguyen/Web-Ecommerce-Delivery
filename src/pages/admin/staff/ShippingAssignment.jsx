import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/shippingAssignment.css";
import { AssignShipperTag, Input, StaffWithImage } from "../../../components";
import { getUserByBranchCode } from "../../../services/BranchService";

function ShippingAssignment(props) {
  const [shipperList, setShipperList] = useState([]);

  const fetchAssignmentInfo = async () => {
    try {
      const getRoleCode = JSON.parse(localStorage.getItem("user_payload"))
        .branch.code;
      const shipperList = await getUserByBranchCode(getRoleCode);
      if (shipperList) {
        setShipperList(shipperList);
      }
      await console.log(shipperList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignmentInfo();
  }, []);

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
