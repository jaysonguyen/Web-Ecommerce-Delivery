import React, { useState } from "react";
import Input from "../../template/Input/Input";
import { createBranch, updateBranch } from "../../../services/BranchService";
import toast from "react-hot-toast";

function AddBranch({
  clearInput,
  setAddress,
  setDes,
  setNameBranch,
  nameBranch,
  address,
  des,
  buttonType,
  data,
}) {
  const handleNameBranchOnChange = (e) => {
    setNameBranch(e.target.value);
  };
  const handleAddressBranchOnChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDesBranchOnChange = (e) => {
    setDes(e.target.value);
  };

  const handleInsertBranch = async () => {
    try {
      const inserInfo = {
        name: nameBranch,
        address: address,
        des: des,
      };
      const checkCreate = await createBranch(inserInfo);

      if (checkCreate != 200) {
        toast.error("insert failed");
      } else {
        toast.success("Insert success");
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBranch = async () => {
    try {
      const checkCreate = await updateBranch({
        branch_id: data.branch_id,
        name: nameBranch || data.name,
        address: address || data.address,
        des: des || data.des,
      });
      if (checkCreate != 200) {
        toast.error("Update failed");
      } else {
        toast.success("Update success");
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_branch_container">
      <div className="row">
        <div className="col col-6">
          <Input
            value={nameBranch}
            placeholder={(data && data.name) || "Branch name"}
            onChange={handleNameBranchOnChange}
            label={"Branch name"}
          />
        </div>
        <div className="col col-6">
          <Input
            value={address}
            placeholder={(data && data.address) || "Address"}
            onChange={handleAddressBranchOnChange}
            label={"Address"}
          />
        </div>
        <div className="col col-12">
          <Input
            value={des}
            placeholder={(data && data.des) || "Des"}
            onChange={handleDesBranchOnChange}
            label={"Description"}
          />
        </div>
      </div>
      <button
        onClick={buttonType === "Add" ? handleInsertBranch : handleUpdateBranch}
        className="btnAdd"
      >
        {buttonType}
      </button>
    </div>
  );
}

export default AddBranch;
