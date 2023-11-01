import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Pages/login.css";
import { Dropdown, Input } from "../../components/index";
import { insertUser } from "../../services/UserService";
import toast from "react-hot-toast";
function Register(props) {
  const [aim, setAim] = useState("");
  const [acc, setAcc] = useState("");
  const [scale, setScale] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ps, setPs] = useState("");
  const [major, setMajor] = useState("");
  const [conPs, setConPs] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const itemScale = [
    {
      content: "Không có nhu cầu thường xuyên",
    },
    {
      content: "Under 150 orders/mons",
    },
    {
      content: "From 150 - 900 orders/mons",
    },
    {
      content: "From 900 - 3000 orders/mons",
    },
    {
      content: "Better then 3000 orders/mons",
    },
  ];

  const itemPropose = [
    {
      content: "Cá nhân",
    },
    {
      content: "Cửa hàng/doanh nghiệp",
    },
  ];

  const handleClear = () => {
    setAcc("");
    setScale("");
    setPhone("");
    setEmail("");
    setPs("");
    setMajor("");
    setConPs("");
    setFullName("");
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    console.log({
      fullName: fullName,
      des: "Sample description",
      account: acc,
      password: ps,
      email: email,
      phone: phone,
      purpose: aim,
      major: major,
      sclae: scale,
      role: "2",
    });
    try {
      const data = await insertUser({
        fullName: fullName,
        des: "Sample description",
        account: acc,
        password: ps,
        email: email,
        phone: phone,
        purpose: aim,
        major: major,
        scale: scale,
        role: 2,
      });
      if (data == 200) {
        toast.success("Register success");
        navigate("/login");
        handleClear();
      } else {
        toast.error("Register failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                item={itemPropose}
                value={aim}
                onChange={setAim}
                margin="0"
              />
            </div>
            <div className="col col-6">
              <Input
                value={acc}
                onChange={(e) => setAcc(e.target.value)}
                label="Account"
                placeholder="Enter account"
              />
            </div>
            <div className="col col-6">
              <Input
                label="Full name"
                placeholder="Nhập tài khoản"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col col-6">
              <Dropdown
                placeholder="Chọn quy mô vận chuyển..."
                label={"Quy mô vận chuyển"}
                item={itemScale}
                textColor="var(--text-color-gray)"
                margin="0"
                value={scale}
                onChange={setScale}
              />
            </div>
            <div className="col col-6">
              <Input
                label="Ngành hàng"
                placeholder="Nhập ngành hàng"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
            <div className="col col-6">
              <Input
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col col-6">
              <Input
                label="Email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col col-6">
              <Input
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={ps}
                onChange={(e) => setPs(e.target.value)}
              />
            </div>

            <div className="col col-6">
              <Input
                value={conPs}
                onChange={(e) => setConPs(e.target.value)}
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          </div>
          <button
            onClick={handleRegisterUser}
            className="button_login button button_primary font-weight-b"
          >
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
