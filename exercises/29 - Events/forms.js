console.log('IT WORKS');

const wes = document.querySelector('.wes');

wes.addEventListener('click', function(event) {
  console.log('CLICKED');

  // Display a warning and ask the user if changePage is true
  const shouldChangePage = confirm('this website is malicious, proceed?');

  // Prevent from changing page if false
  if (!shouldChangePage) {
    event.preventDefault();
  }
});

const signupForm = document.querySelector('[name="signup"]');

signupForm.addEventListener('submit', function(e) {
  const name = e.currentTarget.name.value;

  // Prevents submitting a name that contains hi
  if (name.includes('hi')) {
    alert('NO');
    e.preventDefault();
  }
});

function logEvent(e) {
  console.log(e.currentTarget.value);
  console.log(e.type);
}

signupForm.name.addEventListener('keyup', logEvent);
