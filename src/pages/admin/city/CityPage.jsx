import React, { useEffect, useState } from "react";
import { MyTable } from "../../../components/template/table/MyTable/MyTable";
import { Dropdown } from "../../../components";
import "../../../assets/css/Pages/customer.css";
import { deleteCity, getCityList } from "../../../services/CityService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";
import tableSlice from "../../../features/table/tableSlice";
import DetailCity from "../../../components/project/city/DetailCity";
import AddCity from "../../../components/project/city/AddCity";
import { Drawer } from "../../../components/project/drawer/Drawer";
import { CaretLeft } from "phosphor-react";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import DetailsOrder from "../../../components/project/order/DetailsOrder";
import { OrderModel } from "../../../model/order";
import {
  CityFromJson,
  OrderItemFromJson,
  OrderTableFromJson,
} from "../../../utils/modelHandle";

function CityPage(props) {
  const [citySelected, setCitySelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const initData = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getCityList();
      if (data.status === 200) {
        if (Array.isArray(data.data)) {
          for (let i = 0; i < data.data.length; i++) {
            setCityList((cityList) => [
              ...cityList,
              new CityFromJson(data.data[i]),
            ]);
          }
        }
        return data;
      } else {
        console.log("city list: " + data);
        toast.error(data.data);
      }
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  }, [isShowAdd, isShowDetail]);

  const handleButtonAction = async (data, type) => {
    switch (type) {
      case "details": {
        await setCitySelected(data);
        await setIsShowDetail(true);
        break;
      }
      case "delete": {
        await deleteCity(data.id);
        break;
      }
      default:
        break;
    }
  };
  const handleCloseDetail = () => {
    setIsShowDetail(false);
  };
  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose item to delete");
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let res = await deleteCity(list[i].id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    initData().then((r) => r === null && toast.error("Something went wrong!"));
  };

  const itemOptions = [
    {
      content: "Export as Excel",
    },
    {
      content: "Import clients",
    },
  ];

  const detailsModal = (
    <>
      <div className="go_back_button_container">
        <CaretLeft
          onClick={() => setIsShowDetail(false)}
          size={ICON_SIZE_BIG}
        />
      </div>
      <DetailCity
        closeDetail={() => setIsShowDetail(false)}
        citySelected={citySelected}
      />
    </>
  );

  return (
    <div className="">
      {!isShowAdd && (
        <>
          <div className="header_of_customer">
            <div className="row">
              <div className="col-8">
                <div className="header_bar_left_Cus ">
                  <div className="title_total_number_Cus">
                    <h3 className="title_Cus">City list </h3>
                    <p className="total_number_Cus">{cityList.length}</p>
                  </div>
                  <p className="introduce_Cus">
                    View, add, edit and delete your city's details.{" "}
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
            list={cityList}
            showCheckBox={true}
            callback={handleButtonAction}
            deleteCallback={handleDelete}
            hideDelete={true}
          />
        </>
      )}

      <div className="w-100">
        <Drawer
          anchor="right"
          open={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          child={detailsModal}
        />
      </div>

      {isShowAdd && (
        <div className="add_employee_container">
          <AddCity showAdd={setIsShowAdd} />
        </div>
      )}
    </div>
  );
}

export default CityPage;
