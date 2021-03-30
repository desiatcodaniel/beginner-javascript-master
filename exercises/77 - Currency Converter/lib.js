// Define endpoint for the API and object to cache the rates
const endpoint = 'https://api.exchangeratesapi.io/latest';
const ratesCache = {};

// Create a function that will fetch data from API
export const fetchRate = async base => {
  const response = await fetch(`${endpoint}?base=${base}`);
  const data = await response.json();
  return data;
};

// Create function to convert rates into total
export const convert = async (fromCurrency, toCurrency, value) => {
  if (!ratesCache[fromCurrency]) {
    console.log(
      `Modular - No rate found, fetching rate sheet for ${fromCurrency}`
    );
    ratesCache[fromCurrency] = await fetchRate(fromCurrency);
  }
  console.log(ratesCache[fromCurrency].rates[toCurrency] * value);
  return ratesCache[fromCurrency].rates[toCurrency] * value;
};
