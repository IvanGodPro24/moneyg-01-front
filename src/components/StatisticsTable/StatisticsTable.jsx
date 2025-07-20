import { useEffect, useMemo, useState } from "react";
import styles from "./StatisticsTable.module.css";
import Sum from "../Sum/Sum";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";

const StatisticsTable = ({
  data,
  totalExpenses,
  totalIncome,
  currency,
  convertedSum,
}) => {
  const categories = useMemo(() => data || [], [data]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [sortedCategories, setSortedCategories] = useState(categories);

  const toggleFiltered = () => setIsFiltered((prev) => !prev);

  useEffect(() => {
    const sortedData = [...categories].sort((a, b) =>
      isFiltered ? a.value - b.value : b.value - a.value
    );
    setSortedCategories(sortedData);
  }, [isFiltered, categories]);

  return (
    <div className={styles.table}>
      <ul className={styles.list}>
        <li className={styles.listHeader}>
          <span>Category</span>
          <Sum isFiltered={isFiltered} toggleFiltered={toggleFiltered} />
        </li>
        {sortedCategories.map((item) => (
          <li key={item.name} className={styles.item}>
            <div className={styles.label}>
              <span
                className={styles.color}
                style={{ backgroundColor: item.color }}
              ></span>
              <span className={styles.name}>{item.name}</span>
            </div>
            <span className={styles.sum}>
              {convertedSum(item.value).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.totalBlock}>
        <p className={styles.expenses}>
          Expenses:{" "}
          <span>
            {convertedSum(totalExpenses).toFixed(2)}{" "}
            {getCurrencySymbol(currency)}
          </span>
        </p>
        <p className={styles.income}>
          Income:{" "}
          <span>
            {convertedSum(totalIncome).toFixed(2)} {getCurrencySymbol(currency)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;
