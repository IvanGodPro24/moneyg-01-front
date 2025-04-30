import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import styles from "./StatisticsPage.module.css";

const StatisticsPage = () => {
  return (
    <div className={`container`}>
      <h2 className={styles.title}>Statistics</h2>
      <StatisticsTab />
    </div>
  );
};

export default StatisticsPage;
