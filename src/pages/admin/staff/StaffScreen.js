import React from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { MyButton } from "../../../components/template/button/MyButton/MyButton";
import { Plus, Trash } from "phosphor-react";

export const StaffScreen = () => {
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

  let myHeaderAction = (
    <div>
      <MyButton text="Add" icon={<Plus size={16} />} />
      <MyButton text="Delete" icon={<Trash size={16} />} />
    </div>
  );
  let myTitle = "Staff Management";

  return (
    <div className="">
      <MyTable
        list={items}
        headerAction={myHeaderAction}
        title={myTitle}
        showCheckBox={true}
      />
    </div>
  );
};
