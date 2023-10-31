import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { Plus, CaretLeft } from "phosphor-react";
import { AddStaff } from "../../../components";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { getStaffList, getShipperList } from "../../../services/StaffService";
import { useDispatch, useSelector } from "react-redux";
import consumerSlice from "../../../features/consumer/consumerSlice";
import "../../../assets/css/Pages/staff.css";

export const StaffPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);

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

  useEffect(() => {
    getStaff();

    return () => {
      console.log("Not thing");
    };
  }, []);

  return (
    <div className="padding-body">
      {!isShowAdd && (
        <>
          <div className="pd-bt-10 staff_page_header flex-center-between">
            <h3>Staff management</h3>
            <button onClick={() => setIsShowAdd(true)} className="btnAdd">
              {" "}
              <Plus size={ICON_SIZE_BIG} />
              Add
            </button>
          </div>
          <div className="staff_page_content">
            <div className="tab_container">
              <button onClick={getStaff} className="tab_item btnAdd">
                Staff
              </button>
              <button onClick={getShipper} className="tab_item btnAdd">
                Shipper
              </button>
            </div>
            <MyTable list={staffs && staffs} showCheckBox={true} />
          </div>
        </>
      )}
      {isShowAdd && (
        <div className="add_employee_container">
          <div className="go_back_button_container">
            <CaretLeft
              size={ICON_SIZE_BIG}
              onClick={() => setIsShowAdd(false)}
            />
          </div>
          <h3>Add staff</h3>
          <AddStaff />
        </div>
      )}
    </div>
  );
};
