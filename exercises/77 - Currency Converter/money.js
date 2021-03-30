// Define endpoint for the API and object to cache the rates
const endpoint = 'https://api.exchangeratesapi.io/latest';
const ratesCache = {};

// Select form element
const form = document.querySelector('form');

// Select all select tags
const selectFrom = document.querySelector('[name="from_currency"]');
const selectTo = document.querySelector('[name="to_currency"]');

// Select the resulting value element
const conversionBox = document.querySelector('.to_amount');

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
const fetchRate = async base => {
  const response = await fetch(`${endpoint}?base=${base}`).catch(handleError);
  const data = await response.json();
  ratesCache[base] = data;
};

// Create proper format currency
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Create error handler for async await
const handleError = err => {
  console.log('There is a problem handling the request');
  console.log(err);
};

// Create function to convert rates into total
const convert = async (fromCurrency, toCurrency, value) => {
  if (!ratesCache[fromCurrency]) {
    console.log('No rate found, fetching rate sheet');
    await fetchRate(fromCurrency);
  }
  console.log(ratesCache[fromCurrency].rates[toCurrency] * value);
  return ratesCache[fromCurrency].rates[toCurrency] * value;
};

// Create function to handle input changes
const handleInput = async e => {
  e.preventDefault();
  const { value } = e.currentTarget.querySelector('input');
  const converted = await convert(selectFrom.value, selectTo.value, value);

  // Call convert function
  conversionBox.textContent = formatCurrency(converted, selectTo.value);
};

// Use the generated items to add to html
selectFrom.innerHTML = generateOptions(currencies);
selectTo.innerHTML = generateOptions(currencies);

// Listen to submit
form.addEventListener('input', handleInput);
