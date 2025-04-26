import React from "react";
import { useDispatch } from "react-redux";

const StatisticsTab = () => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  return <div>StatisticsTab</div>;
};

export default StatisticsTab;
