// Create a function that will populate the options
export const generateOptions = options => {
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
// Create proper format currency
export function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
