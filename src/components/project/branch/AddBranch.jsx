import React, { useState } from "react";
import Input from "../../template/Input/Input";
import { createBranch } from "../../../services/BranchService";
import toast from "react-hot-toast";

function AddBranch(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");

 
  const handleNameBranchOnChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressBranchOnChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDesBranchOnChange = (e) => {
    setDes(e.target.value);
  };

  const handleInsertBranch = async () => {
    try {
      const insertInfor = {
        name: name,
        address: address,
        des: des,
      };
      const checkCreate = await createBranch(insertInfor);
      console.log(checkCreate);
      if (checkCreate != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div className="add_branch_container">
      <div className="row">
        
        <div className="col col-6">
          <Input onChange={handleNameBranchOnChange} label={"Branch name"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleAddressBranchOnChange} label={"Address"} />
        </div>
        <div className="col col-12">
          <Input onChange={handleDesBranchOnChange} label={"Description"} />
        </div>
      </div>
      <button onClick={handleInsertBranch} className="btnAdd">
        Add
      </button>
    </div>
  );
}

export default AddBranch;
