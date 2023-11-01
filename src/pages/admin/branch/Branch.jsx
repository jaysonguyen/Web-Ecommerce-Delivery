import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { deleteBranch, getBranchList } from "../../../services/BranchService";
import "../../../assets/css/Pages/branch.css";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import AddBranch from "../../../components/project/branch/AddBranch";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import { deleteUser } from "../../../services/UserService";
import toast from "react-hot-toast";
import tableSlice from "../../../features/table/tableSlice";
import { Dropdown } from "../../../components";

function Branch(props) {
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const itemOptions = [
    {
      content: "Export as Excel",
    },
    {
      content: "Import clients",
    },
  ];

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
      return;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const handleClearInput = () => {
    setName("");
    setAddress("");
    setDes("");
  };

  const handleDisplayInsertBranch = () => {
    setIsShowAdd(false);
    getBranchData();
    handleClearInput();
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let res = await deleteBranch(list[i].branch_id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    getBranchData();
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    getBranchData();
  }, [isShowAdd]);

  return (
    <div className="padding-body">
      {!isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Branch list </h3>
                    <p className="total_number_Cus">{branchList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your branch's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <div className="option_dropdown">
                    <Dropdown placeholder="Options" item={itemOptions} />
                  </div>
                  <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MyTable
            showCheckBox={true}
            list={branchList}
            deleteCallback={handleDelete}
            hideDetails={true}
          />
        </>
      )}
      {isShowAdd && (
        <div className="add_branch_container">
          <div
            className="go_back_button_container"
            onClick={handleDisplayInsertBranch}
          >
            <CaretLeft size={ICON_SIZE_BIG} />
          </div>
          <h3>Add branch</h3>
          <AddBranch
            clearInput={handleDisplayInsertBranch}
            setAddress={setAddress}
            address={address}
            setName={setName}
            name={name}
            setDes={setDes}
            des={des}
          />
        </div>
      )}
    </div>
  );
}

export default Branch;
