import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import styles from "./StatisticsPage.module.css";

const StatisticsPage = () => {
  return (
    <section className={styles.statistics}>
      <h2 className={styles.title}>Statistics</h2>
      <StatisticsTab />
    </section>
  );
};

export default StatisticsPage;
