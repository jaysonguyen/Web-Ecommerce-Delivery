import React from "react";
import CustomMultiSelect from "../../../components/template/multiselect/CustomMultiSelect/CustomMultiSelect";

export const OrderPage = () => {
  let items = [
    {
      STT: "1",
      "Mã đơn": "5DHS232",
      "Bên nhận": "Nguyễn Ngọc Thảo My",
      "Tổng phí dịch vụ": 110.5,
      "Thu hộ/ COD": 110.5,
      "Tùy chọn thanh toán": "Bên gửi trả phí",
    },
    {
      STT: "1",
      "Mã đơn": "3DHS100",
      "Bên nhận": "Nguyễn Ngọc Linh Chi",
      "Tổng phí dịch vụ": 110.5,
      "Thu hộ/ COD": 0,
      "Tùy chọn thanh toán": "Bên nhận trả phí",
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

  return (
    <div className="padding-body">
      <div className="title_total_number_table">
        <h3 className="title_table">Order List </h3>
        <p className="total_number_table">{items.length}</p>
      </div>
      <CustomMultiSelect dataList={items} selectList={state} />
    </div>
  );
};
