import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import displaySlice from "../../../features/Display/displaySlice";
import {
  ChartPieSlice,
  Clock,
  MapPin,
  Notification,
  Package,
  User,
} from "phosphor-react";
import {
  ICON_SIZE_BIG,
  ICON_SIZE_EXTRA_LARGE,
  ICON_SIZE_SMALL,
} from "../../../utils/constraint";

//css
import "../../../assets/css/Pages/shipper.css";
import { PackageShipment, ShipmentStatistic } from "../../../components";
import { getOrderListByShipperCode } from "../../../services/UserService";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";

function ShipperPage(props) {
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const { userPayload } = useToken();
  const [showTag, setShowTag] = useState([true, false, false]);
  const shipperCode = userPayload.userCode;
  const shipperID = userPayload.userID;

  const fetchData = async () => {
    try {
      const tempShipperCode = userPayload.userID;
      const listOrder = await getOrderListByShipperCode(tempShipperCode);
      if (listOrder.status === 200) {
        setOrderList(listOrder.data);
      } else {
        toast.error("Connection error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowTag = (pos) => {
    setShowTag([false, false, false]);
    setShowTag((prev) => [...prev, (prev[pos] = true)]);
  };

  useEffect(() => {
    fetchData();
    dispatch(displaySlice.actions.displaySidebar(false));
    dispatch(displaySlice.actions.displayHeader(false));
  }, []);
  return (
    <div className="shipper_page">
      <div className="shipper_page_header flex-center-between">
        <div>
          <span>
            <MapPin size={ICON_SIZE_BIG} weight="fill" />
          </span>
          <span className="shipping_location">Thủ Đức</span>
        </div>
        <div className="shipper_page_header flex-center-center">
          <span className="shipper_page_background flex-center-center">S</span>
          <span>{shipperCode}</span>
        </div>
      </div>
      <div className="shipper_page_body">
        {showTag[0] == true && (
          <>
            <h3 className="font-weight-b">Shipment package</h3>
            <div className="shipper_page_package_container">
              {orderList &&
                orderList
                  .filter(
                    (item) =>
                      item?.orders?.action_code != "7" &&
                      item?.orders?.action_code != "5"
                  )
                  .map((item, index) => (
                    <PackageShipment key={index} packageInfo={item} />
                  ))}
            </div>
          </>
        )}
        {showTag[1] == true && (
          <div>
            <h3 className="font-weight-b">Shipment statistic</h3>
            <ShipmentStatistic orderList={orderList} shipperID={shipperID} />
          </div>
        )}
        {showTag[2] == true && (
          <>
            <h3 className="font-weight-b">History shipment</h3>
            {orderList &&
              orderList
                .filter(
                  (item) =>
                    item?.orders?.action_code === "7" ||
                    item?.orders?.action_code === "5"
                )
                .map((item, index) => (
                  <PackageShipment key={index} packageInfo={item} />
                ))}
          </>
        )}
      </div>
      <div className="shipper_page_tool_bar flex-center-center">
        <div
          onClick={() => handleShowTag(0)}
          className={showTag[0] ? "tool_item active" : "tool_item"}
        >
          <span className="flex-center-center">
            <Package size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Package</p>
        </div>
        <div
          onClick={() => handleShowTag(2)}
          className={showTag[2] ? "tool_item active" : "tool_item"}
        >
          <span className="flex-center-center">
            <Clock size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>History</p>
        </div>
        <div
          onClick={() => handleShowTag(1)}
          className={showTag[1] ? "tool_item active" : "tool_item"}
        >
          <span className="flex-center-center">
            <ChartPieSlice size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Statistic</p>
        </div>
        <div
          onClick={() => handleShowTag(4)}
          className={showTag[4] ? "tool_item active" : "tool_item"}
        >
          <span className="flex-center-center">
            <User size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}

export default ShipperPage;
