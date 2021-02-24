const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

const destroyPopup = async popup => {
  // remove open class for it to become invisible
  popup.classList.remove('open');
  // Wiat 1 second then remove the DOM entirely
  await wait(1000);
  popup.remove();
  // Make sure that there is nothing left to avoid memory leak
  popup = null;
};

function ask(options) {
  return new Promise(async function(resolve) {
    // First we need to create a popup with all the fields in it
    // createElement will immediately create a DOM node instead of waiting for it to be put to the page first - so we can attach listeneres to it promptly
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
      <label>${options.title}</label>
      <input type="text" name="input"/>
      <button type="submit">Submit</button>
    </fieldset>`
    ); // fieldset group together form inputs
    // Check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      // Not giving the button a type will assume that it's a submit and it will submit the form
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstChild.appendChild(skipButton);
      // TODO: listen for a click on the cancel button.
      popup.addEventListener(
        'submit',
        function(e) {
          e.preventDefault();
          console.log('submitted');
          resolve(e.target.input.value);
          // Remove it from the DOM entirely
          destroyPopup(popup);
        },
        { once: true }
      ); // Only listen for the event once
    }
    // Listen for the submit event on the inputs

    // When someone does submit it, resolve the data that was in the input box

    // Insert that popup into the DOM
    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}
