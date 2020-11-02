// functions can be declared and called anywhere (before or after its line of declaration)

// sayHi(); // works because of hoisting

// function sayHi() {
//   console.log('hooo');
// }
/** *******************************
 * the variable for var is hoisted, but the value assignment
 *      will not be hoisted resulting to undefined
 */
// console.log(age); // results to undefined
// console.log(cool); // results to reference error
const age = 0;

// Assigning function into a variable is not hoisted
