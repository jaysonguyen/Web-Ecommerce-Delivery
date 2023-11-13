import React, { useEffect, useState } from "react";
import Input from "../../template/Input/Input";
import { createBranch, updateBranch } from "../../../services/BranchService";
import toast from "react-hot-toast";
import { getCityList } from "../../../services/CityService";
import { Dropdown } from "../../index";
import { getCityDropdownList } from "../../../services/OrderService";

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
  const [cityList, setCityList] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [branchCode, setBranchCode] = useState("");

  const handleNameBranchOnChange = (e) => {
    setNameBranch(e.target.value);
  };
  const handleAddressBranchOnChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDesBranchOnChange = (e) => {
    setDes(e.target.value);
  };

  const getCityData = async () => {
    try {
      let res = await getCityDropdownList();

      if (res.status === 200) {
        setCityList(res.data);
      } else {
        toast.error("Cannot get city list");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleInsertBranch = async () => {
    try {
      console.log("city selected: ", citySelected);
      const insertInfo = {
        code: branchCode,
        name: nameBranch,
        address: address,
        des: des,
        city_code: citySelected,
      };
      const checkCreate = await createBranch(insertInfo);

      if (checkCreate !== 200) {
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
      if (checkCreate !== 200) {
        toast.error("Update failed");
      } else {
        toast.success("Update success");
        clearInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCityData();
  }, []);

  return (
    <div className="add_branch_container">
      <div className="add_post_header">
        <div className="add_post_header_title_box">
          <p className={""}>
            Branch Code<span className="required">*</span>
          </p>
          <input
            value={branchCode}
            onChange={(e) => setBranchCode(e.target.value)}
            placeholder="Please enter a branch code..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 ">
          <Input
            value={nameBranch}
            placeholder={(data && data.name) || "Branch name"}
            onChange={handleNameBranchOnChange}
            label={"Branch name"}
          />
        </div>
        <div className="col-6 ">
          <Dropdown
            placeholder="Choose city"
            label="City"
            item={cityList}
            value={citySelected}
            onChange={setCitySelected}
          />
        </div>
        <div className="col ">
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
