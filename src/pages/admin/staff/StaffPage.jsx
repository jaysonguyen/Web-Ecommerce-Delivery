import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { Plus, CaretLeft } from "phosphor-react";
import { AddStaff, MyButton } from "../../../components";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { getStaffList, getShipperList } from "../../../services/StaffService";
import { useDispatch, useSelector } from "react-redux";
import consumerSlice from "../../../features/consumer/consumerSlice";
import "../../../assets/css/Pages/staff.css";
import { deleteUser } from "../../../services/UserService";
import toast from "react-hot-toast";
import tableSlice from "../../../features/table/tableSlice";
import { tableSelector } from "../../../selectors/consumerSelector";
import { useNavigate } from "react-router-dom";
import { StaffTableFromJson } from "../../../utils/modelHandle";

export const StaffPage = () => {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("staff");

  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const fetchData = async (type) => {
    try {
      let data = [];

      if (type === "staff") {
        data = await getStaffList();
      } else {
        data = await getShipperList();
      }

      if (data.status === 200) {
        // setDataList(data.data);
        setDataList([]);
        for (let i = 0; i < data.data.length; i++) {
          setDataList((list) => [...list, StaffTableFromJson(data.data[i])]);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let res = await deleteUser(list[i].ID);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    fetchData(activeTab);
    dispatch(tableSlice.actions.handleSelected([]));
    toast.success("Deleted successfully");
  };

  const handleAddButton = () => {
    setIsShowAdd(true);
  };

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        setIsShowAdd(true);
        setData(data);
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
    fetchData(activeTab);

    return () => {
      console.log("Not thing");
    };
  }, [isShowAdd, tableData.selectList]);

  return (
    <div className="">
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
                  bgColor={
                    activeTab === "staff"
                      ? "var(--text-white)"
                      : "var(--primary-color)"
                  }
                  fontColor={
                    activeTab === "staff"
                      ? "var(--primary-color)"
                      : "var(--text-white)"
                  }
                  borderRadius="5px"
                  padding="5px 20px"
                  margin="0 10px 0 0"
                  borderColor="var(--primary-color)"
                  callback={async () => {
                    setActiveTab("staff");
                    await fetchData("staff");
                  }}
                />
                <MyButton
                  text="Shipper"
                  height="44px"
                  width="auto"
                  hoverColor="var(--text-white)"
                  bgColor={
                    activeTab === "shipper"
                      ? "var(--text-white)"
                      : "var(--primary-color)"
                  }
                  fontColor={
                    activeTab === "shipper"
                      ? "var(--primary-color)"
                      : "var(--text-white)"
                  }
                  borderRadius="5px"
                  padding="5px 20px"
                  borderColor="var(--primary-color)"
                  callback={async () => {
                    setActiveTab("shipper");
                    await fetchData("shipper");
                  }}
                />
              </div>
            </div>
            <div className="feature_of_customer">
              <MyButton
                prefix={<Plus size={26} color="#ffffff" weight="fill" />}
                callback={() => setIsShowAdd(true)}
                bgColor={"var(--primary-color)"}
                borderRadius={"5px"}
              />
            </div>
          </div>
          <div className="staff_page_content">
            <MyTable
              callback={handleButtonAction}
              list={dataList}
              showCheckBox={true}
              deleteCallback={handleDelete}
            />
          </div>
        </>
      )}
      {isShowAdd && (
        <div className="add_employee_container">
          <div className="go_back_button_container">
            <CaretLeft
              onClick={() => setIsShowAdd(false)}
              size={ICON_SIZE_BIG}
            />
          </div>
          <AddStaff
            isOpen={isShowAdd}
            setOpen={setIsShowAdd}
            isCreate={true}
            data={data}
          />
        </div>
      )}
    </div>
  );
};
