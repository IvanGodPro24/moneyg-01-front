import styles from "./StatisticsDashboard.module.css";
import OptionSelect from "../OptionSelect/OptionSelect";
import { months } from "../../constants/constants";
import { StatisticsDashboardProps } from "./StatisticsDashboard.types";
import { NumberOptions } from "../../constants/constants.types";

const StatisticsDashboard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: StatisticsDashboardProps) => {
  const now = new Date();

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = now.getFullYear() - i;
    return { value: year, label: year.toString() };
  });

  return (
    <div className={styles.dashboard}>
      <OptionSelect<NumberOptions>
        options={months}
        value={selectedMonth}
        onChange={onMonthChange}
      />

      <OptionSelect<NumberOptions>
        options={years}
        value={selectedYear}
        onChange={onYearChange}
      />
    </div>
  );
};

export default StatisticsDashboard;
