// Select all button options
const radioBtns = Array.from(document.getElementsByName(`filter`));
// Select text area to listen for changes
const textInput = document.querySelector(`[name="text"]`);
// Select paragraph to output parsed string
const parsedOutput = document.querySelector(`.result`);

// Create functions that take in a string and returns parsed string
// For sarcastic option
const filters = {
  sarcastic(value) {
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
  },

  // For funky option
  funky(value) {
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
  },

  // For unable option
  unable(value) {
    return value.split(' ').join('...');
  },
};

// Crate a parser that outputs the string
const parseAndOutput = strInput => {
  const checkedRadio = radioBtns.find(item => item.checked);
  console.log(checkedRadio.value);
  const parsedStr = filters[checkedRadio.value](strInput);
  parsedOutput.innerHTML = parsedStr;
};

// Create eventListener to listen for every keyup
textInput.addEventListener('input', e => parseAndOutput(e.target.value));
// Create eventListener for radioBtn changes
radioBtns.forEach(item => {
  item.addEventListener('input', () => {
    parseAndOutput(textInput.value);
  });
});
