import { Dropdown, Input } from "../../index";
import { useEffect, useState } from "react";
import { getStoreByUser, getUserById } from "../../../services/UserService";
import { getBankList } from "../../../services/BankService";

export const TabContent = ({ tab = "1", userID = "" }) => {
  const [bankList, setBankList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [storeInfo, setStoreInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBankData = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getBankList();
      if (data != null) {
        setBankList(data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerDetails = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getUserById(userID);
      if (data != null) {
        setCustomerInfo(data.data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getStoreList = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getStoreByUser(userID);
      if (data != null) {
        setStoreInfo(data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const initData = async () => {
    switch (tab) {
      case "1": {
        //customer details
        await getCustomerDetails();
        await getBankData();
        // console.log(bankList.map((e) => ({ content: e.name })));
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
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    initData();
    console.log("fetch data tab");
  }, [tab]);

  return (
    <>
      {tab === "1" && !isLoading && (
        <div className="row">
          <div className="col">
            <Input placeholder={customerInfo.fullName} label="Name" />
            <Input placeholder={customerInfo.email} label="Email" />
            <Input placeholder={customerInfo.phone} label="Phone" />
            <Input placeholder={customerInfo.des} label="Description" />
          </div>
          <div className="col">
            <div className="bank_account_info">
              NGUYEN VU THANH NGUYEN - 0200105062002 MB
            </div>
            <Dropdown
              placeholder="Choose a bank"
              label="Bank"
              item={
                bankList.length > 0 &&
                bankList.map((e) => ({ content: e.name }))
              }
              className="dropdown_bank"
            />
            <Input placeholder={customerInfo.account} label="Account" />
            <Input placeholder={customerInfo.created} label="Created" />
            <Input placeholder={customerInfo.updated} label="Updated" />
            <button className="btnAdd btnAccount">Add new acount</button>
          </div>
        </div>
      )}
      {tab === "2" && (
        <div className="row">
          <div className="col">2</div>
          <div className="col">2</div>
        </div>
      )}
      {tab === "3" && (
        <div className="row">
          <div className="col">3</div>
          <div className="col">3</div>
        </div>
      )}
      {tab === "4" && (
        <div className="row">
          <div className="col">
            <Input placeholder={storeInfo.name} label="Name" />
            <Input placeholder={storeInfo.des} label="Descript" />
            <Input placeholder={storeInfo.address} label="Address" />
            <Input placeholder={storeInfo.phone} label="Phone" />
            <Input placeholder="" label="Total sales" />
          </div>
          <div className="col">
            <Input placeholder={storeInfo.created} label="Created" />
            <Input placeholder={storeInfo.updated} label="Updated" />
            <button className="btnAdd btnAccount">Add new store</button>
          </div>
        </div>
      )}
    </>
  );
};
