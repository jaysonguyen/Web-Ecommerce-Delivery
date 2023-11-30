import LineChart from "../../../components/template/chart/LineChart";
import SettingOptionOne from "./SettingOptionOne";
import "../../../assets/css/Pages/dashboard.css";
import SettingOptionTwo from "./SettingOptionTwo";
import React, { useEffect, useState } from "react";
import { getOrderReport } from "../../../services/ReportService";
import toast from "react-hot-toast";
import { DayPickerDialog } from "../../../components/template/dialog/DayPickerDialog";
import useToken from "../../../hooks/useToken";
import CustomerOption from "./CustomerOption";

export default function DashboardPage() {
  // dataAPI: {labels: [], points: [{key: string, values: []}]}
  let dataList = {
    labels: ["label 1", "label 2", "label 3"],
    points: [
      {
        key: "test 1",
        values: [2, 3, 4],
      },
      {
        key: "test 2",
        values: [26, 32, 34],
      },
      {
        key: "test 3",
        values: [21, 34, 14],
      },
    ],
  };

  const [chartData, setchartData] = useState(dataList);
  const [dayBeginSelected, setDayStartSelected] = useState(new Date());
  const [dayEndSelected, setDayEndSelected] = useState(new Date());
  const { userPayload } = useToken();

  const handleCloseDayStart = (day) => {
    if (day > dayEndSelected) {
      toast.error("Please select date start less than date end");
    } else {
      setDayStartSelected(day);
    }
  };

  const handleCloseDayEnd = (day) => {
    if (day < dayBeginSelected) {
      toast.error("Please select date end greater than date start");
    } else {
      setDayEndSelected(day);
    }
  };

  const fetchData = async () => {
    try {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      dayBeginSelected.setDate(dayEndSelected.getDate() - 7);
      let res = await getOrderReport({
        start: new Intl.DateTimeFormat("en-US", options)
          .format(dayBeginSelected)
          .replace(/\//g, "-"),
        end: new Intl.DateTimeFormat("en-US", options)
          .format(dayEndSelected)
          .replace(/\//g, "-"),
      });
      if (res.status !== 200) {
        toast.error("Cannot get order report, check your connection!");
      } else {
        setchartData(res.data);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Cannot get order report, check your connection!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dayEndSelected]);

  return (
    <div className="">
      <h3>Dashboard</h3>
      <div>
        <div className="row">
          <div className="col">
            {/* SORT BY DATE  */}
            <div className="d-flex gap-3 align-items-center">
              Date Picked:
              <DayPickerDialog
                selectedValue={dayEndSelected}
                onClose={setDayEndSelected}
              />
            </div>
            {chartData.points.length > 0 ? (
              <LineChart title="Chart example" dataList={chartData} />
            ) : (
              <div>No Connection {chartData.points.length}</div>
            )}
          </div>
          <div className="col">
            {userPayload.role === "admin" ? (
              <SettingOptionOne />
            ) : userPayload.role === "shipper" ? (
              <div>shipper logged in</div>
            ) : userPayload.role === "customer" ? (
              <CustomerOption />
            ) : (
              <div>Customer or staff?</div>
            )}
          </div>
        </div>
      </div>
      {userPayload.role === "admin" && (
        <div className="row">
          <div className="col">
            <SettingOptionTwo />
          </div>
        </div>
      )}
    </div>
  );
}
