import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import { insertUser, updateUSer } from "../../../services/UserService";
import toast from "react-hot-toast";
import { insertStore, updateStore } from "../../../services/StoreService";
import useToken from "../../../hooks/useToken";
import { MyButton } from "../../template/button/MyButton/MyButton";
import { MyTable } from "../../template/table/MyTable/MyTable";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import tableSlice from "../../../features/table/tableSlice";
import { JsonToString } from "../../../utils/modelHandle";

function AddStore({ data, isCreate, handleClose }) {
  const { userPayload } = useToken();
  const dispatch = useDispatch();
  const tableData = useSelector(tableSelector);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");

  const [address, setAddress] = useState([]);
  const [addressItem, setAddressItem] = useState("");

  const handleInsertStore = async () => {
    if (address.length === 0) {
      toast.error("Add address to your new store");
      return;
    }

    if (code === "") {
      toast.error("Enter your store code");
      return;
    }

    try {
      let addressList = JsonToString(address);

      const checkInsert = await insertStore({
        store_code: code,
        name,
        des,
        address: addressList,
        phone,
        state,
        user_id: userPayload.userID,
      });
      if (checkInsert !== 200) {
        toast.error("Create store failed");
      } else {
        toast.success("Create store successfully");
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateStore = async () => {
    try {
      const checkUpdate = await updateStore({
        name: name || data.name,
        des: des || data.des,
        address: address || data.address,
        phone: phone || data.phone,
        state: state || data.state,
      });
      if (checkUpdate !== 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let index = address.indexOf(list[i]);
      address.splice(index, 1);
    }
    dispatch(tableSlice.actions.handleSelected([]));
    toast.success("Deleted successfully");
  };

  //update exists data => details
  const initData = () => {
    console.log("init data");

    setCode(data.code);
    setName(data.name);
    setDes(data.des);
    setAddress(data.address);
    setPhone(data.phone);
    setState(data.state);
  };

  useEffect(() => {
    //update exists data
    !isCreate && data && initData();
  }, []);

  return (
    <div className="add_staff_container">
      <h3>{isCreate ? "Create Store" : "Store Details"}</h3>
      <div className="add_post_header_title_box mt-5">
        <p className={""}>
          Store code<span className="required">*</span>
        </p>
        {isCreate ? (
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Please enter a store code..."
          />
        ) : (
          <h3>{code}</h3>
        )}
      </div>
      <div className="row">
        {!isCreate && (
          <div className="col col-6">
            <Input label={"Code"} placeholder={(data && data.code) || ""} />
          </div>
        )}

        <div className="col col-6">
          <Input
            onChange={(e) => setName(e.target.value)}
            label={"Store's name"}
            value={name}
            placeholder={"Enter name.."}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={(e) => setPhone(e.target.value)}
            label={"Phone"}
            value={phone}
            placeholder={"Enter phone.."}
          />
        </div>
      </div>
      <div
        className="add_post_body product_info mt-4"
        // style={{ backgroundColor: "var(--bg-card-3)" }}
      >
        <div className="product_item">
          <div className="product_img"></div>
          <div className="row">
            <div className="col product_form">
              <FormInput
                value={addressItem}
                title="Address"
                isRequired={true}
                // isError={isError.title}
                onChange={(v) => setAddressItem(v.target.value)}
                placeholder="Enter address"
              />
              <MyButton
                width="100%"
                text="Add To List"
                bgColor="var(--primary-color)"
                fontColor="var(--text-white)"
                callback={() => {
                  setAddress((address) => [
                    ...address,
                    { ID: address.length, content: addressItem },
                  ]);
                  setAddressItem("");
                }}
              />
            </div>
            <div className="col">
              <MyTable
                hideToolkit={true}
                hideDetails={true}
                showCheckBox={true}
                list={address}
              />
              {tableData.selectList.length > 0 && (
                <MyButton
                  width="100%"
                  text="Remove From List"
                  bgColor="var(--color-error)"
                  fontColor="var(--text-white)"
                  callback={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={isCreate ? handleInsertStore : handleUpdateStore}
        className="btnAdd"
      >
        {isCreate ? "Create" : "Save"}
      </button>
    </div>
  );
}

const FormInput = ({
  value,
  title,
  placeholder,
  onChange,
  isRequired,
  isError,
}) => {
  return (
    <>
      <p className={isError ? "warning_empty input_title" : "input_title"}>
        {title}
        {isRequired && <span className="required">*</span>}
      </p>
      <Input
        value={value}
        className="input_summary"
        boxShadow="none"
        border="1px solid var(--border-color)"
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default AddStore;
