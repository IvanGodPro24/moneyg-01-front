import axios from "axios";

const API_BASE_URL = "http://localhost:3000/currency";

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
