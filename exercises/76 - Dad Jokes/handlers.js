import * as elements from './elements.js';
import { randomItemFromArray } from './utils.js';
import { fetchJoke } from './lib.js';

export const handleClick = async e => {
  // Unhide loading animation
  elements.loader.classList.toggle('hidden');
  // Need to put await since it needs the data before moving forward
  const { joke } = await fetchJoke();
  // Replace html content
  elements.jokeHolder.textContent = joke;
  // Hide loading animation
  elements.loader.classList.toggle('hidden');
  // Replace content of the button without using duplicates
  e.target.textContent = randomItemFromArray(
    elements.buttonText,
    e.target.textContent
  );
};
