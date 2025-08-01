import { ColoredDataType } from "../StatisticsTab/StatisticsTab.types";

export type StatisticsTableProps = {
  data: ColoredDataType[];
  totalExpenses: number;
  totalIncome: number;
  currency: string;
  convertedSum: (sum: number) => number;
};
