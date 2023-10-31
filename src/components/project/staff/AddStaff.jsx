import React, { useState } from "react";
import Input from "../../template/Input/Input";
import DropDown from "../../Dropdown/DropDown";
import { insertUser } from "../../../services/UserService";
import toast from "react-hot-toast";
import { HttpStatusCode } from "axios";

function AddStaff(props) {
  const [nameStaff, setNameStaff] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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

  const handleInsertStaff = async () => {
    try {
      const insertInfor = {
        name: nameStaff,
        account: account,
        email: email,
        role: role,
      };

      const checkInsert = await insertUser(insertInfor);
      console.log(checkInsert);
      if (checkInsert != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
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
      </div>
      <button onClick={handleInsertStaff} className="btnAdd">
        Add
      </button>
    </div>
  );
}

export default AddStaff;
