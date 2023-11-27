import React, { useEffect, useState } from "react";
import { DotsThreeCircle, Plus, TrashSimple } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import "../../../assets/css/Pages/shippingAssignment.css";
import StaffWithImage from "./StaffWithImage";
import { getUserByBranchCode } from "../../../services/BranchService";
import { setAssignShipment } from "../../../services/UserService";
import toast from "react-hot-toast";

function AssignShipperTag({
  assignInfo,
  shipperList,
  shipperInfo,
  fetchAssignmentInfo,
}) {
  const [isShowSearchFeed, setShowSearchFeed] = useState(false);
  const [isShowSearchInput, setIsShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOnchangeInputSearchShipper = (e) => {
    setShowSearchFeed(true);
  };

  const handleOnClickSearchShipper = () => {
    setIsShowSearchInput((prev) => !prev);
  };

  const handleAddAssign = async () => {
    console.log("click click click ne");
    try {
      var checkInsert = await setAssignShipment("ARBD", "TD01", "shipper5385");
      if (checkInsert.status == 200) {
        toast.success("Insert success");
        fetchAssignmentInfo();
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="assign_location_item_box">
      <div>
        <div className="assign_location_title flex-align-center">
          <span className="font-weight-b">
            {assignInfo && assignInfo.area.name}
          </span>
          <span
            className={
              assignInfo.status == false ? "status_unassign" : "status_assign"
            }
          >
            {assignInfo.status == false ? "unassigned" : "assigned"}
          </span>
          <span className="assign_add_field_box flex-align-center">
            {isShowSearchInput && (
              <input
                value={searchValue}
                onChange={handleOnchangeInputSearchShipper}
                placeholder="Search"
              />
            )}
            <span
              onClick={handleOnClickSearchShipper}
              className="assign_button"
            >
              <Plus size={ICON_SIZE_BIG} />
            </span>
            {isShowSearchInput && isShowSearchFeed && shipperList && (
              <div className="search_shipper_field">
                {shipperList &&
                  shipperList.map((item) => {
                    return (
                      <div
                        onClick={handleAddAssign}
                        key={item.code}
                        className="search_shipper_item flex-center-center"
                      >
                        <StaffWithImage shipperName={item.fullName} />
                      </div>
                    );
                  })}
              </div>
            )}
          </span>
        </div>
        <ul className="assign_location_list_shipper">
          {shipperInfo && (
            <li className="assign_location_item flex-align-center">
              <StaffWithImage shipperName={shipperInfo} />
              <li className="assign_tool_list">
                <span>
                  <TrashSimple size={ICON_SIZE_BIG} />
                </span>
                <span>
                  <DotsThreeCircle size={ICON_SIZE_BIG} />
                </span>
              </li>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AssignShipperTag;
