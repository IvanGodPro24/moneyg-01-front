import styles from "./StatisticsDashboard.module.css";
import OptionSelect from "../OptionSelect/OptionSelect";
import { months } from "../../constants/constants";

const StatisticsDashboard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  const now = new Date();

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = now.getFullYear() - i;
    return { value: year, label: year.toString() };
  });

  return (
    <div className={styles.dashboard}>
      <OptionSelect
        options={months}
        value={selectedMonth}
        onChange={onMonthChange}
      />

      <OptionSelect
        options={years}
        value={selectedYear}
        onChange={onYearChange}
      />
    </div>
  );
};

export default StatisticsDashboard;
