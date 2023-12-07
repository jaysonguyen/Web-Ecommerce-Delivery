import profileImg from "../../assets/img/user_default_avatar.png";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getUserByCode,
  getUserProfile,
  updateUSer,
} from "../../services/UserService";
import useToken from "../../hooks/useToken";
import { Input, MyButton } from "../../components";

export const ProfilePage = () => {
  const { userPayload } = useToken();

  const [profileInfo, setProfileInfo] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("");
  const [account, setAccount] = useState("");
  const [des, setDes] = useState("");

  const fetchInfoData = async () => {
    try {
      let res = await getUserProfile(userPayload.userID);

      if (res.status === 200) {
        setProfileInfo(res.data);

        setFullName(res.data.fullName);
        setEmail(res.data.email);
        setAccount(res.data.account);
        setPhone(res.data.phoneNumber);
        setPurpose(res.data.purpose);
        setDes(res.data.des);
      } else {
        toast.error("User's info not found");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async () => {
    try {
      const checkInsert = await updateUSer({
        fullName: fullName,
        email: email,
        account: account,
        purpose: purpose,
        phone: phone,
        des: des,
      });
      if (checkInsert !== 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
        // handleClearInput();
        // fetchStaff();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfoData();
  }, []);

  return (
    <div>
      <div className={"row"}>
        <div className={"col-3"}>
          <div
            className={"profile_img"}
            style={{
              margin: "20px",
              height: "25vh",
            }}
          >
            <img
              src={profileImg}
              alt={""}
              style={{
                borderRadius: "100%",
                overflow: "hidden",
                height: "100%",
              }}
            />
          </div>
          <ProfileInfo data={profileInfo} />
        </div>
        <div className={"col"}>
          <div
            className={"profile_right_pane"}
            style={{
              padding: "2em 3em",
              borderRadius: "10px",
              border: "solid 1px var(--border-gray_2)",
              // minHeight: "80vh",
            }}
          >
            <div>Profile</div>
            <div className="row">
              <div className={"col"}>
                <ProfileInput
                  title={"Full Name: "}
                  value={fullName}
                  onChange={setFullName}
                />
              </div>
              <div className={"col"}>
                <ProfileInput title={"Email: "} value={email} />
              </div>
            </div>
            <ProfileInput title={"Phone: "} value={phone} />

            <div className="row">
              <div className={"col"}>
                <ProfileInput
                  type={"password"}
                  title={"Current Password: "}
                  value={""}
                />
              </div>
              <div className={"col"}>
                <ProfileInput
                  type={"password"}
                  title={"New Password: "}
                  value={""}
                />
              </div>
            </div>
            <MyButton text={"Save"} callback={handleUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ data = {} }) => {
  return (
    <div className="d-flex flex-column w-75">
      <div className="row">
        <div className="col">Full Name:</div>
        <div className="col">{data && data.fullName}</div>
      </div>
      <div className="row">
        <div className="col">Phone:</div>
        <div className="col">{data && data.phone}</div>
      </div>
    </div>
  );
};

const ProfileInput = ({ title = "", value = "", type = "text", onChange }) => {
  return (
    <>
      <div
        style={{
          fontWeight: "800",
        }}
      >
        {title}
      </div>
      <Input
        type={type}
        value={value}
        boxShadow={"none"}
        border={"solid 1px var(--border-gray_2)"}
        onChange={(v) => onChange(v.target.value)}
      />
    </>
  );
};
