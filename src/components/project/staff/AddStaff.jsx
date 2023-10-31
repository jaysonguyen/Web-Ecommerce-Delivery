import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import { insertUser, updateUSer } from "../../../services/UserService";
import toast from "react-hot-toast";

function AddStaff({
  setNameStaff,
  nameStaff,
  setButtonType,
  setAccount,
  account,
  setEmail,
  email,
  setRole,
  role,
  phoneNum,
  setPhoneNum,
  des,
  setDes,
  data,
  buttonType,
  clearInput,
}) {
  const handleNameStaffOnChange = (e) => {
    setNameStaff(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleDesChange = (e) => {
    setDes(e.target.value);
  };

  const handleInsertStaff = async () => {
    try {
      const checkInsert = await insertUser({
        fullName: nameStaff,
        account,
        email,
        role,
        phone: phoneNum,
        des,
      });
      if (checkInsert != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStaff = async () => {
    try {
      console.log(
        "consolt: " + data.fullName,
        data.account,
        data.email,
        data.role,
        data.phoneNum,
        data.des
      );
      const checkInsert = await updateUSer(
        data.account,
        nameStaff || data.fullName,
        email || data.email,
        phoneNum || data.phoneNumber,
        des || data.des
      );
      if (checkInsert != 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_staff_container">
      <div className="row">
        <div className="col col-6">
          <Input
            onChange={handleNameStaffOnChange}
            label={"Full name"}
            placeholder={data.fullName || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={handleAccountChange}
            label={"Account"}
            placeholder={data.account || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={handleEmailChange}
            label={"Email"}
            placeholder={data.email || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={handleRoleChange}
            label={"Role"}
            placeholder={data.roleName || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={handlePhoneNumChange}
            label={"Phone number"}
            placeholder={data.phoneNumber || ""}
          />
        </div>
        <div className="col col-12">
          <Input
            onChange={handleDesChange}
            label={"Description"}
            placeholder={data.des || ""}
          />
        </div>
      </div>
      <button
        onClick={buttonType == "Add" ? handleInsertStaff : handleUpdateStaff}
        className="btnAdd"
      >
        {buttonType}
      </button>
    </div>
  );
}

export default AddStaff;