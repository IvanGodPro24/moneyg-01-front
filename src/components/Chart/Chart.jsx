import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./Chart.module.css";
import { assignColors } from "../../utils/assignColors";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data, totalExpenses }) => {
  const coloredData = assignColors(data)

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: coloredData.map((item) => item.color),
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
          {totalExpenses === 0 ? (
            <p>No data</p>
          ) : (
            <p>₴ {totalExpenses.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
