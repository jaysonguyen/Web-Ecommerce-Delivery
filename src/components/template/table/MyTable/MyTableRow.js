import React from "react";
import "./MyTable.css";
import { MyTableCell } from "./MyTableCell";

export const MyTableRow = ({
  data = {},
  isHeader = false,
  rowHeight = 65,
  showCheckBox = false,
  callback = function () {},
  handleCheck = function () {},
  actionsElement,
}) => {
  let className = isHeader
    ? "my_table_row table_header row"
    : "my_table_row row";

  let checkBoxClassName = showCheckBox
    ? "my_table_cell col-1 checkbox"
    : `my_table_cell col-1 checkbox d-none`;
  let actionClassName = actionsElement
    ? "my_table_cell col-1"
    : `my_table_cell col-1 d-none`;

  let rowStyle = {
    height: rowHeight,
  };

  return (
    <div style={rowStyle} className={className} onClick={() => callback(data)}>
      <div className={checkBoxClassName}>
        {/*<input className="checkbox" type="checkbox" />*/}
        {/*<span className="checkmark"></span>*/}
        <div className="checkbox-circle2">
          <input
            type="checkbox"
            id="checkbox-circle2"
            name="check"
            onChange={handleCheck}
          />
        </div>
      </div>
      {Object.values(data).map((e, index) => (
        <MyTableCell key={index} data={e} />
      ))}
      {actionsElement && (
        <div className={actionClassName}>
          {/*<input className="checkbox" type="checkbox" />*/}
          {/*<span className="checkmark"></span>*/}
          <div className="checkbox-circle2">{actionsElement}</div>
        </div>
      )}
    </div>
  );
};
