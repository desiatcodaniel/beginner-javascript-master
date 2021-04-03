import { sanitize } from 'dompurify';

const input = document.querySelector('[name="input"]');
const output = document.querySelector('.output');
const buttons = document.querySelectorAll('nav button');
input.addEventListener('input', () => {
  // First argument is the value to sanitize, second argument {} are module specific attributes to specify which tags and attributes to forbid
  const clean = sanitize(input.value, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });
  // Find all newline and replace them with br tags
  output.innerHTML = clean.replace(/\n/g, '<br>');
});

// trigger an input even on page load
input.dispatchEvent(new Event('input'));

buttons.forEach(button =>
  button.addEventListener('click', e => {
    alert(e.currentTarget.textContent);
  })
);
