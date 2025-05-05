import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import {
  selectExpensesData,
  selectSummaryLoading,
  selectTotalExpenses,
  selectTotalIncome,
} from "../../redux/summary/selectors";
import { fetchSummary } from "../../redux/summary/operations";
import { assignColors } from "../../utils/assignColors";

import styles from "./StatisticsTab.module.css";
import Chart from "../Chart/Chart";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectExpensesData);
  const isLoading = useSelector(selectSummaryLoading);
  const totalExpenses = useSelector(selectTotalExpenses);
  const totalIncome = useSelector(selectTotalIncome);

  const coloredData = assignColors(data);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState({
    value: now.getMonth(),
    label: now.toLocaleString("default", { month: "long" }),
  });
  const [selectedYear, setSelectedYear] = useState({
    value: now.getFullYear(),
    label: now.getFullYear().toString(),
  });

  useEffect(() => {
    dispatch(
      fetchSummary({ month: selectedMonth.value + 1, year: selectedYear.value })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = (option) => {
    setSelectedMonth(option);
  };

  const handleYearChange = (option) => {
    setSelectedYear(option);
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <ClipLoader size={120} color="#3498db" />
      </div>
    );
  }

  return (
    <div className={styles.tab}>
      <Chart data={coloredData} totalExpenses={totalExpenses} />
      <div className={styles.dashboard}>
        <StatisticsDashboard
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <StatisticsTable
          data={coloredData}
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
        />
      </div>
    </div>
  );
};

export default StatisticsTab;
