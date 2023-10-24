import { CaretDown, Storefront } from "phosphor-react";
import React, { useState } from "react";
//constraint
import { ICON_SIZE_BIG } from "../../utils/constraint";

//css
import "../../assets/css/dropdown.css";
function DropDown({ isShowIcon, item, isShowSearchField, isBoxShadow }) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [itemSelect, setItemSelect] = useState("Default value");
  const handleShowDropdown = () => {
    setIsShowDropDown(true);
  };

  const handleCloseModal = () => {
    setIsShowDropDown(false);
  };

  const handleSelectItem = (e) => {
    handleCloseModal();
    setItemSelect(e);
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
        {isShowIcon && (
          <span className="dropdown_icon">
            <Storefront size={ICON_SIZE_BIG} weight="fill" />
          </span>
        )}
        <h6>{itemSelect}</h6>
        <span className="dropdown_icon">
          <CaretDown size={ICON_SIZE_BIG} />
        </span>
        {isShowDropDown && (
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

export default DropDown;
