import React, { useEffect } from "react";
import "./MyTable.css";
import { MyTableCell } from "./MyTableCell";
import { MyButton } from "../../button/MyButton/MyButton";

function OrderButton() {
  return null;
}

export const MyTableRow = ({
  data = {},
  isHeader = false,
  showCheckBox = false,
  callback = function (data) {},
  handleCheck = function () {},
  handleGetData = function (e) {},
}) => {
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
    // console.log(data);
  }, []);

  return (
    <div style={rowStyle} className={className}>
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
      {Object.values(data).map((e, index) => {
        if (index === 0)
          return <MyTableCell key={index} data={e} width={`-1`} />;
        return <MyTableCell key={index} data={e} width={``} />;
      })}
      {!isHeader && (
        <MyTableCell
          data={
            <MyButton
              text={"Details"}
              margin="5px 15px"
              borderRadius="20px"
              callback={() => callback(data)}
            />
          }
          width={``}
        />
      )}
      {/*{actionsElement && <MyTableCell data={actionsElement} onClick={() => callback(data)}/>}*/}
    </div>
  );
};
