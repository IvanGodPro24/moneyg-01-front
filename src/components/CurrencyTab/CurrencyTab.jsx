import { ClipLoader } from "react-spinners";

import Svg from "./Svg";
import s from "./CurrencyTab.module.css";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";
import useExchangeRates from "../../hooks/useExchangeRates";

const CurrencyTab = () => {
  const { exchangeRates, loading, error } = useExchangeRates();
  const { isDesktop } = useDevice();

  const loaderSize = isDesktop ? 150 : 100;

  if (loading)
    return (
      <div className={s.loader}>
        <ClipLoader size={loaderSize} color="#3498db" />
      </div>
    );

  if (error) return <p className={s.texError}>Error: {error}</p>;

  const getUSDRate = () => exchangeRates.find((r) => r.currencyCodeA === 840);

  const getEURRate = () => exchangeRates.find((r) => r.currencyCodeA === 978);

  return (
    <div className={clsx(s.container, "relative")}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.th}>Currency</th>
            <th className={s.th}>Purchase</th>
            <th className={s.th}>Sale</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={rate.currencyCodeA}>
              <td className={s.td}>
                {rate.currencyCodeA === 840 ? "USD" : "EUR"}
              </td>
              <td className={s.td}>{rate.rateBuy.toFixed(2)}</td>
              <td className={s.td}>{rate.rateSell.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={s.svgBackground}>
        <div className={s.svgMarkerLeft}>
          <span className={s.markerLabel}>
            {getUSDRate()?.rateBuy.toFixed(2)}
          </span>
          <svg
            className={s.svg}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.5" cy="4.5" r="4" fill="#563EAF" stroke="#FF868D" />
          </svg>
        </div>

        <div className={s.svgMarkerRight}>
          <span className={s.markerLabel}>
            {getEURRate()?.rateBuy.toFixed(2)}
          </span>
          <svg
            className={s.svg}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.5" cy="4.5" r="4" fill="#563EAF" stroke="#FF868D" />
          </svg>
        </div>

        <Svg />
      </div>
    </div>
  );
};

export default CurrencyTab;
