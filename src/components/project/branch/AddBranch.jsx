import React, { useState } from "react";
import Input from "../../template/Input/Input";
import { createBranch } from "../../../services/BranchService";
function AddBranch(props) {
  const [idBranch, setIDBranch] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");

  const handleIDBranchOnChange = (e) => {
    setIDBranch(e.target.value);
  };
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
      const insert = {
        branch_id: idBranch,
        name: name,
        address: address,
        des: des,
      };
      const check = await createBranch(insert);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add_branch_container">
      <div className="row">
        <div className="col col-6">
          <Input onChange={handleIDBranchOnChange} label={"ID branch"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleNameBranchOnChange} label={"Branch name"} />
        </div>
        <div className="col col-6">
          <Input onChange={handleAddressBranchOnChange} label={"Address"} />
        </div>
        <div className="col col-6">
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
