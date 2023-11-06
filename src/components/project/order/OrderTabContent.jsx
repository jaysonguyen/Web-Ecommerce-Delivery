import { Dropdown, Input } from "../../index";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

export const OrderTabContent = ({
  // nameUser,
  // setNameUser,
  // des,
  // setDes,
  // phoneNum,
  // setPhoneNum,
  // email,
  // setEmail,
  data = {},
  tab = "1",
  clearData,
}) => {
  const [receiverInfo, setReceiverInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const initData = async () => {
    switch (tab) {
      case "1": {
        //receiver details
        setReceiverInfo({
          name: data.receiver,
          address: data.address,
          city: data.city_name,
        });
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
      default:
        break;
    }
  };

  // const handleNameUser = (e) => {
  //   setNameUser(e.target.value);
  // };
  //
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };
  //
  // const handlePhoneNumChange = (e) => {
  //   setPhoneNum(e.target.value);
  // };
  //
  // const handleDesChange = (e) => {
  //   setDes(e.target.value);
  // };

  // const handleUpdateCustomer = async () => {
  //   try {
  //     const checkInsert = await updateUSer({
  //       fullName: nameUser || receiverInfo.fullName,
  //       email: email || receiverInfo.email,
  //       account: receiverInfo.account,
  //       purpose: "nothing",
  //       phone: phoneNum || receiverInfo.phoneNumber,
  //       des: des || receiverInfo.des,
  //     });
  //     if (checkInsert != 200) {
  //       toast.error("Update failed");
  //     } else {
  //       toast.success("Insert success");
  //       clearData();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              value={receiverInfo.name ?? ""}
              // onChange={handleNameUser}
              placeholder={receiverInfo.name}
              label="Receiver Name"
            />
            <Input
              value={receiverInfo.address ?? ""}
              // onChange={handleEmailChange}
              placeholder={receiverInfo.address}
              label="Address"
            />
            <Input
              value={receiverInfo.city ?? ""}
              // onChange={handlePhoneNumChange}
              placeholder={receiverInfo.city}
              label="City"
            />
            <Input
              value={receiverInfo.des ?? ""}
              // onChange={handleDesChange}
              placeholder={receiverInfo.des ?? ""}
              label="Description"
            />
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
