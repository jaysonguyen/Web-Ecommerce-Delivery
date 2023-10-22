import React from "react";
import "./MyTable.css";
import { MyTableCell } from "./MyTableCell";

export const MyTableRow = ({
  data = {},
  isHeader = false,
  rowHeight = 65,
  showCheckBox = false,
}) => {
  let className = isHeader
    ? "my_table_row table_header row"
    : "my_table_row row";

  let checkBoxClassName = showCheckBox
    ? "my_table_cell col-1"
    : `my_table_cell col-1 d-none`;

  let rowStyle = {
    height: rowHeight,
  };

  return (
    <div style={rowStyle} className={className}>
      <div className={checkBoxClassName}>
        <input className="checkbox" type="checkbox" />
      </div>
      {Object.values(data).map((e, index) => (
        <MyTableCell key={index} data={e} />
      ))}
    </div>
  );
};
