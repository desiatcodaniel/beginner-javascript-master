// Select all button options
const radioBtns = document.getElementsByName(`filter`);
// Select text area to listen for changes
const textInput = document.getElementsByName(`text`);
// Select paragraph to output parsed string
const parsedOutput = document.querySelector(`.result`);
// Create a checked item variable to determine which function to call
let checkedItem;

// Create functions that take in a string and returns parsed string
// For sarcastic option
const sarcastic = value => {
  // Create a lowerCase array that's split into each letter
  let valueAr = value.toLowerCase();
  valueAr = valueAr.split('');

  // Upper case the letter if the index is even
  valueAr.forEach((letter, index) => {
    if (index % 2 === 0) {
      valueAr[index] = letter.toUpperCase();
    }
  });

  // Return parsed string
  return valueAr.join(``);
};

// For funky option
const funky = value => {
  // Crate an array of letters
  const valueAr = value.split('');
  // Make it superscript, subscript, or normal based on the number generator
  valueAr.forEach((letter, index) => {
    const rng = Math.ceil(Math.random() * 3);
    console.log(rng);
    if (rng === 1) valueAr[index] = letter.sup();
    if (rng === 2) valueAr[index] = letter.sub();
  });
  return valueAr.join('');
};

// For unable option
const unable = value => value.split(' ').join('...');

// Check which generator is selected
const checkSelected = item => {
  if (item.checked) checkedItem = item.value;
};

// Crate a parser that outputs the string
const parseAndOutput = (strInput, checkedRadio) => {
  let parsedStr;
  if (checkedRadio === 'sarcastic') parsedStr = sarcastic(strInput);
  if (checkedRadio === 'funky') parsedStr = funky(strInput);
  if (checkedRadio === 'unable') parsedStr = unable(strInput);
  parsedOutput.innerHTML = parsedStr;
};

// Create eventListener to listen for every keyup
textInput.forEach((input, index) => {
  input.addEventListener('keyup', () => {
    // Check which radio button is selected
    radioBtns.forEach(checkSelected);
    // Call parser
    parseAndOutput(textInput[index].value, checkedItem);
  });
});

// Create eventListener for radioBtn changes
radioBtns.forEach(item => {
  item.addEventListener('click', () => {
    checkSelected(item);
    parseAndOutput(textInput[0].value, checkedItem);
  });
});
