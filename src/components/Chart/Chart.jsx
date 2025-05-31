import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./Chart.module.css";
import { useRef, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data, totalExpenses }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const chartRef = useRef();

  const hasExpenses = totalExpenses > 0;

  const labels = hasExpenses ? data.map((item) => item.name) : ["No data"];

  const backgroundColor = hasExpenses
    ? data.map((item) => {
        if (!selectedCategory) return item.color;

        return selectedCategory.name === item.name
          ? item.color
          : "rgba(0, 0, 0, 0.2)";
      })
    : ["#808080"];

  const chartData = {
    labels,
    datasets: [
      {
        data: hasExpenses ? data.map((item) => item.value) : [1],
        backgroundColor,
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: hasExpenses,
      },
    },
  };

  const handleClick = (event) => {
    const chart = chartRef.current;

    const activePoints = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      false
    );

    setSelectedCategory(
      activePoints.length > 0 ? data[activePoints[0].index] : null
    );
  };

  return (
    <div className={styles.chart}>
      <div
        className={`${styles.chartWrapper} ${
          hasExpenses ? styles.pointer : styles.defaultCursor
        }`}
      >
        <Doughnut
          ref={chartRef}
          className={styles.chartDiagram}
          data={chartData}
          options={options}
          onClick={handleClick}
        />
        <div className={styles.centeredText}>
          {totalExpenses === 0 ? (
            <p>No data</p>
          ) : selectedCategory ? (
            <div className={styles.info}>
              <p>{selectedCategory.name}</p>
              <p className={styles.value}>₴ {selectedCategory.value.toFixed(2)}</p>
            </div>
          ) : (
            <p>₴ {totalExpenses.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
