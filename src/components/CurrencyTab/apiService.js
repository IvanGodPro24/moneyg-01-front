import axios from "axios";

const API_BASE_URL = "https://api.monobank.ua/bank/currency";

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
