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
  fetchStaff,
  fetchShipper,
}) {
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
        fetchStaff();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStaff = async () => {
    try {
      const checkInsert = await updateUSer({
        fullName: nameStaff || data.fullName,
        email: email || data.email,
        account: data.account,
        purpose: "nothing",
        phone: phoneNum || data.phoneNumber,
        des: des || data.des,
      });
      if (checkInsert != 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
        clearInput();
        fetchStaff();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_staff_container">
      <div className="row">
        {buttonType === "Save" && (
          <div className="col col-6">
            <Input
              label={"Code"}
              placeholder={data && data.code || ""}
            />
          </div>
        )}

        <div className="col col-6">
          <Input
            onChange={(e) => setNameStaff(e.target.value)}
            label={"Full name"}
            value={nameStaff}
            placeholder={data.fullName || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={(e) => setAccount(e.target.value)}
            label={"Account"}
            value={account}
            placeholder={data.account || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            value={email}
            placeholder={data.email || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={(e) => setRole(e.target.value)}
            label={"Role"}
            value={role}
            placeholder={data.roleName || ""}
          />
        </div>
        <div className="col col-6">
          <Input
            onChange={(e) => setPhoneNum(e.target.value)}
            label={"Phone number"}
            value={phoneNum}
            placeholder={data.phoneNumber || ""}
          />
        </div>
        <div className="col col-12">
          <Input
            value={des}
            onChange={(e) => setDes(e.target.value)}
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
