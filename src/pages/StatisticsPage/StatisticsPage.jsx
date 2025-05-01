import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import styles from "./StatisticsPage.module.css";

const StatisticsPage = () => {
  return (
    <section className={styles.statistics}>
      <div className={styles.container}>
        <h2 className={styles.title}>Statistics</h2>
        <StatisticsTab />
      </div>
    </section>
  );
};

export default StatisticsPage;
