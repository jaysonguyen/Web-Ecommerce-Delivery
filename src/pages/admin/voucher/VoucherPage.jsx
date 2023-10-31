import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { AddStaff, DetailCustomer, Dropdown } from "../../../components";
import { Link } from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import {
  deleteVoucher,
  getVoucherList,
} from "../../../services/VoucherService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { displaySelector } from "../../../selectors/displaySelector";
import { ICON_SIZE_BIG, URL_VOUCHER_ADD } from "../../../utils/constraint";
import { CaretLeft } from "phosphor-react";
import AddVoucher from "../../../components/project/voucher/AddVoucher";
import { tableSelector } from "../../../selectors/consumerSelector";
import { deleteUser } from "../../../services/UserService";
import tableSlice from "../../../features/table/tableSlice";

function VoucherPage(props) {
  const [voucherSelected, setVoucherSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [voucherList, setVoucherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedList, setSelectedList] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();
  const initData = async () => {
    // let data = await getVoucherList();
    // if (Array.isArray(data)) await setVoucherList(data);
    // return data;
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getVoucherList();
      console.log(data);
      if (Array.isArray(data.data)) {
        setVoucherList(data.data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let res = await deleteVoucher(list[i].voucherId);
      if (res.status != 200) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  }, [isShowAdd]);

  const handleButtonAction = async (data, type) => {
    console.log("click");
    switch (type) {
      case "details": {
        await setVoucherSelected(data);
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
      content: "Import vouchers",
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
                    <h3 className="title_Cus">Voucher list </h3>
                    <p className="total_number_Cus">{voucherList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your voucher's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <div className="option_dropdown">
                    <Dropdown placeholder="Options" item={itemOptions} />
                  </div>
                  <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MyTable
            list={voucherList}
            showCheckBox={true}
            callback={handleButtonAction}
            hideDetails={true}
            deleteCallback={handleDelete}
          />
        </>
      )}

      {isShowDetail && (
        <DetailCustomer
          closeDetail={handleCloseDetail}
          voucherSelected={voucherSelected}
        />
      )}

      {isShowAdd && (
        <div className="add_employee_container">
          <div className="go_back_button_container">
            <CaretLeft
              size={ICON_SIZE_BIG}
              onClick={() => setIsShowAdd(false)}
            />
          </div>
          <h3>Add Voucher</h3>
          <AddVoucher />
        </div>
      )}
    </div>
  );
}

export default VoucherPage;
