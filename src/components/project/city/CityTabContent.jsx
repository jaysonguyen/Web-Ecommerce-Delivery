import { Dropdown, Input } from "../../index";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCityById,
  getCityList,
  updateCity,
} from "../../../services/CityService";
import { MyTable } from "../../template/table/MyTable/MyTable";
import { deleteArea, getAreaList } from "../../../services/AreaService";
import AddCity from "./AddCity";
import AddArea from "./AddArea";
import { deleteProductType } from "../../../services/ProductType";
import tableSlice from "../../../features/table/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { tableSelector } from "../../../selectors/consumerSelector";

export const CityTabContent = ({
  nameCity,
  setNameCity,
  des,
  setDes,
  tab = "1",
  cityID = "",
  clearData,
}) => {
  const tableData = useSelector(tableSelector);
  const dispatch = useDispatch();

  const [cityInfo, setCityInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [areaList, setAreaList] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);

  const getCityDetails = async () => {
    if (isLoading) {
      // If a request is already in progress, don't make another one
      return -1;
    }

    setIsLoading(true);
    try {
      const data = await getCityById(cityID);
      if (data != null) {
        setCityInfo(data.data);
      }
      return data;
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getAreaData = async () => {
    if (isLoading) {
      return -1;
    }

    setIsLoading(true);
    try {
      console.log(cityID);
      const data = await getAreaList(cityID);
      if (data.status === 200) {
        if (Array.isArray(data.data)) {
          setAreaList(data.data);
        }
        return data;
      } else {
        toast.error(data.data);
      }
    } catch (error) {
      // Handle the error here
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const initData = async () => {
    switch (tab) {
      case "1": {
        //city details
        // await getCityDetails();
        break;
      }
      case "2": {
        //area
        cityID !== "" && (await getAreaData());
        break;
      }
      default:
        break;
    }
  };

  const handleNameCity = (e) => {
    setNameCity(e);
  };

  const handleDesChange = (e) => {
    setDes(e);
  };

  const handleUpdateCity = async () => {
    try {
      const checkInsert = await updateCity({
        name: nameCity || cityInfo.name,
        des: des || cityInfo.des,
      });
      if (checkInsert !== 200) {
        toast.error("Update failed");
      } else {
        toast.success("Update success");
        clearData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    let list = [...tableData.selectList];
    if (list.length === 0) {
      toast.error("Choose area to delete");
      return;
    }
    for (let i = 0; i < list.length; i++) {
      let res = await deleteArea(list[i].id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
    }
    toast.success("Deleted successfully");
    dispatch(tableSlice.actions.handleSelected([]));
    cityID !== "" && (await getAreaData());
  };

  useEffect(() => {
    initData();
    console.log();
    // cityID !== "" && getAreaData();
  }, [cityID]);

  return (
    <>
      {tab === "1" && !isLoading && (
        <div className="row">
          <div className="col">
            <Input
              value={nameCity}
              placeholder={"Enter city name"}
              label="Name"
              onValue={handleNameCity}
            />
            <Input
              onValue={handleDesChange}
              value={des}
              placeholder={"Enter city description"}
              label="Description"
            />
          </div>
          <div className="col">
            <div>
              <button
                onClick={handleUpdateCity}
                className="btnAdd btnAccount buttonSave_info"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {tab === "2" && (
        <div className="">
          <MyTable
            list={areaList}
            showCheckBox={true}
            hideDetails={true}
            deleteCallback={handleDelete}
          />
        </div>
      )}
      {tab === "3" && (
        <div className="row">
          <div className="col">3</div>
          <div className="col">3</div>
        </div>
      )}
      {tab === "4" && <div></div>}
    </>
  );
};
