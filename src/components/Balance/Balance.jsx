import { useSelector } from "react-redux";

import s from "./Balance.module.css";
import { selectTotalBalance } from "../../redux/auth/selectors";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  const formatNumber = (number) => {
    if (number >= 1_000_000_000) {
      return (
        <>
          {(number / 1_000_000_000).toFixed(1)}
          <span className={s.textNum}>B</span>
        </>
      );
    } else if (number >= 1_000_000) {
      return (
        <>
          {(number / 1_000_000).toFixed(1)}
          <span className={s.textNum}>M</span>
        </>
      );
    } else {
      return number.toFixed(2);
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Your balance</h2>
        <p className={s.sum}>
          <span className={s.text}>₴</span>
          {formatNumber(totalBalance)}
        </p>
      </div>
    </section>
  );
};

export default Balance;
