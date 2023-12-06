import { Dropdown, Input, MyButton } from "../../index";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { MyTable } from "../../template/table/MyTable/MyTable";
import {
  HistoryOrderFromJson,
  HistoryVoucherFromJson,
} from "../../../utils/modelHandle";
import {
  getVoucherById,
  getVoucherHistoryListByVoucher,
  updateVoucher,
} from "../../../services/VoucherService";

export const VoucherTabContent = ({ data = {}, tab = "1", isOpen }) => {
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsData, setDetailsData] = useState({});

  const [name, setName] = useState(data.name ?? "");
  const [cost, setCost] = useState(data.cost ?? "");
  const [period, setPeriod] = useState(data.period ?? "");
  const [quantity, setQuantity] = useState(data.quantity ?? "");
  const [points, setPoints] = useState(data.points ?? "");
  const [status, setStatus] = useState(data.status ?? "");

  const handleUpdateDetails = async () => {
    try {
      let res = await updateVoucher({
        voucherId: data.voucher_id,
        name,
        cost,
        period,
        quantity,
        points,
        status,
      });

      if (res === 200) {
        toast.success("Updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };

  const fetchDataDetail = async () => {
    try {
      let res = await getVoucherById(data.voucher_id);

      if (res.status === 200) {
        setDetailsData(res.data);

        setName(res.data.name);
        setCost(res.data.cost);
        setPeriod(res.data.period);
        setQuantity(res.data.quantity);
        setStatus(res.data.status);
      } else {
        toast.error("Cannot found voucher data!");
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Something went wrong");
    }
  };

  const getHistoryList = async () => {
    try {
      let res = await getVoucherHistoryListByVoucher(data.voucher_id);
      if (res.status === 200) {
        setHistoryList([]);
        for (let i = 0; i < res.data.length; i++) {
          setHistoryList((historyList) => [
            ...historyList,
            new HistoryVoucherFromJson(res.data[i], i),
          ]);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const initData = async () => {
    switch (tab) {
      case "1": {
        setDetailsData(data);
        await fetchDataDetail();
        break;
      }
      case "2": {
        await getHistoryList();
        break;
      }
      default:
        setDetailsData(data);
        await fetchDataDetail();
        break;
    }
  };

  useEffect(() => {
    isOpen && initData();
  }, [tab]);

  return (
    <>
      {tab === "1" && !isLoading && (
        <>
          <div className="row">
            <div className="col">
              <Input
                value={name ?? ""}
                onChange={(v) => setName(v.target.value)}
                placeholder={"Enter name"}
                label="Voucher Name"
              />
              <Input
                value={cost ?? ""}
                onChange={(v) => setCost(v.target.value)}
                placeholder={"Enter cost"}
                label="Cost"
              />
              <Input
                value={period ?? ""}
                onChange={(v) => setPeriod(v.target.value)}
                placeholder={"Enter period"}
                label="Period"
              />
              <Input
                value={points ?? ""}
                onChange={(v) => setPoints(v.target.value)}
                placeholder={"Enter points"}
                label="Points"
              />
            </div>
            <div className="col">
              <Input
                value={quantity ?? ""}
                onChange={(v) => setQuantity(v.target.value)}
                placeholder={"Enter quantity"}
                label="Quantity"
              />
              <Input
                value={data.used ?? ""}
                placeholder={""}
                label="Used"
                setDisabled={true}
              />
              <Input
                value={status ?? ""}
                placeholder={""}
                label="Status"
                setDisabled={true}
              />
            </div>
          </div>
          <div className="ms-auto" style={{ width: "50%" }}>
            <MyButton
              text={"Save"}
              width={"100%"}
              bgColor={"var(--primary-color)"}
              fontColor={"var(--text-white)"}
              callback={handleUpdateDetails}
            />
          </div>
        </>
      )}
      {tab === "2" && (
        <>
          <div>
            <MyTable list={historyList} hideToolkit={true} hideDetails={true} />
          </div>
        </>
      )}
    </>
  );
};
