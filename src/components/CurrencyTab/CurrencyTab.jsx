import { useEffect, useState } from "react";
import { fetchExchangeRates } from "./apiService";
import s from "./CurrencyTab.module.css";
import Svg from "./Svg";
import Loader from "../Loader/Loader";

const CurrencyTab = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

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
        <Svg />
      </div>
    </div>
  );
};

export default CurrencyTab;
