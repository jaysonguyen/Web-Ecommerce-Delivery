import { Dropdown, Input } from "../../index";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCityById,
  getCityList,
  updateCity,
} from "../../../services/CityService";
import { MyTable } from "../../template/table/MyTable/MyTable";
import { getAreaList } from "../../../services/AreaService";
import AddCity from "./AddCity";
import AddArea from "./AddArea";

export const CityTabContent = ({
  nameCity,
  setNameCity,
  des,
  setDes,
  tab = "1",
  cityID = "",
  clearData,
}) => {
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
        await getCityDetails();
        break;
      }
      case "2": {
        //area
        getAreaData();
        break;
      }
      default:
        break;
    }
  };

  const handleNameCity = (e) => {
    setNameCity(e.target.value);
  };

  const handleDesChange = (e) => {
    setDes(e.target.value);
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

  useEffect(() => {
    initData();
    getAreaData();
  }, [isShowAdd]);

  return (
    <>
      {tab === "1" && !isLoading && (
        <div className="row">
          <div className="col">
            <Input placeholder={nameCity} label="Name" />
            <Input
              onChange={handleDesChange}
              placeholder={des}
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
          {!isShowAdd && (
            <>
              <button className="btnAdd" onClick={() => setIsShowAdd(true)}>
                Add
              </button>
              <MyTable list={areaList} showCheckBox={true} hideDetails={true} />
            </>
          )}
          {isShowAdd && (
            <div className="add_employee_container">
              <AddArea showAdd={setIsShowAdd} cityId={cityID} />
            </div>
          )}
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
