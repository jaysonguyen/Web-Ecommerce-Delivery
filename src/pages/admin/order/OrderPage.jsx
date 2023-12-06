import React, { useCallback, useEffect, useState } from "react";
import CustomMultiSelect from "../../../components/template/multiselect/CustomMultiSelect/CustomMultiSelect";
import { Dropdown, MyButton } from "../../../components";
import "../../../assets/css/Pages/customer.css";
import { OrderList } from "../../../components/project/order/OrderList";
import { CalendarBlank, CaretLeft, Rows, SquaresFour } from "phosphor-react";
import { ButtonState } from "../../../components/template/multiselect/CustomMultiSelect/ButtonState";
import { MyTable } from "../../../components";
import {
  getActions,
  getCityDropdownList,
  getOrderDetails,
  getOrderListByAction,
} from "../../../services/OrderService";
import {
  OrderDetailsFromJson,
  OrderItemFromJson,
  OrderTableFromJson,
} from "../../../utils/modelHandle";
import DetailsOrder from "../../../components/project/order/DetailsOrder";
import { ICON_SIZE_BIG } from "../../../utils/constraint";
import AddOrder from "../../../components/project/order/AddOrder";
import { SwipeableDrawer } from "@mui/material";
import { Drawer } from "../../../components/project/drawer/Drawer";
import { useSelector } from "react-redux";
import {
  searchSelector,
  tableSelector,
} from "../../../selectors/consumerSelector";
import toast from "react-hot-toast";
import { OrderModel } from "../../../model/order";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { DayPickerDialog } from "../../../components/template/dialog/DayPickerDialog";
import useToken from "../../../hooks/useToken";
import { getAreaDropdownList } from "../../../services/AreaService";

