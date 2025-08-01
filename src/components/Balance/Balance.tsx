import { useSwipeable } from "react-swipeable";

import s from "./Balance.module.css";
import { selectTotalBalance } from "../../redux/auth/selectors";
import clsx from "clsx";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import useExchangeRates from "../../hooks/useExchangeRates";
import { selectActiveCurrency } from "../../redux/currency/selectors";
import { setActiveCurrency } from "../../redux/currency/slice";
import { currencies } from "../../constants/constants";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Balance = () => {
  const dispatch = useAppDispatch();

  const totalBalance = useAppSelector(selectTotalBalance);
  const activeCurrency = useAppSelector(selectActiveCurrency);

  const { convertCurrency, loading } = useExchangeRates();

  const formatNumber = (number: number) => {
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

  const handleCurrencyChange = (currency: string) => {
    if (loading && currency !== "UAH") return;

    dispatch(setActiveCurrency(currency));
  };

  const convertedBalance = convertCurrency(totalBalance, "UAH", activeCurrency);

  const handleSwipe = (direction: string) => {
    const index = currencies.indexOf(activeCurrency);
    if (direction === "left" && index < currencies.length - 1) {
      handleCurrencyChange(currencies[index + 1]);
    } else if (direction === "right" && index > 0) {
      handleCurrencyChange(currencies[index - 1]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackTouch: true,
  });

  return (
    <section className={s.section}>
      <div className={s.container} {...swipeHandlers}>
        <div className={s.balance}>
          <h2 className={s.title}>Your balance</h2>
          <p className={s.sum}>
            <span className={s.text}>{getCurrencySymbol(activeCurrency)}</span>
            {formatNumber(convertedBalance)}
          </p>

          {loading && activeCurrency !== "UAH" && (
            <p className={s.loadingText}>Loading exchange rates...</p>
          )}
        </div>

        <p className={s.swipe}>Swipe to change currency</p>

        <ul className={s.list}>
          {currencies.map((currency) => (
            <li
              key={currency}
              className={clsx(activeCurrency === currency && s.active)}
            >
              <button
                type="button"
                onClick={() => handleCurrencyChange(currency)}
                className={clsx(
                  s.currencyButton,
                  loading && currency !== "UAH" && s.disabled
                )}
                disabled={loading && currency !== "UAH"}
              >
                {getCurrencySymbol(currency)}
                <span>{currency}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Balance;
