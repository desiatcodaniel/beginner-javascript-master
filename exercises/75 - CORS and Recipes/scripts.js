// Set base endpoint of the api
const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');
// Create function to fetch recipe
const fetchRecipe = async query => {
  // Fetch the API
  const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  // Translate it to json
  const data = await res.json();
  return data;
};
// will be block by Cross Origin Resource Sharing (CORS)
// CO - domain names (origin) by default, data from different origins are not allowed
// RS - CORS policy must happen on the server to allow cross origin resource sharing.
// e.g. github.com is allowed to access data from codepen based on the user's authorization
// Need to run from a server
// Need to put something in between localhost and endpoint - CORS Proxy - cors-anywhere-herokuapp.com

const handleSubmit = async e => {
  e.preventDefault();
  const submitedForm = e.currentTarget;
  fetchAndDisplay(form.query.value);
};

const fetchAndDisplay = async query => {
  // Turn the button to unclickable
  form.submit.disabled = true;
  const recipes = await fetchRecipe(query);
  displayRecipe(recipes.results);
  form.submit.disabled = false;
};

const displayRecipe = recipes => {
  const html = recipes.map(
    recipe => `<div class="recipe">
    <h2>${recipe.title}</h2>
    <p>${recipe.ingredients}</p>
    ${recipe.thumbnail &&
      `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
        <a href="${recipe.href}">View Recipe -></a>
      </div>`
  );
  recipesGrid.insertAdjacentHTML('afterbegin', html.join(''));
};

form.addEventListener('submit', handleSubmit);
// On page load run it with 'adobo'
fetchAndDisplay('adobo');
