// SELECT buttons for each card
const cardButtons = document.querySelectorAll('.card button');

const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');
// Define handler
const handleCardButtonClick = event => {
  // Grab the data-description of the parent card
  const button = event.currentTarget;
  // Climb up the nested tree to get the closest element
  const card = button.closest('.card');
  // Grab the image source
  const imgSrc = card.querySelector('img').src;
  // Grab the description
  const desc = card.dataset.description;
  // Grab the name of the card
  const name = card.querySelector('h2').textContent;
  // Populate the modal with the new information
  // Replace the 200 to 600 pixels
  modalInner.innerHTML = `<img width="600" height="600" src="${imgSrc.replace(
    '200',
    '600'
  )}" alt ="${name}"/>
  <p>${desc}</p>`;

  // Show modal by adding open to outerModal class
  modalOuter.classList.add('open');
};
// Loop over each button to add an event listener
cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick)
);

// Close Modal function
function closeModal() {
  modalOuter.classList.remove('open');
}

// Listen to click outside to remove class to hide the modal again
modalOuter.addEventListener('click', function(event) {
  // Check if the user is clicking on the inner modal
  const isInside = event.target.closest('.modal-inner');
  console.log(isInside);

  // Only remove open if it is not inside
  if (!isInside) {
    closeModal();
  }
});

// Add escape as exit key
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
