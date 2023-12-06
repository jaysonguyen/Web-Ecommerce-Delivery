import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import { insertUser, updateUSer } from "../../../services/UserService";
import toast from "react-hot-toast";
import { Dropdown } from "../../../components";

function AddStaff({ data, isCreate, isOpen, fetchStaff, fetchShipper }) {
  const [nameStaff, setNameStaff] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [des, setDes] = useState("");
  const handleClearInput = () => {
    setNameStaff("");
    setAccount("");
    setEmail("");
    setRole("");
    setPhoneNum("");
    setDes("");
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
        handleClearInput();
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
      if (checkInsert !== 200) {
        toast.error("Update failed");
      } else {
        toast.success("Insert success");
        handleClearInput();
        fetchStaff();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const roles = [
    {
      code: "3",
      content: "Staff",
    },
    {
      code: "4",
      content: "Shipper",
    },
  ];

  useEffect(() => {
    handleClearInput();
  }, [isOpen]);

  console.log("data: " + data);

  return (
    <div className="add_staff_container">
      <div className="row">
        {isCreate && (
          <div className="col col-6">
            <Input label={"Code"} placeholder={(data && data.code) || ""} />
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
        <div className="col pt-2 col-6">
          {/*<Input*/}
          {/*  onChange={(e) => setRole(e.target.value)}*/}
          {/*  label={"Role"}*/}
          {/*  value={role}*/}
          {/*  placeholder={data.roleName || ""}*/}
          {/*/>*/}
          <Dropdown
            placeholder={"Choose Role"}
            item={roles}
            width="200px"
            fontSize="14px"
            onChange={setRole}
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
        onClick={isCreate ? handleInsertStaff : handleUpdateStaff}
        className="btnAdd"
      >
        {isCreate ? "Add" : "Save"}
      </button>
    </div>
  );
}

export default AddStaff;
