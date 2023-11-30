import { CaretDown, Storefront } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
//constraint
import { ICON_SIZE_BIG } from "../../utils/constraint";

//css
import "../../assets/css/dropdown.css";
function DropDown({
  isShowIcon = false,
  label = "",
  item = [],
  isShowSearchField = false,
  isBoxShadow = false,
  textColor = "#000",
  bgColor = "transparent",
  margin = "0",
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
    await setItemSelect(e);
    await setIsShowDropDown(false);
    onChange(code);
    onValue(e);
  };

  const style = {
    margin: "10px 0",
    height: "50px",
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
    <>
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
        <h6
          style={{
            margin: margin,
            color: item.length > 0 ? textColor : "var(--text-color-gray)",
          }}
        >
          {itemSelect}
        </h6>
        <span className="dropdown_icon">
          <CaretDown size={ICON_SIZE_BIG} />
        </span>
        {item.length > 0 && isShowDropDown && (
          <div className="dropdown_content">
            {isShowSearchField && (
              <input
                className="dropdown_input"
                placeholder="Enter your field"
              />
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
                      onClick={(e) =>
                        handleSelectItem(e.target.value, item.code)
                      }
                    >
                      {item.content}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {item.length > 0 && isShowDropDown && (
        <div onClick={handleCloseModal} className="overlay"></div>
      )}
    </>
  );
}

export default DropDown;
