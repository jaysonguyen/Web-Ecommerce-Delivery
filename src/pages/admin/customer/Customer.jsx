import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import {
  Dropdown,
  DetailCustomer,
  AddCustomer,
  AddStaff,
} from "../../../components";
import { Link } from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import {
  deleteUser,
  getCustomerList,
  getUserList,
} from "../../../services/UserService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { displaySelector } from "../../../selectors/displaySelector";
import { tableSelector } from "../../../selectors/consumerSelector";
import tableSlice from "../../../features/table/tableSlice";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";

function Customer(props) {
  const [userSelected, setUserSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();
  // const [selectedList, setSelectedList] = useState([]);

  const initData = async () => {
    // let data = await getUserList();
    // if (Array.isArray(data)) await setUserList(data);
    // return data;
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getCustomerList();
      if (data.status == 200) {
        if (Array.isArray(data.data)) {
          setUserList(data.data);
        }
        return data;
      } else {
        toast.error(data.data);
      }
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  }, [isShowAdd, isShowDetail]);

  const handleButtonAction = async (data, type) => {
    console.log(type);

    switch (type) {
      case "details": {
        await setUserSelected(data);
        await setIsShowDetail(true);
        break;
      }
      case "delete": {
        await deleteUser(data.id);
        break;
      }
      default:
        break;
    }
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };
  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let res = await deleteUser(list[i].id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  };

  const itemOptions = [
    {
      content: "Export as Excel",
    },
    {
      content: "Import clients",
    },
  ];

  return (
    <div className="padding-body">
      {!isShowDetail && !isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Clients list </h3>
                    <p className="total_number_Cus">{userList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your client's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <div className="option_dropdown">
                    <Dropdown placeholder="Options" item={itemOptions} />
                  </div>
                  <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                    Add client
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MyTable
            list={userList}
            showCheckBox={true}
            callback={handleButtonAction}
            deleteCallback={handleDelete}
            hideDelete={true}
          />
        </>
      )}

      {isShowDetail && (
        <DetailCustomer
          closeDetail={handleCloseDetail}
          userSelected={userSelected}
        />
      )}

      {isShowAdd && (
        <div className="add_employee_container">
          <AddCustomer showAdd={setIsShowAdd} />
        </div>
      )}
    </div>
  );
}

export default Customer;