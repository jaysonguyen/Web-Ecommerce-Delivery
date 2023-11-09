import React, { useEffect, useState } from "react";
import { DotsThreeCircle, Plus, TrashSimple } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import "../../../assets/css/Pages/shippingAssignment.css";
import StaffWithImage from "./StaffWithImage";
import { getUserByBranchCode } from "../../../services/BranchService";

function AssignShipperTag(props) {
  const [isShowSearchFeed, setShowSearchFeed] = useState(false);
  const [isShowSearchInput, setIsShowSearchInput] = useState(false);

  const handleFetchShipper = async () => {
    try {
      const getRoleCode = JSON.parse(localStorage.getItem("user_payload"))
        .branch.code;
      const shipperList = await getUserByBranchCode("TD01");
      await console.log(shipperList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchangeInputSearchShipper = () => {
    setShowSearchFeed(true);
  };

  useEffect(() => {
    handleFetchShipper();
  }, []);
  return (
    <div className="assign_location_item_box">
      <div>
        <div className="assign_location_title flex-align-center">
          <span className="font-weight-b">Linh trung </span>
          <span className="status_assign assign_status">assigned</span>
          <span className="assign_add_field_box flex-align-center">
            {isShowSearchInput && (
              <input
                onChange={handleOnchangeInputSearchShipper}
                placeholder="Search"
              />
            )}
            <span
              onClick={() => setIsShowSearchInput((prev) => !prev)}
              className="assign_button"
            >
              <Plus size={ICON_SIZE_BIG} />
            </span>
            {isShowSearchFeed && (
              <div className="search_shipper_field">
                <div className="search_shipper_item flex-center-center">
                  <StaffWithImage />
                </div>
                <div className="search_shipper_item flex-center-center">
                  <div className="shipper_avatar shipper_avatar_margin_6 flex-center-center">
                    S
                  </div>
                  <div className="shipper_assign_name">
                    Nguyễn Vũ Thành Nguyên
                  </div>
                </div>
                <div className="search_shipper_item flex-center-center">
                  <StaffWithImage />
                </div>
                <div className="search_shipper_item flex-center-center">
                  <StaffWithImage />
                </div>
                <div className="search_shipper_item flex-center-center">
                  <StaffWithImage />
                </div>
                <div className="search_shipper_item flex-center-center">
                  <StaffWithImage />
                </div>
              </div>
            )}
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
