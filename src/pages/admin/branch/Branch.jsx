import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { deleteBranch, getBranchList } from "../../../services/BranchService";
import "../../../assets/css/Pages/branch.css";
import { CaretLeft, Plus } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import AddBranch from "../../../components/project/branch/AddBranch";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import toast from "react-hot-toast";
import tableSlice from "../../../features/table/tableSlice";
import { Dropdown, MyButton } from "../../../components/index";
import { BranchTableFromJson } from "../../../utils/modelHandle";

function Branch(props) {
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [nameBranch, setNameBranch] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [buttonType, setButtonType] = useState("Add");

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
      if (data.status === 200) {
        setBranchList([]);
        for (let i = 0; i < data.data.length; i++) {
          setBranchList((list) => [...list, BranchTableFromJson(data.data[i])]);
        }
      }
      return;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const handleClearInput = () => {
    setNameBranch("");
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

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        setIsShowAdd(true);
        setData(data);
        setButtonType("Save");
        break;
      }
      case "delete": {
        console.log(type);
        break;
      }
      default:
        break;
    }
  };

  const handleAddButton = () => {
    setIsShowAdd(true);
    setButtonType("Add");
    setData({});
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    getBranchData();
  }, [isShowAdd]);

  return (
    <div className="">
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
                  <div className="feature_of_customer ms-3">
                    <MyButton
                      prefix={<Plus size={26} color="#ffffff" weight="fill" />}
                      callback={() => setIsShowAdd(true)}
                      bgColor={"var(--primary-color)"}
                      borderRadius={"5px"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MyTable
            showCheckBox={true}
            callback={handleButtonAction}
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
            setNameBranch={setNameBranch}
            nameBranch={nameBranch}
            setDes={setDes}
            buttonType={buttonType}
            des={des}
            data={data}
          />
        </div>
      )}
    </div>
  );
}

export default Branch;
