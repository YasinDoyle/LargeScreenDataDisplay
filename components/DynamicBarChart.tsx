"use client";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { BaseChartProps } from "./BaseChart";
import { commonChartStyle } from "@/utils/chartOptions";
import { getTranslation } from "@/utils/translation";
import rawData from "@/public/data/life-expectancy-table.json";
import emojiData from "@/public/data/emoji-flag-data.json";

const updateFrequency = 2000;
//  ["Income", "Life Expectancy", "Population", "Country", "Year"],
const dimension = 1;

const countryColors: Record<string, string> = {
  China: "#ff0055",
  India: "#f93",
  Japan: "#00f2ff",
  "North Korea": "#7000ff",
  "South Korea": "#00ff9d",
  Russia: "#2e0cf0",
  "United States": "#efff00",
};
const countries = [
  "China",
  "Japan",
  "North Korea",
  "United States",
  "South Korea",
  "India",
  "Russia",
];
interface Flag {
  name: string;
  emoji: string;
}

const flags: Flag[] = emojiData;
const data = rawData;
const years: (string | number)[] = [];
for (let i = 0; i < data.length; ++i) {
  if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
    years.push(data[i][4]);
  }
}
let startIndex = 10;
let startYear = years[startIndex];

function getFlag(countryName: string) {
  if (!countryName) {
    return "";
  }
  return (
    flags.find(function (item) {
      return item.name === countryName;
    }) || {}
  ).emoji;
}

const getDynamicBarOption = (
  sourceData: (string | number)[][],
  year: string | number,
): echarts.EChartsOption => {
  return {
    ...commonChartStyle,
    title: {
      text: getTranslation("Charts.lifeExpectancySince1900"),
    },
    grid: {
      top: 50,
      left: 150,
      right: 80,
    },
    xAxis: {
      max: "dataMax",
      axisLabel: {
        formatter: function (n: number) {
          return Math.round(n) + "";
        },
      },
    },
    dataset: {
      source: sourceData.filter(function (d: (string | number)[]) {
        return d[4] === year && countries.includes(d[3] as string);
      }),
    },
    yAxis: {
      type: "category",
      inverse: true,
      max: countries.length - 1,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value: any) {
          return value + "{flag|" + getFlag(value) + "}";
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5,
          },
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: "column",
        type: "bar",
        itemStyle: {
          color: function (param) {
            return countryColors[(param.value as number[])[3]] || "#5470c6";
          },
        },
        encode: {
          x: dimension,
          y: 3,
        },
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
        },
      },
    ],
    // Disable init animation.
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          bottom: 0,
          style: {
            text: String(year),
            font: "bolder 70px monospace",
            fill: "rgba(100, 100, 100, 0.25)",
          },
          z: 100,
        },
      ],
    },
  };
};

const DynamicBarChart: React.FC<BaseChartProps> = (props) => {
  const [option, setOption] = useState<echarts.EChartsOption>(
    getDynamicBarOption(data.slice(1), startYear),
  );

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (let i = startIndex; i < years.length - 1; ++i) {
      const timer = setTimeout(
        () => {
          updateYear(years[i + 1]);
        },
        (i - startIndex) * updateFrequency,
      );
      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  function updateYear(year: string | number) {
    let source = data.slice(1).filter(function (d: (string | number)[]) {
      return d[4] === year;
    });
    setOption(getDynamicBarOption(source, year));
  }
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

export { DynamicBarChart };
