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
const fetchRate = async base => {
  const response = await fetch(`${endpoint}?base=${base}`);
  const data = await response.json();
  return data.rates;
};

// Create error handler for async await
const handleError = err => {
  console.log('There is a problem handling the request');
  console.log(err);
};

// Create function to convert rates into total
const convert = (currentRates, toCurrency, value) =>
  currentRates[toCurrency] * value;

// Create function to handle input changes
const handleInput = async e => {
  e.preventDefault();
  const { value } = e.currentTarget.querySelector('input');
  const rates = await fetchRate(selectFrom.value).catch(handleError);
  // Call convert function
  conversionBox.textContent = `${selectTo.value} - ${convert(
    rates,
    selectTo.value,
    value
  ).toFixed(2)}`;
};

// Use the generated items to add to html
selectFrom.innerHTML = generateOptions(currencies);
selectTo.innerHTML = generateOptions(currencies);

// Listen to submit
form.addEventListener('input', handleInput);
