import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import React from "react";
import { CustomMultiSelect } from "../../../components/template/multiselect/CustomMultiSelect/CustomMultiSelect";

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

  return (
    <div>
      <CustomMultiSelect />
      <MyTable list={items} title="Order Management" showCheckBox={true} />
    </div>
  );
};
