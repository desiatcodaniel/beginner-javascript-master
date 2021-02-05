function Slider(sliderEl) {
  // Exception handler for when object is invalid
  if (!(sliderEl instanceof Element)) {
    throw new Error('No slider passed in');
  }
  // select prev and next buttons
  const prevBtn = sliderEl.querySelector('.goToPrev');
  const nextBtn = sliderEl.querySelector('.goToNext');
  const slides = sliderEl.querySelector('.slides');
  // Variables to attach to the images in queue
  let prev;
  let current;
  let next;

  function setDisplay() {
    // Save the images to be displayed
    current = slides.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
  }

  function addClasses() {
    // Add classes to images
    prev.classList.add('prev');
    current.classList.add('current');
    next.classList.add('next');
  }

  function move(direction) {
    // Clear current classes
    const classesToRemove = ['prev', 'current', 'next'];
    [prev, current, next].forEach(e => e.classList.remove(...classesToRemove));
    // Set new variables after the event
    if (direction === 'back') {
      // previous will be previous sibling or the last child (loops around)
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      // next will be the next sibling or the first child (Loops around)
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    // Add classes again
    addClasses();
  }

  // Call functions
  setDisplay();
  addClasses();

  // Event listeners
  prevBtn.addEventListener('click', e => move('back'));
  nextBtn.addEventListener('click', move);
}

const slider1 = Slider(document.querySelector('.slider'));
const slider2 = Slider(document.querySelector('.dog-slider'));
