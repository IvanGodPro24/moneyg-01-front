import React, { useEffect, useState } from "react";
import { fetchExchangeRates } from "./apiService";

const CurrencyTab = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        const data = await fetchExchangeRates();
        // Фільтруємо тільки USD і EUR до UAH
        const filteredRates = data.filter(
          (rate) =>
            (rate.currencyCodeA === 840 && rate.currencyCodeB === 980) || // USD to UAH
            (rate.currencyCodeA === 978 && rate.currencyCodeB === 980) // EUR to UAH
        );
        setRates(filteredRates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Exchange Rates</h1>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currencyCodeA}>
              <td>{rate.currencyCodeA === 840 ? "USD" : "EUR"}</td>
              <td>{rate.rateBuy}</td>
              <td>{rate.rateSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTab;
