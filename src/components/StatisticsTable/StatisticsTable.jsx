import styles from "./StatisticsTable.module.css";

const StatisticsTable = ({ data }) => {
  const categories = data || [];

  return (
    // <div className="wrapper">
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th className="border-b p-2 text-left">Category</th>
    //         <th className="border-b p-2 text-right">Sum</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {categories.map((item) => (
    //         <tr key={item._id}>
    //           <td className="border-b p-2">{item.category}</td>
    //           <td className="border-b p-2 text-right">
    //             ${item.sum.toFixed(2)}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className={styles.table}>
      <ul className={styles.list}>
        {categories.map((item) => (
          <li key={item._id} className={styles.item}>
            <span
              className={styles.color}
              style={{ backgroundColor: item.color }}
            ></span>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.sum}>{item.sum.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.totalBlock}>
        {/* <p className={styles.expenses}>
          Expenses: <span>{statistics?.expenses.toFixed(2)}</span>
        </p>
        <p className={styles.income}>
          Income: <span>{statistics?.income.toFixed(2)}</span>
        </p> */}
      </div>
    </div>
  );
};

export default StatisticsTable;
