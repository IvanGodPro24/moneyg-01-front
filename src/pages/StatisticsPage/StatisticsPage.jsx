import React from "react";
import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import './StatisticsPage.css'

const StatisticsPage = () => {
  return (
    <div className="statistics-page container">
      <h2 className="statistics-title">Statistics</h2>
      <StatisticsTab />
    </div>
  );
};

export default StatisticsPage;
