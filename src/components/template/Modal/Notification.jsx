import React from "react";
import { Queue, X } from "phosphor-react";
//constraint
import { ICON_SIZE_EXTRA_LARGE } from "../../../utils/constraint";
import { Link } from "react-router-dom";
//css
import "../../../assets/css/modal/notification.css";

//img
import { emptyNotification } from "../../../assets/img";

function Notification({ callback, heading }) {
  return (
    <div style={{ width: "30%" }} className="notification_container">
      <div className="notification_header">
        <h5 className="font-weight-b flex-center-between">
          {heading}
          <X
            onClick={callback}
            className="notification_close"
            size={ICON_SIZE_EXTRA_LARGE}
          />
        </h5>
        <div className="notification_tab">
          <div className="notification_tab_item">
            <span className="tab_item_type font-weight-b">All</span>
            <span className="tab_item_count">8</span>
          </div>
        </div>
      </div>
      <div className="notification_body">
        <div className="noti_body_item flex-align-center">
          <div className="noti_item_img">
            <img src={emptyNotification} alt="" />
          </div>
          <div className="noti_content">
            <h6 className="font-weight-b">Your package has been delivered</h6>
            <dd className="flex-align-center">
              <span>2h ago</span>
              <div className="dot"></div>
              <div>some thing else</div>
            </dd>
          </div>
        </div>
        <div className="noti_body_item flex-align-center">
          <div className="noti_item_img">
            <img src={emptyNotification} alt="" />
          </div>
          <div className="noti_content">
            <h6 className="font-weight-b">Your package has been delivered</h6>
            <dd className="flex-align-center">
              <span>2h ago</span>
              <div className="dot"></div>
              <div>some thing else</div>
            </dd>
          </div>
        </div>
        <div className="noti_body_item flex-align-center">
          <div className="noti_item_img">
            <img src={emptyNotification} alt="" />
          </div>
          <div className="noti_content">
            <h6 className="font-weight-b">Your package has been delivered</h6>
            <dd className="flex-align-center">
              <span>2h ago</span>
              <div className="dot"></div>
              <div>some thing else</div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
