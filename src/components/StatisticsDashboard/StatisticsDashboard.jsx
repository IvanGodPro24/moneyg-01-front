import styles from "./StatisticsDashboard.module.css";
import OptionSelect from "../OptionSelect/OptionSelect";

const months = [
  { value: 0, label: "All months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

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
