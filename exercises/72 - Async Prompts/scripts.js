function ask(options) {
  return new Promise(function(resolve) {
    // First we need to create a popup with all the fields in it
    // createElement will immediately create a DOM node instead of waiting for it to be put to the page first - so we can attach listeneres to it promptly
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
      <label>${options.title}</label>
    </fieldset>`
    ); // fieldset group together form inputs
    // Check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement('button');
      // Not giving the button a type will assume that it's a submit and it will submit the form
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      // TODO: listen for a click on the cancel button.
    }
    // Listen for the submit event on the inputs

    // When someone does submit it, resolve the data that was in the input box

    // Insert that popup into the DOM
    document.body.appendChild(popup);
    popup.classList.add('open');
  });
}
