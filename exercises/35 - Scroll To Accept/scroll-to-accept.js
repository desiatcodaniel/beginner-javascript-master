// function scrollToAccept() {

//   if (!terms) {
//     return; // Exit function if terms is undefined
//   }
//   terms.addEventListener('scroll', function(e) {
//     // How far the element is from the top
//     console.log(e.currentTarget.scrollTop);
//     // Current height of the scrolled div
//     console.log(e.currentTarget.scrollHeight);
//   });
// }
const terms = document.querySelector('.terms-and-conditions');
const button = document.querySelector('button');
const watch = document.querySelector('.watch');
function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    console.log('removing disabled');
    // Stop observing the button
    this.unobserve(terms.lastElementChild);
  }
}
const ob = new IntersectionObserver(obCallback, { root: terms, threshold: 1 });

ob.observe(terms.lastElementChild);
