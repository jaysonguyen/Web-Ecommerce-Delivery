import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link, useNavigate } from "react-router-dom";

//css
import "../../assets/css/Pages/login.css";
import { Input } from "../../components/index";
import { loginCustomer } from "../../services/UserService";
import consumerSlice from "../../features/consumer/consumerSlice";
import toast from "react-hot-toast";
function Login(props) {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const checkLogin = await loginCustomer({ account, password: pass });
      if (checkLogin.status == 200) {
        dispatch(consumerSlice.actions.setUserCurrentInfo(checkLogin.data));
        toast.success("Login successfully");
        dispatch(displaySlice.actions.displaySidebar(true));
        dispatch(displaySlice.actions.displayHeader(true));
        if (checkLogin.data?.role?.roleId != 2) {
          navigation("/");
        } else {
          navigation("/order");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from server" + error);
    }
  };

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
          <Input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            label="Tài khoản"
            placeholder="Nhập tài khoản"
          />
          <Input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
          />
          <Link to="/forget" className="forget_pass text_decoration_none">
            Quên mật khẩu
          </Link>
          <button
            onClick={handleLogin}
            className="button_login button button_primary font-weight-b"
          >
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
