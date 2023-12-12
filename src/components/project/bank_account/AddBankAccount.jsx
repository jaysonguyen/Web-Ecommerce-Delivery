import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import toast from "react-hot-toast";
import useToken from "../../../hooks/useToken";
import { MyButton } from "../../template/button/MyButton/MyButton";
import { MyTable } from "../../template/table/MyTable/MyTable";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import tableSlice from "../../../features/table/tableSlice";
import { JsonToString } from "../../../utils/modelHandle";
import { addCustomerBank, getBankList } from "../../../services/BankService";
import { Dropdown } from "../../index";

function AddBankAccount({ data = {}, isCreate, handleClose, isOpen }) {
  const { userPayload } = useToken();
  const dispatch = useDispatch();
  const tableData = useSelector(tableSelector);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [bankList, setBankList] = useState([]);

  const handleInsertAccount = async () => {
    if (accountList.length === 0) {
      toast.error("Add bank account");
      return;
    }

    try {
      for (var i = 0; i < accountList.length; i++) {
        const checkInsert = await addCustomerBank({
          user_id: userPayload.userID,
          bank_name: accountList[i].Bank,
          bank_number: accountList[i].Number,
        });
        if (checkInsert !== 200) {
          toast.error("Add account failed");
          return;
        }
      }
      toast.success("Add account successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //
  // const handleUpdateAccount = async () => {
  //   try {
  //     const checkUpdate = await updateAccount({
  //       name: name || data.name,
  //       des: des || data.des,
  //       address: address || data.address,
  //       phone: phone || data.phone,
  //       state: state || data.state,
  //     });
  //     if (checkUpdate !== 200) {
  //       toast.error("Update failed");
  //     } else {
  //       toast.success("Insert success");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchBankInfo = async () => {
    try {
      let res = await getBankList(data.ID);

      if (res.status === 200) {
        setBankList(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //update exists data => details

  useEffect(() => {
    //update exists data
    fetchBankInfo();
  }, [isOpen]);

  return (
    <div className="add_staff_container">
      <h3>{isCreate ? "Add Account" : "Account Details"}</h3>
      <div
        className="add_post_body product_info mt-4"
        // style={{ backgroundColor: "var(--bg-card-3)" }}
      >
        <div className="product_item">
          <div className="product_img"></div>
          <div className="row">
            <div className="col product_form">
              <Dropdown
                label={"Bank List"}
                item={bankList}
                placeholder={"Choose bank"}
                value={name}
                onValue={setName}
              />
              <FormInput
                value={number}
                title="Bank Number"
                isRequired={true}
                onChange={setNumber}
                placeholder="Enter account's number"
              />
              <MyButton
                width="100%"
                text="Add To List"
                bgColor="var(--primary-color)"
                fontColor="var(--text-white)"
                callback={() => {
                  setAccountList((address) => [
                    ...address,
                    { STT: address.length, Bank: name, Number: number },
                  ]);
                  setName("");
                  setNumber("");
                }}
              />
            </div>
            <div className="col">
              <MyTable
                hideToolkit={true}
                hideDetails={true}
                showCheckBox={true}
                list={accountList}
              />
              {tableData.selectList.length > 0 && (
                <MyButton
                  width="100%"
                  text="Remove From List"
                  bgColor="var(--color-error)"
                  fontColor="var(--text-white)"
                  // callback={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleInsertAccount} className="btnAdd">
        {"Create"}
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
        onChange={(v) => onChange(v.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default AddBankAccount;
