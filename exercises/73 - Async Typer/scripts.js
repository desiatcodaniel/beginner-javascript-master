const wait = async (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Create a random number generator to make the typing effect look more natural
// max - min will ensure that the value is inside the range, adding min to it will ensure that the max value will be inside the low threshold and that it can reach but not exceed the high threshold
// Not a pure function because the return value is unpredictable instead of the exact same value all the time
// Passing in the randomNumber can be a method to make sure the function is testable and is a pure function
const getRandomBetween = (min = 20, max = 150, randomNumber = Math.random()) =>
  Math.floor(randomNumber * (max - min) + min);

// Async for of loop
// const draw = async el => {
//   // Save the original text to a variable
//   const text = el.textContent;
//   // Loop over text to spread them into individual indices
//   let soFar = '';
//   for (const letter of text) {
//     // Add character each loop
//     soFar += letter;
//     // Pull in the min(data-type-min) and max(data-type-max) values
//     const { typeMin, typeMax } = el.dataset;
//     await wait(getRandomBetween(typeMin, typeMax));
//     el.textContent = soFar;
//   }
// };

// Recursion practice
const draw = el => {
  let index = 0;
  const text = el.textContent;
  async function drawLetter() {
    // Set a random speed
    const { typeMin, typeMax } = el.dataset;
    // Wait for a random number of seconds before adding textContent
    await wait(getRandomBetween(typeMin, typeMax));
    // Set textContent to the current index
    el.textContent = text.slice(0, index);
    // Increment index
    index += 1;
    // Exit condition
    if (index <= text.length) drawLetter(); // call recursive function until it hits the end of the text
  }
  // Initial call of recursive function
  drawLetter();
};

document.querySelectorAll('[data-type]').forEach(draw);