export const OrderPage = () => {
  const [dataSelected, setDataSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [toggle, setToggle] = useState(1);

  const [actionList, setActionList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [orderCardList, setOrderCardList] = useState([]);
  const [orderTableList, setOrderTableList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const [actionSelected, setActionSelected] = useState("0");
  const [dayBeginSelected, setDayStartSelected] = useState(new Date());
  const [dayEndSelected, setDayEndSelected] = useState(new Date());
  const [citySelected, setCitySelected] = useState("");
  const [areaSelected, setAreaSelected] = useState("");

  const searchData = useSelector(searchSelector);
  const { userPayload } = useToken();

  const handleShowDetail = async (data) => {
    try {
      let orderCode = data["Order Code"] ?? data.order_code;
      let res = await getOrderDetails(orderCode);

      if (res.status === 200) {
        setDataSelected(OrderDetailsFromJson(res.data));
        setIsShowDetail(true);
      } else {
        toast.error("Cannot found order data!");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const getOrdersByAction = async () => {
    // Format options
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    try {
      clearList();

      let res = await getOrderListByAction(actionSelected, userPayload.userID, {
        start: new Intl.DateTimeFormat("en-US", options)
          .format(dayBeginSelected)
          .replace(/\//g, "-"),
        end: new Intl.DateTimeFormat("en-US", options)
          .format(dayEndSelected)
          .replace(/\//g, "-"),
        city_code: citySelected,
        area_code: areaSelected,
      });
      if (res.status === 200) {
        //
        for (let i = 0; i < res.data.length; i++) {
          setOrderList((orderList) => [
            ...orderList,
            new OrderModel(res.data[i]),
          ]);
          setOrderCardList((orderCardList) => [
            ...orderCardList,
            OrderItemFromJson(res.data[i]),
          ]);
          setOrderTableList((orderTableList) => [
            ...orderTableList,
            OrderTableFromJson(res.data[i]),
          ]);
        }
      } else {
        toast.error("List empty");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const getActionList = async () => {
    try {
      let res = await getActions();
      if (res.status === 200) {
        setActionList(res.data);
      } else {
        toast.error("Action list empty");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const getCityList = async () => {
    try {
      let res = await getCityDropdownList();
      if (res.status === 200) {
        setCityList(res.data);
      } else {
        toast.error("City list empty");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const getAreaList = async (cityCode) => {
    try {
      let res = await getAreaDropdownList(cityCode);
      if (res.status === 200) {
        setAreaList(res.data);
      } else {
        toast.error("Area list empty");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const handleSearch = async () => {
    if (searchData === "") {
      return;
    }
    // setOrderCardList((orderCardList) => orderCardList.map((e) => e.receiver_name));
  };

  const handleCloseDayStart = (day) => {
    if (day > dayEndSelected) {
      toast.error("Please select date start less than date end");
    } else {
      setDayStartSelected(day);
      clearList();
      getOrdersByAction().then((r) => true);
    }
  };

  const handleCloseDayEnd = (day) => {
    if (day < dayBeginSelected) {
      toast.error("Please select date end greater than date start");
    } else {
      setDayEndSelected(day);
      clearList();
      getOrdersByAction().then((r) => true);
    }
  };

  const clearList = () => {
    setOrderTableList([]);
    setOrderCardList([]);
  };

  useEffect(() => {
    clearList();
    getActionList().then((r) => true);
    getOrdersByAction().then((r) => true);
    return () => {
      clearList();
    };
  }, [toggle, actionSelected, isShowAdd, isShowDetail]);

  useEffect(() => {
    getCityList().then((r) => true);
  }, []);

  const detailsModal = (
    <>
      <div className="go_back_button_container">
        <CaretLeft
          onClick={() => setIsShowDetail(false)}
          size={ICON_SIZE_BIG}
        />
      </div>
      <DetailsOrder
        closeDetail={() => setIsShowDetail(false)}
        orderSelected={dataSelected}
      />
    </>
  );

  return (
    <>
      <div className="">
        {!isShowAdd && (
          <>
            <div className="title_total_number_table">
              <h3 className="title_table">Order List </h3>
              <p className="total_number_table">{orderCardList.length}</p>
              <div className="ms-2">
                <MyButton text="Add" callback={() => setIsShowAdd(true)} />
              </div>
              <div className="ms-auto">
                <ButtonState
                  prefix={<Rows size={18} />}
                  hoverColor="var(--tab-color)"
                  bgColor="var(--text-white)"
                  borderColor="var(--tab-color)"
                  fontColor="var(--tab-color)"
                  callback={() => {
                    setToggle(1);
                    setOrderTableList([]);
                  }}
                  selected={toggle === 1}
                  isCount={false}
                  borderRadius={"5px"}
                />
                <ButtonState
                  prefix={<SquaresFour size={18} />}
                  hoverColor="var(--tab-color)"
                  bgColor="var(--text-white)"
                  borderColor="var(--tab-color)"
                  fontColor="var(--tab-color)"
                  callback={() => {
                    setToggle(2);
                    setOrderCardList([]);
                  }}
                  selected={toggle === 2}
                  isCount={false}
                  borderRadius={"5px"}
                />
              </div>
            </div>
            {/* SORT BY DATE  */}
            <div className="d-flex gap-3 align-items-center">
              Date start:
              <DayPickerDialog
                selectedValue={dayBeginSelected}
                onClose={handleCloseDayStart}
              />
              Date end:
              <DayPickerDialog
                selectedValue={dayEndSelected}
                onClose={handleCloseDayEnd}
              />
            </div>
            {/* SORT BY CITY AND AREA  */}
            <div className="d-flex gap-5 mt-2 align-items-center">
              City:
              <Dropdown
                placeholder={"Choose City"}
                item={cityList}
                width="200px"
                fontSize="14px"
                onChange={setCitySelected}
                onValue={getAreaList}
              />
              Area:
              <Dropdown
                placeholder={"Choose Area"}
                item={areaList}
                width="200px"
                fontSize="14px"
                onChange={setAreaSelected}
              />
            </div>
            <div className="my-2">
              <CustomMultiSelect
                selectList={actionList}
                selectActive={actionSelected}
                onSelected={setActionSelected}
              />
            </div>

            {toggle === 1 ? (
              <MyTable
                list={orderTableList}
                showCheckBox={true}
                callback={handleShowDetail}
                // actionsElement={<OrderButtons data={rowData} />}
              />
            ) : (
              <OrderList data={orderCardList} />
            )}
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
            <AddOrder
              handleClose={() => setIsShowAdd(false)}
              orderSelected={dataSelected}
            />
          </div>
        )}
      </div>
      <div className="w-100">
        <Drawer
          anchor="right"
          open={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          child={detailsModal}
        />
      </div>
    </>
  );
};
