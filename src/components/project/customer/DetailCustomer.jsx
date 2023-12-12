import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/customer.css";
import {
  DotsThreeVertical,
  X,
  PencilSimple,
  Phone,
  Warning,
} from "phosphor-react";
import ActionCustomer from "./ActionCustomer";
import { getStoreByUser, getUserByCode } from "../../../services/UserService";
import { TabContent } from "./TabContent";
import { getCustomerBankByUser } from "../../../services/BankService";

function DetailCustomer({ userSelected, isOpen }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [tabData, setTabData] = useState({});
  const [userData, setUserData] = useState({});
  const [storeData, setStoreData] = useState({});
  const [isShowAction, setIsShowAction] = useState(false);

  const handleShowAction = () => {
    const flag = !isShowAction;
    setIsShowAction(flag);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Client details",
      title: "Client details",
    },
    {
      id: 2,
      tabTitle: "Bank account",
      title: "Bank account",
    },
    {
      id: 3,
      tabTitle: "Store",
      title: "Invoices",
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

  const getCustomerDetails = async () => {
    try {
      const data = await getUserByCode(userSelected.Code);
      if (data.status === 200) {
        setUserData(data.data);
        setTabData(data.data);
      }
    } catch (error) {
      // Handle the error here
      return null;
    }
  };

  const getStoreList = async () => {
    try {
      const data = await getStoreByUser(userData.id);
      if (data != null) {
        setStoreData(data.data);
        setTabData(data.data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    }
  };

  const [customerBankList, setCustomerBankList] = useState([]);

  const getCustomerBank = async () => {
    try {
      let res = await getCustomerBankByUser(userData.id);

      if (res.status === 200) {
        setCustomerBankList(res.data);
        setTabData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const initData = async () => {
    switch (currentTab) {
      case "1": {
        //customer details
        await getCustomerDetails();
        break;
      }
      case "2": {
        // bank account
        await getCustomerBank();
        break;
      }
      case "3": {
        // store
        await getStoreList();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    initData();
    console.log(userData);
  }, [isOpen]);

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
              <h3>{userData.fullName}</h3>
              <div className="email_phone_frame">
                <a href="#">{userData.email}</a>
                <div className="phone_number_cus">
                  <Phone size={13} className="phone_number_icon" />
                  <div className="over_lay">
                    <a href="#" className="phone_number_data">
                      <Phone size={16} className="icon_mini_phone" />
                      {userData.phone}
                    </a>
                  </div>
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
            <div>{/*<button className="btn_Order"> Order</button>*/}</div>
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
              <TabContent tab={currentTab} data={tabData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCustomer;
