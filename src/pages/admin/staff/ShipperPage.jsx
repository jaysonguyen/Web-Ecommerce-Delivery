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
import { PackageShipment } from "../../../components";
import { getOrderListByShipperCode } from "../../../services/UserService";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";

function ShipperPage(props) {
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const { userPayload } = useToken();

  const fetchData = async () => {
    try {
      const tempShipperCode = userPayload.userCode;
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
          <span>Shipper03928</span>
        </div>
      </div>
      <div className="shipper_page_body">
        <h3 className="font-weight-b">Shipment package</h3>
        <div className="shipper_page_package_container">
          {orderList &&
            orderList.map((item, index) => {
              return <PackageShipment key={index} packageInfo={item} />;
            })}
        </div>
      </div>
      <div className="shipper_page_tool_bar flex-center-center">
        <div className="tool_item">
          <span className="flex-center-center">
            <Package size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Package</p>
        </div>
        <div className="tool_item">
          <span className="flex-center-center">
            <Clock size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>History</p>
        </div>
        <div className="tool_item">
          <span className="flex-center-center">
            <ChartPieSlice size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Statistic</p>
        </div>
        <div className="tool_item">
          <span className="flex-center-center">
            <Notification size={ICON_SIZE_EXTRA_LARGE} />
          </span>
          <p>Notification</p>
        </div>
        <div className="tool_item">
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
