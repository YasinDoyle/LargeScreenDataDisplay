import React from "react";
import { useTranslations } from "next-intl";
import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import BaseChart from "../../components/BaseChart";
import MapChart from "../../components/MapChart";
import DynamicLineChart from "@/components/DynamicLineChart";
import {
  getBarChartOption,
  getLineChartOption,
  getPieChartOption,
  getGaugeOption,
} from "../../utils/chartOptions";

export default function Home() {
  const t = useTranslations("Dashboard");
  const tCharts = useTranslations("Charts");

  return (
    <main className="min-h-screen bg-black text-white selection:bg-scifi-highlight selection:text-black">
      <ScreenContainer width={1920} height={1080}>
        <div className="w-full h-full flex flex-col bg-scifi-bg text-white overflow-hidden">
          <Header />

          <div className="flex-1 p-6 grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
            {/* Left Column */}
            <div className="col-span-3 flex flex-col gap-6">
              <div className="flex-1 scifi-panel rounded-lg p-1">
                <div className="h-full w-full bg-blue-900/10 p-3">
                  <DynamicLineChart
                    option={getLineChartOption(t("salesTrend"))}
                  />
                </div>
              </div>
              <div className="flex-1 scifi-panel rounded-lg p-1">
                <div className="h-full w-full bg-blue-900/10 p-3">
                  <BaseChart option={getPieChartOption(t("distribution"))} />
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="col-span-6 flex flex-col gap-6 relative">
              {/* Decorative corners for main area */}
              <div className="flex-[2] border border-scifi-border/30 bg-blue-900/5 relative p-2 shadow-[0_0_50px_rgba(0,242,255,0.05)_inset]">
                {/* Map Component */}
                <MapChart />
              </div>

              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="scifi-panel rounded-lg p-1">
                  <div className="h-full w-full bg-blue-900/10 p-3">
                    <BaseChart option={getBarChartOption(t("detailedStats"))} />
                  </div>
                </div>
                <div className="scifi-panel rounded-lg p-1">
                  <div className="h-full w-full bg-blue-900/10 p-3">
                    <BaseChart option={getGaugeOption()} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-3 flex flex-col gap-6">
              <div className="flex-1 scifi-panel rounded-lg p-1">
                <div className="h-full w-full bg-blue-900/10 p-3">
                  <BaseChart
                    option={getBarChartOption(t("categoryAnalysis"))}
                  />
                </div>
              </div>
              <div className="flex-1 scifi-panel rounded-lg p-1">
                <div className="h-full w-full bg-blue-900/10 p-3">
                  <BaseChart option={getLineChartOption(t("growthRate"))} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenContainer>
    </main>
  );
}
