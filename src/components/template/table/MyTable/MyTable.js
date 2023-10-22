import React from "react";
import { MyButton } from "../../button/MyButton/MyButton";
import "./MyTable.css";
import { MyTableRow } from "./MyTableRow";

export const MyTable = ({
  headerAction,
  showCheckBox = false,
  select,
  listDataModel,
  columns,
  callback,
  title,
  rowHeight = 50,
}) => {
  var myHeaderAction = (
    <div>
      <MyButton text="Add" />
      <MyButton text="Delete" />
    </div>
  );
  var myTitle = "table title";

  let items = [
    { "header 1": "1", "header 2": "2", "header 3": "3" },
    { "header 1": "4", "header 2": "5", "header 3": "6" },
  ];

  const headers = Object.keys(items[0]);

  if (items.length === 0) {
    return <p>No data to display.</p>; // Render a message when the list is empty
  }

  return (
    <div className="myTable">
      <div className="row mx-2">
        <div className="col">
          <h3>{myTitle}</h3>
        </div>
        <div className="col text-end">{myHeaderAction}</div>
      </div>
      <div className="my_table_wrapper">
        <MyTableRow
          showCheckBox={showCheckBox}
          data={headers}
          isHeader={true}
        />
        {items.map((e, index) => (
          <MyTableRow showCheckBox={showCheckBox} key={index} data={e} />
        ))}
      </div>
    </div>
  );
};
