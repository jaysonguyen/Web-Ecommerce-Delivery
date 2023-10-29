import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { Dropdown, DetailCustomer } from "../../../components";
import { Link } from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import { getUserList } from "../../../services/UserService";
import toast from "react-hot-toast";

function Customer(props) {
  const [userSelected, setUserSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const data = await getUserList();
      if (Array.isArray(data)) {
        setUserList(data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  }, []);

  const handleShowDetail = async (data) => {
    await setUserSelected(data);
    await setIsShowDetail(true);
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };

  // const items = [
  //   {
  //     name: "Nguyễn Ngọc Thảo My",
  //     phone: "0902637839",
  //     email: "thaomy@gmail.com",
  //     address: "Tp.HoChiMinh",
  //     sales: 8000000,
  //     status: "New client",
  //   },
  // ];

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
      {!isShowDetail && (
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
                  <Link to="/customer/add">
                    <button className="btnAdd">Add client</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <MyTable
            list={userList}
            showCheckBox={true}
            callback={handleShowDetail}
          />
        </>
      )}

      {isShowDetail && (
        <DetailCustomer
          closeDetail={handleCloseDetail}
          userSelected={userSelected}
        />
      )}
    </div>
  );
}

export default Customer;
