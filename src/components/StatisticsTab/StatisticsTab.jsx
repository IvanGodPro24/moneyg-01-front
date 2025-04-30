import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import Chart from "../Chart/Chart";

import {
  selectExpensesData,
  selectSummaryLoading,
  selectTotalExpenses,
  selectTotalIncome,
} from "../../redux/summary/selectors";
import { fetchSummary } from "../../redux/summary/operations";

import { assignColors } from "../../utils/assignColors";

import styles from "./StatisticsTab.module.css";
import Loader from "../Loader/Loader";
import { selectTotalBalance } from "../../redux/auth/selectors";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectExpensesData);
  const isLoading = useSelector(selectSummaryLoading);
  const totalExpenses = useSelector(selectTotalExpenses);
  const totalIncome = useSelector(selectTotalIncome);
  const totalBalance = useSelector(selectTotalBalance)

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
    return <Loader />;
  }

  return (
    <section className={styles.tab}>
      <Chart data={coloredData} totalBalance={totalBalance} />
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
    </section>
  );
};

export default StatisticsTab;
