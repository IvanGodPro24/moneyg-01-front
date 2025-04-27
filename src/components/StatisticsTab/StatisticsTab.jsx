import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import Chart from "../Chart/Chart";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import data from "../../../data.json";

import './StatisticsTab.css'

const StatisticsTab = () => {
  const dispatch = useDispatch();
  // const data = useSelector(selectStatisticsData);
  // const isLoading = useSelector(selectIsLoading);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // useEffect(() => {
  //   dispatch(fetchStatistics({ month: currentMonth, year: currentYear }));
  // }, [dispatch, currentMonth, currentYear]);

  // if (isLoading) {
  //   return <p className="text-center">Loading...</p>;
  // }

  // data.map((transaction) => console.log(transaction));

  return (
    <section className="tab">
      <Chart data={data} />
      <StatisticsDashboard />
      <StatisticsTable data={data} />
    </section>
  );
};

export default StatisticsTab;
