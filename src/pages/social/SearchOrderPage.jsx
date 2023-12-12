import "../../assets/css/Pages/landing_page.css";
import deliLogoNoBG from "../../assets/img/delivery_logo-nobg.png";
import { Input, MyButton, MyTable } from "../../components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchOrderByIdAndUser } from "../../services/OrderService";
import toast, { Toaster } from "react-hot-toast";
import { OrderModel } from "../../model/order";
import {
  OrderItemFromJson,
  OrderSearchFromJson,
  OrderTableFromJson,
} from "../../utils/modelHandle";

export const SearchOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dataList, setDataList] = useState([]);

  const handleSubmit = async () => {
    try {
      setDataList([]);
      if (orderId.trim() === "" || customerName.trim() === "") {
        toast.error("Please enter order ID and your name!");
      } else {
        let res = await searchOrderByIdAndUser(orderId, customerName);
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            setDataList((orderList) => [
              ...orderList,
              new OrderSearchFromJson(res.data[i]),
            ]);
          }
        } else {
          toast.error("Order not found");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toaster />
      <Navigation />
      <div className={"padding-body-2"}>
        <div
          className={""}
          style={{
            padding: "30px",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Search Order
        </div>
        <div
          className={"row"}
          style={{
            padding: "0 30px",
          }}
        >
          <div className={"col"}>
            <FormInput
              label={"Order id"}
              value={orderId}
              onChange={setOrderId}
              placeholder={"Enter order id"}
            />
          </div>
          <div className={"col"}>
            <FormInput
              label={"Customer name"}
              value={customerName}
              onChange={setCustomerName}
              placeholder={"Enter customer name"}
            />
          </div>
          <div className={"col-1"}>
            <MyButton
              text={"Find"}
              height={"80%"}
              bgColor={"var(--primary-1)"}
              fontColor={"white"}
              hoverColor={"var(--text-color)"}
              margin={"10px 0"}
              callback={handleSubmit}
            />
          </div>
        </div>
        <div className={""}>
          <MyTable hideToolkit={true} hideDetails={true} list={dataList} />
        </div>
      </div>
    </>
  );
};

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className={"header"}>
      <div
        className={"padding-body-2 row"}
        style={{
          alignItems: "center",
        }}
      >
        <div
          className={"main-logo row col-2"}
          style={{
            height: "15vh",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <div
            className={"col-6 "}
            style={{
              height: "100%",
            }}
          >
            <img
              src={deliLogoNoBG}
              alt={""}
              style={{
                height: "100%",
              }}
            />
          </div>
          <div className={"col logo-title"}>
            <div
              style={{
                color: "var(--primary-1)",
                fontSize: "14px",
              }}
            >
              Huflit
            </div>
            <div
              style={{
                color: "var(--primary-2)",
                fontSize: "14px",
              }}
            >
              Delivery
            </div>
          </div>
        </div>
        <div
          className={
            "nav-list-container col d-flex flex-row justify-content-end"
          }
          style={{
            height: "15vh",
          }}
        >
          <div
            className={"nav-item"}
            onClick={() => {
              navigate("/main");
            }}
          >
            Home
          </div>
          <div
            className={"nav-item"}
            onClick={() => {
              navigate("/main");
            }}
          >
            About
          </div>
          <div
            className={"nav-item"}
            onClick={() => {
              navigate("/main");
            }}
          >
            Report
          </div>
          <div
            className={"nav-item"}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, placeholder, value, onChange }) => {
  return (
    <Input
      label={label}
      boxShadow={"none"}
      border={"solid 1px #3d3d3d"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
