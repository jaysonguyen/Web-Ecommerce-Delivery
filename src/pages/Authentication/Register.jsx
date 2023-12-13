import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import displaySlice from "../../features/Display/displaySlice";
import { loginBackground } from "../../assets/img/index";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Pages/login.css";
import { Dropdown, Input } from "../../components/index";
import { getOTP, insertUser } from "../../services/UserService";
import OTPInput, { ResendOTP } from "otp-input-react";
import toast, { Toaster } from "react-hot-toast";
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
  const [OTP, setOTP] = useState("");
  const [OTPResponse, setOTPResponse] = useState("");
  const [showOTP, setShowOTP] = useState(false);

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

  const generateOTP = async (e) => {
    e.preventDefault();
    try {
      const OTPResponse = await getOTP(email);
      setShowOTP(true);
      if (OTPResponse) {
        setOTPResponse(OTPResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const vertifyOTP = async (e) => {
    e.preventDefault();
    try {
      if (OTP == OTPResponse) {
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
          role_id: 2,
        });
        if (data == 200) {
          toast.success("Register success");
          navigate("/login");
          setOTP("");
          handleClear();
        } else {
          toast.error("Register failed");
        }
      } else {
        toast.error("Error OTP");
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
    <>
      <Toaster />

      {!showOTP && (
        <div className="register_container flex-center-between">
          <div className="login_img_container">
            <img src={loginBackground} alt="" />
          </div>
          <div className="login_form flex-center-center">
            <h6 className="margin-none font-weight-b title_size text_primary">
              Create an account
            </h6>
            <dd>Huflit Delivery - Choose Huflit - Bright Future</dd>
            <form className="register_form">
              <div className="row">
                <div className="col col-6">
                  <Dropdown
                    placeholder="Choose purpose..."
                    label={"Business purpose"}
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
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="col col-6">
                  <Dropdown
                    placeholder="Choose scale..."
                    label={"Business scale"}
                    item={itemScale}
                    textColor="var(--text-color-gray)"
                    margin="0"
                    value={scale}
                    onChange={setScale}
                  />
                </div>
                <div className="col col-6">
                  <Input
                    label="Business type"
                    placeholder="Enter business type"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
                <div className="col col-6">
                  <Input
                    label="Phone number"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col col-6">
                  <Input
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col col-6">
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    value={ps}
                    onChange={(e) => setPs(e.target.value)}
                  />
                </div>

                <div className="col col-6">
                  <Input
                    value={conPs}
                    onChange={(e) => setConPs(e.target.value)}
                    label="Re-Enter password "
                    placeholder="Enter your password again"
                  />
                </div>
              </div>
              <button
                onClick={generateOTP}
                className="button_login button button_primary font-weight-b"
              >
                Sign up
              </button>
              <div className="text_center">
                You're already have an account?
                <Link
                  to="/login"
                  className="go_back_login text_decoration_none"
                >
                  Go to Login page!
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      {showOTP && (
        <div className="otp_container flex-center-center">
          <h6>Please enter your OTP</h6>
          <OTPInput
            className="otp_input"
            OTPLength={4}
            disabled={false}
            otpType="number"
            autoFocus
            onChange={setOTP}
            value={OTP}
          ></OTPInput>
          <button
            onClick={vertifyOTP}
            className="otp_button button button_primary"
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
}

export default Register;
