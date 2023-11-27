import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/Pages/customer.css";
import {
  DotsThreeVertical,
  X,
  PencilSimple,
  Phone,
  Warning,
  CaretLeft,
} from "phosphor-react";
import { ICON_SIZE_EXTRA_LARGE } from "../../../utils/constraint";
import ActionCustomer from "./ActionCustomer";
import { Input, Dropdown } from "../../index";
import {
  getStoreByUser,
  getUserByCode,
  getUserById,
  getUserList,
} from "../../../services/UserService";
import { User } from "../../../model/user";
import toast from "react-hot-toast";
import { TabContent } from "./TabContent";
import { getBankList } from "../../../services/BankService";

function DetailCustomer({ userSelected }) {
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
      tabTitle: "Orders list",
      title: "Orders list",
    },
    {
      id: 3,
      tabTitle: "Bank account",
      title: "Bank account",
    },
    {
      id: 4,
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
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    }
  };

  const initData = async () => {
    switch (currentTab) {
      case "1": {
        //customer details
        await getCustomerDetails();
        await setTabData(userData);
        break;
      }
      case "2": {
        //order by user
        break;
      }
      case "3": {
        // bank account
        break;
      }
      case "4": {
        // store
        await getStoreList();
        await setTabData(storeData);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    initData();
  }, [currentTab, userSelected]);

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
              <h3>{userSelected.fullName}</h3>
              <div className="email_phone_frame">
                <a href="#">{userSelected.email}</a>
                <div className="phone_number_cus">
                  <Phone size={13} className="phone_number_icon" />
                  <div className="over_lay">
                    <a href="#" className="phone_number_data">
                      <Phone size={16} className="icon_mini_phone" />
                      {userSelected.phone == null
                        ? "Chưa cập nhật"
                        : userSelected.phone}
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
              <TabContent tab={currentTab} data={tabData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailCustomer;
