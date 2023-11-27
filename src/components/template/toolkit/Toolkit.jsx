import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { MyButton } from "../../index.js";
import { X } from "phosphor-react";
import * as Icon from "phosphor-react";
import { useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import searchSlice from "../../../features/search/searchSlice";
import { useDispatch } from "react-redux";

export const Toolkit = ({
  borderRadius = "10px",
  bgColor = "var(--bg-light)",
  deleteCallback = function () {},
  hideDelete = false,
}) => {
  const style = {
    backgroundColor: bgColor,
    borderRadius: borderRadius,
  };

  const tableData = useSelector(tableSelector);
  const [selectCount, setSelectCount] = useState(tableData.selectList.length);
  const dispatch = useDispatch();

  useEffect(() => {}, [tableData.selectList]);

  return (
    <div
      className="tookit-wrapper py-2 px-3 d-flex align-items-center"
      style={style}
    >
      <Input
        placeholder="Search by name, email or mobile number"
        borderRadius="50px"
        height="45px"
        width="100%"
        onChange={(v) => dispatch(searchSlice.actions.searchInput(v.target))}
        icon={<Icon.MagnifyingGlass size={16} />}
      />
      <div className="mx-2"></div>
      <MyButton
        text="Filter"
        height="44px"
        width="12%"
        fontSize="12px"
        hoverColor="var(--text-white)"
        bgColor="var(--primary-color)"
        fontColor="var(--text-white)"
        borderRadius="20px"
        padding="5px 20px"
        surfix=<Icon.Faders size={16} />
      />
      {!hideDelete && (
        <div className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-around">
            <div className="d-flex align-items-center">
              <div>{selectCount.toString()} Item selected</div>
              <MyButton
                prefix={<X size={18} />}
                bgColor="transparent"
                fontColor="var(--primary-color)"
                padding="0"
                width="40px"
              />
            </div>
            <MyButton
              text="Delete"
              height="44px"
              bgColor="var(--color-error)"
              fontColor="var(--text-white)"
              hoverColor="var(--text-white)"
              borderRadius="5px"
              callback={deleteCallback}
            />
          </div>
        </div>
      )}
    </div>
  );
};
