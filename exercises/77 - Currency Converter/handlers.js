import { convert } from './lib.js';
import * as elements from './elements.js';
import { formatCurrency } from './utils.js';

// Create error handler for async await
export const handleError = err => {
  console.log('There is a problem handling the request');
  console.log(err);
};

// Create function to handle input changes
export const handleInput = async e => {
  e.preventDefault();
  const { value } = e.currentTarget.querySelector('input');
  const converted = await convert(
    elements.selectFrom.value,
    elements.selectTo.value,
    value
  );
  // Call convert function
  elements.conversionBox.textContent = formatCurrency(
    converted,
    elements.selectTo.value
  );
};
