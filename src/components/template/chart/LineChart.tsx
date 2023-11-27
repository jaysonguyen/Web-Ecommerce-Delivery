import ResizableBox from "./ResizableBox";
import * as React from "react";
import { AxisOptions, Chart } from "react-charts";
import "./chart.css";

type dataSet = {
  key: string | number | Date;
  values: number[];
};

type dataAPI = {
  labels: string[];
  points: dataSet[];
};

type props = {
  title: string;
  dataList: dataAPI;
};

export default function LineChart({ title, dataList }: props) {
  const { data } = generateDataSet(dataList);

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.key as unknown as Date,
    }),
    [],
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    [],
  );

  return (
    <div className="chart-container">
      <div className="chart-title">{title}</div>
      <ResizableBox resizable={false} width={550}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </div>
  );
}

const generateDataSet = (dataAPI: dataAPI) => {
  // dataAPI: {labels: [], points: [{key: string, values: []}]}
  console.log(dataAPI.points);
  //labels = num of dataset
  let labels = dataAPI.labels;
  let points = dataAPI.points;
  let dataList = [];

  for (let i = 0; i < labels.length; i++) {
    let list = [];
    for (let j = 0; j < points.length; j++) {
      // add object {key, value} to data list
      list.push({ key: points[j]["key"], value: points[j]["values"][i] });
    }
    // add dataset {label: string, data: []} of chart
    let temp = { label: labels[i], data: list };
    dataList.push(temp);
  }

  return {
    data: dataList,
  };
};
