// Create a closure function that can be reused without the sources interfering with each other
function Gallery(gallery) {
  // throw an error if there is no gallery/false
  if (!gallery) {
    throw new Error('No Gallery Found');
  }

  // Select elements needed
  // Images come from the selected gallery
  const images = Array.from(gallery.querySelectorAll('img'));
  // Modal is outside of any gallery so we use document
  const modal = document.querySelector('.modal');
  // next and prev buttons are in modal
  const next = modal.querySelector('.next');
  const prev = modal.querySelector('.prev');
  // current image to record which part of the gallery is being displayed
  let currentImg;

  // Open Modal function
  function openModal() {
    if (modal.matches('.open')) {
      console.info('Modal already open');
      return;
    }
    // Make the modal show up by adding class
    modal.classList.add('open');

    // Event Listeners to be bound when we open the modal
    // Key up is not bound to modal selector
    window.addEventListener('keyup', handleKeyUp);
    // Listener for next and prev
    next.addEventListener('click', showNextImg);
    prev.addEventListener('click', showPrevImg);
  }

  // Close Modal function
  function closeModal() {
    // Make the modal disappear by adding class
    modal.classList.remove('open');
    // TODO: add eventhandler for escape key to close modal
  }

  // Functions to show next and prev images
  function showNextImg() {
    showImg(currentImg.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImg() {
    showImg(currentImg.previousElementSibling || gallery.lastElementChild);
  }
  // Function to make sure click event is outside the modal
  function handleClickOutside(e) {
    if (e.currentTarget === e.target) closeModal();
  }

  // Function to make sure keyup is useable for prev, next, and escape
  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowLeft') return showPrevImg();
    if (e.key === 'ArrowRight') return showNextImg();
    if (e.key === 'Enter') return showImg(e.target);
  }
  // Function to show the image in the modal
  function showImg(el) {
    // safety check for broken links/application
    if (!el) {
      console.info('no image');
      return;
    }
    // update the modal with this info
    // Use the clicked image src
    modal.querySelector('img').src = el.src;
    // Use the clicked image title
    modal.querySelector('h2').textContent = el.title;
    // Use the clicked image data-description
    modal.querySelector('figure p').textContent = el.dataset.description;
    // Update current image
    currentImg = el;

    // Call openModal
    openModal();
  }

  // Listeners - open/close modal, previous, next buttons
  // assign event listener for all images in the chosen gallery
  images.forEach(image =>
    image.addEventListener('click', e => showImg(e.currentTarget))
  );

  // Loop over each image to display if enter was clicked
  images.forEach(image => {
    image.addEventListener('keyup', handleKeyUp);
  });

  modal.addEventListener('click', handleClickOutside);
}

// Call gallery from 2 galleries
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
