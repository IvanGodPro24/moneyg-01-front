import { useSelector } from "react-redux";

import s from "./Balance.module.css";
import { selectTotalBalance } from "../../redux/auth/selectors";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Your balance</h2>
        <p className={s.sum}>
          <span className={s.text}>₴</span>
          {totalBalance.toFixed(2)}
        </p>
      </div>
    </section>
  );
};

export default Balance;
