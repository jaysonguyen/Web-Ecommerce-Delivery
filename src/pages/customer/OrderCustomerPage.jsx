import React from "react";
import "../../assets/css/Pages/orderCustomer.css";
import { Input, Notification } from "../../components/index";
import ModalCalcMoney from "../../components/project/customer/ModalCalcMoney";

function OrderCustomer(props) {
  return (
    <div className="orderCustomerPage flex-center-between">
      <div className="order_container">
        <div className="order_side_box">
          <h6 className="font-weight-b">Send Side</h6>
          <h6 className="font-weight-b">Cửa hàng Hồng Đào</h6>
          <div className="checkbox flex-center_between">
            <input type="checkbox" checked={true} />
            <label>Gửi hàng tại cửa hàng gần nhất</label>
          </div>
        </div>
        <div className="receive_side_box">
          <h6 className="font-weight-b">Receive Side</h6>
          <h6 className="font-weight-b">Bên nhận</h6>
          <div className="receive_box_side row">
            <div className="col col-lg-3">
              <Input
                placeholder={"Nhập số điện thoại"}
                label={"Số điện thoại"}
              />
            </div>
            <div className="col col-lg-3">
              <Input placeholder={"Họ tên"} label={"Số điện thoại"} />
            </div>
            <div className="col col-lg-3">
              <Input placeholder={"Địa chỉ"} label={"Số điện thoại"} />
            </div>
          </div>
        </div>
        <div className="product_info_box">
          <h6 className="font-weight-b">Receive Side</h6>
          <h6 className="font-weight-b">Bên nhận</h6>
          <div className="receive_box_side row">
            <div className="col col-lg-3">
              <Input placeholder={"Product name"} label={"Product name"} />
            </div>
            <div className="col col-lg-3">
              <Input placeholder={"Quality"} label={"Quality"} />
            </div>
            <div className="col col-lg-3">
              <Input placeholder={"Weight(gram)"} label={"Weight"} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ModalCalcMoney />
      </div>
    </div>
  );
}

export default OrderCustomer;
