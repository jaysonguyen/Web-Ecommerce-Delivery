import React, { useEffect, useState } from "react";
import "../../../assets/css/Pages/customer.css";
import { DotsThreeVertical, Phone, Warning, CaretLeft } from "phosphor-react";
import { CityTabContent } from "./CityTabContent";
import { MyTable } from "../../template/table/MyTable/MyTable";
import AddArea from "./AddArea";

function DetailCity({ closeDetail, citySelected }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [isShowAction, setIsShowAction] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [tabData, setTabData] = useState({});
  const [nameCity, setNameCity] = useState("");
  const [des, setDes] = useState("");

  const handleShowAction = () => {
    const flag = !isShowAction;
    setIsShowAction(flag);
  };

  const tabs = [
    {
      id: 1,
      tabTitle: "Details",
      title: "Client details",
    },
    {
      id: 2,
      tabTitle: "Area",
      title: "Orders list",
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
    clearInput();
    closeDetail();
  };

  const clearInput = () => {
    setNameCity("");
    setDes("");
    setIsShowAdd(false);
  };

  useEffect(() => {
    clearInput();
  }, [citySelected]);

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
              <h3>{citySelected.code}</h3>
              <div className="email_phone_frame">
                <a href="#">{citySelected.name}</a>
              </div>
            </div>
          </div>
          <div className="status_customer_blaclist_frame">
            <div className="type_cus">{citySelected.name}</div>
            <div className="blacklist_frame ">
              <Warning size={20} />
            </div>
          </div>

          <div className="action_cus_frame">
            <button className="dotthree_icon" onClick={handleShowAction}>
              <DotsThreeVertical size={32} />
            </button>
            <div>
              <button className="btn_Order" onClick={() => setIsShowAdd(true)}>
                Add Area
              </button>
            </div>
          </div>
          {isShowAdd ? (
            <div className="add_employee_container">
              <AddArea showAdd={setIsShowAdd} cityId={citySelected.id} />
            </div>
          ) : (
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
                      <CityTabContent
                        nameCity={citySelected.name}
                        setNameCity={setNameCity}
                        des={citySelected.des}
                        setDes={setDes}
                        tab={tab.id.toString()}
                        cityID={citySelected.id}
                        clearData={handleClearInput}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailCity;
