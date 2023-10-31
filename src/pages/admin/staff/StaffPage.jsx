import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { Plus, CaretLeft } from "phosphor-react";
import { AddStaff, MyButton } from "../../../components";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { getStaffList, getShipperList } from "../../../services/StaffService";
import { useDispatch, useSelector } from "react-redux";
import consumerSlice from "../../../features/consumer/consumerSlice";
import "../../../assets/css/Pages/staff.css";

export const StaffPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [nameStaff, setNameStaff] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [des, setDes] = useState("");
  const [data, setData] = useState({});
  const [buttonType, setButtonType] = useState("Add");

  const dispatch = useDispatch();

  const getStaff = async () => {
    try {
      const data = await getStaffList();
      if (data) {
        setStaffs(data.data);
        dispatch(consumerSlice.actions.setStaffList([data.data]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getShipper = async () => {
    try {
      const data = await getShipperList();
      if (data) {
        setStaffs(data.data);
        dispatch(consumerSlice.actions.setShipperList([data.data]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearInput = () => {
    setNameStaff("");
    setAccount("");
    setEmail("");
    setRole("");
    setPhoneNum("");
    setDes("");
  };

  const handleDisplayInsertStaff = () => {
    setIsShowAdd(false);
    handleClearInput();
  };

  const handleAddButton = () => {
    setIsShowAdd(true);
    setButtonType("Add");
  }

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        await setIsShowAdd(true);
        await setData(data);
        await setButtonType("Save");
        break;
      }
      case "delete": {
        console.log(type);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    getStaff();

    return () => {
      console.log("Not hing");
    };
  }, []);

  return (
    <div className="padding-body">
      {!isShowAdd && (
        <>
          <div className="pd-bt-10 staff_page_header flex-center-between">
            <div className="d-flex gap-5">
              <h3>Staff management</h3>
              <div className="tab_container">
                <MyButton
                  text="Staff"
                  height="44px"
                  width="auto"
                  hoverColor="var(--text-white)"
                  bgColor="var(--primary-color)"
                  fontColor="var(--text-white)"
                  borderRadius="5px"
                  padding="5px 20px"
                  margin="0 10px 0 0"
                  borderColor="var(--primary-color)"
                  callback={getStaff}
                />
                <MyButton
                  text="Shipper"
                  height="44px"
                  width="auto"
                  hoverColor="var(--text-white)"
                  bgColor="var(--primary-color)"
                  fontColor="var(--text-white)"
                  borderRadius="5px"
                  padding="5px 20px"
                  borderColor="var(--primary-color)"
                  callback={getShipper}
                />
              </div>
            </div>
            <button onClick={() => setIsShowAdd(true)} className="btnAdd">
              {" "}
              <Plus size={ICON_SIZE_BIG} />
              Add
            </button>
          </div>
          <div className="staff_page_content">
            <MyTable
              callback={handleButtonAction}
              list={staffs && staffs}
              showCheckBox={true}
            />
          </div>
        </>
      )}
      {isShowAdd && (
        <div className="add_employee_container">
          <div className="go_back_button_container">
            <CaretLeft
              onClick={handleDisplayInsertStaff}
              size={ICON_SIZE_BIG}
            />
          </div>
          <h3>Add staff</h3>
          <AddStaff
            setNameStaff={setNameStaff}
            nameStaff={nameStaff}
            setAccount={setAccount}
            account={account}
            setEmail={setEmail}
            email={email}
            setRole={setRole}
            data={data}
            role={role}
            phoneNum={phoneNum}
            setPhoneNum={setPhoneNum}
            des={des}
            buttonType={buttonType}
            setButtonType={setButtonType}
            setDes={setDes}
            clearInput={handleDisplayInsertStaff}
          />
        </div>
      )}
    </div>
  );
};
