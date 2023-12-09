import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/customer.css";
import {
  DotsThreeVertical,
  PencilSimple,
  Phone,
  Warning,
} from "phosphor-react";
import { VoucherTabContent } from "./VoucherTabContent";
import { formatDate, formatDateTime } from "../../../utils/utils";
import ActionCustomer from "../customer/ActionCustomer";
import { getVoucherById } from "../../../services/VoucherService";
import toast from "react-hot-toast";

function DetailsVoucher({ isOpen, dataSelected = {} }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [detailsData, setDetailsData] = useState({});
  const [isShowAction, setIsShowAction] = useState(false);

  const fetchDataDetail = async () => {
    try {
      let res = await getVoucherById(dataSelected.ID);

      if (res.status === 200) {
        setDetailsData(res.data);
      } else {
        toast.error("Cannot found voucher data!");
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    }
  };

  const handleShowAction = () => {
    const flag = !isShowAction;
    setIsShowAction(flag);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Voucher Details",
      title: "Customer details",
    },
    {
      id: 2,
      tabTitle: "History Usage",
      title: "History Usage",
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

  useEffect(() => {
    isOpen && fetchDataDetail();
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
              <h3>{dataSelected.Name}</h3>
            </div>
          </div>
          <div className="status_customer_blaclist_frame">
            <div className="type_cus me-2">
              create:
              <div className="ms-3" style={{ color: "var(--text-color)" }}>
                {dataSelected.Created ? formatDate(dataSelected.Created) : ""}
              </div>
            </div>
            <div className="type_cus">
              update:
              <div className="ms-3" style={{ color: "var(--text-color)" }}>
                {dataSelected.updated ? formatDate(dataSelected.updated) : ""}
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
                    <VoucherTabContent
                      isOpen={isOpen}
                      tab={tab.id.toString()}
                      data={detailsData}
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

export default DetailsVoucher;
