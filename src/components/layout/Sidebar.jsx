import React, { useState } from "react";
//img
import { userDefaultAvatar } from "../../assets/img";
import { ArrowsDownUp, MagnifyingGlass, Pencil } from "phosphor-react";
//css
import "../../assets/css/navigation/sidebar.css";
import { ICON_SIZE_BIG, URL_PROFILE } from "../../utils/constraint";
import { Link, useNavigate } from "react-router-dom";
//component
import { Notification } from "../index";
import { isAuthenticated } from "../../auth/index";
import useToken from "../../hooks/useToken";
//state
// import { useDispatch, useSelector } from "react-redux";
// import displaySlice from "../../features/Display/displaySlice";
// import { displaySelector } from "../../selectors/displaySelector";
// import { consumerSelector } from "../../selectors/consumerSelector";

function Sidebar({
  show,
  heading,
  // isShowUser,
  handleShowNotification,
  tab,
  displayNotification,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { userPayload } = useToken();

  // const dispatch = useDispatch();
  // const display = useSelector(displaySelector);
  // const consumer = useSelector(consumerSelector);

  const infoStyle = {
    fontSize: "12px",
  };

  return (
    <>
      {show && (
        <div className="sidebar_container">
          <div className="sidebar_header">
            <div className="sidebar_company_logo_container flex-center-between">
              <div className="company_image_logo flex-align-center">
                <img src={userDefaultAvatar} alt="" />
                <h3 className="sidebar_heading_logo">
                  {heading}
                  <p>{userPayload && userPayload.role}</p>
                  <p>
                    {userPayload &&
                      userPayload.branch &&
                      userPayload.branch.name}
                  </p>
                </h3>
              </div>
              <div style={infoStyle}>
                <div>Point: {userPayload && userPayload.point}</div>
                <div>COD: {userPayload && userPayload.cod}</div>
              </div>
              <div
                className="sidebar_heading_dropdown"
                style={{
                  cursor: "pointer",
                }}
              >
                <Pencil
                  className="sidebar_heading_dropdown--icon"
                  size={ICON_SIZE_BIG}
                  onClick={() => navigate(URL_PROFILE)}
                />
              </div>
            </div>
            <div className="sidebar_search_box flex-align-center">
              <MagnifyingGlass
                className="sidebar_search_box--icon"
                size={ICON_SIZE_BIG}
              />
              <input placeholder="search" />
              <div className="sidebar_tab_heading_box"></div>
            </div>
            <ul className="sidebar_menu">
              {tab
                .filter((item) => item.position === "header")
                .map((item, index) => {
                  return (
                    <li
                      onClick={() => setActiveTab(index)}
                      key={index}
                      className={
                        index === activeTab && item.position === "header"
                          ? "sidebar_item active flex-center-between sidebar_item--header"
                          : "sidebar_item flex-center-between sidebar_item--header"
                      }
                    >
                      <div onClick={item?.callback}>
                        {item.icon}
                        <span className="sidebar_tab_label font-weight-b">
                          {item.label}
                        </span>
                      </div>
                      {item.option && (
                        <span className="sidebar_tab_option">
                          {item.option.count}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
            {displayNotification && (
              <Notification
                callback={handleShowNotification}
                heading={"Notifications"}
              />
            )}
          </div>
          <div className="sidebar_body">
            <ul className="sidebar_menu">
              {tab
                .filter(
                  (item) =>
                    item.position === "body" &&
                    userPayload &&
                    (!item.role || item.role.includes(userPayload.role)),
                )
                .map((item, index) => {
                  return (
                    <Link
                      to={`${item.link}`}
                      onClick={() => setActiveTab(index)}
                      key={index}
                      style={{ color: "var(--text-primary)" }}
                    >
                      <li
                        className={
                          index === activeTab && item.position === "body"
                            ? "sidebar_item active"
                            : "sidebar_item"
                        }
                      >
                        {item.icon}
                        <span className="sidebar_tab_label font-weight-b">
                          {item.label}
                        </span>
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
          <div className="sidebar_footer">
            <ul className="sidebar_menu sidebar_menu_footer">
              {tab
                .filter((item) => item.position === "footer")
                .map((item, index) => {
                  return (
                    <Link
                      to={`${item.link}`}
                      onClick={() => setActiveTab(index)}
                      key={index}
                    >
                      <li
                        className={
                          index === activeTab && item.position === "footer"
                            ? "sidebar_item active"
                            : "sidebar_item"
                        }
                      >
                        {item.icon}
                        <span className="sidebar_tab_label font-weight-b">
                          {item.label}
                        </span>
                      </li>
                    </Link>
                  );
                })}
            </ul>
            <div className="sidebar_footer_avatar_user sidebar_company_logo_container flex-center-between">
              <div className="company_image_logo flex-align-center">
                <img src={userDefaultAvatar} alt="" />
                <h3 className="sidebar_heading_logo">
                  {heading}
                  <p>jay@gmail.com</p>
                </h3>
              </div>
              <div className="sidebar_heading_dropdown">
                <ArrowsDownUp
                  className="sidebar_heading_dropdown--icon"
                  size={ICON_SIZE_BIG}
                />
              </div>
              <div className="sidebar_footer_avatar_dropdown_box">
                <ul className="sidebar_menu sidebar_menu_footer">
                  {tab
                    .filter((item) => item.position === "sub")
                    .map((item, index) => {
                      return (
                        <li
                          onClick={() => setActiveTab(index)}
                          key={index}
                          className={
                            index === activeTab && item.position === "sub"
                              ? "sidebar_item active"
                              : "sidebar_item"
                          }
                        >
                          <Link to={`${item.link}`}>
                            {item.icon}
                            <span className="sidebar_tab_label font-weight-b">
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
                <h3 className="sidebar_heading_logo footer_version_app flex-center-between">
                  <p>delihub.v1</p>
                  <div className="dot"></div>
                  <p>Term & Condition</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
