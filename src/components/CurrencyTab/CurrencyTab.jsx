import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import Svg from "./Svg";
import s from "./CurrencyTab.module.css";
import { fetchExchangeRates } from "./apiService";
import useDevice from "../../hooks/useDevice";

const CurrencyTab = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDesktop } = useDevice();

  const loaderSize = isDesktop ? 150 : 100;

  const isDataFresh = (cachedTime) => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return now - cachedTime < fiveMinutes;
  };

  useEffect(() => {
    const getRates = async () => {
      try {
        const cachedRates = sessionStorage.getItem("mono_rates");
        const cachedTime = sessionStorage.getItem("mono_rates_time");

        if (cachedRates && cachedTime && isDataFresh(Number(cachedTime))) {
          setRates(JSON.parse(cachedRates));
          setLoading(false);
          return;
        }

        const data = await fetchExchangeRates();
        const filteredRates = data.filter(
          (rate) =>
            (rate.currencyCodeA === 840 && rate.currencyCodeB === 980) ||
            (rate.currencyCodeA === 978 && rate.currencyCodeB === 980)
        );

        setRates(filteredRates);
        sessionStorage.setItem("mono_rates", JSON.stringify(filteredRates));
        sessionStorage.setItem("mono_rates_time", Date.now().toString());
      } catch (err) {
        setError(err.message || "Error fetching exchange rates");
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, []);

  if (loading)
    return (
      <div className={s.loader}>
        <ClipLoader size={loaderSize} color="#3498db" />
      </div>
    );
  if (error) return <p className={s.texError}>Error: {error}</p>;

  return (
    <div className={s.container}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.th}>Currency</th>
            <th className={s.th}>Purchase</th>
            <th className={s.th}>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
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
            {rates.find((r) => r.currencyCodeA === 840).rateBuy.toFixed(2)}
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
            {rates.find((r) => r.currencyCodeA === 978).rateBuy.toFixed(2)}
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
