import React from "react";
import { Queue, X } from "phosphor-react";
//constraint
import { ICON_SIZE_EXTRA_LARGE } from "../../../utils/constraint";
import { Link } from "react-router-dom";
//css
import "../../../assets/css/modal/notification.css";

//img
import { emptyNotification } from "../../../assets/img";

function Notification({ closeNoti, heading }) {
  return (
    <div style={{ width: "22%" }} className="notification_container">
      <h6 className="title_size text_white text_center flex-center-center">
        {heading}
        <X
          onClick={closeNoti}
          className="notification_close"
          size={ICON_SIZE_EXTRA_LARGE}
        />
      </h6>
      <div className="notification_content ">
        <div className="flex-center-between">
          <h5 className="notification_count margin-none title_size text_white">
            <Queue size={ICON_SIZE_EXTRA_LARGE} weight="fill" />
            Có 0 thống báo mới
          </h5>
          <Link className="notification_more font-weight-b">Xem Thêm</Link>
        </div>
        <div className="notification_main_item">
          <div className="notification_empty">
            <img src={emptyNotification} />
            <h5 className="text_white text_center">Chưa có thông báo nào</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
