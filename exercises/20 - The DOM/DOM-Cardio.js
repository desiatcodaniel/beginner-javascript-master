// Make a div
const div1 = document.createElement('div');
// add a class of wrapper to it
div1.classList.add('wrapper');
// put it into the body
document.body.appendChild(div1);
// make an unordered list
const uList = document.createElement('ul');

// add three list items with the words "one, two three" in them
const list1 = document.createElement('li');
const list2 = list1.cloneNode(true);
const list3 = list1.cloneNode(true);
list1.textContent = 'one';
list2.textContent = 'two';
list3.textContent = 'three';

// put that list into the above wrapper
uList.append(list1, list2, list3);
div1.appendChild(uList);
// create an image
const myImg = document.createElement('img');

// set the source to an image
// set the width to 250
const width = 250;
const src = `https://picsum.photos/${width}`;
myImg.src = src;
// add a class of cute
myImg.classList.add('cute');
// add an alt of Cute Puppy
myImg.alt = 'cute pup';
// Append that image to the wrapper
div1.appendChild(myImg);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above
const myHTML = `
<div>
    <p>paragraph 1</p>
    <p>paragraph 2</p>
</div>    
`;
const frag = document.createRange().createContextualFragment(myHTML);

const firstChild = document.querySelector('ul');
div1.insertBefore(frag, firstChild);

// add a class to the second paragraph called warning
// remove the first paragraph
const innerDiv = div1.querySelector('div');
innerDiv.lastElementChild.classList.add('warning');
innerDiv.firstElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

/* eslint-disable */
const generatePlayerCard = (name, age, height) => {
    return `
<div class="playerCard">
    <h2>${name} — ${age}</h2>
    <p>They are ${height} and ${age} years old. In Dog years this person would be ${Number(age) * 7}. That would be a tall dog!</p>
</div>
`;}


// make a new div with a class of cards
const divCard = document.createElement('div');
divCard.classList.add('cards');

// Have that function make 4 cards
const card1 = generatePlayerCard('Daniel', 24, `5'8`);
console.log(card1);
const card2 = generatePlayerCard('Card2', 10, `5'5`);
const card3 = generatePlayerCard('Card3', 11, `5'6`);
const card4 = generatePlayerCard('Card4', 12, `5'7`);

const cardFrag1 = document.createRange().createContextualFragment(card1);
const cardFrag2 = document.createRange().createContextualFragment(card2);
const cardFrag3 = document.createRange().createContextualFragment(card3);
const cardFrag4 = document.createRange().createContextualFragment(card4);

console.log(cardFrag4);
// append those cards to the div
divCard.append(cardFrag1, cardFrag2, cardFrag3, cardFrag4);
// put the div into the DOM just before the wrapper element
const wrap = document.querySelector('.wrapper');
const parent = wrap.parentNode;
parent.insertBefore(divCard, wrap);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener
