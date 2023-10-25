import React from "react";
import "./MyTable.css";
import { MyTableRow } from "./MyTableRow";
import { Toolkit } from "../../../project/toolkit/Toolkit";

export const MyTable = ({
  list = [],
  headerAction,
  showCheckBox = false,
  select,
  listDataModel,
  columns,
  callback,
  title,
  rowHeight = 45,
}) => {
  const headers = list.length > 0 ? Object.keys(list[0]) : [];

  if (list.length === 0) {
    return <p>No data to display.</p>; // Render a message when the list is empty
  }

  return (
    <div className="myTable">
      <div className="row mx-2">
        <div className="col">
          <h3>{title}</h3>
        </div>
        <div className="col text-end">{headerAction}</div>
      </div>
      <Toolkit />
      <div className="my_table_wrapper">
        <MyTableRow
          showCheckBox={showCheckBox}
          data={headers}
          isHeader={true}
        />
        {list.map((e, index) => (
          <MyTableRow showCheckBox={showCheckBox} key={index} data={e} />
        ))}
      </div>
    </div>
  );
};
