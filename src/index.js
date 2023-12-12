//lib
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import "./index.css";

//import pages;
import App from "./App";
import Login from "./pages/Authentication/Login";
import Forget from "./pages/Authentication/Forget";
import Register from "./pages/Authentication/Register";
import Branch from "./pages/admin/branch/Branch";
import OrderCustomer from "./pages/customer/OrderCustomerPage";
import StatusButton from "./components/project/order/StatusButton";
import {
  URL_STAFF,
  URL_FORGET,
  URL_REGISTER,
  URL_ORDER,
  URL_BRANCH,
  URL_VOUCHER,
  URL_VOUCHER_ADD,
  URL_PRODUCTTYPE,
  URL_CITY,
  URL_DASHBOARD,
  URL_CUSTOMER,
  URL_SHIPPER_PAGE,
  URL_LOGIN,
  URL_PROFILE,
  URL_LANDING_PAGE,
  URL_SEARCH_ORDER_PAGE,
  URL_CUSTOMER_BANK_ACCOUNT,
} from "./utils/constraint";

import Customer from "./pages/admin/customer/Customer";
import AddCustomer from "./components/project/customer/AddCustomer";
import { StaffPage } from "./pages/admin/staff/StaffPage";
import { OrderPage } from "./pages/admin/order/OrderPage";
import VoucherPage from "./pages/admin/voucher/VoucherPage";
import AddVoucher from "./components/project/voucher/AddVoucher";
import CityPage from "./pages/admin/city/CityPage";
import ProductType from "./pages/admin/productType/ProductType";
import ShippingAssignment from "./pages/admin/staff/ShippingAssignment";
import PrivateRoute from "./auth/PrivateRoute";

//customer
import StorePage from "./pages/customer/StorePage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import ShipperPage from "./pages/admin/staff/ShipperPage";
import PackageShipmentDetail from "./pages/admin/staff/PackageShipmentDetail";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { LandingPage } from "./pages/social/LandingPage";
import { SearchOrderPage } from "./pages/social/SearchOrderPage";
import BankAccount from "./pages/customer/BankAccountPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: URL_STAFF,
//         element: <StaffPage />,
//         role: ["admin"],
//       },
//       {
//         path: URL_VOUCHER,
//         element: <VoucherPage />,
//         role: ["admin"],
//       },
//       {
//         path: URL_CITY,
//         element: <CityPage />,
//         role: ["admin"],
//       },
//       {
//         path: URL_ORDER,
//         element: <OrderPage />,
//         role: ["admin", "shipper", "staff"],
//       },
//       {
//         path: URL_LOGIN,
//         element: <Login />,
//       },
//       {
//         path: URL_FORGET,
//         element: <Forget />,
//       },
//       {
//         path: URL_REGISTER,
//         element: <Register />,
//       },
//       {
//         path: URL_BRANCH,
//         element: <Branch />,
//         role: ["admin"],
//       },
//       {
//         index: true,
//         element: <Customer />,
//         role: ["admin"],
//       },
//       {
//         path: "/customer/add",
//         element: <AddCustomer />,
//         role: ["admin"],
//       },
//       {
//         path: URL_PRODUCTTYPE,
//         element: <ProductType />,
//         role: ["admin", "staff"],
//       },
//       {
//         path: URL_VOUCHER_ADD,
//         element: <AddVoucher />,
//         role: ["admin", "staff"],
//       },
//       {
//         path: "/statusbutton",
//         element: <StatusButton />,
//       },
//       {
//         path: "/order",
//         element: <OrderCustomer />,
//         role: ["admin", "staff"],
//       },
//       {
//         path: "/shipping-assignment",
//         element: <ShippingAssignment />,
//         role: ["shipper"],
//       },
//     ],
//   },
// ]);

const routes = [
  {
    path: URL_STAFF,
    element: <StaffPage />,
    role: ["admin"],
  },
  {
    path: URL_VOUCHER,
    element: <VoucherPage />,
    role: ["admin", "customer"],
  },
  {
    path: URL_CITY,
    element: <CityPage />,
    role: ["admin"],
  },
  {
    path: URL_ORDER,
    element: <OrderPage />,
    // role: ["admin", "shipper", "staff"],
  },
  {
    path: URL_PROFILE,
    element: <ProfilePage />,
    // role: ["admin", "shipper", "staff"],
  },
  {
    path: URL_BRANCH,
    element: <Branch />,
    role: ["admin"],
  },
  {
    path: URL_CUSTOMER,
    element: <Customer />,
    role: ["admin"],
  },
  {
    path: "/customer/add",
    element: <AddCustomer />,
    role: ["admin"],
  },
  {
    path: URL_PRODUCTTYPE,
    element: <ProductType />,
    role: ["admin", "staff"],
  },
  {
    path: URL_VOUCHER_ADD,
    element: <AddVoucher />,
    role: ["admin", "staff"],
  },
  {
    path: "/statusbutton",
    element: <StatusButton />,
  },
  {
    path: "/order",
    element: <OrderCustomer />,
    role: ["admin", "staff"],
  },
  {
    path: "/shipping-assignment",
    element: <ShippingAssignment />,
    role: ["shipper"],
  },
  {
    path: "/customer/store",
    element: <StorePage />,
    role: ["customer"],
  },
  // {
  //   path: URL_SHIPPER_PAGE,
  //   element: <ShipperPage />,
  // },
  {
    path: "/shipper/order/detail",
    element: <PackageShipmentDetail />,
  },
  {
    // index: true,
    path: URL_DASHBOARD,
    element: <DashboardPage />,
  },
  {
    // index: true,
    path: URL_CUSTOMER_BANK_ACCOUNT,
    element: <BankAccount />,
  },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router} /> */}
      <Router>
        <Routes>
          <Route
            path={URL_LANDING_PAGE}
            index={true}
            element={<LandingPage />}
          />
          <Route
            path={URL_SEARCH_ORDER_PAGE}
            index={true}
            element={<SearchOrderPage />}
          />
          <Route path={URL_LOGIN} index={true} element={<Login />} />
          <Route path={URL_REGISTER} element={<Register />} />
          <Route path={URL_FORGET} element={<Forget />} />
          <Route path={URL_SHIPPER_PAGE} element={<ShipperPage />} />
          <Route path="/" element={<App />}>
            {routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  index={route.index ?? null}
                  path={route.path}
                  element={
                    <PrivateRoute role={route.role}>
                      {route.element}
                    </PrivateRoute>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
