import { selectFrom, selectTo, form } from './elements.js';
import { generateOptions } from './utils.js';
import currencies from './currencies.js';
import { handleInput } from './handlers.js';

export function init() {
  const optionsHTML = generateOptions(currencies);
  // populate the options elements
  selectFrom.innerHTML = optionsHTML;
  selectTo.innerHTML = optionsHTML;

  form.addEventListener('input', handleInput);
}
