import React, { useState } from "react";
//img
import { userDefaultAvatar } from "../../assets/img";
import { User, Coin, Table } from "phosphor-react";
//css
import "../../assets/css/navigation/sidebar.css";
import { ICON_SIZE_BIG, ICON_SIZE_SMALL } from "../../utils/constraint";
import { Link } from "react-router-dom";
//contraints
import {
  URL_STAFF,
  URL_FORGET,
  URL_LOGIN,
  URL_REGISTER,
} from "../../utils/constraint";
function Sidebar({ show, heading, isShowUser, tab }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {show && (
        <div className="sidebar_container">
          <h3 className="major_title sidebar_heading_logo">{heading}</h3>
          {isShowUser && (
            <div className="sidebar_user_info">
              <div className="sidebar_user_avatar">
                <img src={userDefaultAvatar} />
              </div>
              <div className="sidebar_user font-weight-b">
                <h6 className="font-weight-b">Nguyễn Văn Mách</h6>
                <dd className="flex-align-center">
                  Role
                  <User size={ICON_SIZE_SMALL} weight="fill" />
                </dd>
                <dd className="flex-align-center">
                  <Coin size={ICON_SIZE_SMALL} weight="fill" />
                  Coin Xu:
                  <span> 0</span>
                </dd>
              </div>
            </div>
          )}
          <ul className="sidebar_menu">
            {tab.map((item, index) => {
              return (
                <li
                  onClick={() => setActiveTab(index)}
                  key={index}
                  className={
                    index === activeTab ? "sidebar_item active" : "sidebar_item"
                  }
                >
                  <Link exact to={item.link}>
                    {item.icon}
                    <span className="font-weight-b">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
