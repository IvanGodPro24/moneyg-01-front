import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import styles from "./Chart.module.css";
import { MouseEvent, useRef, useState } from "react";
import clsx from "clsx";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import { ChartProps } from "./Chart.types";
import { ColoredDataType } from "../StatisticsTab/StatisticsTab.types";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data, totalExpenses, currency, convertedSum }: ChartProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ColoredDataType | null>(null);

  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);

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

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;

    if (chart) {
      const activePoints = chart.getElementsAtEventForMode(
        event.nativeEvent,
        "nearest",
        { intersect: true },
        false
      );

      setSelectedCategory(
        activePoints.length > 0 ? data[activePoints[0].index] : null
      );
    }
  };

  return (
    <div className={styles.chart}>
      <div
        className={clsx(
          styles.chartWrapper,
          "relative",
          hasExpenses ? styles.pointer : styles.defaultCursor
        )}
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
              <p className={styles.value}>
                {getCurrencySymbol(currency)}{" "}
                {convertedSum(selectedCategory.value).toFixed(2)}
              </p>
            </div>
          ) : (
            <p>
              {getCurrencySymbol(currency)}{" "}
              {convertedSum(totalExpenses).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
