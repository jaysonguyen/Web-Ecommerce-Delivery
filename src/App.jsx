import "./App.css";
import "./assets/css/plugin.css";
import { Outlet } from "react-router-dom";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import {
  BellSimple,
  Clock,
  GearSix,
  Lifebuoy,
  ListNumbers,
  ShoppingBag,
  SignOut,
  Table,
  UsersFour,
  Graph,
  Wallet,
  Archive,
} from "phosphor-react";
import {
  ICON_SIZE_BIG,
  URL_STAFF,
  URL_CUSTOMER,
  URL_ORDER,
  URL_BRANCH,
  URL_VOUCHER,
  URL_PRODUCTTYPE,
  URL_CITY,
} from "./utils/constraint";
import { StaffPage } from "./pages/admin/staff/StaffPage";
import { Sidebar, AdminHeader } from "./components/index";
import { displaySelector } from "./selectors/displaySelector";
import { useDispatch, useSelector } from "react-redux";
import displaySlice from "./features/Display/displaySlice";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getStaffList } from "./services/StaffService";

function App() {
  const display = useSelector(displaySelector);
  const dispatch = useDispatch();
  const sidebarContent = [
    {
      icon: <BellSimple size={ICON_SIZE_BIG} />,
      label: "Activity",
      link: URL_CUSTOMER,
      position: "header",
      option: {
        count: 10,
      },
      callback: () => {
        dispatch(
          displaySlice.actions.displayNotification(
            !display.displayNotification,
          ),
        );
      },
    },
    {
      icon: <ShoppingBag size={ICON_SIZE_BIG} />,
      label: "Customer",
      link: URL_CUSTOMER,
      position: "body",
    },
    {
      icon: <ListNumbers size={ICON_SIZE_BIG} />,
      label: "Order",
      link: URL_ORDER,
      position: "body",
    },
    {
      icon: <UsersFour size={ICON_SIZE_BIG} />,
      label: "Employee",
      link: URL_STAFF,
      position: "body",
    },
    {
      icon: <Graph size={ICON_SIZE_BIG} />,
      label: "City",
      link: URL_CITY,
      position: "body",
    },
    {
      icon: <Graph size={ICON_SIZE_BIG} />,
      label: "Branch",
      link: URL_BRANCH,
      position: "body",
    },
    {
      icon: <Wallet size={ICON_SIZE_BIG} />,
      label: "Voucher",
      link: URL_VOUCHER,
      position: "body",
    },
   
    {
      icon: <Archive size={ICON_SIZE_BIG} />,
      label: "Product Type",
      link: URL_PRODUCTTYPE,
      position: "body",
    },
    {
      icon: <GearSix size={ICON_SIZE_BIG} />,
      label: "Setting",
      link: URL_STAFF,
      position: "footer",
    },
    {
      icon: <Lifebuoy size={ICON_SIZE_BIG} />,
      label: "Help",
      link: URL_STAFF,
      position: "footer",
    },
    {
      icon: <Clock size={ICON_SIZE_BIG} />,
      label: "History",
      link: URL_STAFF,
      position: "sub",
    },
    {
      icon: <SignOut size={ICON_SIZE_BIG} />,
      label: "Logout",
      link: URL_STAFF,
      position: "sub",
    },
  ];

  const handleShowNotification = () => {
    dispatch(
      displaySlice.actions.displayNotification(!display.isShowNotification),
    );
  };

  return (
    <div className="app_container">
      <Toaster />
      {display.isShowSidebar && (
        <Sidebar
          displayNotification={display.isShowNotification}
          handleShowNotification={handleShowNotification}
          show={true}
          heading="DeliHub"
          isShowUser={true}
          tab={sidebarContent}
        />
      )}
      <div className="content_container">
        {/* {display.isShowHeader && (
          <div>
            <AdminHeader />
          </div>
        )} */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
