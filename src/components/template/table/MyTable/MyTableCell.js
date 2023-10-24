import React from "react";
import "./MyTable.css";

export const MyTableCell = ({ data, subData = "" }) => {
  return (
    <div className="my_table_cell col">
      <div className="col d-flex flex-column">
        <div className="main_content">{data}</div>
        <div className="sub_content">{subData}</div>
      </div>
    </div>
  );
};
