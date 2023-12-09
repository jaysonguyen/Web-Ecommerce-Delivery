import React, { useEffect, useState } from "react";
import { deleteUser, getStoreByUser } from "../../services/UserService";
import { isAuthenticated } from "../../auth/index";
import { MyTable, Dropdown } from "../../components";
import toast from "react-hot-toast";
import AddStore from "../../components/project/store/AddStore";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../utils/constraint";
import AddOrder from "../../components/project/order/AddOrder";
import useToken from "../../hooks/useToken";
import { StoreTableFromJson } from "../../utils/modelHandle";

function StorePage(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [storeTableList, setStoreTableList] = useState([]);
  const [storeSelected, setStoreSelected] = useState({});
  const { userPayload } = useToken();

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
        setStoreSelected(data);
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

  const getStoreData = async () => {
    setStoreTableList([]);
    setStoreList([]);
    try {
      let res = await getStoreByUser(userPayload.userID);

      if (res.status === 200) {
        setStoreList(res.data);
        for (let i = 0; i < res.data.length; i++) {
          setStoreTableList((storeTableList) => [
            ...storeTableList,
            StoreTableFromJson(res.data[i]),
          ]);
        }
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getStoreData();
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
                    <h3 className="title_Cus">Store list </h3>
                    <p className="total_number_Cus">{storeList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your store's details.{" "}
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
            list={storeTableList}
            showCheckBox={true}
            callback={handleButtonAction}
            // deleteCallback={handleDelete}
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
          <AddStore
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
          <AddStore
            isCreate={false}
            data={storeSelected}
            isOpen={isShowDetails}
            handleClose={() => setIsShowDetails(false)}
          />
        </div>
      )}
    </div>
  );
}

export default StorePage;
