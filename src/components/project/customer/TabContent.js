import { Dropdown, Input } from "../../index";
import { useEffect, useState } from "react";
import {
  getStoreByUser,
  getUserById,
  updateUSer,
} from "../../../services/UserService";
import { getBankList } from "../../../services/BankService";
import toast from "react-hot-toast";

export const TabContent = ({
  nameUser,
  setNameUser,
  des,
  setDes,
  phoneNum,
  setPhoneNum,
  email,
  setEmail,
  tab = "1",
  userID = "",
  clearData,
}) => {
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
        console.log(data.data);
        setStoreInfo(data.data);
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

  const handleNameUser = (e) => {
    setNameUser(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleDesChange = (e) => {
    setDes(e.target.value);
  };

  const handleUpdateCustomer = async () => {
    try {
      const checkInsert = await updateUSer({
        fullName: nameUser || customerInfo.fullName,
        email: email || customerInfo.email,
        account: customerInfo.account,
        purpose: "nothing",
        phone: phoneNum || customerInfo.phoneNumber,
        des: des || customerInfo.des,
      });
      if (checkInsert != 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
        clearData();
      }
    } catch (error) {
      console.log(error);
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
            <Input
              onChange={handleNameUser}
              placeholder={customerInfo.fullName}
              label="Name"
            />
            <Input
              onChange={handleEmailChange}
              placeholder={customerInfo.email}
              label="Email"
            />
            <Input
              onChange={handlePhoneNumChange}
              placeholder={customerInfo.phone}
              label="Phone"
            />
            <Input
              onChange={handleDesChange}
              placeholder={customerInfo.des}
              label="Description"
            />
          </div>
          <div className="col">
            {/* div className="bank_account_info"></div> */}
            <Dropdown
              placeholder="NGUYEN VU THANH NGUYEN - 0200105062002 MB"
              label="Bank"
              item={
                bankList.length > 0 &&
                bankList.map((e) => ({ content: e.name }))
              }
              className="dropdown_bank"
            />
            <Input placeholder={customerInfo.account} label="Account" />
            <p className="changePassword_button">Change password?</p>
            <div>
              <button
                onClick={handleUpdateCustomer}
                className="btnAdd btnAccount buttonSave_info"
              >
                Save
              </button>
            </div>
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
        
        <div>
            <button className="btnAdd btnAccount">Add new store</button>
        {storeInfo.map((info,i) => (
            <div className="row store_frame" key={i}>
            <div className="col">
              <Input placeholder={info.name} label="Name" />
              <Input placeholder={info.des} label="Descript" />
              <Input placeholder={info.address} label="Address" />
              
              
            </div>
            <div className="col">
            <Input placeholder={info.phone} label="Phone" />
              <Input placeholder={info.created} label="Created" />
              <Input placeholder={info.updated} label="Updated" />
              <button className="btnAdd btnAccount">Delete</button>
            </div>
          </div>
          ))
        }
         </div>
      )}
    </>
  );
};
