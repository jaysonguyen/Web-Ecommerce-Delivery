import "./App.css";
import "./assets/css/plugin.css";
import { Link, Outlet, useLocation } from "react-router-dom";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import {
  BellSimple,
  Clock,
  GearSix,
  Lifebuoy,
  ListNumbers,
  ShoppingBag,
  SignOut,
  ChartBar,
  CaretLeft,
} from "phosphor-react";
import {
  ICON_SIZE_BIG,
  URL_STAFF,
  URL_CUSTOMER,
  URL_ORDER,
  URL_LOGIN,
  URL_DASHBOARD,
} from "./utils/constraint";
import { Sidebar, AdminHeader } from "./components/index";
import { displaySelector } from "./selectors/displaySelector";
import { consumerSelector } from "./selectors/consumerSelector";

import { useDispatch, useSelector } from "react-redux";
import displaySlice from "./features/Display/displaySlice";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const display = useSelector(displaySelector);
  const consumer = useSelector(consumerSelector);
  const dispatch = useDispatch();
  const sidebarContent = [
    {
      icon: <BellSimple size={ICON_SIZE_BIG} />,
      label: "Activity",
      link: "/notify",
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
      icon: <ChartBar size={ICON_SIZE_BIG} />,
      label: "Dashboard",
      link: URL_DASHBOARD,
      position: "body",
      // role: ["admin", ""],
    },
    {
      icon: <ShoppingBag size={ICON_SIZE_BIG} />,
      label: "Customer",
      link: URL_CUSTOMER,
      position: "body",
      role: ["admin"],
    },
    {
      icon: <ListNumbers size={ICON_SIZE_BIG} />,
      label: "Order",
      link: URL_ORDER,
      position: "body",
      // role: ["admin", ""],
    },
    // {
    //   icon: <UsersFour size={ICON_SIZE_BIG} />,
    //   label: "Employee",
    //   link: URL_STAFF,
    //   position: "body",
    //   role: ["admin"],
    // },
    // {
    //   icon: <Graph size={ICON_SIZE_BIG} />,
    //   label: "City",
    //   link: URL_CITY,
    //   position: "body",
    //   role: ["admin"],
    // },
    // {
    //   icon: <Graph size={ICON_SIZE_BIG} />,
    //   label: "Branch",
    //   link: URL_BRANCH,
    //   position: "body",
    //   role: ["admin"],
    // },
    // {
    //   icon: <Wallet size={ICON_SIZE_BIG} />,
    //   label: "Voucher",
    //   link: URL_VOUCHER,
    //   position: "body",
    //   role: ["admin", "customer"],
    // },
    //
    // {
    //   icon: <Archive size={ICON_SIZE_BIG} />,
    //   label: "Product Type",
    //   link: URL_PRODUCTTYPE,
    //   position: "body",
    //   role: ["admin"],
    // },
    // {
    //   icon: <ShoppingBag size={ICON_SIZE_BIG} />,
    //   label: "Store",
    //   link: "/customer/store",
    //   position: "body",
    //   role: ["customer"],
    // },
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
      link: URL_LOGIN,
      position: "sub",
      callback: () => {
        sessionStorage.clear();
      },
    },
  ];

  const handleShowNotification = () => {
    dispatch(
      displaySlice.actions.displayNotification(!display.isShowNotification),
    );
  };

  const url = window.location.href;

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

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
      <div className={display.isShowSidebar.toString() && "content_container"}>
        {/* {display.isShowHeader &&
          consumer?.userCurrentInfo?.role?.name == "customer" && (
            <div>
              <AdminHeader />
            </div>
          )} */}

        <div className={"padding-body"}>
          {location.pathname !== "/" && (
            <div>
              <CaretLeft
                className="mx-1 my-3"
                size={16}
                color="#3d3d3d"
                weight="fill"
              />
              <Link
                to="/"
                style={{
                  color: "var(--text-color-primary)",
                  fontSize: "14px",
                }}
              >
                Dashboard
              </Link>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
