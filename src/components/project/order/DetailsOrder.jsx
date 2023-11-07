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
import { formatDateTime } from "../../../utils/utils";
import { TextInfo } from "../../../components/index";
import toast from "react-hot-toast";
import { getOrderDetails } from "../../../services/OrderService";
import ActionCustomer from "../customer/ActionCustomer";

function DetailsOrder({ closeDetail, orderSelected }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [isShowAction, setIsShowAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [detailData, setDetailData] = useState(User);
  const [tabData, setTabData] = useState({});
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [des, setDes] = useState("");
  console.log(orderSelected);

  const handleShowAction = () => {
    const flag = !isShowAction;
    setIsShowAction(flag);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Customer Details",
      title: "Customer details",
      content:
        "Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.",
    },
    {
      id: 2,
      tabTitle: "Product Details",
      title: "Product Details",
      content: "Contenido de tab 2.",
    },
    {
      id: 3,
      tabTitle: "History",
      title: "History",
      content: "Contenido de tab 3.",
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

  useEffect(() => {}, [currentTab]);

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
              <div className="email_phone_frame">
                <a href="#">{orderSelected.action_name}</a>
                <div className="phone_number_cus">
                  <Phone size={13} className="phone_number_icon" />
                  <div className="over_lay">
                    <a href="#" className="phone_number_data">
                      <Phone size={16} className="icon_mini_phone" />
                      {orderSelected.phone == null
                        ? "Chưa cập nhật"
                        : orderSelected.receiver.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <TextInfo
                    content={
                      orderSelected.created
                        ? formatDateTime(orderSelected.created)
                        : ""
                    }
                    contentSize="14px"
                  />
                  <TextInfo
                    content={
                      orderSelected.updated
                        ? formatDateTime(orderSelected.updated)
                        : ""
                    }
                    contentSize="14px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="status_customer_blaclist_frame">
            <div className="type_cus"></div>
            <div className="blacklist_frame ">
              <Warning size={20} />
            </div>
          </div>

          <div className="action_cus_frame">
            <button className="dotthree_icon" onClick={handleShowAction}>
              <DotsThreeVertical size={32} />
            </button>
            <div>
              <button className="btn_Order"> Order</button>
            </div>
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
