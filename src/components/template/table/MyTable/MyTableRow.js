import React, { useEffect } from "react";
import "./MyTable.css";
import { MyTableCell } from "./MyTableCell";
import { MyButton } from "../../button/MyButton/MyButton";
import { useDispatch } from "react-redux";
import tableSlice from "../../../../features/table/tableSlice";

function OrderButton() {
  return null;
}

export const MyTableRow = ({
  data = {},
  isHeader = false,
  showCheckBox = false,
  callback = function (data, type) {},
  handleCheck = function (e, data) {},
  handleGetData = function (e) {},
}) => {
  const dispatch = useDispatch();

  let className = isHeader
    ? "my_table_row table_header row"
    : "my_table_row row";

  let checkBoxClassName = showCheckBox
    ? `my_table_cell col-1 checkbox`
    : `my_table_cell col-1 checkbox d-none`;

  let rowStyle = {
    // height: rowHeight,
    height: "auto",
  };

  useEffect(() => {
    handleGetData(data);
  }, []);

  return (
    <div style={rowStyle} className={className}>
      <div className={checkBoxClassName}>
        <div className="checkbox-circle2">
          <input
            type="checkbox"
            id="checkbox-circle2"
            name="check"
            // onChange={(e) => {
            //   dispatch(tableSlice.actions.handleSelected(data));
            // }}
          />
        </div>
      </div>
      {Object.values(data).map((e, index) => {
        if (index === 0)
          return <MyTableCell key={index} data={e} width={`-1`} />;
        return <MyTableCell key={index} data={e} width={``} />;
      })}
      {!isHeader && (
        <MyTableCell
          data={
            <div>
              <MyButton
                text={"Details"}
                margin="5px 15px"
                borderRadius="20px"
                callback={() => callback(data, "details")}
              />
              <MyButton
                text={"Delete"}
                margin="5px 15px"
                borderRadius="20px"
                bgColor="var(--color-error)"
                fontColor="var(--text-white)"
                callback={() => callback(data, "delete")}
              />
            </div>
          }
          width={``}
        />
      )}
      {/*{actionsElement && <MyTableCell data={actionsElement} onClick={() => callback(data)}/>}*/}
    </div>
  );
};
