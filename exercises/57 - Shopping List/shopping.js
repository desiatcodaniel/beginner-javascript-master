// Learn custom events, local storage, event delegation
// How to listen for clicks that happen in the future
// Learn to install parcel -- npm install -g parcel-bundler (installs globally) - run by typing parcel index.html
// CTRL + C to clear it

const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// Create an array to hold our state
// State = a bunch of data that reflects the state of the application
// e.g. state in this case is going to contain the status, id, and item descriptions

let items = [];

function displayItems() {
  // Create necessary html to insert into the page
  // Use aria-label for accessibility and to tell the screen reader what is really happening
  const html = items
    .map(
      item => `<li class="shopping-item">
        <input value="${item.id}" type="checkbox" ${
        item.complete ? 'checked' : ''
      } >
        <span class="itemName">${item.name}</span>
        <button aria-label="Remove ${item.name}" value="${
        item.id
      }">&times;</button>
        </li>`
    )
    .join(''); // MAP each item and join them to make one string
  list.innerHTML = html;
}

function handleSubmit(e) {
  // Prevent refreshing and adding the text on the URL since it is the default action after a submit button
  e.preventDefault();

  // Pull the data out of the form
  // item is the name of the input so it's accessible using dot notation
  const name = e.currentTarget.item.value;

  if (!name) return; // Will work like 'required' on form validation

  // Create an item with unique identifiers
  // One good unique identifier is Date.now() since it is almost guaranteed to be unique everytime
  const item = {
    name, // This got refactored to name instead of name: name,
    id: Date.now(),
    complete: false,
  };

  // Push items to the state
  items.push(item);

  // Clear the form for every time it is saved
  // Another way to do it is e.currentTarget.value = ''; to set only one form to cleared
  e.target.reset(); // This can be used to clear multiple forms

  // fire off a custom event that will tell listeners whenever the items have been updated
  // CustomEvent 'itemsUpdated' will be triggered or dispatched when the code hits this line and listeners will be alerted by the event
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Mirror data into a local storage
// localStorage is text only so the object needs to be converted into a string first using JSON
function mirrorToLocalStorage() {
  // setItem will take in a key and a value
  localStorage.setItem('items', JSON.stringify(items));
}

// Restore items from localStorage when the page is loaded
function restoreFromLocalStorage() {
  // Use JSON.parse to pull the items from local storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  // Push all items into items array
  // lsItems.forEach(item => items.push(item));
  items.push(...lsItems); // Using the spread operator to push all items into the array
  // Check if localStorage contains something and dispatch event to display it
  if (lsItems.length) {
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

const markAsComplete = id => {
  // Find the selected item
  const itemClicked = items.find(item => item.id === id);

  // Toggle complete boolean of the item
  itemClicked.complete = !itemClicked.complete;

  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};
// Delete item based on passed in id (clicked from the list)
const deleteItem = id => {
  // Filter to remove the specific item based on id
  // Can not use strict comparison as id is being stored as a number and the value is being stored as a string
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
};
// Listen for a submit event on the form
shoppingForm.addEventListener('submit', handleSubmit);

// Listen to the custom event that was dispatched in handleSubmit and call functions that need it
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Run restore on page load
restoreFromLocalStorage();

// Listen for input (clicks to delete/check/uncheck items) - Event Delegation
// Listen for the click on the list but then delegate the click over to the button if that is what was clicked
// This makes the event listener dynamic instead of static such as selecting current items which makes new items not able to be part of selected elements
// Keep track of all the shopping list items and whether they are complete
// Render out all items
list.addEventListener('click', e => {
  // Parse id to int so it can be strictly compared
  const id = parseInt(e.target.value);

  // Call delete function if button is clicked
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  // Call toggle complete function if checkbox is clicked
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});
