import React, { useState } from "react";
import Input from "../../template/Input/Input";
import { insertUser } from "../../../services/UserService";
import toast from "react-hot-toast";

function AddStaff({
  setNameStaff,
  nameStaff,
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
      const checkInsert = await insertUser(
        nameStaff,
        account,
        email,
        role,
        phoneNum,
        des
      );
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

  return (
    <div className="add_staff_container">
      <div className="row">
        <div className="col col-6">
          <Input onChange={handleNameStaffOnChange} label={"Full name"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleAccountChange} label={"Account"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleEmailChange} label={"Email"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleRoleChange} label={"Role"} />
        </div>
        <div className="col col-6">
          <Input onChange={handlePhoneNumChange} label={"Phone number"} />
        </div>
        <div className="col col-12">
          <Input onChange={handleDesChange} label={"Description"} />
        </div>
      </div>
      <button onClick={handleInsertStaff} className="btnAdd">
        Add
      </button>
    </div>
  );
}

export default AddStaff;
