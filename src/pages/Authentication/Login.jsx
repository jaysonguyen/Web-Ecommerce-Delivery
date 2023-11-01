import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link } from "react-router-dom";

//css
import "../../assets/css/Pages/login.css";
import { Input } from "../../components/index";
function Login(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }, []);
  return (
    <div className="login_container flex-center-between">
      <div className="login_img_container">
        <img src={loginBackground} alt="" />
      </div>
      <div className="login_form flex-center-center">
        <h6 className="margin-none font-weight-b title_size text_primary">
          Đăng nhập
        </h6>
        <dd>Đăng nhập mọi lúc mọi nơi</dd>
        <form>
          <Input label="Tài khoản" placeholder="Nhập tài khoản" />
          <Input label="Mật khẩu" placeholder="Nhập mật khẩu" type="password" />
          <Link to="/forget" className="forget_pass text_decoration_none">
            Quên mật khẩu
          </Link>
          <button className="button_login button button_primary font-weight-b">
            Đăng nhập
          </button>
          <div className="text_center">
            Bạn chưa có tài khoản?
            <Link to="/register" className="go_back_login text_decoration_none">
              Đăng ký ngay!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
