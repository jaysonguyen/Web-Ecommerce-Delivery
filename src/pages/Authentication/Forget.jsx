import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link } from "react-router-dom";
import "../../assets/css/Pages/login.css";
import { Input } from "../../components/index";
function Forget(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }, []);
  return (
    <div className="forget_container flex-center-between">
      <div className="login_img_container">
        <img src={loginBackground} alt="" />
      </div>
      <div className="login_form flex-center-center">
        <h6 className="margin-none font-weight-b title_size text_primary">
          Bạn đã quên mật khẩu?
        </h6>
        <dd>Chúng tôi sẽ hỗ trợ bạn ngay</dd>
        <form>
          <Input
            label="Nhập số điện thoại của bạn"
            placeholder="Nhập số điện thoại"
          />
          <button className="button_login button button_primary font-weight-b">
            Khôi phục
          </button>
          <span>
            Quay lại trang
            <Link to="/login" className="go_back_login text_decoration_none">
              Đăng nhập
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Forget;
