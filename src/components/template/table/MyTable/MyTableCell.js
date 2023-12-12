import React, { useEffect } from "react";
import "./MyTable.css";
import { useDispatch } from "react-redux";

export const MyTableCell = ({
  data,
  subData = "",
  width = "",
  center = false,
}) => {
  return (
    <div
      className={`my_table_cell col${width} ` + (center ? "text-center" : "")}
    >
      <div className={`d-flex flex-column col`}>
        <div className="main_content">
          {/*{typeof data === "function" ? data() : data}*/}
          {data}
        </div>
        <div className="sub_content">{subData}</div>
      </div>
    </div>
  );
};
