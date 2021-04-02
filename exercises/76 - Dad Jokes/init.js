import { handleClick } from './handlers.js';
import { jokeBtn } from './elements.js';

export const init = () => {
  jokeBtn.addEventListener('click', handleClick);
};
