// 图表配置国际化使用示例

import {
  getLineChartOption,
  getBarChartOption,
  getPieChartOption,
  getChinaMapOption,
} from "./chartOptions";

// 使用示例

// 1. 使用默认中文
const lineChartZh = getLineChartOption();
const barChartZh = getBarChartOption();
const pieChartZh = getPieChartOption();
const mapChartZh = getChinaMapOption();

// 2. 使用英文
const lineChartEn = getLineChartOption(undefined, "line", "en");
const barChartEn = getBarChartOption(undefined, "en");
const pieChartEn = getPieChartOption(undefined, "en");
const mapChartEn = getChinaMapOption([], "en");

// 3. 使用自定义标题
const customLineChart = getLineChartOption("自定义标题", "line", "zh");
const customBarChart = getBarChartOption("Custom Title", "en");

// 4. 在 React 组件中使用
/*
import { useLocale } from 'next-intl';
import BaseChart from '@/components/BaseChart';

export default function Dashboard() {
  const locale = useLocale() as 'zh' | 'en';
  
  const lineOption = getLineChartOption(undefined, 'line', locale);
  const barOption = getBarChartOption(undefined, locale);
  
  return (
    <div>
      <BaseChart option={lineOption} />
      <BaseChart option={barOption} />
    </div>
  );
}
*/

export {
  lineChartZh,
  barChartZh,
  pieChartZh,
  mapChartZh,
  lineChartEn,
  barChartEn,
  pieChartEn,
  mapChartEn,
};
