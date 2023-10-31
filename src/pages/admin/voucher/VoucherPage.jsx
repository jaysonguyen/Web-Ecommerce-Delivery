import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { DetailCustomer, Dropdown } from "../../../components";
import { Link } from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import { getUserList } from "../../../services/UserService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { displaySelector } from "../../../selectors/displaySelector";
import { getVoucherList } from "../../../services/VoucherService";

function VoucherPage(props) {
  const [voucherSelected, setUserSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [voucherList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      const data = await getVoucherList();
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
  const selectList = useSelector(displaySelector);

  useEffect(() => {
    initData().then((r) => r === null && toast.error("Something went wrong!"));
    console.log(selectList.selectList);
  }, []);

  // const handleSelect = (e, data) => {
  //   console.log(selectedList);
  //   let ids = selectedList.map((ele) => ele.id);
  //   if (e.target.checked) setSelectedList(data);
  //   else {
  //     let index = ids.indexOf(data.id);
  //     selectedList.splice(index, 1);
  //   }
  // };

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        await setUserSelected(data);
        await setIsShowDetail(true);
        break;
      }
      case "delete": {
      }
      default:
        break;
    }
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
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
      {!isShowDetail && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Clients list </h3>
                    <p className="total_number_Cus">{voucherList.length}</p>
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
            list={voucherList}
            showCheckBox={true}
            callback={handleButtonAction}
            // select={selectedList}
            // handleCheck={handleSelect}
          />
        </>
      )}

      {isShowDetail && (
        <DetailCustomer
          closeDetail={handleCloseDetail}
          voucherSelected={voucherSelected}
        />
      )}
    </div>
  );
}

export default VoucherPage;
