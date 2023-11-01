import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link } from "react-router-dom";
import "../../assets/css/Pages/login.css";
import { Dropdown, Input, SelectInput } from "../../components/index";
function Register(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }, []);
  return (
    <div className="register_container flex-center-between">
      <div className="login_img_container">
        <img src={loginBackground} alt="" />
      </div>
      <div className="login_form flex-center-center">
        <h6 className="margin-none font-weight-b title_size text_primary">
          Tạo tài khoản
        </h6>
        <dd>DMNL luôn đồng hành cùng bạn</dd>
        <form className="register_form">
          <div className="row">
            <div className="col col-6">
              <Dropdown
                placeholder="Nhập mục đích..."
                label={"Mục đích sử dụng"}
                textColor="var(--text-color-gray)"
                margin="0"
              />
            </div>
            <div className="col col-6">
              <Input label="Tài khoản" placeholder="Nhập tài khoản" />
            </div>
            <div className="col col-6">
              <Dropdown
                placeholder="Chọn quy mô vận chuyển..."
                label={"Quy mô vận chuyển"}
                textColor="var(--text-color-gray)"
                margin="0"
              />
            </div>
            <div className="col col-6">
              <Input label="Ngành hàng" placeholder="Nhập ngành hàng" />
            </div>
            <div className="col col-6">
              <Input label="Số điện thoại" placeholder="Nhập số điện thoại" type="tel" />
            </div>
            <div className="col col-6">
              <Input label="Email" placeholder="Nhập email" type="email" />
            </div>
            <div className="col col-6">
              <Input label="Mật khẩu" placeholder="Nhập mật khẩu" type="password"/>
            </div>

            <div className="col col-6">
              <Input
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                type="password"
              />
            </div>
          </div>
          <button className="button_login button button_primary font-weight-b">
            Đăng ký
          </button>
          <div className="text_center">
            Bạn đã có tài khoản?
            <Link to="/login" className="go_back_login text_decoration_none">
              Đăng nhập!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
