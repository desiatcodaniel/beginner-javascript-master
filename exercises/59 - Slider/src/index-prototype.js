function Slider(sliderEl) {
  // Exception handler for when object is invalid
  if (!(sliderEl instanceof Element)) {
    throw new Error('No slider passed in');
  }
  // select prev and next buttons are not accessible outside the Slider so there's no need to change them into properties
  const prevBtn = sliderEl.querySelector('.goToPrev');
  const nextBtn = sliderEl.querySelector('.goToNext');
  // Assign the passed in element into a property
  this.slides = sliderEl.querySelector('.slides');

  // bind prototype functions
  // this.setDisplay = this.setDisplay.bind(this);
  // this.addClasses = this.addClasses.bind(this);

  // Call functions
  this.setDisplay();
  this.addClasses();

  // Event listeners
  // Move need to be used in an arrow callback or be bound in the Object
  prevBtn.addEventListener('click', () => this.move('back'));
  nextBtn.addEventListener('click', () => this.move());
}

Slider.prototype.setDisplay = function() {
  // Save the images to be displayed
  this.current =
    this.slides.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.addClasses = function() {
  // Add classes to images
  this.prev.classList.add('prev');
  this.current.classList.add('current');
  this.next.classList.add('next');
};

Slider.prototype.move = function(direction) {
  // Clear current classes
  const classesToRemove = ['prev', 'current', 'next'];
  [this.prev, this.current, this.next].forEach(e =>
    e.classList.remove(...classesToRemove)
  );
  // Set new variables after the event
  if (direction === 'back') {
    // previous will be previous sibling or the last child (loops around)
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    // next will be the next sibling or the first child (Loops around)
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  // Add classes again
  this.addClasses();
};
const slider1 = new Slider(document.querySelector('.slider'));
const slider2 = new Slider(document.querySelector('.dog-slider'));
