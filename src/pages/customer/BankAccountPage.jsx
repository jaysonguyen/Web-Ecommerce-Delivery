import React, { useEffect, useState } from "react";
import { deleteUser } from "../../services/UserService";
import { MyTable } from "../../components";
import toast from "react-hot-toast";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../utils/constraint";
import useToken from "../../hooks/useToken";
import { getBankAccountListByUser } from "../../services/BankAccountService";
import AddBankAccount from "../../components/project/bank_account/AddBankAccount";
import { BankAccountTableFromJson } from "../../utils/modelHandle";
import { deleteArea } from "../../services/AreaService";
import tableSlice from "../../features/table/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../selectors/consumerSelector";
import { deleteCustomerBank } from "../../services/BankService";

function BankAccount(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [accountList, setBankAccountList] = useState([]);
  const [accountTableList, setBankAccountTableList] = useState([]);
  const [accountSelected, setBankAccountSelected] = useState({});
  const { userPayload } = useToken();
  const dispatch = useDispatch();
  const tableData = useSelector(tableSelector);

  const handleCloseDialog = (type) => {
    switch (type) {
      case "details": {
        setIsShowDetails(false);
        break;
      }
      case "add": {
        setIsShowAdd(false);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        setBankAccountSelected(data);
        setIsShowDetails(true);
        break;
      }
      case "delete": {
        await deleteUser(data.id);
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose area to delete");
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let res = await deleteCustomerBank({
        user_id: userPayload.userID,
        bank_name: list[i].Name,
        bank_number: list[i].Number,
      });
      if (res !== 200) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    await getBankAccountData();
  };

  const getBankAccountData = async () => {
    try {
      let res = await getBankAccountListByUser(userPayload.userID);
      setBankAccountTableList([]);
      setBankAccountList([]);
      if (res.status === 200) {
        setBankAccountList(res.data);
        for (let i = 0; i < res.data.length; i++) {
          setBankAccountTableList((accountTableList) => [
            ...accountTableList,
            BankAccountTableFromJson(res.data[i]),
          ]);
        }
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getBankAccountData();
  }, [isShowDetails, isShowAdd]);

  return (
    <div className="">
      {!isShowDetails && !isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">Bank Account list </h3>
                    <p className="total_number_Cus">{accountList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your account's details.{" "}
                  </p>
                </div>
              </div>

              <div className="col-4">
                <div className="feature_of_customer">
                  <div className="option_dropdown">
                    {/*<Dropdown placeholder="Options" item={itemOptions} />*/}
                  </div>
                  <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MyTable
            list={accountTableList}
            showCheckBox={true}
            callback={handleButtonAction}
            deleteCallback={handleDelete}
            hideDetails={true}
          />
        </>
      )}
      {isShowAdd && (
        <div className="add_employee_container">
          <div
            className="go_back_button_container"
            onClick={() => setIsShowAdd(false)}
          >
            <CaretLeft size={ICON_SIZE_BIG} />
          </div>
          <AddBankAccount
            isCreate={true}
            isOpen={isShowAdd}
            handleClose={() => setIsShowAdd(false)}
          />
        </div>
      )}
      {isShowDetails && (
        <div className="add_employee_container">
          <div
            className="go_back_button_container"
            onClick={() => setIsShowDetails(false)}
          >
            <CaretLeft size={ICON_SIZE_BIG} />
          </div>
          <AddBankAccount
            isCreate={false}
            data={accountSelected}
            isOpen={isShowDetails}
            handleClose={() => setIsShowDetails(false)}
          />
        </div>
      )}
    </div>
  );
}

export default BankAccount;
