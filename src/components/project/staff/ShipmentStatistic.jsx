import { ca } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { getShipperPointAmount } from "../../../services/UserService";

function ShipmentStatistic({ orderList, shipperID }) {
  const [shipperPointAndAmount, setShipperPointAndAmount] = useState([]);
  const dashBoardInfo = {
    delivered:
      orderList &&
      orderList.filter((item) => item.orders.action_code == 7).length,
    reject:
      orderList &&
      orderList.filter((item) => item.orders.action_code == 5).length,
    Point: 0,
    total: orderList && orderList.length,
  };

  const fetchShipperPointAndAmount = async () => {
    try {
      const getUser = await getShipperPointAmount(shipperID);
      if (getUser) {
        setShipperPointAndAmount(getUser.data);
        console.log(getUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShipperPointAndAmount();
  }, []);

  return (
    <div className="Statistic_container">
      <div className="shipment_dashboard">
        <div className="shipment_dashboard_item">
          <caption>Total package</caption>
          <span>{dashBoardInfo.total}</span>
        </div>
        <div className="shipment_dashboard_item">
          <caption>Delivered</caption>
          <span>{dashBoardInfo?.delivered}</span>
        </div>
        <div className="shipment_dashboard_item">
          <caption>Reject</caption>
          <span>{dashBoardInfo?.reject}</span>
        </div>
        <div className="shipment_dashboard_item">
          <caption>Point</caption>
          <span>{shipperPointAndAmount && shipperPointAndAmount[0]}</span>
        </div>
        <div className="shipment_dashboard_item width-100">
          <caption>Total amount</caption>
          <span>
            {shipperPointAndAmount != 0 &&
              shipperPointAndAmount[1]
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            &#8363;
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShipmentStatistic;
