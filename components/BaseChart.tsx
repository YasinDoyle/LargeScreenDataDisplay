"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export interface BaseChartProps {
  option: any;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

const BaseChart: React.FC<BaseChartProps> = ({
  option,
  className,
  style,
  loading = false,
}) => {
  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "100%", ...style }}
      className={className}
      theme="dark" // Using dark theme by default for large screens
      showLoading={loading}
    />
  );
};

export default BaseChart;
