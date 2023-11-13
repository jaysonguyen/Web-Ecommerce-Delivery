import React, { useEffect, useState } from "react";
import { getStoreByUser } from "../../services/UserService";
import { isAuthenticated } from "../../auth/index";
import { MyTable, Dropdown } from "../../components";
import toast from "react-hot-toast";
import AddStore from "../../components/project/store/AddStore";

function StorePage(props) {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [storeList, setStoreList] = useState([]);
  let user = isAuthenticated();

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

  const getStoreData = async () => {
    try {
      let res = await getStoreByUser(user.userID);

      if (res.status === 200) {
        setStoreList(res.data);
      } else {
        toast.error("Add your store to the list");
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getStoreData();
  }, []);

  return (
    <div className="padding-body">
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
            list={storeList}
            showCheckBox={true}
            // callback={handleButtonAction}
            // deleteCallback={handleDelete}
            hideDelete={true}
            hideDetais={true}
          />
        </>
      )}
      {isShowAdd && (
        <div className="add_employee_container">
          <AddStore showAdd={setIsShowAdd} />
        </div>
      )}
      {/*{isShowDetails && (*/}
      {/*  <DetailCustomer*/}
      {/*    closeDetail={handleCloseDialog}*/}
      {/*    userSelected={userSelected}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
}

export default StorePage;
