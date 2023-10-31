import React, { useEffect, useState } from "react";
import CustomMultiSelect from "../../../components/template/multiselect/CustomMultiSelect/CustomMultiSelect";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { OrderButtons } from "../../../components/project/table_action/order_buttons";
import { DetailCustomer } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/css/Pages/customer.css";
import displaySlice from "../../../features/Display/displaySlice";

export const OrderPage = () => {
  let items = [
    {
      ID: "1",
      code: "5DHS232",
      name: "Nguyễn Ngọc Thảo My",
      cost: 110.5,
      email: "thaomy@gmail.com",
      payment: "Bên gửi trả phí",
    },
    {
      ID: "1",
      code: "3DHS100",
      name: "Nguyễn Ngọc Linh Chi",
      cost: 110.5,
      email: "thaomy@gmail.com",
      payment: "Bên nhận trả phí",
    },
  ];

  let state = [
    {
      code: 0,
      name: "Đơn nháp",
    },
    {
      code: 1,
      name: "Chờ bàn giao",
    },
    {
      code: 2,
      name: "Đã bàn giao-Đang giao",
    },
    {
      code: 3,
      name: "Đã bàn giao-Đang hoàn hàng",
    },
    {
      code: 4,
      name: "Chờ xác nhận giao lại",
    },
    {
      code: 5,
      name: "Hoàn tất",
    },
  ];

  const [userSelected, setUserSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleShowDetail = async (data) => {
    await setUserSelected(data);
    await setIsShowDetail(true);
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };

  return (
    <div className="padding-body">
      {!isShowDetail && (
        <>
          <div className="title_total_number_table">
            <h3 className="title_table">Order List </h3>
            <p className="total_number_table">{items.length}</p>
          </div>
          <CustomMultiSelect selectList={state} />
          <MyTable
            list={items}
            showCheckBox={true}
            callback={handleShowDetail}
            // actionsElement={<OrderButtons data={rowData} />}
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
};
