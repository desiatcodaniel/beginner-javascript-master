const jokeBtn = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke p');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke() {
  // Pass an accept header
  // Header - Additional information that comes along into the fetch - like an argument in functions
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: `application/json`,
    },
  });

  // Need to put await here since it's waiting for data from the fetch
  const data = await response.json();
  return data;
}

function randomItemFromArray(arr, not) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  console.log(randomIndex);
  let item = arr[randomIndex];
  if (item === not) item = randomItemFromArray(arr, not);
  return item;
}

const handleClick = async e => {
  // Select to toggle the loader animation
  console.log(e.currentTarget);
  const loader = e.currentTarget.querySelector('.loader');
  loader.classList.toggle('hidden');
  // Need to put await since it needs the data before moving forward
  const { joke } = await fetchJoke();
  // Replace html content
  jokeHolder.textContent = joke;
  loader.classList.toggle('hidden');
  // // Replace content of the button without using duplicates
  e.target.textContent = randomItemFromArray(buttonText, e.target.textContent);
};

jokeBtn.addEventListener('click', handleClick);
