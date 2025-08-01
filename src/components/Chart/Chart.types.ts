import { ColoredDataType } from "../StatisticsTab/StatisticsTab.types";

export type ChartProps = {
  data: ColoredDataType[];
  totalExpenses: number;
  currency: string;
  convertedSum: (sum: number) => number;
};
