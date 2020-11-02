// function doctorize(firstName) {
//   return `Dr. ${firstName}`;
// }

// Anon Function
// function (firstName) {
//   return `Dr. ${firstName}`;
// }

// Function Expression
// const doctorize = function(firstName) {
//   return `Dr. ${firstName}`;
// };

/* eslint-disable */
const inchToCM = inches => inches * 2.54;

function add(a, b = 3) {
  const total = a + b;
  return total;
}

// const add = (a, b = 3) => a + b;

// returning an object

// function makeABaby(first, last) {
//   const baby = {
//     name: `${first} ${last}`,
//     age: 0
//   }
//   return baby;
// }

//Add parenthesis to implicitly return an object to tell JavaScript that the curly bracket is not for the block of the function
const makeABaby = (first, last) => ({ name: `${first} ${last}`, age: 0 });


// IIFE
// Immediately Invoked Function Expression

//NEED to add parenthesis at the end with the arguments inside because it is IMMIDIATELY INVOKED.
(function(age) {
  return `You are cool and age ${age}`;
})(10);

// Methods!!!
//FUNCTIONS INSIDE OBJECTS - SIMILAR TO C++
const wes = {
  name: 'Westopher Bos',
  // Method!
  sayHi: function() {
    console.log(`Hey ${this.name}`);
    return 'Hey Wes';
  },
  // Short hand Method
  yellHi() {
    console.log('HEY WESSSSS');
  },
  // Arrow function
  wisperHi: () => {
    console.log('hii wesss im a mouse');
  }
}

// Callback Functions
// Click Callback
const button = document.querySelector('.clickMe');

function handleClick() {
  console.log('Great Clicking!!');
}

button.addEventListener('click', function() {
  console.log('NIce Job!!!');
});

// Timer Callback
setTimeout(() => {
  console.log('DONE! Time to eat!');
}, 1000);
