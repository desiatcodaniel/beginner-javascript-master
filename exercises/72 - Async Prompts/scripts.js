const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const destroyPopup = async popup => {
  // remove open class for it to become invisible
  popup.classList.remove('open');
  // Wiat 1 second then remove the DOM entirely
  await wait(1000);
  popup.remove();
  // Make sure that there is nothing left to avoid memory leak
  popup = null;
};

function ask(options) {
  return new Promise(async function(resolve) {
    // First we need to create a popup with all the fields in it
    // createElement will immediately create a DOM node instead of waiting for it to be put to the page first - so we can attach listeneres to it promptly
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
      <label>${options.title}</label>
      <input type="text" name="input"/>
      <button type="submit">Submit</button>
    </fieldset>`
    ); // fieldset group together form inputs
    // Check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      // Not giving the button a type will assume that it's a submit and it will submit the form
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstChild.appendChild(skipButton);
      // TODO: listen for a click on the cancel button.
      skipButton.addEventListener(
        'click',
        function() {
          resolve(null); // Explicitly tell the promise to resolve with nothing
        },
        { once: true }
      );
    }
    // Listen for the submit event on the inputs
    popup.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
        console.log('submitted');
        resolve(e.target.input.value);
        // Remove it from the DOM entirely
        destroyPopup(popup);
      },
      { once: true }
    ); // Only listen for the event once
    // When someone does submit it, resolve the data that was in the input box

    // Insert that popup into the DOM
    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}

const askQuestion = async e => {
  const button = e.currentTarget;
  // Check if it has a cancel button
  const cancel = 'cancel' in button.dataset;
  console.log(cancel);
  // Call ask function to get user input
  const answer = await ask({
    title: button.dataset.question,
    cancel,
  });

  console.log(answer);
};

// Select all buttons that have a question
const btns = document.querySelectorAll('[data-question]');

btns.forEach(button => button.addEventListener('click', askQuestion));

// Fire popup sequentially
const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: "What is your dog's name?" },
];

const asyncMap = async (array, callback) => {
  // Make an array to store results
  const results = [];

  // Loop over our array
  for (const item of array) {
    results.push(await callback(item));
  }
  console.log(results);
  return results;
};

// For of allows pausing of loop using await
// const askMany = async () => {
//   for (const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// };
asyncMap(questions, ask);
