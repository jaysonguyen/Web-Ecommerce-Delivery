import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/customer.css";
import {
  DotsThreeVertical,
  PencilSimple,
  Phone,
  Warning,
} from "phosphor-react";
import { User } from "../../../model/user";
import { OrderTabContent } from "./OrderTabContent";
import { formatDate, formatDateTime } from "../../../utils/utils";
import { TextInfo } from "../../../components/index";
import toast from "react-hot-toast";
import {
  getActions,
  getOrderDetails,
  setAction,
} from "../../../services/OrderService";
import ActionCustomer from "../customer/ActionCustomer";
import useToken from "../../../hooks/useToken";

function DetailsOrder({ closeDetail, orderSelected }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [nextAction, setNextAction] = useState("1");
  const [isShowAction, setIsShowAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [detailData, setDetailData] = useState(User);
  const [tabData, setTabData] = useState({});
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [des, setDes] = useState("");

  const { userPayload } = useToken();

  const handleShowAction = () => {
    const flag = !isShowAction;
    setIsShowAction(flag);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Customer Details",
      title: "Customer details",
    },
    {
      id: 2,
      tabTitle: "Product Details",
      title: "Product Details",
    },
    {
      id: 3,
      tabTitle: "History",
      title: "History",
    },
  ];

  const actions = [
    {
      action: "Edit details",
    },
    {
      action: "Block client",
    },
    {
      action: "Delete client",
    },
  ];
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const handleClearInput = () => {
    setNameUser("");
    setEmail("");
    setPhoneNum("");
    setDes("");
    closeDetail();
  };

  const handleActionButton = async (v = "") => {
    try {
      let res = null;
      if (v === "decline") {
        // res = await setAction(orderSelected.order_code, "2");
      } else {
        switch (orderSelected.action_code) {
          case "0": {
            res = await setAction(orderSelected.order_code, "1");
            break;
          }
          case "1": {
            res = await setAction(orderSelected.order_code, "2");
            break;
          }
          case "2": {
            res = await setAction(orderSelected.order_code, "3");
            break;
          }
          case "3": {
            res = await setAction(orderSelected.order_code, "4");
            break;
          }
          case "4": {
            res = await setAction(orderSelected.order_code, "5");
            break;
          }
          case "5": {
            res = await setAction(orderSelected.order_code, "6");
            break;
          }
          default:
            break;
        }
      }

      if (res == null) {
        toast.error("Cannot set action at this status");
        return;
      }

      if (res.status === 200) {
        toast.success("Set action successfully");
        closeDetail();
      } else {
        toast.error("Womething went wrong");
      }
    } catch (e) {}
  };

  const initActionTitleButton = () => {
    switch (orderSelected.action_code) {
      case "0": {
        setNextAction("Send");
        break;
      }
      case "1": {
        setNextAction("Accept");
        break;
      }
      case "2": {
        setNextAction("Delivery");
        break;
      }
      case "3": {
        setNextAction("Return");
        break;
      }
      case "4": {
        setNextAction("Finished");
        break;
      }
      case "5": {
        setNextAction("Complete");
        break;
      }
      default: {
        setNextAction("");
        break;
      }
    }
  };

  useEffect(() => {
    initActionTitleButton();
  }, [currentTab, orderSelected]);

  return (
    <>
      <div className="detail_customer_container">
        <div className="count_quantity_type_order_cus">
          <div className="quantity_info">
            <h4>0đ</h4>
            <p>Total sales</p>
          </div>
          <div className="quantity_info">
            <h4>2</h4>
            <p>Completed</p>
          </div>
          <div className="quantity_info">
            <h4>1</h4>
            <p>Cancelled</p>
          </div>
          <div className="quantity_info">
            <h4>0</h4>
            <p>No-show</p>
          </div>
        </div>
        <div className="info_cus">
          <div className="name_cus_frame">
            <div className="image_cus">
              <span>D</span>
            </div>
            <div className="name_email_cus">
              <h3>{"Order Code: " + orderSelected.order_code}</h3>
            </div>
          </div>
          <div className="status_customer_blaclist_frame">
            <div className="type_cus me-2">
              create:{" "}
              <div className="ms-3" style={{ color: "var(--text-color)" }}>
                {orderSelected.created ? formatDate(orderSelected.created) : ""}
              </div>
            </div>
            <div className="type_cus">
              update:{" "}
              <div className="ms-3" style={{ color: "var(--text-color)" }}>
                {orderSelected.updated ? formatDate(orderSelected.updated) : ""}
              </div>
            </div>
            <div className="blacklist_frame ">
              <Warning size={20} />
            </div>
          </div>

          <div className="action_cus_frame">
            <button className="dotthree_icon" onClick={handleShowAction}>
              <DotsThreeVertical size={32} />
            </button>
            {nextAction !== "" &&
              (userPayload.role === "admin" ||
                orderSelected.action_code === "0") && (
                <div>
                  <button className="btn_Order" onClick={handleActionButton}>
                    {nextAction}
                  </button>
                </div>
              )}
            {orderSelected.action_code !== "2" &&
              (userPayload.role === "admin" ||
                orderSelected.action_code === "0") && (
                <div>
                  <button
                    className="btn_Order"
                    style={{ backgroundColor: "var(--color-error)" }}
                    onClick={() => handleActionButton("decline")}
                  >
                    Decline
                  </button>
                </div>
              )}
          </div>
          {isShowAction && (
            <ActionCustomer item={actions} icon={<PencilSimple size={17} />} />
          )}

          <div className="container">
            <div className="tabs">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  id={tab.id}
                  disabled={currentTab === `${tab.id}`}
                  onClick={handleTabClick}
                >
                  {tab.tabTitle}
                </button>
              ))}
            </div>
            <div className="content">
              {tabs.map((tab, index) => (
                <div key={index}>
                  {currentTab === tab.id.toString() && (
                    <OrderTabContent
                      tab={tab.id.toString()}
                      clearData={handleClearInput}
                      data={orderSelected}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsOrder;
