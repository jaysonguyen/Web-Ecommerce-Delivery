import React, { useEffect, useState } from "react";
import "./MyTable.css";
import { MyTableRow } from "./MyTableRow";
import { Toolkit } from "../../toolkit/Toolkit";

export const MyTable = ({
  list = [],
  headerAction,
  showCheckBox = false,
  select = [],
  handleCheck = function (e, data) {},
  listDataModel,
  columns,
  callback = function (data, type) {},
  title,
  actionsElement,
  handleGetData = function (e) {},
}) => {
  const headers = list.length > 0 ? Object.keys(list[0]) : [];
  headers.push("Thao tác");

  const testCheck = (e, data) => {
    console.log("test check function");
    handleCheck(e, data);
  };

  useEffect(() => {}, [select]);

  return (
    <>
      <div className="myTable">
        <div className="row mx-2">
          <div className="col">
            <h3>{title}</h3>
          </div>
          <div className="col text-end">{headerAction}</div>
        </div>
        <Toolkit selectedList={select} />
        {list.length === 0 ? (
          <div className="center">
            <p>No data to display.</p>
          </div>
        ) : (
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
                handleCheck={testCheck}
                key={index}
                data={e}
                handleGetData={handleGetData}
                actionsElement={actionsElement}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
