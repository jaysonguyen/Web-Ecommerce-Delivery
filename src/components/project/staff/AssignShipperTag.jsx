import React, { useEffect, useState } from "react";
import { DotsThreeCircle, Plus, TrashSimple } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import "../../../assets/css/Pages/shippingAssignment.css";
import StaffWithImage from "./StaffWithImage";
import { getUserByBranchCode } from "../../../services/BranchService";

function AssignShipperTag(props) {
  const [isShowSearchFeed, setShowSearchFeed] = useState(false);
  const [isShowSearchInput, setIsShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const handleOnchangeInputSearchShipper = (e) => {
    setShowSearchFeed(true);
  };

  const handleOnClickSearchShipper = () => {
    setIsShowSearchInput((prev) => !prev);
  };


  return (
    <div className="assign_location_item_box">
      <div>
        <div className="assign_location_title flex-align-center">
          <span className="font-weight-b">Linh trung </span>
          <span className="status_assign assign_status">assigned</span>
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
            {/* {isShowSearchInput && isShowSearchFeed && shipperList && (
              <div className="search_shipper_field">
                {shipperList.map((item) => {
                  return (
                    <>
                      <div className="search_shipper_item flex-center-center">
                        <StaffWithImage nameShipper={item.fullName} />
                      </div>
                    </>
                  );
                })}
              </div>
            )} */}
          </span>
        </div>
        <ul className="assign_location_list_shipper">
          <li className="assign_location_item flex-align-center">
            <StaffWithImage />
            <li className="assign_tool_list">
              <span>
                <TrashSimple size={ICON_SIZE_BIG} />
              </span>
              <span>
                <DotsThreeCircle size={ICON_SIZE_BIG} />
              </span>
            </li>
          </li>
          <li className="assign_location_item flex-align-center">
            <StaffWithImage />
            <li className="assign_tool_list">
              <span>
                <TrashSimple size={ICON_SIZE_BIG} />
              </span>
              <span>
                <DotsThreeCircle size={ICON_SIZE_BIG} />
              </span>
            </li>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AssignShipperTag;
