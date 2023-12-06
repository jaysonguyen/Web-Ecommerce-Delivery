import { Dropdown, Input } from "../../index";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { MyTable } from "../../template/table/MyTable/MyTable";
import {
  getHistoryOrderList,
  getHítoryOrderList,
} from "../../../services/OrderService";
import { OrderModel } from "../../../model/order";
import {
  HistoryOrderFromJson,
  OrderItemFromJson,
  OrderTableFromJson,
} from "../../../utils/modelHandle";
import { getVoucherHistoryListByOrder } from "../../../services/VoucherService";

export const OrderTabContent = ({ data = {}, tab = "1", clearData }) => {
  const [receiverInfo, setReceiverInfo] = useState({});
  const [historyList, setHistoryList] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const styleTitle = {
    fontSize: "30px",
    color: "var(--primary-color)",
    marginTop: "1em",
  };

  const getHistoryList = async () => {
    try {
      let res = await getHistoryOrderList(data.order_id);
      if (res.status === 200) {
        setHistoryList([]);
        for (let i = 0; i < res.data.length; i++) {
          setHistoryList((historyList) => [
            ...historyList,
            new HistoryOrderFromJson(res.data[i], i),
          ]);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const getVoucherList = async () => {
    try {
      let res = await getVoucherHistoryListByOrder(data.order_id);
      if (res.status === 200) {
        setVoucherList([]);
        for (let i = 0; i < res.data.length; i++) {
          setVoucherList((historyList) => [
            ...historyList,
            new HistoryOrderFromJson(res.data[i], i),
          ]);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const initData = async () => {
    switch (tab) {
      case "1": {
        console.log(data);
        //receiver details
        setReceiverInfo({
          name: data.receiver ? data.receiver.name : "",
          address: data ? data.address : "",
          phone: data.receiver ? data.receiver.phone : "",
          city: data ? data.city_name : "",
          area: data ? data.area_name : "",
        });
        break;
      }
      case "2": {
        //product ìnformation
        break;
      }
      case "3": {
        await getVoucherList();
        break;
      }
      case "4": {
        await getHistoryList();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    initData();
  }, [tab]);

  return (
    <>
      {tab === "1" && !isLoading && (
        <div className="row">
          <div className="col">
            <Input
              value={receiverInfo.name ?? ""}
              // onChange={handleNameUser}
              placeholder={receiverInfo.name}
              label="Receiver Name"
            />
            <Input
              value={receiverInfo.phone ?? ""}
              // onChange={handlePhoneNumChange}
              placeholder={receiverInfo.phone}
              label="Phone"
            />
            <Input
              value={
                receiverInfo.address
                  ? receiverInfo.address.ap_number +
                    ", " +
                    receiverInfo.address.street +
                    ", " +
                    receiverInfo.address.ward
                  : ""
              }
              // onChange={handleEmailChange}
              // placeholder={receiverInfo.address}
              label="Address"
            />
          </div>
          <div className="col">
            <Input
              value={receiverInfo.city ?? ""}
              // onChange={handleNameUser}
              placeholder={receiverInfo.city}
              label="City"
            />
            <Input
              value={receiverInfo.area ?? ""}
              // onChange={handlePhoneNumChange}
              placeholder={receiverInfo.area}
              label="Area"
            />
          </div>
        </div>
      )}
      {tab === "2" && (
        <>
          <p style={styleTitle}>Product</p>
          <MyTable hideToolkit={true} hideDetails={true} list={data.product} />
          <p style={styleTitle}>Package</p>
          <div className="row">
            <div className="col-3">
              <Input
                value={data.package_order.total_weight ?? ""}
                label="Total Weight"
              />
            </div>
            <div className="col">
              <Input value={data.package_order.length ?? ""} label="Length" />
            </div>
            <div className="col">
              <Input value={data.package_order.height ?? ""} label="Height" />
            </div>
            <div className="col">
              <Input value={data.package_order.width ?? ""} label="Width" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Input value={data.package_order.cod ?? ""} label="COD" />
            </div>
            <div className="col">
              <Input value={data.package_order.cost ?? ""} label="Cost" />
            </div>
            <div className="col">
              <Input
                value={data.package_order.cost_failed ?? ""}
                label="Cost Failed"
              />
            </div>
          </div>
        </>
      )}
      {tab === "3" && (
        <div>
          <MyTable list={voucherList} hideToolkit={true} hideDetails={true} />
        </div>
      )}
      {tab === "4" && (
        <div>
          <MyTable list={historyList} hideToolkit={true} hideDetails={true} />
        </div>
      )}
    </>
  );
};
