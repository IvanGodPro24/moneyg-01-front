import styles from "./StatisticsTable.module.css";

const StatisticsTable = ({ data, totalExpenses, totalIncome }) => {
  const categories = data || [];

  return (
    <div className={styles.table}>
      <ul className={styles.list}>
        <li className={styles.listHeader}>
          <div>
            <span>Category</span>
            <span>Sum</span>
          </div>
        </li>
        {categories.map((item) => (
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
