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

// Select all select tags
const selects = document.querySelectorAll('select');

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

// Generate all items
const optionsHTML = generateOptions(currencies);
console.log(optionsHTML);

// Use the generated items to add to html
selects.forEach(select => {
  select.innerHTML = optionsHTML;
});
