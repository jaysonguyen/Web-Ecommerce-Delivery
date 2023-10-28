import React, { useState } from "react";
import "./MyTable.css";
import { MyTableRow } from "./MyTableRow";
import { Toolkit } from "../../toolkit/Toolkit";

export const MyTable = ({
  list = [],
  headerAction,
  showCheckBox = false,
  select,
  listDataModel,
  columns,
  callback,
  title,
  actionsElement,
  rowHeight = 45,
}) => {
  const [selectedList, setSelectedList] = useState([]);
  const headers = list.length > 0 ? Object.keys(list[0]) : [];
  headers.push("Thao tác");

  if (list.length === 0) {
    return <p>No data to display.</p>; // Render a message when the list is empty
  }

  let handleChecked = (event) => {
    let selected = [...selectedList];
    if (event.target.checked) {
      selected = [...selectedList, event.target.value];
    } else {
      selected.splice(selectedList.indexOf(event.target.value), 1);
    }
    setSelectedList(selected);
  };
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
          <MyTableRow
            callback={callback}
            showCheckBox={showCheckBox}
            key={index}
            data={e}
            actionsElement={actionsElement}
          />
        ))}
      </div>
    </div>
  );
};
