import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/shippingAssignment.css";
import {
  AssignShipperTag,
  Dropdown,
  Input,
  StaffWithImage,
} from "../../../components";
import {
  getBranchList,
  getUserByBranchCode,
} from "../../../services/BranchService";
import {
  getShipperAssignmentByBranchId,
  getShipperListByBranchId,
} from "../../../services/UserService";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";

function ShippingAssignment(props) {
  const [assignInfo, setAssignInfo] = useState([]);
  const [shipperList, setShipperList] = useState([]);
  const [branchDropdown, setBranchDropdown] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const { userPayload } = useToken();

  const fetchAssignmentInfo = async () => {
    try {
      let branch =
        userPayload.role === "admin" ? branchId : userPayload.branch.branch_id;
      const assignList = await getShipperAssignmentByBranchId(branch);
      if (assignList) {
        setAssignInfo(assignList.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShipperList = async () => {
    try {
      let branch =
        userPayload.role === "admin" ? branchId : userPayload.branch.branch_id;
      const shipperList = await getShipperListByBranchId(branch);
      if (shipperList) {
        setShipperList(shipperList.data);
        // console.log(shipperList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranch = async () => {
    try {
      const res = await getBranchList();
      if (res.status === 200) {
        setBranchDropdown([]);
        setBranchId(res.data[0].branch_id);
        setBranchName(res.data[0].name);
        for (let i = 0; i < res.data.length; i++) {
          setBranchDropdown((list) => [
            ...list,
            { code: res.data[i].branch_id, content: res.data[i].name },
          ]);
        }
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchAssignmentInfo();
    fetchShipperList();

    console.log(branchDropdown);
  }, [branchId]);

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div className=" shipping-assignment_container">
      <div className={"d-flex justify-content-between mb-2"}>
        <div>
          <h3>Shipping assignment</h3>
          <dd>Assign location for your shipper </dd>
        </div>
        <Dropdown
          item={branchDropdown}
          width={"15vw"}
          value={branchName}
          onChange={setBranchId}
          onValue={setBranchName}
          placeholder={"Choose branch"}
        />
      </div>

      <div className="row">
        <div className="col col-lg-9">
          {assignInfo.length > 0 ? (
            assignInfo.map((item, index) => {
              return (
                <AssignShipperTag
                  key={index}
                  fetchAssignmentInfo={fetchAssignmentInfo}
                  assignInfo={item}
                  shipperList={shipperList}
                  shipperInfo={item?.user?.fullName}
                />
              );
            })
          ) : (
            <div
              className={"center"}
              style={{
                color: "#d3d3d3",
              }}
            >
              No data
            </div>
          )}
        </div>
        <div className="shipping_assignment_list_shipper_container col col-lg-3">
          <h6>Shipper list</h6>
          <ul className="shipper_list">
            {shipperList.length > 0 ? (
              shipperList.map((item, index) => {
                return (
                  <li key={index} className="shipper_item flex-align-center">
                    <span className="dot-assign"></span>
                    <StaffWithImage shipperName={item.fullName} />
                  </li>
                );
              })
            ) : (
              <div
                className={"center"}
                style={{
                  color: "#d3d3d3",
                }}
              >
                No data
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShippingAssignment;
