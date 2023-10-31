import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { MyButton } from "../../index.js";
import { X } from "phosphor-react";
import * as Icon from "phosphor-react";
import { useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
export const Toolkit = ({
  borderRadius = "10px",
  bgColor = "var(--bg-light)",
  deleteCallback = function () {},
}) => {
  const style = {
    backgroundColor: bgColor,
    borderRadius: borderRadius,
  };

  const tableData = useSelector(tableSelector);
  const [selectCount, setSelectCount] = useState(tableData.selectList.length);

  useEffect(() => {}, [tableData.selectList]);

  return (
    <div
      className="tookit-wrapper py-3 px-4 d-flex align-items-center"
      style={style}
    >
      <Input
        placeholder="Search by name, email or mobile number"
        borderRadius="50px"
        width="100%"
        icon={<Icon.MagnifyingGlass size={24} />}
      />
      <div className="mx-2"></div>
      <MyButton
        text="Filter"
        height="44px"
        width="12%"
        hoverColor="var(--text-white)"
        bgColor="var(--primary-color)"
        fontColor="var(--text-white)"
        borderRadius="20px"
        padding="5px 20px"
        surfix=<Icon.Faders size={18} />
      />
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
    </div>
  );
};
