import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
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
import useExchangeRates from "../../hooks/useExchangeRates";
import { selectActiveCurrency } from "../../redux/currency/selectors";
import { ColoredDataType } from "./StatisticsTab.types";
import { NumberOptions } from "../../constants/constants.types";
import { SingleValue } from "react-select";

const StatisticsTab = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectExpensesData);
  const isLoading = useAppSelector(selectSummaryLoading);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const totalIncome = useAppSelector(selectTotalIncome);
  const activeCurrency = useAppSelector(selectActiveCurrency);

  const { convertCurrency } = useExchangeRates();

  const convertedSum = (sum: number) =>
    convertCurrency(sum, "UAH", activeCurrency);

  const coloredData: ColoredDataType[] = assignColors(data);

  const now = new Date();

  const [selectedMonth, setSelectedMonth] = useState<
    SingleValue<NumberOptions>
  >({
    value: now.getMonth() + 1,
    label: now.toLocaleString("en-US", { month: "long" }),
  });
  const [selectedYear, setSelectedYear] = useState<SingleValue<NumberOptions>>({
    value: now.getFullYear(),
    label: now.getFullYear().toString(),
  });

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      dispatch(
        fetchSummary({
          month: selectedMonth.value === 0 ? null : selectedMonth.value,
          year: selectedYear.value,
        })
      );
    }
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = (option: SingleValue<NumberOptions>) =>
    setSelectedMonth(option);

  const handleYearChange = (option: SingleValue<NumberOptions>) =>
    setSelectedYear(option);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <ClipLoader size={120} color="#3498db" />
      </div>
    );
  }

  return (
    <div className={styles.tab}>
      <Chart
        data={coloredData}
        totalExpenses={totalExpenses}
        currency={activeCurrency}
        convertedSum={convertedSum}
      />
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
          currency={activeCurrency}
          convertedSum={convertedSum}
        />
      </div>
    </div>
  );
};

export default StatisticsTab;
