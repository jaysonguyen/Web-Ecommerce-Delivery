import React, { useEffect } from "react";
import "./MyTable.css";
import { MyTableCell } from "./MyTableCell";
import { MyButton } from "../../button/MyButton/MyButton";
import { useDispatch, useSelector } from "react-redux";
import tableSlice from "../../../../features/table/tableSlice";
import { tableSelector } from "../../../../selectors/consumerSelector";

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
  hideDetails = false,
  hideDelete = true,
}) => {
  const dispatch = useDispatch();
  const tableData = useSelector(tableSelector);

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

  const handleActionButtons = async (data, type) => {
    dispatch(tableSlice.actions.detailButton(data));
    await callback(data, type);
  };

  const handleSelect = async (e) => {
    let list = [...tableData.selectList];
    let ids = list.map((ele) => ele.id);
    if (e.target.checked) list.push(data);
    else {
      console.log(ids);
      let index = ids.indexOf(data.id);
      list.splice(index, 1);
    }
    console.log(list);
    dispatch(tableSlice.actions.handleSelected(list));
  };

  return (
    <div style={rowStyle} className={className}>
      <div className={checkBoxClassName}>
        <div className="checkbox-circle2">
          <input
            type="checkbox"
            id="checkbox-circle2"
            name="check"
            onChange={(e) => handleSelect(e)}
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
                hide={hideDetails}
                callback={() => handleActionButtons(data, "details")}
              />
              {/*<MyButton*/}
              {/*  text={"Delete"}*/}
              {/*  margin="5px 15px"*/}
              {/*  borderRadius="20px"*/}
              {/*  bgColor="var(--color-error)"*/}
              {/*  fontColor="var(--text-white)"*/}
              {/*  hide={hideDelete}*/}
              {/*  callback={() => {*/}
              {/*    console.log(tableData.selectList);*/}
              {/*  }}*/}
              {/*/>*/}
            </div>
          }
          width={``}
        />
      )}
      {/*{actionsElement && <MyTableCell data={actionsElement} onClick={() => callback(data)}/>}*/}
    </div>
  );
};
