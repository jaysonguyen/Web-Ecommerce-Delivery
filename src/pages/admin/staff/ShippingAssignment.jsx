import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/shippingAssignment.css";
import { AssignShipperTag, Input, StaffWithImage } from "../../../components";
import { getUserByBranchCode } from "../../../services/BranchService";
import {
  getShipperInBranchByBranchId,
  getShipperListByBranchCode,
  setAssignShipment,
} from "../../../services/UserService";
import toast from "react-hot-toast";

function ShippingAssignment(props) {
  const [assignInfo, setAssignInfo] = useState([]);
  const [shipperList, setShipperList] = useState([]);

  const fetchAssignmentInfo = async () => {
    try {
      const branchID = JSON.parse(localStorage.getItem("user_payload")).branch
        .branch_id;
      const shipperList = await getShipperInBranchByBranchId(branchID);
      if (shipperList) {
        setAssignInfo(shipperList.data);
        console.log(shipperList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShipperList = async () => {
    try {
      const branchCode = JSON.parse(localStorage.getItem("user_payload")).branch
        .code;
      const shipperList = await getShipperListByBranchCode(branchCode);
      if (shipperList) {
        setShipperList(shipperList.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignmentInfo();
    fetchShipperList();
  }, []);

  return (
    <div className=" shipping-assignment_container">
      <h3>Shipping assignment</h3>
      <dd>Assign location for your shipper </dd>

      <div className="row">
        <div className="col col-lg-9">
          {assignInfo &&
            assignInfo.map((item) => {
              return (
                <AssignShipperTag
                  fetchAssignmentInfo={fetchAssignmentInfo}
                  assignInfo={item}
                  shipperList={shipperList}
                  shipperInfo={item?.user?.fullName}
                />
              );
            })}
        </div>
        <div className="shipping_assignment_list_shipper_container col col-lg-3">
          <h6>Shipper list</h6>
          <ul className="shipper_list">
            {assignInfo &&
              assignInfo.map((item, index) => {
                return item?.user != null ? (
                  <li key={index} className="shipper_item flex-align-center">
                    <span className="dot-assign"></span>
                    <StaffWithImage shipperName={item.user.fullName} />
                  </li>
                ) : (
                  ""
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShippingAssignment;
