import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import { insertUser } from "../../../services/UserService";
import toast from "react-hot-toast";
import { Dropdown } from "../../../components";

function AddStaff({ isOpen, setOpen }) {
  const [code, setCode] = useState("");
  const [nameStaff, setNameStaff] = useState("");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [des, setDes] = useState("");
  const handleClearInput = () => {
    console.log("clear input");

    setCode("");
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
        code,
        fullName: nameStaff,
        account,
        email,
        password: "123456",
        role_id: role,
        phone: phoneNum,
        des,
      });
      if (checkInsert != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
        handleClearInput();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
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

  return (
    <>
      <h3>Add new staff</h3>
      <div className="add_staff_container">
        <div className="row">
          <div className="col col-6">
            <Input
              label={"Code"}
              placeholder={"Enter staff's code"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="col col-6">
            <Input
              onChange={(e) => setNameStaff(e.target.value)}
              label={"Full name"}
              value={nameStaff}
              placeholder={"Enter staff's name"}
            />
          </div>
          <div className="col col-6">
            <Input
              onChange={(e) => setAccount(e.target.value)}
              label={"Account"}
              value={account}
              placeholder={"Enter account"}
            />
          </div>
          <div className="col col-6">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              value={email}
              placeholder={"Enter email"}
            />
          </div>
          <div className="col pt-2 col-6">
            <Dropdown
              item={roles}
              label={"Role"}
              bgColor="var(--text-white)"
              onChange={(v) => setRole(v)}
              fontSize="14px"
              placeholder="Choose role"
            />
          </div>
          <div className="col col-6">
            <Input
              onChange={(e) => setPhoneNum(e.target.value)}
              label={"Phone number"}
              value={phoneNum}
              placeholder={"Enter staff's phone number"}
            />
          </div>
          <div className="col col-12">
            <Input
              value={des}
              onChange={(e) => setDes(e.target.value)}
              label={"Description"}
              placeholder={"Enter description"}
            />
          </div>
        </div>
        <button onClick={handleInsertStaff} className="btnAdd">
          Add
        </button>
      </div>
    </>
  );
}

export default AddStaff;
