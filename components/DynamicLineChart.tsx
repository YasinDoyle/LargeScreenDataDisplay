"use client";
import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { BaseChartProps } from "./BaseChart";
import { commonChartStyle } from "@/utils/chartOptions";
import { getTranslation } from "@/utils/translation";

interface DataItem {
  name: string;
  value: [string, number];
}

function randomData(): DataItem {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10.5;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ],
  };
}

let data: DataItem[] = [];
let now = new Date(1997, 11, 18);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (let i = 0; i < 1000; i++) {
  data.push(randomData());
}
const getDynamicOption = (): echarts.EChartsOption => ({
  ...commonChartStyle,
  title: {
    text: getTranslation("Dashboard.salesTrend"),
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params: any) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " : " +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: "Random Data",
      type: "line",
      showSymbol: false,
      data: data,
    },
  ],
});

const DynamicLineChart: React.FC<BaseChartProps> = (props) => {
  const [option, setOption] = useState({ ...getDynamicOption() });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      setOption({ ...getDynamicOption() });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "100%", ...props.style }}
      className={props.className}
      theme="dark"
      showLoading={loading}
    />
  );
};

export default DynamicLineChart;
