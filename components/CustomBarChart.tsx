"use client";

import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import { BaseChartProps } from "./BaseChart";
import { commonChartStyle } from "@/utils/chartOptions";
import { getTranslation } from "@/utils/translation";
const yearCount = 7;
const categoryCount = 30;

const xAxisData: string[] = [];
const customData: number[][] = [];
const legendData: string[] = [];
const dataList: number[][] = [];

legendData.push(getTranslation("Charts.trend"));
const encodeY: number[] = [];
for (var i = 0; i < yearCount; i++) {
  legendData.push(2010 + i + "");
  dataList.push([]);
  encodeY.push(1 + i);
}

for (var i = 0; i < categoryCount; i++) {
  var val = Math.random() * 1000;
  xAxisData.push(getTranslation("Charts.category") + i);
  var customVal = [i];
  customData.push(customVal);

  for (var j = 0; j < dataList.length; j++) {
    var value =
      j === 0
        ? echarts.number.round(val, 2)
        : echarts.number.round(
            Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200),
            2,
          );
    dataList[j].push(value);
    customVal.push(value);
  }
}

const getCustomOption = (): echarts.EChartsOption => {
  return {
    ...commonChartStyle,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legendData,
      top: 20,
    },
    dataZoom: [
      {
        type: "slider",
        start: 50,
        end: 70,
      },
      {
        type: "inside",
        start: 50,
        end: 70,
      },
    ],
    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    series: [
      {
        type: "custom",
        name: getTranslation("Charts.trend"),
        renderItem: function (params, api) {
          var xValue = api.value(0);
          var currentSeriesIndices = api.currentSeriesIndices();
          var barLayout = api.barLayout({
            barGap: "30%",
            barCategoryGap: "20%",
            count: currentSeriesIndices.length - 1,
          });

          var points = [];
          for (var i = 0; i < currentSeriesIndices.length; i++) {
            var seriesIndex = currentSeriesIndices[i];
            if (seriesIndex !== params.seriesIndex) {
              var point = api.coord([xValue, api.value(seriesIndex)]);
              point[0] += barLayout[i - 1].offsetCenter;
              point[1] -= 20;
              points.push(point);
            }
          }
          var style = api.style({
            stroke: api.visual("color") as string,
            fill: "none",
          });

          return {
            type: "polyline",
            shape: {
              points: points,
            },
            style: style,
          };
        },
        itemStyle: {
          borderWidth: 2,
        },
        encode: {
          x: 0,
          y: encodeY,
        },
        data: customData,
        z: 100,
      },
      ...dataList.map(function (data, index) {
        return {
          type: "bar",
          animation: false,
          name: legendData[index + 1],
          itemStyle: {
            opacity: 0.8,
          },
          data: data,
        } as echarts.BarSeriesOption;
      }),
    ],
  };
};

const CustomBarChart: React.FC<BaseChartProps> = (props) => {
  return (
    <ReactECharts
      echarts={echarts}
      option={getCustomOption()}
      style={{ width: "100%", height: "100%", ...props.style }}
      className={props.className}
      theme="dark"
      showLoading={props.loading}
    />
  );
};

export { CustomBarChart };
