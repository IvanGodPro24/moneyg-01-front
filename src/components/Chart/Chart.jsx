import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data, totalExpenses }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(254, 208, 87, 1)",
          "rgba(255, 216, 208, 1)",
          "rgba(253, 148, 152, 1)",
          "rgba(197, 186, 255, 1)",
          "rgba(110, 120, 232, 1)",
          "rgba(74, 86, 226, 1)",
          "rgba(129, 225, 255, 1)",
          "rgba(36, 204, 167, 1)",
          "rgba(0, 173, 132, 1)",
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
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chartWrapper}>
        <Doughnut
          className={styles.chartDiagram}
          data={chartData}
          options={options}
        />
        <div className={styles.centeredText}>
          <p>₴ {totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
