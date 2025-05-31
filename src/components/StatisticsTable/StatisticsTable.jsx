import { useEffect, useMemo, useState } from "react";
import styles from "./StatisticsTable.module.css";
import { TbArrowsSort } from "react-icons/tb";

const StatisticsTable = ({ data, totalExpenses, totalIncome }) => {
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
          <div className={styles.container}>
            <span>Sum</span>
            <button
              onClick={toggleFiltered}
              className={isFiltered ? "rotate-180" : "rotate-0"}
            >
              <TbArrowsSort />
            </button>
          </div>
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
            <span className={styles.sum}>{item.value.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.totalBlock}>
        <p className={styles.expenses}>
          Expenses: <span>{totalExpenses.toFixed(2)}</span>
        </p>
        <p className={styles.income}>
          Income: <span>{totalIncome.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;
