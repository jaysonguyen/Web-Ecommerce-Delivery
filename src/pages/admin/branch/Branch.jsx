import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { getBranchList } from "../../../services/BranchService";
import "../../../assets/css/Pages/branch.css";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import AddBranch from "../../../components/project/branch/AddBranch";
import { useSelector } from "react-redux";
import { displaySelector } from "../../../selectors/displaySelector";
import toast from "react-hot-toast";
function Branch(props) {
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);

  const getBranchData = async () => {
    if (isLoading) {
      return -1;
    }
    setIsLoading(true);
    try {
      const data = await getBranchList();
      if (data != null) {
        console.log(data.data);
        setBranchList(data);
      }
      return data.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBranchData();

    return () => {
      console.log("Not thing");
    };
  }, []);


  return (
    <div className="padding-body">
      {!isShowAdd && (
        <>
          <button
            className="btnBranch btnAdd"
            onClick={() => setIsShowAdd(true)}
          >
            Add branch
          </button>
          <MyTable
            showCheckBox={true}
            title={"Branch List"}
             list={ branchList}
          />
        </>
      )}
      {isShowAdd && (
        <div className="add_branch_container">
          <div
            className="go_back_button_container"
            onClick={() => setIsShowAdd(false)}
          >
            <CaretLeft size={ICON_SIZE_BIG} />
          </div>
          <h3>Add branch</h3>
          <AddBranch />
        </div>
      )}
      
    </div>
  );
}

export default Branch;
