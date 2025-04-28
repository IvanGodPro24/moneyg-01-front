import { useSelector } from "react-redux";

import { selectTotalBalance } from "../../redux/transactions/selectors";
import s from "./Balance.module.css";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Your balance</h2>
        <p className={s.sum}>
          <span className={s.text}>₴</span>
          {totalBalance || "0"}
        </p>
      </div>
    </section>
  );
};

export default Balance;
