const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};
// Define endpoint for the API
const endpoint = 'https://api.exchangeratesapi.io/latest';

// Select form element
const form = document.querySelector('form');

// Select all select tags
const selectFrom = document.querySelector('[name="from_currency"]');
const selectTo = document.querySelector('[name="to_currency"]');

// Select the resulting value element
const conversionBox = document.querySelector('.to_amount');

// Create a function that will populate the options
const generateOptions = options => {
  // Create an array to save the values
  const optionsArray = [];
  // Loop over the objects using for of and object.entries and save only the value
  for (const [key, value] of Object.entries(options)) {
    const tag = `<option value="${key}">${key} - ${value}</option>`;
    // Push value into the array
    optionsArray.push(tag);
  }
  return optionsArray.join('');
};

// Create a function that will fetch data from API
const fetchRate = async (base, symbol) => {
  const response = await fetch(`${endpoint}?base=${base}&symbols=${symbol}`);
  const data = await response.json();
  return data.rates[symbol].toFixed(2);
};

const handleSubmit = async e => {
  e.preventDefault();
  const { value } = e.target.querySelector('input');
  const rate = await fetchRate(selectFrom.value, selectTo.value);
  // Call convert function
  conversionBox.innerText = (rate * value).toFixed(2);
};

// Use the generated items to add to html
selectFrom.innerHTML = generateOptions(currencies);
selectTo.innerHTML = generateOptions(currencies);

// Call function to fetch data
fetchRate('USD', 'PHP');

// Listen to submit
form.addEventListener('submit', handleSubmit);
