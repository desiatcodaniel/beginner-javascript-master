// const p = document.querySelector('p');
// console.log(p);

// selects all images in class item
// const div = document.querySelectorAll('.item img');
// console.log(div);

// select class item2
// const item2 = document.querySelector('.item2');

// select img tag from item2 selector
// const item2Image = item2.querySelector('img');
// console.log(item2Image);

// const heading = document.querySelector('h2');
// // GETTER
// console.log(heading.textContent);

// // SETTER
// heading.textContent = 'New text, I am';
// console.log(heading.textContent);

const pizzaList = document.querySelector(".pizza");
console.log(pizzaList.textContent);

pizzaList.insertAdjacentText("afterend", "pizza");
