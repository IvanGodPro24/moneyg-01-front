import { SingleValue } from "react-select";
import { NumberOptions } from "../../constants/constants.types";

export type StatisticsDashboardProps = {
  selectedMonth: SingleValue<NumberOptions>;
  selectedYear: SingleValue<NumberOptions>;
  onMonthChange: (option: SingleValue<NumberOptions>) => void;
  onYearChange: (option: SingleValue<NumberOptions>) => void;
};
