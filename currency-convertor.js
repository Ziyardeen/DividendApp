import axios from "axios";

const API_KEY = "a61e0e0d2c8e49803be3da86"; // Replace with your API key
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}${fromCurrency}`);
    const rate = response.data.rates[toCurrency];
    return rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};

export default getExchangeRate;
