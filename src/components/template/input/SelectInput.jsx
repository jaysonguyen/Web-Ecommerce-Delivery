import React, { useState } from "react";

//css
import "../../../assets/css/input/input.css";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import { CaretDown } from "phosphor-react";
function SelectInput({
  label = "",
  placeholder = "",
  isBoxShadow = false,
  item = ["Nothing"],
}) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [itemSelect, setItemSelect] = useState("Default value");
  const handleShowDropdown = () => {
    setIsShowDropDown(true);
  };

  const handleCloseModal = () => {
    setIsShowDropDown(false);
  };

  const handleSelectItem = async (e) => {
    await setItemSelect(e);
    await setIsShowDropDown(false);
  };
  return (
    <>
      <div
        className="dropdown_container flex-align-center"
        style={{
          boxShadow: isBoxShadow
            ? "0px 0px 3px var(--primary-color)"
            : "1px 1px 4px var(--border-color)",
        }}
        onClick={handleShowDropdown}
      >
        <span className="dropdown_icon">
          <CaretDown size={ICON_SIZE_BIG} />
        </span>
        {isShowDropDown && (
          <div className="dropdown_content">
            <input className="dropdown_input" placeholder="Enter your field" />
            <ul className="dropdown_list">
              {item.map((item, index) => {
                return (
                  <li key={index} className="dropdown_item">
                    <button
                      className={
                        item.content == itemSelect
                          ? "font-weight-b active"
                          : "font-weight-b"
                      }
                      value={item.content}
                      onClick={(e) => handleSelectItem(e.target.value)}
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
      {isShowDropDown && (
        <div onClick={handleCloseModal} className="overlay"></div>
      )}
    </>
  );
}

export default SelectInput;
