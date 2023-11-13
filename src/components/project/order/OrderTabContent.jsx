import { Dropdown, Input } from "../../index";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { MyTable } from "../../template/table/MyTable/MyTable";

export const OrderTabContent = ({ data = {}, tab = "1", clearData }) => {
  const [receiverInfo, setReceiverInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const styleTitle = {
    fontSize: "30px",
    color: "var(--primary-color)",
    marginTop: "1em",
  };

  const initData = async () => {
    switch (tab) {
      case "1": {
        //receiver details
        setReceiverInfo({
          name: data.receiver ? data.receiver.name : "",
          address: data.receiver ? data.receiver.address : "",
          phone: data.receiver ? data.receiver.phone : "",
          city: data.receiver ? data.receiver.city : "",
          area: data.receiver ? data.receiver.area : "",
        });
        break;
      }
      case "2": {
        //product ìnformation
        break;
      }
      case "3": {
        // bank account
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
              value={receiverInfo.address ?? ""}
              // onChange={handleEmailChange}
              placeholder={receiverInfo.address}
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
          <button className="btnAdd btnAccount">Add new store</button>
          {/*{storeInfo.map((info, i) => (*/}
          {/*  <div className="row store_frame" key={i}>*/}
          {/*    <div className="col">*/}
          {/*      <Input placeholder={info.name} label="Name" />*/}
          {/*      <Input placeholder={info.des} label="Descript" />*/}
          {/*      <Input placeholder={info.address} label="Address" />*/}
          {/*    </div>*/}
          {/*    <div className="col">*/}
          {/*      <Input placeholder={info.phone} label="Phone" />*/}
          {/*      <Input placeholder={info.created} label="Created" />*/}
          {/*      <Input placeholder={info.updated} label="Updated" />*/}
          {/*      <button className="btnAdd btnAccount">Delete</button>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
      )}
    </>
  );
};
