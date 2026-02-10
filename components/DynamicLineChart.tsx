"use client";
import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { BaseChartProps } from "./BaseChart";
import { commonChartStyle } from "@/utils/chartOptions";
import { getTranslation } from "@/utils/translation";
import rawData from "@/public/data/life-expectancy-table.json";
import { Line } from "echarts/types/src/util/graphic.js";

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
      showLoading={props.loading}
    />
  );
};

const getLineRaceOption = (): echarts.EChartsOption => {
  const countries = [
    "China",
    "Japan",
    "North Korea",
    "United States",
    "South Korea",
    "India",
    "Russia",
  ];
  const datasetWithFilters: echarts.DatasetComponentOption[] = [];
  const seriesList: echarts.SeriesOption[] = [];
  echarts.util.each(countries, function (country) {
    var datasetId = "dataset_" + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: "dataset_raw",
      transform: {
        type: "filter",
        config: {
          and: [
            { dimension: "Year", gte: 1950 },
            { dimension: "Country", "=": country },
          ],
        },
      },
    });
    seriesList.push({
      type: "line",
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params: any) {
          return params.value[3] + ": " + params.value[0];
        },
      },
      labelLayout: {
        moveOverlap: "shiftY",
      },
      emphasis: {
        focus: "series",
      },
      encode: {
        x: "Year",
        y: "Income",
        label: ["Country", "Income"],
        itemName: "Year",
        tooltip: ["Income"],
      },
    });
  });
  return {
    ...commonChartStyle,
    animationDuration: 10000,
    dataset: [
      {
        id: "dataset_raw",
        source: rawData,
      },
      ...datasetWithFilters,
    ],
    title: {
      text: getTranslation("Charts.incomeOfCountriesSince1950"),
    },
    tooltip: {
      order: "valueDesc",
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      nameLocation: "middle",
    },
    yAxis: {
      name: getTranslation("Charts.income"),
    },
    grid: {
      right: 140,
    },
    series: seriesList,
  };
};

const LineRaceChart: React.FC<BaseChartProps> = (props) => {
  return (
    <ReactECharts
      echarts={echarts}
      option={getLineRaceOption()}
      style={{ width: "100%", height: "100%", ...props.style }}
      className={props.className}
      theme="dark"
      showLoading={props.loading}
    />
  );
};

export { LineRaceChart, DynamicLineChart };
