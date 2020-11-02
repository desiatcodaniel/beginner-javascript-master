/*
Select the elements on the page - canvas, shake button
*/
const canvas = document.querySelector('#etch-a-sketch');
// get context from canvas (2d or 3d - see three.js)
const ctx = canvas.getContext('2d');
const shakeBtn = document.querySelector('.shake');
const MOVE_AMOUNT = 60; // All caps because TRUE CONSTANT
/*
Setup Canvas for drawing
 */
// Using destructuring to assign values from canvas
const { height, width } = canvas; // Same as width = canvas.width

// Set random starting values for context
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round'; // Setup to connect round ends
ctx.lineCap = 'round'; // Default is squared off edge
ctx.lineWidth = MOVE_AMOUNT; // Set the lines to be thicker

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

/*
Write draw function
*/
// Use destructuring to accept a property from an object
// Accepts key property from passed object
function draw({ key }) {
  // Increment hue by one and update strokestyle every draw event
  hue += 15;
  // Update style
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // Start path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move the x and y values depending on what the user did
  // Change x and y
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  // Move to new x and y
  ctx.lineTo(x, y);
  ctx.stroke();
}

/*
Write handler for the keys
*/
function handleKey(e) {
  // Do stuff if arrow keys are pressed
  if (e.key.includes('Arrow')) {
    e.preventDefault(); // Stop defaulting of arrow key actions
    // Pass in object to draw function
    draw({ key: e.key });
  }
}

/*
Clear/shake function
*/
function clearCanvas() {
  canvas.classList.add('shake');

  // Start from 0 0, end with width height pixels
  ctx.clearRect(0, 0, width, height);
  // include third argument to not increment listeners every time the function is called OR remove listener
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

/*
Listen for arrow keys
*/
window.addEventListener('keydown', handleKey);

shakeBtn.addEventListener('click', clearCanvas);
