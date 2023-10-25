//lib
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";

import store from "./store/store";
import "./index.css";

//import pages;
import { StaffScreen } from "./pages/admin/staff/StaffScreen";
import App from "./App";
import Login from "./pages/Authentication/Login";
import Forget from "./pages/Authentication/Forget";
import Register from "./pages/Authentication/Register";
import Customer from "./pages/customer/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <StaffScreen />,
      },
      {
        path: "admin/staff",
        element: <StaffScreen />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/customer/account",
        element: <Customer />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
