import React, { useEffect, useState, useRef } from "react";
import "./MyTable.css";
import { MyTableRow } from "./MyTableRow";
import { Toolkit } from "../../toolkit/Toolkit";

export const MyTable = ({
  list = [],
  headerAction,
  showCheckBox = false,
  select = [],
  handleCheck = function (e, data) {},
  callback = function (data, type) {},
  deleteCallback = function () {},
  title,
  actionsElement,
  hideDetails = false,
  hideDelete = false,
  handleGetData = function (e) {},
  hideToolkit = false,
  isDeleteRow = false,
  searchValue,
  searchCallback = function () {},
}) => {
  // flag: ignore ID column
  const headers = list.length > 0 ? Object.keys(list[0]) : [];
  !hideDetails && headers.push("Thao tác");

  const testCheck = (e, data) => {
    console.log("test check function");
    handleCheck(e, data);
  };

  const handleActionButtons = async (data, type) => {
    console.log("click");
    await callback(data, type);
  };

  const checkboxRef = useRef(true);

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
        {!hideToolkit && (
          <Toolkit
            selectedList={select}
            hideDelete={hideDelete}
            deleteCallback={deleteCallback}
          />
        )}
        {list.length > 0 ? (
          <div className="my_table_wrapper">
            <MyTableRow
              showCheckBox={showCheckBox}
              data={headers}
              ignoreID={headers && headers[0].toLowerCase() === "id"}
              isHeader={true}
              cellContentCenter={false}
            />

            {list.length > 0 &&
              list.map((e, index) => {
                return (
                  <MyTableRow
                    callback={handleActionButtons}
                    showCheckBox={showCheckBox}
                    handleCheck={testCheck}
                    key={index}
                    data={e}
                    ignoreID={headers && headers[0].toLowerCase() === "id"}
                    hideDetails={hideDetails}
                    handleGetData={handleGetData}
                    actionsElement={actionsElement}
                  />
                );
              })}
          </div>
        ) : (
          <div className="center h-75">
            <p>No data to display.</p>
          </div>
        )}
      </div>
    </>
  );
};
