const scifiColors = ["#00f2ff", "#7000ff", "#00ff9d", "#ff0055", "#efff00"];
import { getTranslation } from "./translation";

export const commonChartStyle = {
  backgroundColor: "transparent",
  textStyle: {
    color: "#a0d0ff",
  },
  title: {
    textStyle: {
      color: "#fff",
      fontSize: 16,
    },
  },
  tooltip: {
    backgroundColor: "rgba(6, 15, 40, 0.9)",
    borderColor: "#00f2ff",
    textStyle: {
      color: "#fff",
    },
  },
};

export const getLineChartOption = (
  title?: string,
  type: string = "line",
  locale: "en" | "zh" = "zh",
) => {
  const t = (key: string) => getTranslation(key, locale);

  return {
    ...commonChartStyle,
    color: scifiColors,
    title: {
      text: title || t("Charts.dailyTraffic"),
      left: "center",
      ...commonChartStyle.title,
    },
    tooltip: commonChartStyle.tooltip,
    xAxis: {
      type: "category",
      data: [
        t("Charts.days.mon"),
        t("Charts.days.tue"),
        t("Charts.days.wed"),
        t("Charts.days.thu"),
        t("Charts.days.fri"),
        t("Charts.days.sat"),
        t("Charts.days.sun"),
      ],
      axisLine: { lineStyle: { color: "#3250c8" } },
      axisLabel: { color: "#a0d0ff" },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "rgba(50, 80, 200, 0.2)" } },
      axisLabel: { color: "#a0d0ff" },
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowBlur: 10,
        },
      },
      {
        data: [620, 732, 701, 734, 1090, 1130, 1120],
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          shadowBlur: 10,
        },
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
  };
};

export const getBarChartOption = (
  title?: string,
  locale: "en" | "zh" = "zh",
) => {
  const t = (key: string) => getTranslation(key, locale);

  return {
    ...commonChartStyle,
    color: scifiColors,
    title: {
      text: title || t("Charts.salesByRegion"),
      left: "center",
      ...commonChartStyle.title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      ...commonChartStyle.tooltip,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          t("Charts.regions.north"),
          t("Charts.regions.south"),
          t("Charts.regions.east"),
          t("Charts.regions.west"),
          t("Charts.regions.central"),
          t("Charts.regions.overseas"),
        ],
        axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: "#3250c8" } },
        axisLabel: { color: "#a0d0ff" },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: { lineStyle: { color: "rgba(50, 80, 200, 0.2)" } },
        axisLabel: { color: "#a0d0ff" },
      },
    ],
    series: [
      {
        name: t("Charts.series.direct"),
        type: "bar",
        barWidth: "40%",
        data: [10, 52, 200, 334, 390, 330],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#00f2ff" },
              { offset: 1, color: "rgba(0, 242, 255, 0.1)" },
            ],
          },
        },
      },
    ],
  };
};

export const getPieChartOption = (
  title?: string,
  locale: "en" | "zh" = "zh",
) => {
  const t = (key: string) => getTranslation(key, locale);

  return {
    ...commonChartStyle,
    color: scifiColors,
    title: {
      text: title || t("Charts.userSource"),
      left: "center",
      ...commonChartStyle.title,
    },
    tooltip: {
      trigger: "item",
      ...commonChartStyle.tooltip,
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: t("Charts.series.accessFrom"),
        type: "pie",
        radius: [30, 120],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 5,
        },
        data: [
          { value: 40, name: t("Charts.sources.searchEngine") },
          { value: 36, name: t("Charts.sources.directAccess") },
          { value: 32, name: t("Charts.sources.email") },
          { value: 28, name: t("Charts.sources.unionAds") },
          { value: 24, name: t("Charts.sources.videoAds") },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
};

export const getChinaMapOption = (
  data: any[] = [],
  locale: "en" | "zh" = "zh",
) => {
  const t = (key: string) => getTranslation(key, locale);
  // Top 5 busiest routes simulation
  const routes = [
    {
      coords: [
        [116.405285, 39.904989],
        [121.472644, 31.231706],
      ],
    }, // Beijing -> Shanghai
    {
      coords: [
        [113.280637, 23.125178],
        [116.405285, 39.904989],
      ],
    }, // Guangzhou -> Beijing
    {
      coords: [
        [104.065735, 30.659462],
        [121.472644, 31.231706],
      ],
    }, // Chengdu -> Shanghai
    {
      coords: [
        [114.305393, 30.593099],
        [116.405285, 39.904989],
      ],
    }, // Wuhan -> Beijing
    {
      coords: [
        [108.948024, 34.263161],
        [113.280637, 23.125178],
      ],
    }, // Xi'an -> Guangzhou
  ];

  return {
    ...commonChartStyle,
    backgroundColor: "transparent",
    geo: {
      map: "china",
      roam: true,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      label: {
        show: true,
        color: "#fff",
        fontSize: 10,
      },
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            { offset: 0, color: "rgba(147, 235, 248, 0)" },
            { offset: 1, color: "rgba(147, 235, 248, .2)" },
          ],
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      emphasis: {
        itemStyle: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
    },
    series: [
      // Flight Lines (Effect Lines)
      {
        type: "lines",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: "#fff",
          symbolSize: 3,
        },
        lineStyle: {
          color: "#a6c84c",
          width: 0,
          curveness: 0.2,
        },
        data: routes,
      },
      // Static Lines
      {
        type: "lines",
        zlevel: 2,
        symbol: ["none", "arrow"],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
        },
        lineStyle: {
          color: "#a6c84c",
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
        data: routes,
      },
      // Scatter Points (Cities)
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
          color: "#fff",
        },
        symbolSize: 10,
        itemStyle: {
          color: "#00f2ff",
        },
        data: [
          {
            name: t("Charts.cities.beijing"),
            value: [116.405285, 39.904989, 100],
          },
          {
            name: t("Charts.cities.shanghai"),
            value: [121.472644, 31.231706, 90],
          },
          {
            name: t("Charts.cities.guangzhou"),
            value: [113.280637, 23.125178, 80],
          },
          {
            name: t("Charts.cities.chengdu"),
            value: [104.065735, 30.659462, 70],
          },
          {
            name: t("Charts.cities.wuhan"),
            value: [114.305393, 30.593099, 60],
          },
          { name: t("Charts.cities.xian"), value: [108.948024, 34.263161, 50] },
        ],
      },
    ],
  };
};

export const getGaugeOption = () => {
  return {
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#67e0e3"],
              [0.7, "#37a2da"],
              [1, "#fd666d"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} km/h",
          color: "inherit",
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  };
};
