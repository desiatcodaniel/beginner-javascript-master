// Create a closure function that can be reused without the sources interfering with each other
function Gallery(gallery) {
  // throw an error if there is no gallery/false
  if (!gallery) {
    throw new Error('No Gallery Found');
  }

  this.gallery = gallery;

  // Select elements needed
  // Images come from the selected gallery
  this.images = Array.from(gallery.querySelectorAll('img'));
  // Modal is outside of any gallery so we use document
  this.modal = document.querySelector('.modal');
  // next and prev buttons are in modal
  this.next = this.modal.querySelector('.next');
  this.prev = this.modal.querySelector('.prev');

  // Bind methods to the instance when we need them
  this.showNextImg = this.showNextImg.bind(this);
  this.showPrevImg = this.showPrevImg.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // Listeners - open/close modal, previous, next buttons
  // assign event listener for all images in the chosen gallery
  this.images.forEach(image =>
    image.addEventListener('click', e => this.showImg(e.currentTarget))
  );

  // Loop over each image to display if enter was clicked
  this.images.forEach(image => {
    image.addEventListener('keyup', this.handleKeyUp);
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}
// Open Modal function
Gallery.prototype.openModal = function() {
  if (this.modal.matches('.open')) {
    console.info('Modal already open');
    return;
  }
  // Make the modal show up by adding class
  this.modal.classList.add('open');

  // Event Listeners to be bound when we open the modal
  // Key up is not bound to modal selector
  window.addEventListener('keyup', this.handleKeyUp);
  // Listener for next and prev
  this.next.addEventListener('click', this.showNextImg);
  this.prev.addEventListener('click', this.showPrevImg);
};

// Close Modal function
Gallery.prototype.closeModal = function() {
  // Make the modal disappear by adding class
  this.modal.classList.remove('open');
  // Remove Listener for next and prev and keyup
  window.removeEventListener('keyup', this.handleKeyUp);
  this.next.removeEventListener('click', this.showNextImg);
  this.prev.removeEventListener('click', this.showPrevImg);
};

// Functions to show next and prev images
Gallery.prototype.showNextImg = function() {
  this.showImg(
    this.currentImg.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImg = function() {
  this.showImg(
    this.currentImg.previousElementSibling || this.gallery.lastElementChild
  );
};
// Function to make sure click event is outside the modal
Gallery.prototype.handleClickOutside = function(e) {
  if (e.currentTarget === e.target) this.closeModal();
};

// Function to make sure keyup is useable for prev, next, and escape
Gallery.prototype.handleKeyUp = function(e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowLeft') return this.showPrevImg();
  if (e.key === 'ArrowRight') return this.showNextImg();
  if (e.key === 'Enter') return this.showImg(e.target);
};
// Function to show the image in the modal
Gallery.prototype.showImg = function(el) {
  // safety check for broken links/application
  if (!el) {
    console.info('no image');
    return;
  }
  // update the modal with this info
  // Use the clicked image src
  this.modal.querySelector('img').src = el.src;
  // Use the clicked image title
  this.modal.querySelector('h2').textContent = el.title;
  // Use the clicked image data-description
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  // Update current image
  // current image to record which part of the gallery is being displayed
  this.currentImg = el;

  // Call openModal
  this.openModal();
};

// Call gallery from 2 galleries
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
