import { CaretDown, Storefront } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
//constraint
import { ICON_SIZE_BIG } from "../../utils/constraint";

//css
import "../../assets/css/dropdown.css";
function DropDown({
  isShowIcon = false,
  label = "",
  fontSize = "16px",
  item = [],
  isShowSearchField = false,
  isBoxShadow = false,
  textColor = "#000",
  bgColor = "transparent",
  margin = "0",
  width = "auto",
  placeholder = "",
  value = "",
  onChange = function (v) {},
  onValue = function (v) {},
}) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [itemSelect, setItemSelect] = useState(
    value === "" ? placeholder : value,
  );
  const handleShowDropdown = () => {
    console.log("show dropdown");
    setIsShowDropDown(true);
  };

  const handleCloseModal = () => {
    console.log("close dropdown");
    setIsShowDropDown(false);
  };

  const handleSelectItem = async (e, code) => {
    setItemSelect(e);
    setIsShowDropDown(false);
    onChange(code);
    onValue(e);
  };

  const style = {
    padding: "12.5px 15px",
    width: width,
    backgroundColor: bgColor,
    boxShadow:
      item.length > 0
        ? isBoxShadow
          ? "0px 0px 3px var(--primary-color)"
          : "1px 1px 4px var(--border-color)"
        : "none",
    cursor: item.length > 0 ? "pointer" : "context-menu",
  };

  useEffect(() => {
    setItemSelect(value === "" ? placeholder : value);
  }, [item]);

  return (
    <div
      className="pt-2"
      style={{
        position: "relative",
      }}
    >
      {label && <label className="text-dark font-weight-b">{label}</label>}
      <div
        className="dropdown_container flex-align-center"
        style={style}
        onClick={handleShowDropdown}
      >
        {isShowIcon && (
          <span className="dropdown_icon">
            <Storefront size={ICON_SIZE_BIG} weight="fill" />
          </span>
        )}
        <div
          style={{
            margin: margin,
            fontSize: fontSize,
            color: item.length > 0 ? textColor : "var(--text-color-gray)",
          }}
        >
          {itemSelect}
        </div>
        <span className="dropdown_icon">
          <CaretDown size={ICON_SIZE_BIG} />
        </span>
      </div>
      {item.length > 0 && isShowDropDown && (
        <div className="dropdown_content">
          {isShowSearchField && (
            <input className="dropdown_input" placeholder="Enter your field" />
          )}
          <ul className="dropdown_list">
            {item.map((item, index) => {
              return (
                <li key={index} className="dropdown_item">
                  <button
                    className={
                      item.content === itemSelect
                        ? "font-weight-b active"
                        : "font-weight-b"
                    }
                    value={item.content}
                    onClick={async (e) => {
                      await handleSelectItem(e.target.value, item.code);
                    }}
                  >
                    {item.content}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {item.length > 0 && isShowDropDown && (
        <div onClick={handleCloseModal} className="overlay"></div>
      )}
    </div>
  );
}

export default DropDown;
