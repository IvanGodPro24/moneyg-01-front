import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

import React from "react";

const Chart = ({ data }) => {
  const categories = data?.category || [];

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.sum),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
    },
    responsive: false,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chartWrapper}>
        <Doughnut
          className={styles.chartDiagram}
          data={chartData}
          width={200}
          height={200}
          options={options}
        />
      </div>
      <div className={styles.centeredText}>
        <p>₴ {2300}</p>
      </div>
    </div>
  );
};

export default Chart;
