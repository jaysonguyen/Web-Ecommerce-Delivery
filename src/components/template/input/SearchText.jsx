import { MagnifyingGlass } from "phosphor-react";
import React from "react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import "../../../assets/css/input/input.css";

function SearchText({ width = "100%", padding = "5px", isShowIcon = true }) {
  return (
    <div
      style={{ width: "40%", padding: "5px" }}
      className="search_container flex-align-center"
    >
      <div className="flex-center">
        <MagnifyingGlass className="search_icon" size={ICON_SIZE_BIG} />
      </div>
      <input
        type="text"
        placeholder="Nhập số điện thoại - mã đơn hàng - tên người nhận"
      />
    </div>
  );
}

export default SearchText;
