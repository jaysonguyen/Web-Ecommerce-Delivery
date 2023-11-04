import React from "react";
import { Queue, X } from "phosphor-react";
//constraint
import { ICON_SIZE_EXTRA_LARGE } from "../../../utils/constraint";
//css
import "../../../assets/css/modal/notification.css";
import "../../../assets/css/modal/modalCalc.css";

//img
import { emptyNotification } from "../../../assets/img";
import Input from "../../template/Input/Input";
import DropDown from "../../Dropdown/DropDown";

function ModalCalcMoney({ callback, heading }) {
  const items = [{ content: "Sender pay" }, { content: "Receiver pay" }];
  return (
    <div style={{ width: "30%" }} className="notification_container modalCalc_container">
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
            <Input placeholder={"Voucher"} />
          </div>
        </div>
      </div>
      <div className="notification_body">
        <DropDown item={items} placeholder={"Side payment"} />
        <div className="noti_body_item flex-align-center">
          <div className="noti_content">
            <h6 className="font-weight-b">Tổng phí</h6>
            <h6>200$</h6>
          </div>
        </div>
        <button className="button button_primary">Submit</button>
      </div>
    </div>
  );
}

export default ModalCalcMoney;
