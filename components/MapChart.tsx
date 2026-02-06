"use client";

import React, { useEffect, useState } from "react";
import BaseChart from "./BaseChart";
import * as echarts from "echarts";
import { getChinaMapOption } from "@/utils/chartOptions";

export default function MapChart() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [option, setOption] = useState<any>(null);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const response = await fetch("/maps/china.json");
        const mapJson = await response.json();

        echarts.registerMap("china", mapJson);
        setOption(getChinaMapOption());
        setIsMapLoaded(true);
      } catch (error) {
        console.error("Failed to load map data:", error);
      }
    };

    fetchMap();
  }, []);

  return (
    <div className="w-full h-full relative">
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-blue-300">
          Loading Map Data...
        </div>
      )}
      {isMapLoaded && option && <BaseChart option={option} />}
    </div>
  );
}
