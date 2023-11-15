import React, { useCallback, useEffect, useState } from "react";
import CustomMultiSelect from "../../../components/template/multiselect/CustomMultiSelect/CustomMultiSelect";
import { MyButton } from "../../../components";
import "../../../assets/css/Pages/customer.css";
import { OrderList } from "../../../components/project/order/OrderList";
import { CaretLeft, Rows, SquaresFour } from "phosphor-react";
import { ButtonState } from "../../../components/template/multiselect/CustomMultiSelect/ButtonState";
import { MyTable } from "../../../components";
import {
  getActions,
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

export const OrderPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const [dataSelected, setDataSelected] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [toggle, setToggle] = useState(1);

  const [actionList, setActionList] = useState([]);
  const [orderCardList, setOrderCardList] = useState([]);
  const [orderTableList, setOrderTableList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const [actionSelected, setActionSelected] = useState("0");
  const [dayaSelected, setDaySelected] = useState(new Date());
  const [openDayDialog, setOpenDayDialog] = React.useState(false);

  const searchData = useSelector(searchSelector);
  const { userPayload } = useToken();

  const handleShowDetail = async (data) => {
    try {
      let orderCode = data["Order Code"] ?? data.order_code;
      let res = await getOrderDetails(orderCode);

      if (res.status === 200) {
        await setDataSelected(OrderDetailsFromJson(res.data));
        await setIsShowDetail(true);
      } else {
        toast.error("Cannot found order data!");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const getOrdersByAction = async () => {
    setOrderTableList([]);
    setOrderCardList([]);
    try {
      let res = await getOrderListByAction(actionSelected, userPayload.userID);
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

  const handleSearch = async () => {
    if (searchData === "") {
      return;
    }
    // setOrderCardList((orderCardList) => orderCardList.map((e) => e.receiver_name));
  };

  const handleCloseDayDialog = (day) => {
    setOpenDayDialog(false);
    setDaySelected(day);
  };

  useEffect(() => {
    getActionList().then((r) => true);
    getOrdersByAction().then((r) => true);

    return () => {
      setOrderTableList([]);
      setOrderCardList([]);
    };
  }, [toggle, actionSelected, isShowAdd, isShowDetail]);

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
      <div className="padding-body">
        {!isShowAdd && (
          <>
            <div
              className="py-2 p-4 border border-sm"
              onClick={() => setOpenDayDialog(true)}
            >
              day picked: {format(dayaSelected, "PP")}
            </div>
            <DayPickerDialog
              selectedValue={dayaSelected}
              onClose={handleCloseDayDialog}
              open={open}
            />
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
            <CustomMultiSelect
              selectList={actionList}
              selectActive={actionSelected}
              onSelected={setActionSelected}
            />
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
        {/*{isShowDetail && (*/}
        {/*  <div className="add_employee_container">*/}
        {/*    <div className="go_back_button_container">*/}
        {/*      <CaretLeft*/}
        {/*        onClick={() => setIsShowDetail(false)}*/}
        {/*        size={ICON_SIZE_BIG}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <DetailsOrder*/}
        {/*      closeDetail={handleCloseDetail}*/}
        {/*      orderSelected={dataSelected}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}

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
          onClose={() => setIsShowAdd(false)}
          child={detailsModal}
        />
      </div>
    </>
  );
};
