import { useState, useEffect } from "react";
import { fetchExchangeRates } from "../components/CurrencyTab/apiService";
import { Rate } from "./useExchangeRates.types";

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isDataFresh = (cachedTime: number) => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return now - cachedTime < oneHour;
  };

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    if (fromCurrency === toCurrency || !exchangeRates.length) {
      return amount;
    }

    if (fromCurrency === "UAH") {
      const rate = exchangeRates.find((rate: Rate) => {
        if (toCurrency === "USD") return rate.currencyCodeA === 840;
        if (toCurrency === "EUR") return rate.currencyCodeA === 978;
        return false;
      });

      if (rate) {
        const avgRate = (rate.rateBuy + rate.rateSell) / 2;
        return amount / avgRate;
      }
    }

    if (toCurrency === "UAH") {
      const rate = exchangeRates.find((rate: Rate) => {
        if (fromCurrency === "USD") return rate.currencyCodeA === 840;
        if (fromCurrency === "EUR") return rate.currencyCodeA === 978;
        return false;
      });

      if (rate) {
        const avgRate = (rate.rateBuy + rate.rateSell) / 2;
        return amount * avgRate;
      }
    }

    return amount;
  };

  useEffect(() => {
    const getRates = async () => {
      try {
        setLoading(true);
        const cachedRates = sessionStorage.getItem("mono_rates");
        const cachedTime = sessionStorage.getItem("mono_rates_time");

        if (cachedRates && cachedTime && isDataFresh(Number(cachedTime))) {
          setExchangeRates(JSON.parse(cachedRates));
          setLoading(false);
          return;
        }

        const data = await fetchExchangeRates();
        const filteredRates = data.filter(
          (rate: Rate) =>
            (rate.currencyCodeA === 840 && rate.currencyCodeB === 980) ||
            (rate.currencyCodeA === 978 && rate.currencyCodeB === 980)
        );

        setExchangeRates(filteredRates);
        sessionStorage.setItem("mono_rates", JSON.stringify(filteredRates));
        sessionStorage.setItem("mono_rates_time", Date.now().toString());
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error fetching exchange rates");
        console.error("Error fetching exchange rates:", err);
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, []);

  return {
    exchangeRates,
    loading,
    error,
    convertCurrency,
  };
};

export default useExchangeRates;
